"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("./builders/builder");
class Pedigree {
    constructor(userConfig) {
        this.config = {
            type: "individual",
            sex: "male",
            size: 100,
            border: 5,
            mode: "icon",
            x: 0,
            y: 0,
            topColor: "white",
            bottomColor: "white"
        };
        this.changesDetector = {
            get: function (target) {
                return target;
            },
            set: (obj) => {
                const recreatedPedigree = this.builder.recreatePedigree(obj);
                this.pedigree = recreatedPedigree.pedigree;
                const id = recreatedPedigree.id;
                let oldPedigree = document.querySelector(`#${id}`);
                oldPedigree.replaceWith(this.pedigree);
                return true;
            }
        };
        this.styleProxy = new Proxy(this.config, this.changesDetector);
        this.config = userConfig;
        this.builder = new builder_1.PedigreeBuilderDirector(userConfig);
        this.pedigree = this.builder.createPedigree();
    }
    insert(id) {
        this.container = id;
        const w = document.querySelector(id);
        w.appendChild(this.pedigree);
    }
    setAttribiute(prop, value) {
        let obj = this.styleProxy.target;
        obj[prop] = value;
        this.styleProxy.target = obj;
    }
}
exports.default = Pedigree;
