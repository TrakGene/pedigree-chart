"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pedigree = void 0;
class PedigreeBuilder {
    init() {
        const pedigreeWrapper = document.createElement('div');
        const upperPart = document.createElement('div');
        const bottomPart = document.createElement('div');
        pedigreeWrapper.style.width = "100px";
        pedigreeWrapper.style.height = "100px";
        pedigreeWrapper.style.border = "3px solid black";
        pedigreeWrapper.appendChild(upperPart);
        pedigreeWrapper.appendChild(bottomPart);
        this.pedigree = pedigreeWrapper;
        //TODO Set width and height
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
            case 'male': this.setMaleSex();
            case 'female': this.setFemaleSex();
            case 'unknown': this.setUnknownSex();
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
        console.log("male");
    }
    setFemaleSex() {
        console.log("female");
    }
    setUnknownSex() {
        console.log("unknow");
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
}
exports.Pedigree = Pedigree;
