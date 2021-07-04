import EventBus from './EventBus'
import Camera from './Camera'
import RenderEngine from './RenderEngine'

export default class DragHandler {
    diagram: HTMLCanvasElement
    ctx: CanvasRenderingContext2D

    mouseOffsetX = 0
    mouseOffsetY = 0

    firstCursorX = 0
    firstCursorY = 0
    deltaX = 0
    deltaY = 0
    initialCameraOffsetX = 0
    initialCameraOffsetY = 0

    panDiagram = false
    renderEngine: RenderEngine

    constructor(diagram, renderEngine) {
        this.diagram = diagram
        this.ctx = diagram.getContext('2d')
        this.renderEngine = renderEngine
        this.initEvents()
    }

    private initEvents(): void {
        this.diagram.onmousedown = (e) => {
            this.setUserIntention(e)    
        }
        this.diagram.onmousemove = (e) => {
            this.drag(e)
        }
        this.diagram.onmouseup = (e) => {
            this.stopDrag()
        }
    }

    private setUserIntention(e: MouseEvent): void {
        const rect = this.diagram.getBoundingClientRect();
        const scale = this.ctx.getTransform().a
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top;
        this.panDiagram = true
        this.renderEngine.pedigrees.forEach((pedigree)=>{
            pedigree.initShape()
            if(this.ctx.isPointInPath(mouseX, mouseY)) {
                pedigree.dragEnabled = true
                this.mouseOffsetX = (mouseX/scale) - pedigree.x
                this.mouseOffsetY = (mouseY/scale) - pedigree.y
                this.panDiagram = false
                EventBus.emit(`pedigree-click`, pedigree)
            }
        })

        if(this.panDiagram) {
            this.firstCursorX = e.clientX
            this.firstCursorY = e.clientY  
        }
    }

    private drag(e: MouseEvent): void {
        if(this.panDiagram) {
            this.dragDiagram(e)
        } else {
            this.dragPedigree(e)
        }
    }

    private dragDiagram(e: MouseEvent): void {
        const scale = this.ctx.getTransform().a
        this.deltaX = (e.clientX - this.firstCursorX) / scale
        this.deltaY = (e.clientY - this.firstCursorY)  / scale
        Camera.OffsetX = this.initialCameraOffsetX + this.deltaX
        Camera.OffsetY = this.initialCameraOffsetY + this.deltaY
        EventBus.emit('redraw')
    }

    private dragPedigree(e: MouseEvent): void {
        const rect = this.diagram.getBoundingClientRect();
        const scale = this.ctx.getTransform().a
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        for (let i = 0; i < this.renderEngine.pedigrees.length; i++) {
            const pedigree = this.renderEngine.pedigrees[i];
            if(pedigree.dragEnabled) {
                pedigree.x = Math.round(((mouseX/scale) - this.mouseOffsetX)/15)*15
                pedigree.y = Math.round(((mouseY/scale)- this.mouseOffsetY)/15)*15
                if(pedigree.twin) {
                    pedigree.twin.y = Math.round(((mouseY/scale)- this.mouseOffsetY)/15)*15
                }
                break;
            }
        }
        EventBus.emit('redraw')
    }

    private stopDrag(): void {
        if(this.panDiagram) {
            this.initialCameraOffsetX = Camera.OffsetX
            this.initialCameraOffsetY = Camera.OffsetY
            this.panDiagram = false
        }
        this.renderEngine.pedigrees.forEach((pedigree)=>{
            pedigree.dragEnabled = false
        })
    }
}