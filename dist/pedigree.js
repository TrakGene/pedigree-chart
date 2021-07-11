"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FemalePedigree = exports.MalePedigree = exports.UnknownPedigree = exports.BasePedigree = void 0;
const EventBus_1 = require("./EventBus");
const IdGenerator_1 = require("./IdGenerator");
const Camera_1 = require("./Camera");
const Label_1 = require("./Label");
const Shapes_1 = require("./Shapes");
class BasePedigree {
    constructor(ctx, x, y) {
        this.id = IdGenerator_1.default.randomId();
        this.isMarried = false;
        this.diseaseShape = "";
        this.diseaseColor = "";
        this.dragEnabled = false;
        this.twin = null;
        this.marriagePartner = null;
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.label = new Label_1.Label(ctx, this);
    }
    calculateMiddle() {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2,
        };
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this));
    }
}
exports.BasePedigree = BasePedigree;
class UnknownPedigree extends BasePedigree {
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
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawPedigree() {
        this.initShape();
        this.label.drawLabel();
        this.drawDiseaseShape();
    }
    setDiseaseShape(shape, color) {
        this.diseaseShape = shape;
        this.diseaseColor = color;
        this.shape = new Shapes_1.UnknownShape(this.ctx, this);
        this.drawDiseaseShape();
    }
    drawDiseaseShape() {
        if (this.shape) {
            switch (this.diseaseShape) {
                case "dot":
                    this.shape.drawDot(this.diseaseColor);
            }
        }
    }
    updateConfig() { }
    setLabel(obj) {
        this.label.setLabel(obj);
    }
}
exports.UnknownPedigree = UnknownPedigree;
class MalePedigree extends BasePedigree {
    initShape() {
        this.ctx.beginPath();
        this.ctx.rect(this.x + Camera_1.default.OffsetX, this.y + Camera_1.default.OffsetY, this.size, this.size);
        this.ctx.lineWidth = this.border;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawPedigree() {
        this.initShape();
        this.drawDiseaseShape();
        this.label.drawLabel();
    }
    setDiseaseShape(shape, color) {
        this.diseaseShape = shape;
        this.diseaseColor = color;
        this.shape = new Shapes_1.MaleShape(this.ctx, this);
        this.drawDiseaseShape();
    }
    drawDiseaseShape() {
        if (this.shape) {
            switch (this.diseaseShape) {
                case "dot":
                    this.shape.drawDot(this.diseaseColor);
            }
        }
    }
    updateConfig() { }
    setLabel(obj) {
        this.label.setLabel(obj);
    }
}
exports.MalePedigree = MalePedigree;
class FemalePedigree extends BasePedigree {
    initShape() {
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.size / 2 + Camera_1.default.OffsetX, this.y + this.size / 2 + Camera_1.default.OffsetY, this.size / 2, 0, 2 * Math.PI);
        this.ctx.lineWidth = this.border;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
    drawPedigree() {
        this.initShape();
        this.drawDiseaseShape();
        this.label.drawLabel();
    }
    setDiseaseShape(shape, color) {
        this.diseaseShape = shape;
        this.diseaseColor = color;
        this.shape = new Shapes_1.FemaleShape(this.ctx, this);
        this.drawDiseaseShape();
    }
    drawDiseaseShape() {
        if (this.shape) {
            switch (this.diseaseShape) {
                case "dot":
                    this.shape.drawDot(this.diseaseColor);
            }
        }
    }
    updateConfig() { }
    setLabel(obj) {
        this.label.setLabel(obj);
    }
}
exports.FemalePedigree = FemalePedigree;
