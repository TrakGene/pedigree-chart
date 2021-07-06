import { Label } from "./Label";
export declare abstract class BasePedigree {
    protected label: Label;
    protected ctx: CanvasRenderingContext2D;
    readonly id: string;
    protected isMarried: boolean;
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
    abstract updateConfig(configObj: any): any;
}
export declare class UnknownPedigree extends BasePedigree {
    initShape(): void;
    updateConfig(): void;
    setLabel(obj: any): void;
}
export declare class MalePedigree extends BasePedigree {
    initShape(): void;
    updateConfig(): void;
    setLabel(obj: any): void;
}
export declare class FemalePedigree extends BasePedigree {
    initShape(): void;
    updateConfig(): void;
    setLabel(obj: any): void;
}
