export interface Pedigree {
    id: string;
    isMarried: boolean;
    marriagePartner: Pedigree;
    size: number;
    border: number;
    x: number;
    y: number;
    draw(): any;
    calculateMiddle(): any;
}
export declare class MalePedigree implements Pedigree {
    canvasDiagram: HTMLCanvasElement;
    isMarried: boolean;
    marriagePartner: any;
    id: string;
    size: number;
    border: number;
    x: number;
    y: number;
    constructor(canvasDiagram: any);
    calculateMiddle(): {
        x: number;
        y: number;
    };
    draw(): void;
    on(eventName: any, eventHandler: any): void;
}
export declare class FemalePedigree implements Pedigree {
    canvasDiagram: HTMLCanvasElement;
    isMarried: boolean;
    marriagePartner: any;
    id: string;
    size: number;
    border: number;
    x: number;
    y: number;
    constructor(canvasDiagram: any);
    calculateMiddle(): {
        x: number;
        y: number;
    };
    draw(): void;
    on(eventName: any, eventHandler: any): void;
}
