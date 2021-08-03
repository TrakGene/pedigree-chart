"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePedigree_1 = require("./BasePedigree");
const Camera_1 = require("../Camera");
const FemaleShapes_1 = require("../diseaseShapes/FemaleShapes");
class FemalePedigree extends BasePedigree_1.default {
    initShape() {
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.size / 2 + Camera_1.default.OffsetX, this.y + this.size / 2 + Camera_1.default.OffsetY, this.size / 2, 0, 2 * Math.PI);
        this.ctx.lineWidth = this.border;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();
        this.ctx.closePath();
    }
    addDiseaseShape(diseaseShape, color) {
        let shape = {
            diseaseShape: diseaseShape,
            diseaseColor: color,
            shapeInstance: new FemaleShapes_1.default(this.ctx, this)
        };
        this.shapes.push(shape);
        this.drawDiseaseShape();
    }
}
exports.default = FemalePedigree;
