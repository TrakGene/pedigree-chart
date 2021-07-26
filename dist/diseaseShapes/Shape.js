"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Shape {
    constructor(ctx, pedigree) {
        this.ctx = ctx;
        this.pedigree = pedigree;
    }
    drawDot(color) {
        const size = 16;
        this.ctx.beginPath();
        this.ctx.arc(this.pedigree.getMidX(), this.pedigree.getMidY(), size / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillColor(color) {
        this.pedigree.fillColor = color;
    }
}
exports.default = Shape;
