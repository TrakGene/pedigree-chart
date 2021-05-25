"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedigreeIcon = void 0;
const idGenerator_1 = require("./idGenerator");
const pedigreeBuilders_1 = require("./builders/pedigreeBuilders");
const pedigreeIconBuilder = new pedigreeBuilders_1.PedigreeIconBuilder();
// const pedigreeNodeBuilder = new PedigreeIconBuilder()
class PedigreeIcon {
    constructor(config) {
        this.id = idGenerator_1.default.randomId();
        this.pedigreeStyleConfig = {
            type: "individual",
            sex: "unknow",
            size: 100,
            border: 5,
            topColor: "white",
            bottomColor: "white"
        };
        this.handler = {
            get: function (target) {
                return target;
            },
            set: (obj) => {
                this.pedigree = pedigreeIconBuilder.init(obj);
                this.pedigree.id = this.id;
                let oldPedigree = document.querySelector(`#${this.id}`);
                oldPedigree.replaceWith(this.pedigree);
                return true;
            }
        };
        this.styleProxy = new Proxy(this.pedigreeStyleConfig, this.handler);
        this.pedigreeStyleConfig = config;
        this.pedigree = pedigreeIconBuilder.init(this.styleProxy.target);
        this.pedigree.id = this.id;
        this.pedigree.style.position = "absolute";
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
exports.PedigreeIcon = PedigreeIcon;
