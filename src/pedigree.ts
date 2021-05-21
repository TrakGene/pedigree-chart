class PedigreeBuilder {
    protected pedigree: HTMLElement

    protected init() {
        const pedigreeWrapper = document.createElement('div')
        const upperPart = document.createElement('div')
        const bottomPart = document.createElement('div')
        pedigreeWrapper.style.width = "100px"
        pedigreeWrapper.style.height = "100px"
        pedigreeWrapper.style.border = "3px solid black"
        pedigreeWrapper.appendChild(upperPart)
        pedigreeWrapper.appendChild(bottomPart)
        this.pedigree = pedigreeWrapper
        //TODO Set width and height
    }
    protected setTypeStyle(type: string) {
        switch (type) {
            case 'individual': this.setIndividualType(); break;
            case 'affectedIndividual': this.setAffectedType(); break;
            case 'multipleIndividual': this.setMultipleType(); break;
            case 'deceased': this.setDeceasedType(); break;
            case 'pregnacy': this.setPregnacyType(); break;
            case 'miscarriage': this.setMiscarriageType(); break;
            case 'provider': this.setProviderType(); break;
        }
    }
    protected setSexStyle(sex: string) {
        switch (sex) {
            case 'male': this.setMaleSex();
            case 'female': this.setFemaleSex();
            case 'unknown': this.setUnknownSex();
        }
    }
    private setIndividualType() {
        console.log("Individual")
    }

    private setAffectedType() {
        console.log("Affected")
    }

    private setMultipleType() {
        console.log("MultipleType")
    }

    private setDeceasedType() {
        console.log("Deceased")
    }

    private setPregnacyType() {
        console.log("Pregnacy")
    }

    private setMiscarriageType() {
        console.log("Miscarriage")
    }

    private setProviderType() {
        console.log("Provider")
    }

    private setMaleSex() {
        console.log("male")
    }
    private setFemaleSex() {
        console.log("female")
    }
    private setUnknownSex() {
        console.log("unknow")
    }
}

export class Pedigree extends PedigreeBuilder {
    create(type: string, sex: string) {
        this.init()
        this.setTypeStyle(type)
        this.setSexStyle(sex)
    }
    setType(type: string) {
        this.init()
        this.setTypeStyle(type)
    }
    setSex(sex: string) {
        this.init()
        this.setSexStyle(sex)
    }
}