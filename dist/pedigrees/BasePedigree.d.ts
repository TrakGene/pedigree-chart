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
    private storage;
    id: number;
    fillColor: string;
    dragEnabled: boolean;
    isInLegend: boolean;
    twin: any;
    isPregnant: boolean;
    marriagePartner: any;
    size: number;
    border: number;
    x: number;
    y: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number);
    private drawPregnant;
    protected drawDiseaseShape(): void;
    setLabel(obj: any): void;
    setStorage(obj: any): void;
    getStorage(): any;
    draw(): void;
    getMidX(): number;
    getMidY(): number;
    getX(): number;
    getY(): number;
    calculateMiddle(): {
        x: number;
        y: number;
    };
    clearShapes(): void;
    on(eventName: any, eventHandler: any): void;
    setPregnacy(value: boolean): void;
    abstract initShape(): any;
    abstract addDiseaseShape(shape: any, color: any): any;
}
export {};
