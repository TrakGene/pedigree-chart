import { StyleConfig } from './interfaces'
import { PedigreeBuilderDirector } from "./builders/builder"
import DragPlugin from "./dragPlugin"
import { EventHandler } from './eventPlugin'

export default class Pedigree {
    container?: string;
    config: StyleConfig = {
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
    }
    builder = new PedigreeBuilderDirector(this.config)
    pedigree: HTMLElement = this.builder.createPedigree()
    event: EventHandler = new EventHandler()
    dragPlugin: DragPlugin = new DragPlugin(this.pedigree, this.event)

    constructor(userConfig: StyleConfig) {
        this.updateConfig(userConfig)
        this.injectDependencies()
        this.trackPedigree()
    }

    trackPedigree() {
        this.pedigree.addEventListener("mousedown", () => {
            this.event.emit("click")
        })
    }

    insert(id) {
        this.container = id
        const w = document.querySelector(id)
        w.appendChild(this.pedigree)
    }

    injectDependencies() {
        this.builder = new PedigreeBuilderDirector(this.config)
        this.pedigree = this.builder.createPedigree()
        this.dragPlugin = new DragPlugin(this.pedigree, this.event)
    }

    updateConfig(userConfig: StyleConfig) {
        Object.keys(this.config).forEach((key) => {
            if (userConfig[key]) {
                this.config[key] = userConfig[key]
            }
        })
    }

    setAttribiute(prop: string, value: string | number) {
        this.config[prop] = value
        const recreatedPedigree = this.builder.recreatePedigree(this.config)
        this.pedigree = recreatedPedigree.pedigree
        this.dragPlugin.reattach(this.pedigree, this.config)
        this.trackPedigree()
        let oldPedigree = document.querySelector(`#${this.pedigree.id}`)
        oldPedigree.replaceWith(this.pedigree)
    }
}