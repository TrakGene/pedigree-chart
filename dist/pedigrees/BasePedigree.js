"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = require("../EventBus");
const Label_1 = require("./Label");
class BasePedigree {
    constructor(ctx, x, y) {
        this.shapes = [];
        this.isMarried = false;
        this.fillColor = "white";
        this.dragEnabled = false;
        this.isInLegend = false;
        this.twin = null;
        this.marriagePartner = null;
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.label = new Label_1.default(ctx, this);
    }
    calculateMiddle() {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2,
        };
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this}`, () => eventHandler(this));
    }
    drawDiseaseShape() {
        if (this.shapes.length > 0) {
            this.shapes.forEach((shape) => {
                switch (shape.diseaseShape) {
                    case "dot":
                        shape.shapeInstance.drawDot(shape.diseaseColor);
                        break;
                    case "fill":
                        shape.shapeInstance.fillColor(shape.diseaseColor);
                        break;
                    case "q1":
                        shape.shapeInstance.fillFirstQuarterColor(shape.diseaseColor);
                        break;
                    case "q2":
                        shape.shapeInstance.fillSecondQuarterColor(shape.diseaseColor);
                        break;
                    case "q3":
                        shape.shapeInstance.fillThirdQuarterColor(shape.diseaseColor);
                        break;
                    case "q4":
                        shape.shapeInstance.fillFourthQuarterColor(shape.diseaseColor);
                        break;
                }
            });
        }
    }
    setLabel(obj) {
        this.label.setLabel(obj);
    }
    drawPedigree() {
        this.initShape();
        this.drawDiseaseShape();
        this.label.drawLabel();
    }
}
exports.default = BasePedigree;
