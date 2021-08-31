import RenderEngine from "./RenderEngine";
/**
 * Used for moving pedigees on mouse click or panning the diagram.
 *
 * DragHandler is alse emiting many events, accesible for developers,
 * after resolving user intentions.
 */
export default class DragHandler {
    diagram: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    mouseOffsetX: number;
    mouseOffsetY: number;
    firstCursorX: number;
    firstCursorY: number;
    deltaX: number;
    deltaY: number;
    initialCameraOffsetX: number;
    initialCameraOffsetY: number;
    panDiagram: boolean;
    renderEngine: RenderEngine;
    dragEnabled: boolean;
    panEnabled: boolean;
    constructor(diagram: any, renderEngine: any);
    private initEvents;
    private cursorHover;
    private setUserIntention;
    private drag;
    private dragDiagram;
    private dragPedigree;
    private stopDrag;
}
