import generator from "../idGenerator"
import { NodeStyleConfig } from '../interfaces'
import { PedigreeNodeBuilder } from "../builders/pedigreeBuilders"

const pedigreeNodeBuilder = new PedigreeNodeBuilder()

export default class PedigreeNode {
    pedigree: HTMLElement
    id = generator.randomId()
    container?: string;

    pedigreeStyleConfig: NodeStyleConfig = {
        type: "individual", 
        sex: "unknow",
        size: 100,
        border: 5,
        topColor: "white",
        bottomColor: "white"
    }
      
    handler = {
        get: function(target: NodeStyleConfig) {
          return target;
        },
        set: (obj) => {
            this.pedigree = pedigreeNodeBuilder.init(obj)
            this.pedigree.id = this.id

            let oldPedigree = document.querySelector(`#${this.id}`)
            oldPedigree.replaceWith(this.pedigree)
            return true;
        }
      };
      
    styleProxy = new Proxy(this.pedigreeStyleConfig, this.handler);

    constructor(config: NodeStyleConfig) {
        this.pedigreeStyleConfig = config
        this.pedigree = pedigreeNodeBuilder.init(this.styleProxy.target)
        this.pedigree.id = this.id
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