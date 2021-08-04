"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = require("../EventBus");
const Label_1 = require("./Label");
const Camera_1 = require("../Camera");
const IdGenerator_1 = require("../IdGenerator");
class BasePedigree {
    constructor(ctx, x, y) {
        this.shapes = [];
        this.isMarried = false;
        this.id = null;
        this.fillColor = "white";
        this.dragEnabled = false;
        this.isInLegend = false;
        this.twin = null;
        this.isPregnant = false;
        this.marriagePartner = null;
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
        this.id = IdGenerator_1.default.getId();
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.label = new Label_1.default(ctx, this);
        EventBus_1.default.on('redraw', () => {
            if (this.isPregnant)
                this.drawPregnant();
        });
        setTimeout(() => EventBus_1.default.emit('redraw'), 1);
    }
    drawPregnant() {
        this.ctx.fillText(`P`, this.getMidX() - this.ctx.measureText('P').width / 2, this.getMidY() + this.ctx.measureText('P').width / 2);
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
    setStorage(obj) {
        this.storage = obj;
    }
    getStorage() {
        return this.storage;
    }
    draw() {
        this.initShape();
        this.drawDiseaseShape();
        this.label.drawLabel();
    }
    getMidX() {
        return this.calculateMiddle().x + Camera_1.default.OffsetX;
    }
    getMidY() {
        return this.calculateMiddle().y + Camera_1.default.OffsetY;
    }
    getX() {
        return this.x + Camera_1.default.OffsetX;
    }
    getY() {
        return this.y + Camera_1.default.OffsetY;
    }
    calculateMiddle() {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2,
        };
    }
    clearShapes() {
        this.shapes = [];
        EventBus_1.default.emit("redraw");
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this}`, () => eventHandler(this));
    }
    setPregnacy(value) {
        this.isPregnant = true;
    }
}
exports.default = BasePedigree;
