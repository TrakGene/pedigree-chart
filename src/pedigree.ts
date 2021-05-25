import generator from "./idGenerator"
import { StyleConfig } from './interfaces'
import { PedigreeCreator } from "./builders/pedigreeBuilder"
import { ClassDeclaration } from "typescript"

export default class Pedigree {
    pedigree: HTMLElement
    id = generator.randomId()
    container?: string;
    builder = new PedigreeCreator()
    // dragHandler: ClassDeclaration = null

    config: StyleConfig = {
        type: "individual", 
        sex: "unknow",
        size: 100,
        border: 5,
        mode: "node",
        x: 0,
        y: 0,
        topColor: "white",
        bottomColor: "white"
    }
      
    handler = {
        get: function(target: StyleConfig) {
          return target;
        },
        set: (obj) => {
            this.pedigree = this.builder.init(obj)
            this.pedigree.id = this.id

            let oldPedigree = document.querySelector(`#${this.id}`)
            oldPedigree.replaceWith(this.pedigree)
            return true;
        }
      };
      
    styleProxy = new Proxy(this.config, this.handler);

    constructor(userConfig: StyleConfig) {
        this.config = userConfig
        this.pedigree = this.builder.init(this.styleProxy.target)
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

    // install(plugin: string, func: Function) {

    // }
}