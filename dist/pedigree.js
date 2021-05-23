"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedigree = void 0;
const idGenerator_1 = require("./idGenerator");
class PedigreeBuilder {
    constructor() {
        this.size = 80;
        this.border = 5;
    }
    init(config) {
        let size = config.size ? config.size : this.size;
        let border = config.border ? config.border : this.border;
        const pedigreeContainer = document.createElement('div');
        pedigreeContainer.style.width = `${size}px`;
        pedigreeContainer.style.height = `${size}px`;
        const pedigree = document.createElement('div');
        pedigree.classList.add('pedigree');
        pedigree.style.width = "100%";
        pedigree.style.height = "100%";
        pedigree.style.boxSizing = "border-box";
        const upperPart = document.createElement('div');
        upperPart.style.height = `calc(50% - ${border}px)`;
        upperPart.style.backgroundColor = "red";
        upperPart.style.borderTop = `${border}px solid black`;
        upperPart.style.borderLeft = `${border}px solid black`;
        upperPart.style.borderRight = `${border}px solid black`;
        const bottomPart = document.createElement('div');
        bottomPart.style.height = `calc(50% - ${border}px)`;
        bottomPart.style.backgroundColor = "blue";
        bottomPart.style.borderBottom = `${border}px solid black`;
        bottomPart.style.borderLeft = `${border}px solid black`;
        bottomPart.style.borderRight = `${border}px solid black`;
        pedigree.appendChild(upperPart);
        pedigree.appendChild(bottomPart);
        pedigreeContainer.appendChild(pedigree);
        this.pedigree = pedigreeContainer;
        this.setTypeStyle(config);
        this.setSexStyle(config, config.sex);
        return this.pedigree;
    }
    setTypeStyle(config, pedigree) {
        if (pedigree) {
            this.pedigree = pedigree;
        }
        switch (config.type) {
            case 'individual':
                this.setIndividualType();
                break;
            case 'affectedIndividual':
                this.setAffectedType();
                break;
            case 'multipleIndividual':
                this.setMultipleType();
                break;
            case 'deceased':
                this.setDeceasedType();
                break;
            case 'pregnacy':
                this.setPregnacyType();
                break;
            case 'miscarriage':
                this.setMiscarriageType();
                break;
            case 'provider':
                this.setProviderType();
                break;
        }
        return this.pedigree;
    }
    setSexStyle(config, sex, pedigree) {
        if (pedigree) {
            this.pedigree = pedigree;
        }
        switch (sex) {
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
    setIndividualType() {
        console.log("Individual");
    }
    setAffectedType() {
        console.log("Affected");
    }
    setMultipleType() {
        console.log("MultipleType");
    }
    setDeceasedType() {
        console.log("Deceased");
    }
    setPregnacyType() {
        console.log("Pregnacy");
    }
    setMiscarriageType() {
        console.log("Miscarriage");
    }
    setProviderType() {
        console.log("Provider");
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
    setUnknownSex() {
        this.pedigree.childNodes.forEach((node) => {
            if (node.className = "pedigree") {
                let x = this.size;
                x = x / (Math.sqrt(2));
                node.style.width = `${x}px`;
                node.style.height = `${x}px`;
                node.style.transform = "rotate(45deg)";
                this.pedigree.style.display = "flex";
                this.pedigree.style.justifyContent = "center";
                this.pedigree.style.alignItems = "center";
            }
        });
    }
}
const builder = new PedigreeBuilder();
class Pedigree {
    constructor(config) {
        this.id = idGenerator_1.default.randomId();
        this.pedigreeStyleConfig = config;
        this.pedigree = builder.init(config);
        this.pedigree.id = this.id;
    }
    insert(id) {
        this.container = id;
        const w = document.querySelector(id);
        w.appendChild(this.pedigree);
    }
    changeSex(sex) {
        this.pedigree = builder.setSexStyle(this.pedigreeStyleConfig, sex, this.pedigree);
        let w = document.querySelector(`#${this.id}`);
        w.replaceWith(this.pedigree);
    }
    style(style) {
        Object.keys(style).forEach((styleParam) => {
            this.pedigree[styleParam] = style[styleParam];
        });
    }
}
exports.Pedigree = Pedigree;
