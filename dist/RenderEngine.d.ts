import ConnectionManager from "./ConnectionsManager";
import PedigreeManager from "./PedigreeManager";
import DragHandler from "./DragHandler";
import BasePedigree from "./pedigrees/BasePedigree";
import LegendTable from "./Legend";
export default class RenderEngine {
    diagram: HTMLCanvasElement;
    diagramId: string;
    ctx: CanvasRenderingContext2D;
    pedigrees: Array<BasePedigree>;
    config: {
        width: number;
        height: number;
        dragEnabled: boolean;
        panEnabled: boolean;
        scaleType: string;
        minScale: number;
        maxScale: number;
        font: string;
    };
    connectionManager: ConnectionManager;
    pedigreeManager: PedigreeManager;
    dragHandler: DragHandler;
    scaleFactor: number;
    private recreateDiagram;
    private scaleWithScroll;
    private scaleWithPointer;
    private scale;
    private draw;
    setDiagram(diagramId: string): void;
    setConfig(configObject: any): void;
    create(sex: any, x?: number, y?: number): BasePedigree;
    connect(pedigreeA: any, pedigreeB: any, lineType: any): void;
    connectTwins(parent: BasePedigree, twinA: BasePedigree, twinB: BasePedigree, type: any): void;
    delete(id: any): void;
    createLegend(x: any, y: any): LegendTable;
    on(eventName: "pedigree-click", eventHandler: any): void;
    remove(eventName: string): void;
}
