import BasePedigree from "./pedigrees/BasePedigree";
interface Connection {
    pedigreeA: BasePedigree;
    pedigreeB: BasePedigree;
    type: string;
}
interface TwinConnection {
    parent: BasePedigree;
    twinA: BasePedigree;
    twinB: BasePedigree;
    type: string;
}
/**
 * Drawing and managing connections between pedigrees
 *
 * draw methods are calculating all necessary points for connection to be hold.
 * After calculations, it is passed to to special Line class
 */
export default class ConnectionsManager {
    pedigreeDiagram: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    linesToRender: Array<Connection>;
    twinLinesToRender: Array<TwinConnection>;
    lineWidth: number;
    constructor(diagram: any);
    createConnection(pedigreeA: any, pedigreeB: any, lineType: any): void;
    createTwinsConnection(parent: any, twinA: any, twinB: any, type: any): void;
    removeConnection(id: any): void;
    drawConnections(): void;
    queryConnections(id: number): Connection[];
    queryTwinsConnections(id: number): TwinConnection[];
    drawMarriageLines(connection: Connection): void;
    drawConsanguineousLines(connection: Connection): void;
    drawSeparationLines(connection: Connection): void;
    drawSiblingLines(connection: Connection): void;
    drawTwinsLines(connection: TwinConnection): void;
    drawIdenticalTwinsLines(connection: TwinConnection): void;
}
export {};
