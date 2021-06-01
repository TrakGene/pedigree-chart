"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("./builders/builder");
const dragPlugin_1 = require("./dragPlugin");
const eventPlugin_1 = require("./eventPlugin");
class Pedigree {
    constructor(userConfig) {
        this.config = {
            type: "individual",
            sex: "male",
            size: 100,
            border: 5,
            mode: "icon",
            drag: false,
            x: 0,
            y: 0,
            topColor: "white",
            bottomColor: "white"
        };
        this.builder = new builder_1.PedigreeBuilderDirector(this.config);
        this.pedigree = this.builder.createPedigree();
        this.event = new eventPlugin_1.EventHandler();
        this.dragPlugin = new dragPlugin_1.default(this.pedigree, this.event);
        this.updateConfig(userConfig);
        this.injectDependencies();
        this.trackPedigree();
    }
    trackPedigree() {
        this.pedigree.addEventListener("mousedown", () => {
            this.event.emit("click");
        });
    }
    insert(id) {
        this.container = id;
        const w = document.querySelector(id);
        w.appendChild(this.pedigree);
    }
    injectDependencies() {
        this.builder = new builder_1.PedigreeBuilderDirector(this.config);
        this.pedigree = this.builder.createPedigree();
        this.dragPlugin = new dragPlugin_1.default(this.pedigree, this.event);
    }
    updateConfig(userConfig) {
        Object.keys(this.config).forEach((key) => {
            if (userConfig[key]) {
                this.config[key] = userConfig[key];
            }
        });
    }
    setAttribiute(prop, value) {
        this.config[prop] = value;
        const recreatedPedigree = this.builder.recreatePedigree(this.config);
        this.pedigree = recreatedPedigree.pedigree;
        this.dragPlugin.reattach(this.pedigree, this.config);
        this.trackPedigree();
        let oldPedigree = document.querySelector(`#${this.pedigree.id}`);
        oldPedigree.replaceWith(this.pedigree);
    }
}
exports.default = Pedigree;
