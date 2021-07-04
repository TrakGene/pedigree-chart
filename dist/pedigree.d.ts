export declare abstract class BasePedigree {
    canvasDiagram: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    twin: any;
    isMarried: boolean;
    marriagePartner: any;
    storage: any;
    id: string;
    size: number;
    border: number;
    x: number;
    y: number;
    scalingFactor: number;
    dragEnabled: boolean;
    constructor(canvasDiagram: HTMLCanvasElement, ctx: CanvasRenderingContext2D, x: number, y: number);
    calculateMiddle(): {
        x: number;
        y: number;
    };
    on(eventName: any, eventHandler: any): void;
    abstract initShape(): any;
}
export declare class UnknownPedigree extends BasePedigree {
    initShape(): void;
}
export declare class MalePedigree extends BasePedigree {
    initShape(): void;
}
export declare class FemalePedigree extends BasePedigree {
    initShape(): void;
}
