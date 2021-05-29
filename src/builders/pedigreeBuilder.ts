import { StyleConfig } from "../interfaces"

export class PedigreeUtils {
    createPedigree(config: StyleConfig): HTMLElement {
        const pedigreeContainer = document.createElement('div')
        pedigreeContainer.style.width = `${config.size}px`
        pedigreeContainer.style.height = `${config.size}px`
        pedigreeContainer.style.position = "relative"

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

    createAffectedLine(config: StyleConfig, lineWidth): HTMLElement {
        const affectedLine = document.createElement("span")
        affectedLine.style.display = "block"
        affectedLine.style.height = `${config.border}px`
        affectedLine.style.width = `${lineWidth}px`
        affectedLine.style.backgroundColor = "black"
        affectedLine.style.position = "absolute"
        affectedLine.style.top = `calc(50% - ${config.border}px)`
        affectedLine.style.left = `-${(lineWidth/4) - config.border*2}px`
        affectedLine.style.transformOrigin = `center`
        return affectedLine
    }

    createPregnacyIcon(config: StyleConfig) {
        const pregnacyIcon = document.createElement("p")
        pregnacyIcon.textContent = "P"
        pregnacyIcon.style.margin = '0'
        pregnacyIcon.style.position = "absolute"
        pregnacyIcon.style.lineHeight = "0rem"
        pregnacyIcon.style.top = `50%`
        pregnacyIcon.style.left = `calc(50% - ${config.border}px)`
        return pregnacyIcon
    }
}