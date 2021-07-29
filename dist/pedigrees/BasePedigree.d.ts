import Label from "./Label";
import Shape from "../diseaseShapes/Shape";
interface ShapeProps {
    shapeInstance: Shape;
    diseaseShape: string;
    diseaseColor: string;
}
export default abstract class BasePedigree {
    protected label: Label;
    protected shapes: ShapeProps[];
    protected ctx: CanvasRenderingContext2D;
    protected isMarried: boolean;
    fillColor: string;
    dragEnabled: boolean;
    isInLegend: boolean;
    twin: any;
    marriagePartner: any;
    storage: any;
    size: number;
    border: number;
    x: number;
    y: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number);
    getMidX(): number;
    getMidY(): number;
    getX(): number;
    getY(): number;
    calculateMiddle(): {
        x: number;
        y: number;
    };
    on(eventName: any, eventHandler: any): void;
    protected drawDiseaseShape(): void;
    setLabel(obj: any): void;
    drawPedigree(): void;
    abstract initShape(): any;
    abstract addDiseaseShape(shape: any, color: any): any;
}
export {};
