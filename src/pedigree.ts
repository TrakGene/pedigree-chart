import { StyleConfig, initialConfig } from './interfaces'
import { PedigreeBuilderDirector } from "./builders/builder"
import DragPlugin from "./dragPlugin"
import {EventBus} from './eventPlugin'

@EventBus
export default class Pedigree {
    container?: string;
    config: StyleConfig = initialConfig
    builder = new PedigreeBuilderDirector(this.config)
    pedigree: HTMLElement = this.builder.createPedigree()
    dragPlugin: DragPlugin = new DragPlugin(this.pedigree)
    pedigreeId: string

    changesDetector = {
        get: function(target: StyleConfig) {
          return target;
        },
        set: (obj) => {
            const recreatedPedigree = this.builder.recreatePedigree(obj)
            this.pedigree = recreatedPedigree.pedigree
            this.pedigreeId = recreatedPedigree.id
            this.dragPlugin.reattach(this.pedigree, this.config)
            this.trackPedigree()
            let oldPedigree = document.querySelector(`#${this.pedigreeId}`)
            oldPedigree.replaceWith(this.pedigree)
            return true;
        }
      };
      
    styleProxy = new Proxy(this.config, this.changesDetector);

    constructor(userConfig: StyleConfig) {
        this.updateConfig(userConfig)
        this.injectDependencies()

        this.trackPedigree()
    }

    trackPedigree() {
        this.pedigree.addEventListener("click", ()=> {
            this.emit("click",  Object.assign(
                this.config, {
                    id: this.pedigree.id,
                    position: this.pedigree.getBoundingClientRect()
                }
            ))
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
        this.dragPlugin = new DragPlugin(this.pedigree)
    }

    updateConfig(userConfig: StyleConfig) {
        Object.keys(this.config).forEach((key)=>{
            if(userConfig[key]) {
                this.config[key] = userConfig[key]
            }
        })
    }

    setAttribiute(prop: string, value: string | number) {
        let obj = this.styleProxy.target
        obj[prop] = value
        this.styleProxy.target = obj
    }
}