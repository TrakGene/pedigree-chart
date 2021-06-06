import { EventHandler } from "./eventPlugin"
import { StyleConfig } from "./interfaces"

export default class DragPlugin {
    private x: number
    private y: number
    event: EventHandler

    constructor(pedigree, eventHandler) {
        this.startDragDriver(pedigree)
        this.event = eventHandler
    }

    startDragDriver(pedigree: HTMLElement) {
        pedigree.onmousedown = (event) => {
            const shiftX = event.clientX - pedigree.getBoundingClientRect().left
            const shiftY = event.clientY - pedigree.getBoundingClientRect().top

            pedigree.onmousemove = (event) => {
                move(event, pedigree, shiftX, shiftY)
                this.event.emit("drag", pedigree.getBoundingClientRect())
            }

            pedigree.onmouseup = () => {
                pedigree.onmousemove = null
            }
        }

        const move = (event, pedigree, shiftX, shiftY) => {
            pedigree.style.left = event.pageX - shiftX + 'px';
            pedigree.style.top = event.pageY - shiftY + 'px';
            this.x = event.pageX - shiftX
            this.y = event.pageY - shiftY
        }
    }
    stopDragDriver(pedigree) {
        pedigree.onmousemove = null
        pedigree.onmousedown = null
        pedigree.onmouseup = null
    }

    reattach(pedigree: HTMLElement, config: StyleConfig) {
        this.stopDragDriver(pedigree)
        if(config.drag) {
            pedigree.style.left = this.x + 'px';
            pedigree.style.top = this.y + 'px';
            this.startDragDriver(pedigree)
        } else {
            pedigree.style.left = this.x + 'px';
            pedigree.style.top = this.y + 'px';
            this.stopDragDriver(pedigree)
        }
    }
}