"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConnectionsManager_1 = require("./ConnectionsManager");
const PedigreeManager_1 = require("./PedigreeManager");
const EventBus_1 = require("./EventBus");
const DragHandler_1 = require("./DragHandler");
const Legend_1 = require("./Legend");
const EventBus_2 = require("./EventBus");
/**
 * Creates a RenderEngine instance that is whole pedigree-chart manager
 *
 * It holds other classes as dependencies. Dependencies often have access to this instance
 * so they can refer to its variables.
 *
 * Treat is as a sort of fasade. In hiddes all complicated mechanisms, resulting in easy-to-use api.
 */
class RenderEngine {
    constructor() {
        this.pedigrees = [];
        this.config = {
            width: 1200,
            height: 600,
            dragEnabled: false,
            panEnabled: false,
            cursorPointer: false,
            scaleType: "none",
            minScale: 0.5,
            maxScale: 2,
            font: "16px Arial",
            backgroundColor: "#FFFFFF"
        };
        this.scaleFactor = 1;
    }
    recreateDiagram() {
        this.diagram.width = this.config.width;
        this.diagram.height = this.config.height;
        this.ctx.font = this.config.font;
        this.dragHandler = new DragHandler_1.default(this.diagram, this);
        if (this.config.dragEnabled || this.config.panEnabled) {
            this.config.dragEnabled ? (this.dragHandler.dragEnabled = true) : null;
            this.config.panEnabled ? (this.dragHandler.panEnabled = true) : null;
        }
        if (this.config.scaleType === "none")
            return;
        if (this.config.scaleType === "pointer")
            this.scaleWithPointer();
        if (this.config.scaleType === "scroll")
            this.scaleWithScroll();
        this.draw();
    }
    /**
     * Resize diagram with scroll.
     */
    scaleWithScroll() {
        this.diagram.addEventListener("wheel", (event) => {
            if (this.scaleFactor > this.config.maxScale) {
                if (event.deltaY > 0)
                    return;
                if (event.deltaY < 0)
                    this.scaleFactor += event.deltaY * 0.001;
            }
            if (this.scaleFactor < this.config.minScale) {
                if (event.deltaY < 0)
                    return;
                if (event.deltaY > 0)
                    this.scaleFactor += event.deltaY * 0.001;
            }
            this.scale(event.deltaY * 0.001, 0, 0);
            event.preventDefault();
        });
    }
    /**
     * Resize diagram with scroll and pointer.
     * It moves the diagram closer to user pointer position
     */
    scaleWithPointer() {
        this.diagram.addEventListener("wheel", (event) => {
            if (this.scaleFactor > this.config.maxScale) {
                if (event.deltaY > 0)
                    return;
                if (event.deltaY < 0)
                    this.scaleFactor += event.deltaY * 0.001;
            }
            if (this.scaleFactor < this.config.minScale) {
                if (event.deltaY < 0)
                    return;
                if (event.deltaY > 0)
                    this.scaleFactor += event.deltaY * 0.001;
            }
            this.scale(event.deltaY * 0.001, event.clientX, event.clientY);
            event.preventDefault();
        });
    }
    /**
     * Clear and draw pedigrees and connections
     */
    draw() {
        this.ctx.clearRect(0, 0, this.config.width * this.config.maxScale, this.config.height * this.config.maxScale);
        this.ctx.fillStyle = this.config.backgroundColor;
        this.ctx.fillRect(0, 0, this.config.width * this.config.maxScale, this.config.height * this.config.maxScale);
        this.connectionManager.drawConnections();
        this.pedigreeManager.drawPedigrees();
    }
    setDiagram(diagramId) {
        this.diagramId = diagramId;
        this.diagram = document.getElementById(diagramId);
        this.diagram.width = this.config.width;
        this.diagram.height = this.config.height;
        this.diagram.style.border = "4px solid black";
        this.diagram.style.overflow = "hidden";
        this.ctx = this.diagram.getContext("2d");
        this.ctx.font = this.config.font;
        this.connectionManager = new ConnectionsManager_1.default(this.diagram);
        this.pedigreeManager = new PedigreeManager_1.default(this.diagram, this);
        EventBus_1.default.on("redraw", () => this.draw());
        EventBus_1.default.emit("redraw");
    }
    setConfig(configObject) {
        Object.keys(configObject).forEach((key) => {
            this.config[key] = configObject[key];
        });
        this.recreateDiagram();
    }
    scale(scale, cursorX, cursorY) {
        this.scaleFactor = this.scaleFactor * (scale + 1);
        this.ctx.translate(cursorX, cursorY);
        this.ctx.scale(scale + 1, scale + 1);
        this.ctx.translate(-cursorX, -cursorY);
        setTimeout(() => EventBus_2.default.emit("redraw"));
    }
    create(sex, x = 0, y = 0) {
        const pedigree = this.pedigreeManager.createPedigree(sex, x, y);
        return pedigree;
    }
    /**
     * Tell @class ConnectionManager whitch connections user want to create
     */
    connect(pedigreeA, pedigreeB, lineType) {
        if (lineType === "partnership" || lineType === "separation") {
            pedigreeA.marriagePartner = pedigreeB;
            pedigreeB.marriagePartner = pedigreeA;
        }
        this.connectionManager.createConnection(pedigreeA, pedigreeB, lineType);
        EventBus_1.default.emit("redraw");
    }
    /**
     * Tell @class ConnectionManager which twins-connections user want to create
     */
    connectTwins(parent, twinA, twinB, type) {
        twinA.twin = twinB;
        twinB.twin = twinA;
        this.connectionManager.createTwinsConnection(parent, twinA, twinB, type);
        EventBus_1.default.emit("redraw");
    }
    delete(id) {
        this.pedigrees = this.pedigrees.filter((pedigree) => pedigree.id !== id);
        this.pedigreeManager.deletePedigree(id);
        this.connectionManager.removeConnection(id);
        EventBus_1.default.emit("redraw");
    }
    /**
     * Replace pedigree with new one. It recreates all connections that previous one had.
     * Done with help of @class ConnectionManager
     */
    replace(id, newPedigree) {
        const index = this.pedigrees.findIndex((pedigree) => pedigree.id === id);
        if (index >= 0) {
            const connectionsToReplace = this.connectionManager.queryConnections(id);
            const twinConnectionsToReplace = this.connectionManager.queryTwinsConnections(id);
            this.connectionManager.removeConnection(id);
            connectionsToReplace.forEach((connection) => {
                if (connection.pedigreeA.id === id) {
                    this.connect(newPedigree, connection.pedigreeB, connection.type);
                }
                if (connection.pedigreeB.id === id) {
                    this.connect(connection.pedigreeA, newPedigree, connection.type);
                }
            });
            twinConnectionsToReplace.forEach((connection) => {
                if (connection.twinA.id === id) {
                    this.connectTwins(newPedigree, connection.twinB, connection.parent, connection.type);
                }
                if (connection.twinB.id === id) {
                    this.connectTwins(connection.twinA, newPedigree, connection.parent, connection.type);
                }
                if (connection.parent.id === id) {
                    this.connectTwins(connection.twinA, connection.twinB, newPedigree, connection.type);
                }
            });
            this.pedigrees = this.pedigrees.filter((pedigree) => pedigree.id !== id);
            this.pedigreeManager.deletePedigree(id);
            newPedigree.id = id;
            this.pedigrees.push(newPedigree);
        }
        EventBus_1.default.emit("redraw");
    }
    getTwinsConnections(id) {
        return this.connectionManager.queryTwinsConnections(id);
    }
    getConnections(id) {
        return this.connectionManager.queryConnections(id);
    }
    createLegend(x, y) {
        return new Legend_1.default(this.ctx, x, y);
    }
    on(eventName, eventHandler) {
        EventBus_1.default.on(eventName, eventHandler);
    }
    remove(eventName) {
        EventBus_1.default.remove(eventName);
    }
}
exports.default = RenderEngine;
