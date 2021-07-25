"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = require("../Camera");
const EventBus_1 = require("../EventBus");
class Label {
    constructor(ctx, pedigree) {
        this.lineHeight = 0;
        this.offsetFromPedigree = 75;
        this.ctx = ctx;
        this.pedigree = pedigree;
        this.labelData = {
            id: "",
            name: "",
            age: "",
        };
    }
    longestString() {
        let maxWidth = 0;
        Object.keys(this.labelData).forEach((key) => {
            if (this.ctx.measureText(this.labelData[key]).width > maxWidth) {
                maxWidth = this.ctx.measureText(this.labelData[key]).width;
            }
        });
        return maxWidth;
    }
    longestStringCenter() {
        return this.longestString() / 2 - this.pedigree.size / 2;
    }
    calculateBackgroundHeight() {
        let height = 0;
        Object.keys(this.labelData).forEach((key) => {
            if (this.labelData[key] !== "") {
                height += 20;
            }
        });
        return height;
    }
    drawLabel() {
        this.ctx.beginPath();
        this.ctx.rect(this.pedigree.x + Camera_1.default.OffsetX - this.longestStringCenter(), this.pedigree.y + Camera_1.default.OffsetY + this.offsetFromPedigree, this.longestString(), this.calculateBackgroundHeight());
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillStyle = "black";
        Object.keys(this.labelData).forEach((key) => {
            if (this.labelData[key] !== "") {
                const center = this.ctx.measureText(this.labelData[key]).width / 2 -
                    this.pedigree.size / 2;
                this.ctx.fillText(`${this.labelData[key]}`, this.pedigree.x + Camera_1.default.OffsetX - center, this.pedigree.y + Camera_1.default.OffsetY + this.offsetFromPedigree + 16 + this.lineHeight);
                this.lineHeight += 20;
            }
        });
        this.lineHeight = 0;
    }
    setLabel(newState) {
        Object.keys(newState).forEach((prop) => {
            this.labelData[prop] = newState[prop];
        });
        EventBus_1.default.emit("redraw");
    }
}
exports.default = Label;
