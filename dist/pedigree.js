"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedigree = void 0;
const idGenerator_1 = require("./idGenerator");
class PedigreeBuilder {
    constructor() {
        this.size = 80;
        this.border = 5;
    }
    init(type, sex) {
        const pedigreeContainer = document.createElement('div');
        pedigreeContainer.style.width = `${this.size}px`;
        pedigreeContainer.style.height = `${this.size}px`;
        const pedigree = document.createElement('div');
        pedigree.classList.add('pedigree');
        pedigree.style.width = "100%";
        pedigree.style.height = "100%";
        pedigree.style.boxSizing = "border-box";
        const upperPart = document.createElement('div');
        upperPart.style.height = `calc(50% - ${this.border}px)`;
        upperPart.style.backgroundColor = "red";
        upperPart.style.borderTop = `${this.border}px solid black`;
        upperPart.style.borderLeft = `${this.border}px solid black`;
        upperPart.style.borderRight = `${this.border}px solid black`;
        const bottomPart = document.createElement('div');
        bottomPart.style.height = `calc(50% - ${this.border}px)`;
        bottomPart.style.backgroundColor = "blue";
        bottomPart.style.borderBottom = `${this.border}px solid black`;
        bottomPart.style.borderLeft = `${this.border}px solid black`;
        bottomPart.style.borderRight = `${this.border}px solid black`;
        pedigree.appendChild(upperPart);
        pedigree.appendChild(bottomPart);
        pedigreeContainer.appendChild(pedigree);
        this.pedigree = pedigreeContainer;
        this.setTypeStyle(type);
        this.setSexStyle(sex);
        return this.pedigree;
    }
    setTypeStyle(type) {
        switch (type) {
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
    }
    setSexStyle(sex) {
        switch (sex) {
            case 'male':
                this.setMaleSex();
                break;
            case 'female':
                this.setFemaleSex();
                break;
            case 'unknown':
                this.setUnknownSex();
                break;
        }
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
    setMaleSex() {
        this.pedigree.style.borderRadius = "0";
    }
    setFemaleSex() {
        this.pedigree.childNodes.forEach((node) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "100px 100px 0% 0%";
                node.childNodes[1].style.borderRadius = "0% 0% 100px 100px";
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
    constructor(type, sex) {
        this.id = idGenerator_1.default.randomId();
        this.pedigree = builder.init(type, sex);
        this.pedigree.id = this.id;
    }
    insert(id) {
        const w = document.querySelector(id);
        w.appendChild(this.pedigree);
    }
    style(style) {
        Object.keys(style).forEach((styleParam) => {
            this.pedigree[styleParam] = style[styleParam];
        });
    }
}
exports.Pedigree = Pedigree;
