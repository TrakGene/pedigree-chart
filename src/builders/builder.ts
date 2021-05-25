import { IconStyleConfig, NodeStyleConfig } from "../interfaces"

export abstract class PedigreeBuilder {
    protected pedigree: HTMLElement;

    init(config: IconStyleConfig | NodeStyleConfig): HTMLElement {
        this.pedigree = this.createPedigree(config)
        this.setSexStyle(config)
        return this.pedigree
    }

    abstract createPedigree(StyleConfig)

    setSexStyle(config: IconStyleConfig | NodeStyleConfig) {
        switch (config.sex) {
            case 'male': this.setMaleSex(config); break;
            case 'female': this.setFemaleSex(config); break;
            case 'unknown': this.setUnknownSex(config); break;
        }
        return this.pedigree
    }

    private setMaleSex(config: IconStyleConfig | NodeStyleConfig) {
        this.pedigree.style.width = `${config.size}px`
        this.pedigree.style.height = `${config.size}px`
        this.pedigree.childNodes.forEach((node: any) => {
            if (node.className = "pedigree") {
                node.childNodes[0].style.borderRadius = "0"
                node.childNodes[1].style.borderRadius = "0"
            }
        })
    }

    private setFemaleSex(config: IconStyleConfig | NodeStyleConfig) {
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

    private setUnknownSex(config: IconStyleConfig | NodeStyleConfig) {
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
