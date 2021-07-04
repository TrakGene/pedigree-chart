interface MarriageLinePoints {
    x1: number
    y1: number
    x2: number
    y2: number
}

interface SiblingLinePoints {
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
}

export class MarriageLine {
    static init(ctx: CanvasRenderingContext2D, points: MarriageLinePoints, lineWidth: number, scalingFactor: number) {
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.scale(scalingFactor, scalingFactor)
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.closePath();
    }
}

export class ConsanguineousLine {
    static init(ctx: CanvasRenderingContext2D, points: MarriageLinePoints, lineWidth: number, scalingFactor: number) {
        const offset = 4
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1-offset);
        ctx.lineTo(points.x2, points.y2-offset);
        ctx.moveTo(points.x1, points.y1+offset);
        ctx.lineTo(points.x2, points.y2+offset);
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.closePath();
    }
}

export class SeparationLine {
    static init(ctx: CanvasRenderingContext2D, points: MarriageLinePoints, lineWidth: number, scalingFactor: number) {
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.moveTo(((points.x1+48+points.x2)/2)-5, ((points.y1+points.y2)/2)-24);
        ctx.lineTo(((points.x1-48+points.x2)/2)-5, ((points.y1+points.y2)/2)+24);
        ctx.moveTo(((points.x1+48+points.x2)/2)+5, ((points.y1+points.y2)/2)-24);
        ctx.lineTo(((points.x1-48+points.x2)/2)+5, ((points.y1+points.y2)/2)+24);
        ctx.scale(scalingFactor, scalingFactor)
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.closePath();
    }
}

export class SiblingLine {
    static init(ctx: CanvasRenderingContext2D, points: SiblingLinePoints, lineWidth: number, scalingFactor: number) {
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.lineTo(points.x2, points.y3-100);
        ctx.lineTo(points.x3, points.y3-100);
        ctx.lineTo(points.x3, points.y3);
        ctx.scale(scalingFactor, scalingFactor)
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.closePath();
    }
}

export class TwinsLine {
    static init(ctx: CanvasRenderingContext2D, points, lineWidth: number, scalingFactor: number) {
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x21, points.y21);
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x22, points.y22);
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x3, points.y3);
        ctx.lineTo(points.x4, points.y4);
        ctx.lineTo(points.x5, points.y5);
        ctx.scale(scalingFactor, scalingFactor)
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.closePath();
    }
}