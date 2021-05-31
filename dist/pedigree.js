"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const interfaces_1 = require("./interfaces");
const builder_1 = require("./builders/builder");
const dragPlugin_1 = require("./dragPlugin");
const eventPlugin_1 = require("./eventPlugin");
let Pedigree = class Pedigree {
    constructor(userConfig) {
        this.config = interfaces_1.initialConfig;
        this.builder = new builder_1.PedigreeBuilderDirector(this.config);
        this.pedigree = this.builder.createPedigree();
        this.dragPlugin = new dragPlugin_1.default(this.pedigree);
        this.changesDetector = {
            get: function (target) {
                return target;
            },
            set: (obj) => {
                const recreatedPedigree = this.builder.recreatePedigree(obj);
                this.pedigree = recreatedPedigree.pedigree;
                const id = recreatedPedigree.id;
                this.dragPlugin.reattach(this.pedigree, this.config);
                let oldPedigree = document.querySelector(`#${id}`);
                oldPedigree.replaceWith(this.pedigree);
                return true;
            }
        };
        this.styleProxy = new Proxy(this.config, this.changesDetector);
        this.updateConfig(userConfig);
        this.injectDependencies();
    }
    insert(id) {
        this.container = id;
        const w = document.querySelector(id);
        w.appendChild(this.pedigree);
    }
    injectDependencies() {
        this.builder = new builder_1.PedigreeBuilderDirector(this.config);
        this.pedigree = this.builder.createPedigree();
        this.dragPlugin = new dragPlugin_1.default(this.pedigree);
    }
    updateConfig(userConfig) {
        Object.keys(this.config).forEach((key) => {
            if (userConfig[key]) {
                this.config[key] = userConfig[key];
            }
        });
    }
    setAttribiute(prop, value) {
        let obj = this.styleProxy.target;
        obj[prop] = value;
        this.styleProxy.target = obj;
    }
};
Pedigree = __decorate([
    eventPlugin_1.EventBusWrapper
], Pedigree);
exports.default = Pedigree;
