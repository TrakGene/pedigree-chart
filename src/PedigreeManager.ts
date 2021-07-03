import { MalePedigree, FemalePedigree, UnknownPedigree ,BasePedigree } from "./Pedigree"
import RenderEngine from "./RenderEngine"

export default class PedigreeManager {
    private diagram: HTMLCanvasElement
    private renderEngine: RenderEngine

    constructor(diagram: HTMLCanvasElement, renderEngine: RenderEngine) {
        this.renderEngine = renderEngine
        this.diagram = diagram
    }

    createPedigree(sex: string, type: string, x: number, y: number): BasePedigree {
        let pedigree;
        switch (sex) {
            case "male": 
                pedigree = new MalePedigree(this.diagram, x, y); 
                break;
            case "female": 
                pedigree = new FemalePedigree(this.diagram, x, y); 
                break;
            case "unknown": 
                pedigree = new UnknownPedigree(this.diagram, x, y); 
                break;
        }
        this.renderEngine.pedigrees.push(pedigree)
        return pedigree
    }

    deletePedigree(id: string): void {
        const len = this.renderEngine.pedigrees.length
        for (let i = 0; i < len; i++) {
            const element = this.renderEngine.pedigrees[i];
            if(id === element.id) {
                this.renderEngine.pedigrees.splice(i, 1)
            }
        }
    }
    
    initPedigreeShapes(): void {
        this.renderEngine.pedigrees.forEach(pedigree => {
            pedigree.initShape()
        })
    }
}