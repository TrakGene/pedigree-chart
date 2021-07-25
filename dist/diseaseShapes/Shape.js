"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = require("../Camera");
class Shape {
    constructor(ctx, pedigree) {
        this.ctx = ctx;
        this.pedigree = pedigree;
    }
    drawDot(color) {
        const size = 16;
        this.ctx.beginPath();
        this.ctx.arc(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY, size / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillColor(color) {
        this.pedigree.fillColor = color;
    }
}
exports.default = Shape;
