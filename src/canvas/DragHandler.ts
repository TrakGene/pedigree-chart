import { Pedigree } from './Pedigree'
import EventBus from './EventBus'

interface PedigreeDragShape {
    pedigree: Pedigree
    dragEnabled: Boolean
}

export class MouseEventsHandler {
    pedigreeDiagram: HTMLCanvasElement
    pedigrees: Array<PedigreeDragShape> = []
    offsetX = 0
    offsetY = 0

    constructor(diagram) {
        this.pedigreeDiagram = diagram
        this.initClickHandler()
    }

    appendPedigrees(pedigree) {
        this.pedigrees.push({
            pedigree: pedigree,
            dragEnabled: false
        })
    }

    initClickHandler() {
        this.pedigreeDiagram.onmousedown = (e) => {
            this.handleMouseDown(e)
        }
        this.pedigreeDiagram.onmousemove = (e) => {
            this.dragPedigree(e)
        }
        this.pedigreeDiagram.onmouseup = (e) => {
            for (var i = 0; i < this.pedigrees.length; i++) {
                var shape = this.pedigrees[i];
                shape.dragEnabled = false
            }
        }
    }
    handleMouseDown(e) {
        e.preventDefault();
        const ctx = this.pedigreeDiagram.getContext('2d')
        for (var i = 0; i < this.pedigrees.length; i++) {
            var shape = this.pedigrees[i];
            var rect = this.pedigreeDiagram.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            // shape.pedigree.draw()
            if (ctx.isPointInPath(x, y)) {
                shape.dragEnabled = true
                this.offsetX = x - shape.pedigree.x
                this.offsetY = y - shape.pedigree.y
            }
        }
    }
    dragPedigree(e) {
        var rect = this.pedigreeDiagram.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        for (var i = 0; i < this.pedigrees.length; i++) {
            if(this.pedigrees[i].dragEnabled) {
                this.pedigrees[i].pedigree.x = x - this.offsetX
                this.pedigrees[i].pedigree.y = y - this.offsetY
                // this.drawfunc()
                EventBus.emit('redraw')
                this.pedigrees[i].pedigree.draw()
            }
        }
    }
}