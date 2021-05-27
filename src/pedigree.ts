import { StyleConfig } from './interfaces'
import { PedigreeBuilderDirector } from "./builders/builder"

export default class Pedigree {
    pedigree: HTMLElement
    container?: string;
    builder: PedigreeBuilderDirector

    config: StyleConfig = {
        type: "individual", 
        sex: "male",
        size: 100,
        border: 5,
        mode: "icon",
        x: 0,
        y: 0,
        topColor: "white",
        bottomColor: "white"
    }
      
    changesDetector = {
        get: function(target: StyleConfig) {
          return target;
        },
        set: (obj) => {
            const recreatedPedigree = this.builder.recreatePedigree(obj)
            this.pedigree = recreatedPedigree.pedigree
            const id = recreatedPedigree.id
            let oldPedigree = document.querySelector(`#${id}`)
            oldPedigree.replaceWith(this.pedigree)
            return true;
        }
      };
      
    styleProxy = new Proxy(this.config, this.changesDetector);

    constructor(userConfig: StyleConfig) {
        this.updateConfig(userConfig)
        this.builder = new PedigreeBuilderDirector(this.config)
        this.pedigree = this.builder.createPedigree()
    }

    insert(id) {
        this.container = id
        const w = document.querySelector(id)
        w.appendChild(this.pedigree)
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