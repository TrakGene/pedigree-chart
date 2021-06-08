interface MarriageLinePoints {
    x1: number
    y1: number
    x2: number
    y2: number
}

export class MarriageLine {
    type = "marriage"
    points: MarriageLinePoints
    lineWidth = 0
    ctx: CanvasRenderingContext2D

    constructor(ctx, points, lineWidth) {
        this.ctx = ctx
        this.points = points
        this.lineWidth = lineWidth
        this.init()
    }   
    init() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points.x1, this.points.y1);
        this.ctx.lineTo(this.points.x2, this.points.y2);
        this.ctx.lineWidth = this.lineWidth
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

interface SiblingLinePoints {
    x1: number
    y1: number
    x2: number
    y2: number
    x3: number
    y3: number
}

export class SiblingLine {
    type = "sibling"
    points: SiblingLinePoints
    lineWidth = 0
    ctx: CanvasRenderingContext2D

    constructor(ctx, points, lineWidth) {
        this.ctx = ctx
        this.points = points
        this.lineWidth = lineWidth
        this.init()
    }   
    init() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points.x1, this.points.y1);
        this.ctx.lineTo(this.points.x2, this.points.y2);
        this.ctx.lineTo(this.points.x2, this.points.y3);
        this.ctx.lineTo(this.points.x3, this.points.y3);
        this.ctx.lineWidth = this.lineWidth
        this.ctx.stroke();
        this.ctx.closePath();
    }
}