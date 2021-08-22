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
        this.labelData = [];
    }
    longestString() {
        let maxWidth = 0;
        this.labelData.forEach((data) => {
            if (this.ctx.measureText(data.value).width > maxWidth) {
                maxWidth = this.ctx.measureText(data.value).width;
            }
        });
        return maxWidth;
    }
    longestStringCenter() {
        return this.longestString() / 2 - this.pedigree.size / 2;
    }
    calculateBackgroundHeight() {
        let height = 0;
        return height;
    }
    drawLabel() {
        this.ctx.beginPath();
        this.ctx.rect(this.pedigree.x + Camera_1.default.OffsetX - this.longestStringCenter(), this.pedigree.y + Camera_1.default.OffsetY + this.offsetFromPedigree, this.longestString(), this.calculateBackgroundHeight());
        this.ctx.fillStyle = "white";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.fillStyle = "black";
        this.labelData.forEach((data) => {
            const center = this.ctx.measureText(data.value).width / 2 - this.pedigree.size / 2;
            this.ctx.fillText(`${data.value}`, this.pedigree.x + Camera_1.default.OffsetX - center, this.pedigree.y +
                Camera_1.default.OffsetY +
                this.offsetFromPedigree +
                16 +
                this.lineHeight);
            this.lineHeight += 20;
        });
        this.lineHeight = 0;
    }
    setLabel(newData) {
        newData.sort((a, b) => (a.order > b.order));
        this.labelData = newData;
        EventBus_1.default.emit("redraw");
    }
}
exports.default = Label;
