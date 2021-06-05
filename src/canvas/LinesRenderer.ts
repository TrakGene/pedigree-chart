import { Pedigree } from "./Pedigree"

interface Connection {
    pedigreeA: Pedigree
    pedigreeB: Pedigree
    type: string,
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
        const ctx = this.pedigreeDiagram.getContext("2d");
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

        const x1 = connection.pedigreeA.x + connection.pedigreeA.size / 2
        let x2
        if (connection.pedigreeA.isMarried || connection.pedigreeB.isMarried) {
            const shift = (connection.pedigreeA.x - (connection.pedigreeB.x + connection.pedigreeB.size)) / 2
            x2 = (connection.pedigreeB.x + connection.pedigreeB.size) + shift
        }


        const y1 = connection.pedigreeA.y + connection.pedigreeA.size / 2
        const y2 = y1

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