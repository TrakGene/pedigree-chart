import { StyleConfig } from "../interfaces"

export class PedigreeUtils {
    createPedigree(config: StyleConfig): HTMLElement {
        const pedigreeContainer = document.createElement('div')
        pedigreeContainer.style.width = `${config.size}px`
        pedigreeContainer.style.height = `${config.size}px`

        if(config.mode == "node") {
            pedigreeContainer.style.position = "absolute"
            pedigreeContainer.style.left = `${config.x}px`
            pedigreeContainer.style.top = `${config.y}px`
        }

        const pedigree = document.createElement('div')
        pedigree.classList.add('pedigree')
        pedigree.style.width = "100%"
        pedigree.style.height = "100%"
        pedigree.style.boxSizing = "border-box"
        pedigree.style.position = "relative"

        const topPart = document.createElement('div')
        topPart.style.height = `calc(50% - ${config.border}px)`
        topPart.style.backgroundColor = config.topColor
        topPart.style.borderTop = `${config.border}px solid black`
        topPart.style.borderLeft = `${config.border}px solid black`
        topPart.style.borderRight = `${config.border}px solid black`

        const bottomPart = document.createElement('div')
        bottomPart.style.height = `calc(50% - ${config.border}px)`
        bottomPart.style.backgroundColor = config.bottomColor
        bottomPart.style.borderBottom = `${config.border}px solid black`
        bottomPart.style.borderLeft = `${config.border}px solid black`
        bottomPart.style.borderRight = `${config.border}px solid black`

        pedigree.appendChild(topPart)
        pedigree.appendChild(bottomPart)
        pedigreeContainer.appendChild(pedigree)
        return pedigreeContainer
    }
}