import generator from "./idGenerator"
import { StyleConfig } from './interfaces'
import { PedigreeIconBuilder } from "./builders/pedigreeBuilders"

const pedigreeIconBuilder = new PedigreeIconBuilder()
// const pedigreeNodeBuilder = new PedigreeIconBuilder()

export class PedigreeIcon {
    pedigree: HTMLElement
    id = generator.randomId()
    container?: string;

    pedigreeStyleConfig: StyleConfig = {
        type: "individual", 
        sex: "unknow",
        size: 100,
        border: 5,
        topColor: "white",
        bottomColor: "white"
    }
      
    handler = {
        get: function(target: StyleConfig) {
          return target;
        },
        set: (obj) => {
            this.pedigree = pedigreeIconBuilder.init(obj)
            this.pedigree.id = this.id

            let oldPedigree = document.querySelector(`#${this.id}`)
            oldPedigree.replaceWith(this.pedigree)
            return true;
        }
      };
      
    styleProxy = new Proxy(this.pedigreeStyleConfig, this.handler);

    constructor(config: StyleConfig) {
        this.pedigreeStyleConfig = config
        this.pedigree = pedigreeIconBuilder.init(this.styleProxy.target)
        this.pedigree.id = this.id
        this.pedigree.style.position = "absolute"
    }

    insert(id) {
        this.container = id
        const w = document.querySelector(id)
        w.appendChild(this.pedigree)
    }

    setAttribiute(prop: string, value: string | number) {
        let obj = this.styleProxy.target
        obj[prop] = value
        this.styleProxy.target = obj
    }
}