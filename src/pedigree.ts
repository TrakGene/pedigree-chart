class PedigreeBuilder {
    protected pedigree: HTMLElement;
    protected size = 80;

    protected init() {
        const pedigreeWrapper = document.createElement('div')
        const upperPart = document.createElement('div')
        const bottomPart = document.createElement('div')
        const pedigreeContainer = document.createElement('div')
        pedigreeWrapper.style.width = `${this.size}px`
        pedigreeWrapper.style.height = `${this.size}px`
        pedigreeWrapper.style.border = "4px solid black"
        pedigreeWrapper.style.boxSizing = "border-box"
        pedigreeWrapper.style.cursor = "pointer"
        pedigreeWrapper.style.transformOrigin = "center"
        pedigreeWrapper.appendChild(upperPart)
        pedigreeWrapper.appendChild(bottomPart)
        pedigreeContainer.appendChild(pedigreeWrapper)
        this.pedigree = pedigreeContainer
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
            case 'male': this.setMaleSex(); break;
            case 'female': this.setFemaleSex(); break;
            case 'unknown': this.setUnknownSex(); break;
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
        this.pedigree.style.borderRadius = "0"
    }
    private setFemaleSex() {
        this.pedigree.style.borderRadius = "50%"
    }
    private setUnknownSex() {
        this.pedigree.style.borderRadius = "0"
        this.size = this.size/(Math.sqrt(2))
        this.pedigree.style.width = `${this.size}px`
        this.pedigree.style.height = `${this.size}px`
        this.pedigree.style.transform = "rotate(45deg)"
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
    insert(id) {
        const w = document.querySelector(id)
        w.appendChild(this.pedigree)
    }
    setSize(size: number) {
        this.size = size
        this.pedigree.style.width = `${size}`
        this.pedigree.style.height = `${size}`
    }
    style(style: Object) {
        Object.keys(style).forEach((styleParam)=>{
            this.pedigree[styleParam] = style[styleParam]
        })
    }
}