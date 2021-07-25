"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this.eventHandlers = {};
        this.initBuiltInEvents();
    }
    on(eventName, eventHandler) {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
            this.eventHandlers[eventName].push(eventHandler);
        }
        else {
            this.eventHandlers[eventName].push(eventHandler);
        }
    }
    emit(eventName, props = {}) {
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach((func) => {
                func(props);
            });
        }
    }
    initBuiltInEvents() {
        this.eventHandlers["click"] = [];
    }
}
const eventBus = new EventBus();
exports.default = eventBus;
