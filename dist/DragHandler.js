"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBus_1 = require("./EventBus");
const Camera_1 = require("./Camera");
/**
 * Used for moving pedigees on mouse click or panning the diagram.
 *
 * DragHandler is alse emiting many events, accesible for developers,
 * after resolving user intentions.
 */
class DragHandler {
    constructor(diagram, renderEngine) {
        this.mouseOffsetX = 0;
        this.mouseOffsetY = 0;
        this.firstCursorX = 0;
        this.firstCursorY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this.initialCameraOffsetX = 0;
        this.initialCameraOffsetY = 0;
        this.panDiagram = false;
        this.dragEnabled = false;
        this.panEnabled = false;
        this.diagram = diagram;
        this.ctx = diagram.getContext("2d");
        this.renderEngine = renderEngine;
        this.initEvents();
    }
    initEvents() {
        this.diagram.onmousedown = (e) => {
            this.setUserIntention(e);
        };
        this.diagram.onmousemove = (e) => {
            this.drag(e);
            if (this.renderEngine.config.cursorPointer)
                this.cursorHover(e);
        };
        this.diagram.onmouseup = (e) => {
            this.stopDrag();
        };
    }
    cursorHover(e) {
        const rect = this.diagram.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.diagram.style.cursor = "default";
        this.renderEngine.pedigrees.forEach((pedigree) => {
            pedigree.initShape();
            if (this.ctx.isPointInPath(mouseX, mouseY)) {
                this.diagram.style.cursor = "pointer";
            }
        });
    }
    setUserIntention(e) {
        const rect = this.diagram.getBoundingClientRect();
        const scale = this.ctx.getTransform().a;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.panDiagram = true;
        let wasPedigreeClicked = false;
        this.renderEngine.pedigrees.forEach((pedigree) => {
            pedigree.initShape();
            if (this.ctx.isPointInPath(mouseX, mouseY)) {
                pedigree.dragEnabled = true;
                this.mouseOffsetX = mouseX / scale - pedigree.x;
                this.mouseOffsetY = mouseY / scale - pedigree.y;
                this.panDiagram = false;
                EventBus_1.default.emit(`pedigree-click`, pedigree);
                wasPedigreeClicked = true;
            }
        });
        if (this.panDiagram) {
            this.firstCursorX = e.clientX;
            this.firstCursorY = e.clientY;
        }
        if (!wasPedigreeClicked) {
            EventBus_1.default.emit("diagram-click");
        }
        EventBus_1.default.emit("redraw");
    }
    drag(e) {
        if (this.panDiagram) {
            this.dragDiagram(e);
        }
        else {
            this.dragPedigree(e);
        }
    }
    dragDiagram(e) {
        if (!this.panEnabled)
            return;
        const scale = this.ctx.getTransform().a;
        this.deltaX = (e.clientX - this.firstCursorX) / scale;
        this.deltaY = (e.clientY - this.firstCursorY) / scale;
        Camera_1.default.OffsetX = this.initialCameraOffsetX + this.deltaX;
        Camera_1.default.OffsetY = this.initialCameraOffsetY + this.deltaY;
        EventBus_1.default.emit("diagram-click");
        EventBus_1.default.emit("redraw");
    }
    dragPedigree(e) {
        if (!this.dragEnabled)
            return;
        const rect = this.diagram.getBoundingClientRect();
        const scale = this.ctx.getTransform().a;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        for (let i = 0; i < this.renderEngine.pedigrees.length; i++) {
            const pedigree = this.renderEngine.pedigrees[i];
            if (pedigree.isInLegend) {
                continue;
            }
            if (pedigree.dragEnabled) {
                pedigree.x = Math.round((mouseX / scale - this.mouseOffsetX) / 15) * 15;
                pedigree.y = Math.round((mouseY / scale - this.mouseOffsetY) / 15) * 15;
                EventBus_1.default.emit("pedigree-drag", pedigree);
                if (pedigree.twin) {
                    pedigree.twin.y =
                        Math.round((mouseY / scale - this.mouseOffsetY) / 15) * 15;
                }
                break;
            }
        }
        EventBus_1.default.emit("redraw");
    }
    stopDrag() {
        if (this.panDiagram) {
            this.initialCameraOffsetX = Camera_1.default.OffsetX;
            this.initialCameraOffsetY = Camera_1.default.OffsetY;
            this.panDiagram = false;
        }
        this.renderEngine.pedigrees.forEach((pedigree) => {
            pedigree.dragEnabled = false;
        });
    }
}
exports.default = DragHandler;
