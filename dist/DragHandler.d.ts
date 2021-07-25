import RenderEngine from "./RenderEngine";
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
    constructor(diagram: any, renderEngine: any);
    private initEvents;
    private setUserIntention;
    private drag;
    private dragDiagram;
    private dragPedigree;
    private stopDrag;
}
