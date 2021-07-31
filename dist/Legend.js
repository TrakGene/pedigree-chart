"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Camera_1 = require("./Camera");
const EventBus_1 = require("./EventBus");
class LegendTable {
    constructor(ctx, x, y) {
        this.items = [];
        this.itemsPerRow = 3;
        this.longestStringLength = 0;
        this.pedOffsetX = 0;
        this.pedOffsetY = 0;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.pedOffsetX = x;
        this.pedOffsetY = y;
        EventBus_1.default.on("redraw", () => {
            this.drawLegendPedigrees();
            this.drawDiseaseLabels();
        });
    }
    calculatePedigreePoisiton(itemIndex) {
        const length = this.items.length;
        if (length === 0)
            return;
        if (itemIndex % this.itemsPerRow === 0) {
            this.pedOffsetX = this.x;
            this.pedOffsetY += 100;
        }
        else {
            this.pedOffsetX += 140 + this.longestStringLength;
        }
    }
    drawDiseaseLabels() {
        this.items.forEach((item) => {
            this.ctx.fillText(item.diseaseLabel, item.pedigree.x + 90 + Camera_1.default.OffsetX, item.pedigree.calculateMiddle().y + Camera_1.default.OffsetY);
        });
    }
    drawLegendPedigrees() {
        this.pedOffsetX = this.x;
        this.pedOffsetY = this.y;
        this.items.forEach((item, index) => {
            this.calculatePedigreePoisiton(index);
            item.pedigree.x = this.pedOffsetX;
            item.pedigree.y = this.pedOffsetY;
            item.pedigree.draw();
        });
    }
    setItemsPerRow(num) {
        this.itemsPerRow = num;
    }
    addItem(pedigree, disease) {
        const stringLen = this.ctx.measureText(disease).width;
        if (stringLen > this.longestStringLength) {
            this.longestStringLength = stringLen;
        }
        const legendPedigree = Object.assign(Object.create(Object.getPrototypeOf(pedigree)), pedigree);
        legendPedigree.x = this.pedOffsetX;
        legendPedigree.y = this.pedOffsetY;
        legendPedigree.isInLegend = true;
        legendPedigree.shapes.forEach((shape) => {
            legendPedigree.addDiseaseShape(shape.diseaseShape, shape.diseaseColor);
        });
        this.items.push({
            pedigree: legendPedigree,
            diseaseLabel: disease,
        });
        this.drawLegendPedigrees();
        this.drawDiseaseLabels();
    }
}
exports.default = LegendTable;
