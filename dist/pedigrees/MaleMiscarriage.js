"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePedigree_1 = require("./BasePedigree");
class MaleMiscarriage extends BasePedigree_1.default {
    initShape() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.getMidX(), this.getY() + 10);
        this.ctx.lineTo(this.getX() + this.size, this.getY() + this.size);
        this.ctx.lineTo(this.getX(), this.getY() + this.size);
        this.ctx.lineTo(this.getMidX(), this.getY() + 10);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.fillText("male", this.getMidX() - this.ctx.measureText("male").width / 2, this.getY() + this.size + 20);
    }
}
exports.default = MaleMiscarriage;
