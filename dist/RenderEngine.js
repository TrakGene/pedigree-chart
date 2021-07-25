"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionsManager_1 = require("./ConnectionsManager");
const PedigreeManager_1 = require("./PedigreeManager");
const EventBus_1 = require("./EventBus");
const DragHandler_1 = require("./DragHandler");
const Legend_1 = require("./Legend");
const EventBus_2 = require("./EventBus");
class RenderEngine {
    constructor() {
        this.pedigrees = [];
        this.scaleFactor = 1;
    }
    // constructor(id: string) {
    //   // this.diagramWrapper = document.getElementById(id) as HTMLElement;
    //   // this.diagram = document.createElement("canvas");
    //   // this.ctx = this.diagram.getContext("2d");
    //   // this.initEvents();
    //   // setTimeout(() => this.draw());
    // }
    setDiagram(diagramId) {
        this.diagramWrapper = document.getElementById(diagramId);
        this.diagram = document.createElement("canvas");
        this.ctx = this.diagram.getContext("2d");
        this.diagram.width = window.innerWidth;
        this.diagram.height = window.innerHeight;
        this.diagramWrapper.style.border = "3px solid black";
        this.diagramWrapper.style.overflow = "hidden";
        this.ctx.font = "16px Arial";
        this.diagramWrapper.appendChild(this.diagram);
        this.connectionManager = new ConnectionsManager_1.default(this.diagram);
        this.pedigreeManager = new PedigreeManager_1.default(this.diagram, this);
        this.dragHandler = new DragHandler_1.default(this.diagram, this);
        this.initEvents();
        setTimeout(() => this.draw());
    }
    initEvents() {
        EventBus_1.default.on("redraw", () => this.draw());
        window.addEventListener("resize", () => {
            this.resizeDiagramWidth();
        });
        this.diagram.addEventListener("wheel", (event) => {
            this.scaleFactor += event.deltaY * 0.001;
            this.scale(event.deltaY * 0.001, event.clientX, event.clientY);
            event.preventDefault();
        });
    }
    resizeDiagramWidth() {
        this.diagram.width = window.innerWidth;
        this.diagram.height = window.innerHeight;
        this.draw();
    }
    draw() {
        this.ctx.clearRect(-10000, -10000, window.innerWidth * 1000, window.innerHeight * 1000);
        this.connectionManager.drawConnections();
        this.pedigreeManager.drawPedigrees();
    }
    create(sex, x = 0, y = 0) {
        const pedigree = this.pedigreeManager.createPedigree(sex, x, y);
        return pedigree;
    }
    connect(pedigreeA, pedigreeB, lineType) {
        if (lineType === "marriage" || lineType === "separation") {
            pedigreeA.marriagePartner = pedigreeB;
            pedigreeB.marriagePartner = pedigreeA;
        }
        this.connectionManager.createConnection(pedigreeA, pedigreeB, lineType);
    }
    connectTwins(parent, twinA, twinB, type) {
        twinA.twin = twinB;
        twinB.twin = twinA;
        this.connectionManager.createTwinsConnection(parent, twinA, twinB, type);
    }
    scale(scale, cursorX, cursorY) {
        this.scaleFactor = this.scaleFactor * (scale + 1);
        this.ctx.translate(cursorX, cursorY);
        this.ctx.scale(scale + 1, scale + 1);
        this.ctx.translate(-cursorX, -cursorY);
        setTimeout(() => EventBus_2.default.emit('redraw'));
    }
    deletePedigree(id) {
        this.pedigreeManager.deletePedigree(id);
        this.connectionManager.removeConnection(id);
        setTimeout(() => {
            this.draw();
        });
    }
    createLegend(x, y) {
        return new Legend_1.default(this.ctx, x, y);
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(eventName, eventHandler);
    }
}
exports.default = RenderEngine;
