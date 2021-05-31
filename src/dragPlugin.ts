import { EventBus } from "./eventPlugin"
import { StyleConfig } from "./interfaces"

@EventBus
export default class DragPlugin {
    private x: number
    private y: number
    constructor(pedigree) {
        this.startDragDriver(pedigree)
    }

    startDragDriver(pedigree) {
        pedigree.onmousedown = (event) => {
            const shiftX = event.clientX - pedigree.getBoundingClientRect().left
            const shiftY = event.clientY - pedigree.getBoundingClientRect().top

            pedigree.onmousemove = (event) => {
                move(event, pedigree, shiftX, shiftY)
                this.emit("drag")
            }
            
            pedigree.onmouseup = () => {
                pedigree.onmousemove = null
                this.emit("dragend", {
                    id: pedigree.id,
                    position: pedigree.getBoundingClientRect() 
                })
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