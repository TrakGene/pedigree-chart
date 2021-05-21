interface IPedigreeBuilder {
    init(): void
    setType(type: string): void
    setSex(sex: string): void
}


class PedigreeBuilder implements IPedigreeBuilder {
    pedigree: HTMLElement

    init() {
        const pedigreeWrapper = document.createElement('div')
        const upperPart = document.createElement('div')
        const bottomPart = document.createElement('div')
        pedigreeWrapper.appendChild(upperPart)
        pedigreeWrapper.appendChild(bottomPart)
        this.pedigree = pedigreeWrapper
        //TODO Set width and height
    }
    setType(type: string) {
        switch (type) {
            case 'individual': this.individual()
            case 'affectedIndividual': this.affected()
            case 'multipleIndividual': this.multiple()
            case 'deceased': this.deceased() 
            case 'pregnacy': this.pregnacy() 
            case 'miscarriage': this.miscarriage() 
            case 'provider': this.provider() 
            default: this.individual()
        }
    }
    setSex(sex: string) {

    }
    individual() {
        return document.createElement('div')
    }
    
    affected() {
        return document.createElement('div')
    }
    
    multiple() {
        return document.createElement('div')
    }
    
    deceased() {
        return document.createElement('div')
    }
    
    pregnacy() {
        return document.createElement('div')
    }
    
    miscarriage() {
        return document.createElement('div')
    }
    
    provider() {
        return document.createElement('div')
    }
}

