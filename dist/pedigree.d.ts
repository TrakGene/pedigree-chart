export declare abstract class BasePedigree {
    canvasDiagram: HTMLCanvasElement;
    isMarried: boolean;
    marriagePartner: any;
    storage: any;
    id: string;
    size: number;
    border: number;
    x: number;
    y: number;
    x2: number;
    y2: number;
    scalingFactor: number;
    constructor(canvasDiagram: any);
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
