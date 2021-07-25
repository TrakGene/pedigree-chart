import ConnectionManager from "./ConnectionsManager";
import PedigreeManager from "./PedigreeManager";
import DragHandler from "./DragHandler";
import BasePedigree from "./pedigrees/BasePedigree";
import LegendTable from "./Legend";
export default class RenderEngine {
    diagram: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    diagramWrapper: HTMLElement;
    pedigrees: Array<BasePedigree>;
    connectionManager: ConnectionManager;
    pedigreeManager: PedigreeManager;
    dragHandler: DragHandler;
    scaleFactor: number;
    setDiagram(diagramId: string): void;
    private initEvents;
    private resizeDiagramWidth;
    private draw;
    create(sex: any, x?: number, y?: number): BasePedigree;
    connect(pedigreeA: any, pedigreeB: any, lineType: any): void;
    connectTwins(parent: BasePedigree, twinA: BasePedigree, twinB: BasePedigree, type: any): void;
    scale(scale: any, cursorX: any, cursorY: any): void;
    deletePedigree(id: any): void;
    createLegend(x: any, y: any): LegendTable;
    on(eventName: "pedigree-click", eventHandler: any): void;
}
