"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Shape_1 = require("./Shape");
class FemaleShape extends Shape_1.default {
    constructor() {
        super(...arguments);
        this.radius = this.pedigree.size / 2;
    }
    drawQuarterShape(colors) {
        for (let i = 0; i < 4; i++) {
            let startAngle = (i * Math.PI) / 2;
            let endAngle = startAngle + Math.PI / 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.pedigree.getMidX(), this.pedigree.getMidY());
            this.ctx.arc(this.pedigree.getMidX(), this.pedigree.getMidY(), this.radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = colors[i];
            this.ctx.fill();
        }
    }
    fillFirstQuarterColor(color) {
        const colorsSchema = ["transparent", "transparent", color, "transparent"];
        this.drawQuarterShape(colorsSchema);
    }
    fillSecondQuarterColor(color) {
        const colorsSchema = ["transparent", "transparent", "transparent", color];
        this.drawQuarterShape(colorsSchema);
    }
    fillThirdQuarterColor(color) {
        const colorsSchema = [color, "transparent", "transparent", "transparent"];
        this.drawQuarterShape(colorsSchema);
    }
    fillFourthQuarterColor(color) {
        const colorsSchema = ["transparent", color, "transparent", "transparent"];
        this.drawQuarterShape(colorsSchema);
    }
}
exports.default = FemaleShape;
