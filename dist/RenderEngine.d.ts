import ConnectionManager from "./ConnectionsManager";
import PedigreeManager from "./PedigreeManager";
import DragHandler from "./DragHandler";
import BasePedigree from "./pedigrees/BasePedigree";
import LegendTable from "./Legend";
/**
 * Creates a RenderEngine instance that is whole pedigree-chart manager
 *
 * It holds other classes as dependencies. Dependencies often have access to this instance
 * so they can refer to its variables.
 *
 * Treat is as a sort of fasade. In hiddes all complicated mechanisms, resulting in easy-to-use api.
 */
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
    /**
     * Resize diagram with scroll.
     */
    private scaleWithScroll;
    /**
     * Resize diagram with scroll and pointer.
     * It moves the diagram closer to user pointer position
     */
    private scaleWithPointer;
    private scale;
    /**
     * Clear and draw pedigrees and connections
     */
    private draw;
    setDiagram(diagramId: string): void;
    setConfig(configObject: any): void;
    create(sex: any, x?: number, y?: number): BasePedigree;
    /**
     * Tell @class ConnectionManager whitch connections user want to create
     */
    connect(pedigreeA: BasePedigree, pedigreeB: BasePedigree, lineType: string): void;
    /**
     * Tell @class ConnectionManager which twins-connections user want to create
     */
    connectTwins(parent: BasePedigree, twinA: BasePedigree, twinB: BasePedigree, type: any): void;
    delete(id: number): void;
    /**
     * Replace pedigree with new one. It recreates all connections that previous one had.
     * Done with help of @class ConnectionManager
     */
    replace(id: number, newPedigree: BasePedigree): void;
    createLegend(x: number, y: number): LegendTable;
    on(eventName: "pedigree-click", eventHandler: any): void;
    remove(eventName: string): void;
}
