"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedigree = void 0;
class PedigreeBuilder {
    constructor() {
        this.size = 80;
    }
    init() {
        const pedigreeWrapper = document.createElement('div');
        const upperPart = document.createElement('div');
        const bottomPart = document.createElement('div');
        const pedigreeContainer = document.createElement('div');
        pedigreeWrapper.style.width = `${this.size}px`;
        pedigreeWrapper.style.height = `${this.size}px`;
        pedigreeWrapper.style.border = "4px solid black";
        pedigreeWrapper.style.boxSizing = "border-box";
        pedigreeWrapper.style.cursor = "pointer";
        pedigreeWrapper.style.transformOrigin = "center";
        pedigreeWrapper.appendChild(upperPart);
        pedigreeWrapper.appendChild(bottomPart);
        pedigreeContainer.appendChild(pedigreeWrapper);
        this.pedigree = pedigreeContainer;
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
        this.pedigree.style.borderRadius = "50%";
    }
    setUnknownSex() {
        this.pedigree.style.borderRadius = "0";
        this.size = this.size / (Math.sqrt(2));
        this.pedigree.style.width = `${this.size}px`;
        this.pedigree.style.height = `${this.size}px`;
        this.pedigree.style.transform = "rotate(45deg)";
    }
}
class Pedigree extends PedigreeBuilder {
    create(type, sex) {
        this.init();
        this.setTypeStyle(type);
        this.setSexStyle(sex);
    }
    setType(type) {
        this.init();
        this.setTypeStyle(type);
    }
    setSex(sex) {
        this.init();
        this.setSexStyle(sex);
    }
    insert(id) {
        const w = document.querySelector(id);
        w.appendChild(this.pedigree);
    }
    setSize(size) {
        this.size = size;
        this.pedigree.style.width = `${size}`;
        this.pedigree.style.height = `${size}`;
    }
    style(style) {
        Object.keys(style).forEach((styleParam) => {
            this.pedigree[styleParam] = style[styleParam];
        });
    }
}
exports.Pedigree = Pedigree;
