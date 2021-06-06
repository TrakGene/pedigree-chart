import { Pedigree } from "./Pedigree"

interface Connection {
    pedigreeA: Pedigree
    pedigreeB: Pedigree
    type: string,
}

interface Marriage {
    marriedA: Pedigree
    marriedB: Pedigree
}


export default class ConnectionCreator {
    pedigreeDiagram: HTMLCanvasElement
    connections: Array<Connection> = []

    constructor(diagram) {
        this.pedigreeDiagram = diagram
    }

    createConnection(pedigreeA, pedigreeB, lineType) {
        this.connections.push({
            pedigreeA: pedigreeA,
            pedigreeB: pedigreeB,
            type: lineType
        })
    }

    drawConnections() {
        this.connections.forEach(connection => {
            if (connection.type == "marriage") {
                this.drawMarriageLines(connection)
            }
            if (connection.type == "sibling") {
                this.drawSiblingLines(connection)
            }
        })
    }

    drawMarriageLines(connection: Connection) {
        const ctx = this.pedigreeDiagram.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(connection.pedigreeA.calculateMiddle().x, connection.pedigreeA.calculateMiddle().y);
        ctx.lineTo(connection.pedigreeB.calculateMiddle().x, connection.pedigreeB.calculateMiddle().y);
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.closePath();
    }

    drawSiblingLines(connection: Connection) {
        const nodeA = connection.pedigreeA
        const nodeB = connection.pedigreeB

        const x1 = nodeA.x + nodeA.size / 2
        const y1 = nodeA.y + nodeA.size / 2

        // Distance beetwen pedigreeA and B
        let x2
        let shift = (nodeA.x - (nodeB.x + nodeB.size)) / 2
        x2 = (nodeB.x + nodeB.size) + shift
        if(nodeA.marriagePartner) {
            shift = (nodeA.marriagePartner.x - (nodeA.marriagePartner.x + nodeA.marriagePartner.size))/2
            x2 =  (nodeA.marriagePartner.x + nodeA.marriagePartner.size) + shift
        } 
        if(nodeB.marriagePartner) {
            shift = (nodeB.x - (nodeB.marriagePartner.x + nodeB.marriagePartner.size))/2
            x2 = (nodeB.marriagePartner.x + nodeB.marriagePartner.size) + shift
        } 
        const y2 = nodeA.y + nodeA.size / 2

        const ctx = this.pedigreeDiagram.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.moveTo(x2, y2);
        ctx.lineTo(x2, connection.pedigreeB.y + connection.pedigreeB.size / 2);

        ctx.moveTo(x2, connection.pedigreeB.y + connection.pedigreeB.size / 2);
        ctx.lineTo(connection.pedigreeB.x + connection.pedigreeB.size / 2, connection.pedigreeB.y + connection.pedigreeB.size / 2);

        ctx.lineWidth = 3
        ctx.stroke();
        ctx.closePath();
    }
}