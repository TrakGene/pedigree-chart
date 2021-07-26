"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
class MaleShape extends Shape_1.default {
    fillFirstQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.rect(this.pedigree.getX(), this.pedigree.getY(), this.pedigree.size / 2, this.pedigree.size / 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillSecondQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.rect(this.pedigree.getMidX(), this.pedigree.getY(), this.pedigree.size / 2, this.pedigree.size / 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillThirdQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.rect(this.pedigree.getX(), this.pedigree.getMidY(), this.pedigree.size / 2, this.pedigree.size / 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillFourthQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.rect(this.pedigree.getMidX(), this.pedigree.getMidY(), this.pedigree.size / 2, this.pedigree.size / 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
exports.default = MaleShape;
