"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
class UnknownShape extends Shape_1.default {
    fillFirstQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.getX(), this.pedigree.getMidY());
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getY());
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getMidY());
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillSecondQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.getMidX(), this.pedigree.getMidY());
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getY());
        this.ctx.lineTo(this.pedigree.getX() + this.pedigree.size, this.pedigree.getMidY());
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillThirdQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.getX() + this.pedigree.size, this.pedigree.getMidY());
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getY() + this.pedigree.size);
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getMidY());
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillFourthQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.getX(), this.pedigree.getMidY());
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getY() + this.pedigree.size);
        this.ctx.lineTo(this.pedigree.getMidX(), this.pedigree.getMidY());
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
exports.default = UnknownShape;
