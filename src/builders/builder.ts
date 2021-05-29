import { StyleConfig } from "../interfaces"
import { PedigreeUtils } from "./pedigreeBuilder"
import generator from "../idGenerator"

abstract class Builder {
    utils = new PedigreeUtils()
    abstract createPedigree()
    abstract setAffected()
    abstract setPregnacy()
}

export class PedigreeBuilderDirector {
    builder: Builder
    config: StyleConfig
    pedigreeId = generator.randomId()

    constructor(config: StyleConfig) {
        this.config = config
        this.setBuilder()
    }
    setBuilder() {
        switch (this.config.sex) {
            case 'male': {
                this.builder = new MaleBuilder(this.config); break;
            }
            case 'female': {
                this.builder = new FemaleBuilder(this.config); break;
            }
            case 'unknown': {
                this.builder = new UnknownBuilder(this.config); break;
            }   
        }
    }
    createPedigree() {
        const pedigree = this.builder.createPedigree()
        pedigree.id = this.pedigreeId
        return pedigree
    }
    recreatePedigree(config: StyleConfig) {
        this.config = config
        this.setBuilder()
        return { 
            id: this.pedigreeId, 
            pedigree: this.createPedigree() 
        }
    }
}

class MaleBuilder extends Builder {
    pedigree: HTMLElement
    config: StyleConfig

    constructor(config: StyleConfig) {
        super()
        this.config = config
    }

    setMaleSex() {
        this.pedigree.style.width = `${this.config.size}px`
        this.pedigree.style.height = `${this.config.size}px`
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "0"
                node.childNodes[1].style.borderRadius = "0"
            }
        })
    }

    setAffected() {
        const lineWidth = this.config.size * Math.sqrt(2) *1.2
        const affectedLine = this.utils.createAffectedLine(this.config, lineWidth)
        affectedLine.style.transform = `rotate(45deg)`
        this.pedigree.childNodes[0].appendChild(affectedLine)
    }

    setPregnacy() {
        const pregnacyIcon = this.utils.createPregnacyIcon(this.config)
        this.pedigree.childNodes[0].appendChild(pregnacyIcon)
    }

    createPedigree() {
        this.pedigree = this.utils.createPedigree(this.config)
        this.setMaleSex()
        switch(this.config.type) {
            case 'pregnacy': 
            this.setPregnacy(); break;
            case 'affected': 
            this.setAffected(); break;
        }
        return this.pedigree
    }
}

class FemaleBuilder extends Builder {
    pedigree: HTMLElement
    config: StyleConfig

    constructor(config: StyleConfig) {
        super()
        this.config = config
    }

    setFemaleSex() {
        this.pedigree.style.width = `${this.config.size}px`
        this.pedigree.style.height = `${this.config.size}px`
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "100px 100px 0% 0%"
                node.childNodes[1].style.borderRadius = "0% 0% 100px 100px"
                node.style.transform = "rotate(0deg)"
            }
        })
    }

    setAffected() {
        const lineWidth = this.config.size * Math.sqrt(2) *1.2
        const affectedLine = this.utils.createAffectedLine(this.config, lineWidth)
        affectedLine.style.transform = `rotate(45deg)`
        this.pedigree.childNodes[0].appendChild(affectedLine)
    }

    setPregnacy() {
        const pregnacyIcon = this.utils.createPregnacyIcon(this.config)
        this.pedigree.childNodes[0].appendChild(pregnacyIcon)
    }

    createPedigree() {
        this.pedigree = this.utils.createPedigree(this.config)
        this.setFemaleSex()
        switch(this.config.type) {
            case 'pregnacy': 
            this.setPregnacy(); break;
            case 'affected': 
            this.setAffected(); break;
        }
        return this.pedigree
    }
}

class UnknownBuilder extends Builder {
    pedigree: HTMLElement
    config: StyleConfig

    constructor(config: StyleConfig) {
        super()
        this.config = config
    }

    setUnknownSex() {
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.style.width = `${this.config.size / Math.sqrt(2)}px`
                node.style.height = `${this.config.size / Math.sqrt(2)}px`
                node.style.transform = "rotate(45deg)"
                this.pedigree.style.display = "flex"
                this.pedigree.style.justifyContent = "center"
                this.pedigree.style.alignItems = "center"
            }
        })
    }

    setAffected() {
        const lineWidth = this.config.size * Math.sqrt(2) *1.2
        const affectedLine = this.utils.createAffectedLine(this.config, lineWidth)
        affectedLine.style.transform = `rotate(0deg)`
        affectedLine.style.top = `calc(50% - ${this.config.border/2}px)`
        affectedLine.style.left = `-${(lineWidth/4) + this.config.border}px`
        this.pedigree.childNodes[0].appendChild(affectedLine)
    }

    setPregnacy() {
        const pregnacyIcon = this.utils.createPregnacyIcon(this.config)
        pregnacyIcon.style.transform = 'rotate(-45deg)'
        this.pedigree.childNodes[0].appendChild(pregnacyIcon)
    }
    createPedigree() {
        this.pedigree = this.utils.createPedigree(this.config)
        this.setUnknownSex()
        switch(this.config.type) {
            case 'pregnacy': 
            this.setPregnacy(); break;
            case 'affected': 
            this.setAffected(); break;
        }
        return this.pedigree
    }
}