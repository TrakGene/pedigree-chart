"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdGenerator {
    constructor() {
        this.availableId = 0;
    }
    getId() {
        this.availableId += 1;
        return this.availableId;
    }
}
const generator = new IdGenerator();
exports.default = generator;
