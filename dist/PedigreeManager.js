"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MalePedigree_1 = require("./pedigrees/MalePedigree");
const FemalePedigree_1 = require("./pedigrees/FemalePedigree");
const UnknownPedigree_1 = require("./pedigrees/UnknownPedigree");
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
