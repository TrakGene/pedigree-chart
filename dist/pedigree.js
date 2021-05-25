"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const idGenerator_1 = require("./idGenerator");
const pedigreeBuilder_1 = require("./builders/pedigreeBuilder");
class Pedigree {
    constructor(userConfig) {
        this.id = idGenerator_1.default.randomId();
        this.builder = new pedigreeBuilder_1.PedigreeCreator();
        // dragHandler: ClassDeclaration = null
        this.config = {
            type: "individual",
            sex: "unknow",
            size: 100,
            border: 5,
            mode: "node",
            x: 0,
            y: 0,
            topColor: "white",
            bottomColor: "white"
        };
        this.handler = {
            get: function (target) {
                return target;
            },
            set: (obj) => {
                this.pedigree = this.builder.init(obj);
                this.pedigree.id = this.id;
                let oldPedigree = document.querySelector(`#${this.id}`);
                oldPedigree.replaceWith(this.pedigree);
                return true;
            }
        };
        this.styleProxy = new Proxy(this.config, this.handler);
        this.config = userConfig;
        this.pedigree = this.builder.init(this.styleProxy.target);
        this.pedigree.id = this.id;
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
