"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BasePedigree_1 = require("./BasePedigree");
const Camera_1 = require("../Camera");
const UnknownShapes_1 = require("../diseaseShapes/UnknownShapes");
class UnknownPedigree extends BasePedigree_1.default {
    initShape() {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.border;
        this.ctx.strokeStyle = "black";
        const size2 = this.size / 2;
        this.ctx.moveTo(this.x + Camera_1.default.OffsetX, this.y + size2 + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.x + size2 + Camera_1.default.OffsetX, this.y + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.x + this.size + Camera_1.default.OffsetX, this.y + size2 + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.x + size2 + Camera_1.default.OffsetX, this.y + this.size + Camera_1.default.OffsetY);
        this.ctx.lineTo(this.x + Camera_1.default.OffsetX, this.y + size2 + Camera_1.default.OffsetY);
        this.ctx.stroke();
        this.ctx.fillStyle = this.fillColor;
        this.ctx.fill();
        this.ctx.closePath();
    }
    addDiseaseShape(diseaseShape, color) {
        let shape = {
            diseaseShape: diseaseShape,
            diseaseColor: color,
            shapeInstance: new UnknownShapes_1.default(this.ctx, this)
        };
        this.shapes.push(shape);
        this.drawDiseaseShape();
    }
}
exports.default = UnknownPedigree;
