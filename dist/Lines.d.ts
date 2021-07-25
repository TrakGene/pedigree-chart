interface MarriageLinePoints {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
interface SiblingLinePoints {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
}
interface TwinsLinePoints {
    x1: number;
    y1: number;
    x21: number;
    y21: number;
    x22: number;
    y22: number;
    x3: number;
    y3: number;
    x4: number;
    y4: number;
    x5: number;
    y5: number;
}
export declare class MarriageLine {
    static init(ctx: CanvasRenderingContext2D, points: MarriageLinePoints, lineWidth: number): void;
}
export declare class ConsanguineousLine {
    static init(ctx: CanvasRenderingContext2D, points: MarriageLinePoints, lineWidth: number): void;
}
export declare class SeparationLine {
    static init(ctx: CanvasRenderingContext2D, points: MarriageLinePoints, lineWidth: number): void;
}
export declare class SiblingLine {
    static init(ctx: CanvasRenderingContext2D, points: SiblingLinePoints, lineWidth: number): void;
}
export declare class TwinsLine {
    static init(ctx: CanvasRenderingContext2D, points: TwinsLinePoints, lineWidth: number): void;
}
export declare class IdenticalTwinsLine {
    static init(ctx: CanvasRenderingContext2D, points: TwinsLinePoints, lineWidth: number): void;
}
export {};
