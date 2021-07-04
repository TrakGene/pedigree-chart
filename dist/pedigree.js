"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FemalePedigree = exports.MalePedigree = exports.UnknownPedigree = exports.BasePedigree = void 0;
const EventBus_1 = require("./EventBus");
const IdGenerator_1 = require("./IdGenerator");
const Camera_1 = require("./Camera");
class BasePedigree {
    constructor(canvasDiagram, ctx, x, y) {
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
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }
    calculateMiddle() {
        return {
            x: this.x + this.size / 2,
            y: this.y + this.size / 2,
        };
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(`${eventName}${this.id}`, () => eventHandler(this.id));
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
}
exports.MalePedigree = MalePedigree;
class FemalePedigree extends BasePedigree {
    initShape() {
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.size / 2 + Camera_1.default.OffsetX, this.y + this.size / 2 + Camera_1.default.OffsetY, this.size / 2, 0, 2 * Math.PI);
        this.ctx.scale(this.scalingFactor, this.scalingFactor);
        this.ctx.lineWidth = this.border;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
}
exports.FemalePedigree = FemalePedigree;
