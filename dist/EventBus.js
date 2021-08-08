"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBus {
    constructor() {
        this.eventHandlers = {};
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
    remove(eventName) {
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
    }
}
const eventBus = new EventBus();
exports.default = eventBus;
