"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FemalePedigree = exports.MalePedigree = exports.UnknownPedigree = exports.BasePedigree = void 0;
const EventBus_1 = require("./EventBus");
const IdGenerator_1 = require("./IdGenerator");
class BasePedigree {
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
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this.id));
    }
}
exports.BasePedigree = BasePedigree;
class UnknownPedigree extends BasePedigree {
    initShape() {
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
}
exports.UnknownPedigree = UnknownPedigree;
class MalePedigree extends BasePedigree {
    initShape() {
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
}
exports.MalePedigree = MalePedigree;
class FemalePedigree extends BasePedigree {
    initShape() {
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
}
exports.FemalePedigree = FemalePedigree;
