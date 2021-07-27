import ConnectionManager from "./ConnectionsManager";
import PedigreeManager from "./PedigreeManager";
import DragHandler from "./DragHandler";
import BasePedigree from "./pedigrees/BasePedigree";
import LegendTable from "./Legend";
export default class RenderEngine {
    diagram: HTMLCanvasElement;
    diagramId: string;
    ctx: CanvasRenderingContext2D;
    diagramWrapper: HTMLElement;
    pedigrees: Array<BasePedigree>;
    config: {
        width: number;
        height: number;
        dragEnabled: boolean;
        panEnabled: boolean;
        font: string;
    };
    connectionManager: ConnectionManager;
    pedigreeManager: PedigreeManager;
    dragHandler: DragHandler;
    scaleFactor: number;
    setDiagram(diagramId: string): void;
    private initEvents;
    private recreateDiagram;
    private resizeDiagramWidth;
    private draw;
    setConfig(configObject: any): void;
    create(sex: any, x?: number, y?: number): BasePedigree;
    connect(pedigreeA: any, pedigreeB: any, lineType: any): void;
    connectTwins(parent: BasePedigree, twinA: BasePedigree, twinB: BasePedigree, type: any): void;
    scale(scale: any, cursorX: any, cursorY: any): void;
    deletePedigree(id: any): void;
    createLegend(x: any, y: any): LegendTable;
    on(eventName: "pedigree-click", eventHandler: any): void;
}
