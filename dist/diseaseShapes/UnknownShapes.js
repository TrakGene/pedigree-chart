"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
const Camera_1 = require("../Camera");
class UnknownShape extends Shape_1.default {
    fillFirstQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.x + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillSecondQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillThirdQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.x + this.pedigree.size + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
    fillFourthQuarterColor(color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.pedigree.x + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.pedigree.x + this.pedigree.size / 2 + Camera_1.default.OffsetX, this.pedigree.y + this.pedigree.size / 2 + Camera_1.default.OffsetY);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}
exports.default = UnknownShape;
