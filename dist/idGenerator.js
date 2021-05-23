"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class idGenerator {
    constructor() {
        this.offset = 0;
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    randomId() {
        this.offset += 1;
        return this.characters.charAt(this.offset);
    }
}
const generator = new idGenerator();
exports.default = generator;
