import { Label } from "./Label";
import { Shape } from "./Shapes";
export declare abstract class BasePedigree {
    protected label: Label;
    protected shape: Shape;
    protected ctx: CanvasRenderingContext2D;
    readonly id: string;
    protected isMarried: boolean;
    protected diseaseShape: string;
    protected diseaseColor: string;
    dragEnabled: boolean;
    twin: any;
    marriagePartner: any;
    storage: any;
    size: number;
    border: number;
    x: number;
    y: number;
    constructor(ctx: CanvasRenderingContext2D, x: number, y: number);
    calculateMiddle(): {
        x: number;
        y: number;
    };
    on(eventName: any, eventHandler: any): void;
    abstract initShape(): any;
    abstract drawPedigree(): any;
    abstract setDiseaseShape(shape: any, color: any): any;
    abstract drawDiseaseShape(): any;
}
export declare class UnknownPedigree extends BasePedigree {
    initShape(): void;
    drawPedigree(): void;
    setDiseaseShape(shape: any, color: any): void;
    drawDiseaseShape(): void;
    updateConfig(): void;
    setLabel(obj: any): void;
}
export declare class MalePedigree extends BasePedigree {
    initShape(): void;
    drawPedigree(): void;
    setDiseaseShape(shape: any, color: any): void;
    drawDiseaseShape(): void;
    updateConfig(): void;
    setLabel(obj: any): void;
}
export declare class FemalePedigree extends BasePedigree {
    initShape(): void;
    drawPedigree(): void;
    setDiseaseShape(shape: any, color: any): void;
    drawDiseaseShape(): void;
    updateConfig(): void;
    setLabel(obj: any): void;
}
