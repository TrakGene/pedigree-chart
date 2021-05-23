"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class idGenerator {
    constructor() {
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    randomId() {
        return this.characters.charAt(2);
    }
}
const generator = new idGenerator();
exports.default = generator;
