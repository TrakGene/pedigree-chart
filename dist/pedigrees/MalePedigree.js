"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePedigree_1 = require("./BasePedigree");
const Camera_1 = require("../Camera");
const MaleShapes_1 = require("../diseaseShapes/MaleShapes");
class MalePedigree extends BasePedigree_1.default {
    initShape() {
        this.ctx.beginPath();
        this.ctx.rect(this.x + Camera_1.default.OffsetX, this.y + Camera_1.default.OffsetY, this.size, this.size);
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
            shapeInstance: new MaleShapes_1.default(this.ctx, this)
        };
        this.shapes.push(shape);
        this.drawDiseaseShape();
    }
}
exports.default = MalePedigree;
