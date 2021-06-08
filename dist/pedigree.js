"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MalePedigree = void 0;
const EventBus_1 = require("./EventBus");
const IdGenerator_1 = require("./IdGenerator");
class MalePedigree {
    constructor(canvasDiagram) {
        this.isMarried = false;
        this.marriagePartner = null;
        this.id = IdGenerator_1.default.randomId();
        this.size = 80;
        this.x = 0;
        this.y = 0;
        this.border = 4;
        this.canvasDiagram = canvasDiagram;
    }
    calculateMiddle() {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2
        };
    }
    draw() {
        const ctx = this.canvasDiagram.getContext('2d');
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.lineWidth = this.border;
        ctx.stroke();
        ctx.fillText(this.id, this.x, this.y);
        ctx.closePath();
    }
    initShape() {
        const ctx = this.canvasDiagram.getContext('2d');
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.lineWidth = this.border;
        ctx.stroke();
        ctx.fillText(this.id, this.x, this.y);
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this.id));
    }
}
exports.MalePedigree = MalePedigree;
