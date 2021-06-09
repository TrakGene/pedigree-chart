import { Pedigree, MalePedigree } from "./Pedigree"
import { MouseEventsHandler } from "./DragHandler"
import eventBus from './EventBus'

export default class PedigreeManager {
    pedigreeDiagram: HTMLCanvasElement 
    dragHandler: MouseEventsHandler
    ctx: HTMLCanvasElement
    pedigrees: Array<Pedigree> = []
    newx = 0

    constructor(diagram) {
        this.pedigreeDiagram = diagram
        this.dragHandler = new MouseEventsHandler(this.pedigreeDiagram)
        this.ctx = diagram.getContext("2d");
    }

    createPedigree(sex, type) {
        let pedigree;
        switch(sex) {
            case "male": pedigree = new MalePedigree(this.pedigreeDiagram)
        }
        pedigree.x = this.newx
        this.newx = this.newx + 120
        this.pedigrees.push(pedigree)
        this.dragHandler.appendPedigrees(pedigree)
        pedigree.draw()
        return pedigree
    }
    drawPedigrees() {
        const ctx = this.pedigreeDiagram.getContext('2d')
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.pedigrees.forEach(pedigree => {
            pedigree.draw()
        })
    }
    scalePedigrees(scale) {
        const ctx = this.pedigreeDiagram.getContext('2d')
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        this.pedigrees.forEach(pedigree => {
            pedigree.size *= scale 
            pedigree.border *= scale
            pedigree.x *= scale
            pedigree.y *= scale
            pedigree.draw()
        })
    }
}