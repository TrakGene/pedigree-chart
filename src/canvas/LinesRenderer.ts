import { Pedigree } from ".."

interface Connection {
    type: string,
    PedigreeA: Pedigree
    PedigreeB: Pedigree
}

export default class LinesRenderer {
    pedigreeDiagram: HTMLCanvasElement
    connections: Array<Connection>

    constructor(diagram) {
        this.pedigreeDiagram = diagram
    }
}