import { StyleConfig } from "./interfaces"

export default class DragPlugin {
    private x: number
    private y: number
    constructor(pedigree) {
        this.startDragDriver(pedigree)
    }

    startDragDriver(pedigree) {
        pedigree.onmousedown = function(event) {
            this.shiftX = event.clientX - pedigree.getBoundingClientRect().left
            this.shiftY = event.clientY - pedigree.getBoundingClientRect().top

            pedigree.onmousemove = function(event) {
                move(event, pedigree, this.shiftX, this.shiftY)
            }
            pedigree.onmouseup = function() {
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