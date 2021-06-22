"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FemalePedigree = exports.MalePedigree = exports.UnknownPedigree = exports.BasePedigree = void 0;
const EventBus_1 = require("./EventBus");
const IdGenerator_1 = require("./IdGenerator");
const Camera_1 = require("./Camera");
class BasePedigree {
    constructor(canvasDiagram, x, y) {
        this.isMarried = false;
        this.marriagePartner = null;
        this.id = IdGenerator_1.default.randomId();
        this.size = 60;
        this.border = 3;
        this.x = 0;
        this.y = 0;
        this.scalingFactor = 1;
        this.dragEnabled = false;
        this.canvasDiagram = canvasDiagram;
        this.x = x;
        this.y = y;
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
        ctx.save();
        ctx.rect(this.x + Camera_1.default.OffsetX, this.y + Camera_1.default.OffsetY, this.size, this.size);
        ctx.lineWidth = this.border;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }
}
exports.MalePedigree = MalePedigree;
class FemalePedigree extends BasePedigree {
    initShape() {
        const ctx = this.canvasDiagram.getContext('2d');
        ctx.beginPath();
        ctx.save();
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, 2 * Math.PI);
        ctx.scale(this.scalingFactor, this.scalingFactor);
        ctx.lineWidth = this.border;
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }
}
exports.FemalePedigree = FemalePedigree;
