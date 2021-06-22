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

        ctx.save();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.scale(scalingFactor, scalingFactor)
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.restore()

        ctx.closePath();
    }
}

export class SiblingLine {
    static init(ctx: CanvasRenderingContext2D, points: SiblingLinePoints, lineWidth: number, scalingFactor: number) {
        ctx.beginPath();
        ctx.save()
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.lineTo(points.x2, points.y3);
        ctx.lineTo(points.x3, points.y3);
        ctx.lineTo(points.x3, points.y3);
        ctx.scale(scalingFactor, scalingFactor)
        ctx.lineWidth = lineWidth
        ctx.stroke();
        ctx.restore()

        ctx.closePath();
    }
}