"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedigree = void 0;
const idGenerator_1 = require("./idGenerator");
class PedigreeBuilder {
    init(config) {
        this.pedigree = this.createPedigree(config);
        this.setSexStyle(config);
        return this.pedigree;
    }
    createPedigree(config) {
        const pedigreeContainer = document.createElement('div');
        pedigreeContainer.style.width = `${config.size}px`;
        pedigreeContainer.style.height = `${config.size}px`;
        const pedigree = document.createElement('div');
        pedigree.classList.add('pedigree');
        pedigree.style.width = "100%";
        pedigree.style.height = "100%";
        pedigree.style.boxSizing = "border-box";
        const topPart = document.createElement('div');
        topPart.style.height = `calc(50% - ${config.border}px)`;
        topPart.style.backgroundColor = config.topColor;
        topPart.style.borderTop = `${config.border}px solid black`;
        topPart.style.borderLeft = `${config.border}px solid black`;
        topPart.style.borderRight = `${config.border}px solid black`;
        const bottomPart = document.createElement('div');
        bottomPart.style.height = `calc(50% - ${config.border}px)`;
        bottomPart.style.backgroundColor = config.bottomColor;
        bottomPart.style.borderBottom = `${config.border}px solid black`;
        bottomPart.style.borderLeft = `${config.border}px solid black`;
        bottomPart.style.borderRight = `${config.border}px solid black`;
        pedigree.appendChild(topPart);
        pedigree.appendChild(bottomPart);
        pedigreeContainer.appendChild(pedigree);
        return pedigreeContainer;
    }
    setSexStyle(config) {
        switch (config.sex) {
            case 'male':
                this.setMaleSex(config);
                break;
            case 'female':
                this.setFemaleSex(config);
                break;
            case 'unknown':
                this.setUnknownSex(config);
                break;
        }
        return this.pedigree;
    }
    setMaleSex(config) {
        this.pedigree.style.width = `${config.size}px`;
        this.pedigree.style.height = `${config.size}px`;
        this.pedigree.childNodes.forEach((node) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "0";
                node.childNodes[1].style.borderRadius = "0";
            }
        });
    }
    setFemaleSex(config) {
        this.pedigree.style.width = `${config.size}px`;
        this.pedigree.style.height = `${config.size}px`;
        this.pedigree.childNodes.forEach((node) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "100px 100px 0% 0%";
                node.childNodes[1].style.borderRadius = "0% 0% 100px 100px";
                node.style.transform = "rotate(0deg)";
            }
        });
    }
    setUnknownSex(config) {
        this.pedigree.childNodes.forEach((node) => {
            if (node.className = "pedigree") {
                node.style.width = `${config.size / Math.sqrt(2)}px`;
                node.style.height = `${config.size / Math.sqrt(2)}px`;
                node.style.transform = "rotate(45deg)";
                this.pedigree.style.display = "flex";
                this.pedigree.style.justifyContent = "center";
                this.pedigree.style.alignItems = "center";
            }
        });
    }
}
const pedigreeBuilder = new PedigreeBuilder();
class Pedigree {
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
                this.pedigree = pedigreeBuilder.init(obj);
                this.pedigree.id = this.id;
                let oldPedigree = document.querySelector(`#${this.id}`);
                oldPedigree.replaceWith(this.pedigree);
                return true;
            }
        };
        this.styleProxy = new Proxy(this.pedigreeStyleConfig, this.handler);
        this.pedigreeStyleConfig = config;
        this.pedigree = pedigreeBuilder.init(this.styleProxy.target);
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
exports.Pedigree = Pedigree;
