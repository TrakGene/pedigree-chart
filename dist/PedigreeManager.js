"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MalePedigree_1 = require("./pedigrees/MalePedigree");
const FemalePedigree_1 = require("./pedigrees/FemalePedigree");
const UnknownPedigree_1 = require("./pedigrees/UnknownPedigree");
const FemaleMisCarriage_1 = require("./pedigrees/FemaleMisCarriage");
const MaleMiscarriage_1 = require("./pedigrees/MaleMiscarriage");
const UnknownMiscarriage_1 = require("./pedigrees/UnknownMiscarriage");
class PedigreeManager {
    constructor(diagram, renderEngine) {
        this.renderEngine = renderEngine;
        this.ctx = diagram.getContext("2d");
    }
    createPedigree(sex, x, y) {
        let pedigree;
        switch (sex) {
            case "male":
                pedigree = new MalePedigree_1.default(this.ctx, x, y);
                break;
            case "female":
                pedigree = new FemalePedigree_1.default(this.ctx, x, y);
                break;
            case "unknown":
                pedigree = new UnknownPedigree_1.default(this.ctx, x, y);
                break;
            case "male-miscarriage":
                pedigree = new MaleMiscarriage_1.default(this.ctx, x, y);
                break;
            case "female-miscarriage":
                pedigree = new FemaleMisCarriage_1.default(this.ctx, x, y);
                break;
            case "unknown-miscarriage":
                pedigree = new UnknownMiscarriage_1.default(this.ctx, x, y);
                break;
        }
        this.renderEngine.pedigrees.push(pedigree);
        return pedigree;
    }
    deletePedigree(id) {
        const len = this.renderEngine.pedigrees.length;
        for (let i = 0; i < len; i++) {
            const element = this.renderEngine.pedigrees[i];
            if (id === element.id) {
                this.renderEngine.pedigrees.splice(i, 1);
            }
        }
    }
    drawPedigrees() {
        this.renderEngine.pedigrees.forEach((pedigree) => {
            pedigree.draw();
        });
    }
}
exports.default = PedigreeManager;
