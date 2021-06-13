"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FemalePedigree = exports.MalePedigree = exports.UnknownPedigree = void 0;
const EventBus_1 = require("./EventBus");
const IdGenerator_1 = require("./IdGenerator");
class UnknownPedigree {
    constructor(canvasDiagram) {
        this.isMarried = false;
        this.marriagePartner = null;
        this.id = IdGenerator_1.default.randomId();
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
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
        ctx.lineWidth = this.border;
        ctx.strokeStyle = "black";
        const size2 = this.size / 2;
        ctx.moveTo(this.x, this.y + size2);
        ctx.lineTo(this.x + size2, this.y);
        ctx.lineTo(this.x + this.size, this.y + size2);
        ctx.lineTo(this.x + size2, this.y + this.size);
        ctx.lineTo(this.x, this.y + size2);
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this.id));
    }
}
exports.UnknownPedigree = UnknownPedigree;
class MalePedigree {
    constructor(canvasDiagram) {
        this.isMarried = false;
        this.marriagePartner = null;
        this.id = IdGenerator_1.default.randomId();
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
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
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this.id));
    }
}
exports.MalePedigree = MalePedigree;
class FemalePedigree {
    constructor(canvasDiagram) {
        this.isMarried = false;
        this.marriagePartner = null;
        this.id = IdGenerator_1.default.randomId();
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
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
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = this.border - 1;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.closePath();
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this.id));
    }
}
exports.FemalePedigree = FemalePedigree;
