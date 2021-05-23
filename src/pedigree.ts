import generator from "./idGenerator"
import { StyleConfig } from "./interfaces"

class PedigreeBuilder {
    protected pedigree: HTMLElement;
    protected size = 80;
    protected border = 5;
    protected topColor = "white"
    protected bottomColor = "white"

    init(config: StyleConfig) {
        this.pedigree = this.createPedigree(config)
        this.setSexStyle(config)
        return this.pedigree
    }

    createPedigree(config: StyleConfig) {
        let size = config.size ? config.size : this.size
        let border = config.border ? config.border : this.border
        let topColor = config.topColor ? config.topColor : this.topColor
        let bottomColor = config.bottomColor ? config.bottomColor : this.bottomColor

        const pedigreeContainer = document.createElement('div')
        pedigreeContainer.style.width = `${size}px`
        pedigreeContainer.style.height = `${size}px`

        const pedigree = document.createElement('div')
        pedigree.classList.add('pedigree')
        pedigree.style.width = "100%"
        pedigree.style.height = "100%"
        pedigree.style.boxSizing = "border-box"

        const topPart = document.createElement('div')
        topPart.style.height = `calc(50% - ${border}px)`
        topPart.style.backgroundColor = topColor
        topPart.style.borderTop = `${border}px solid black`
        topPart.style.borderLeft = `${border}px solid black`
        topPart.style.borderRight = `${border}px solid black`

        const bottomPart = document.createElement('div')
        bottomPart.style.height = `calc(50% - ${border}px)`
        bottomPart.style.backgroundColor = bottomColor
        bottomPart.style.borderBottom = `${border}px solid black`
        bottomPart.style.borderLeft = `${border}px solid black`
        bottomPart.style.borderRight = `${border}px solid black`

        pedigree.appendChild(topPart)
        pedigree.appendChild(bottomPart)

        pedigreeContainer.appendChild(pedigree)
        return pedigreeContainer
    }

    setSexStyle(config: StyleConfig) {
        switch (config.sex) {
            case 'male': this.setMaleSex(config); break;
            case 'female': this.setFemaleSex(config); break;
            case 'unknown': this.setUnknownSex(config); break;
        }
        return this.pedigree
    }

    private setMaleSex(config: StyleConfig) {
        this.pedigree.style.width = `${config.size}px`
        this.pedigree.style.height = `${config.size}px`
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "0"
                node.childNodes[1].style.borderRadius = "0"
            }
        })
    }

    private setFemaleSex(config: StyleConfig) {
        this.pedigree.style.width = `${config.size}px`
        this.pedigree.style.height = `${config.size}px`
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "100px 100px 0% 0%"
                node.childNodes[1].style.borderRadius = "0% 0% 100px 100px"
                node.style.transform = "rotate(0deg)"
            }
        })
    }

    private setUnknownSex(config: StyleConfig) {
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.style.width = `${config.size/Math.sqrt(2)}px`
                node.style.height = `${config.size/Math.sqrt(2)}px`
                node.style.transform = "rotate(45deg)"
                this.pedigree.style.display = "flex"
                this.pedigree.style.justifyContent = "center"
                this.pedigree.style.alignItems = "center"
            }
        })

    }
}

const builder = new PedigreeBuilder()

export class Pedigree {
    pedigree: HTMLElement
    id = generator.randomId()
    container?: string;
    pedigreeStyleConfig: StyleConfig

    constructor(config: StyleConfig) {
        this.pedigreeStyleConfig = config
        this.pedigree = builder.init(config)
        this.pedigree.id = this.id
    }

    insert(id) {
        this.container = id
        const w = document.querySelector(id)
        w.appendChild(this.pedigree)
    }

    changeSex(sex: string) {
        this.pedigreeStyleConfig.sex = sex
        this.pedigree = builder.init(this.pedigreeStyleConfig)
        this.pedigree.id = this.id
        let w = document.querySelector(`#${this.id}`)
        w.replaceWith(this.pedigree)
    }
}