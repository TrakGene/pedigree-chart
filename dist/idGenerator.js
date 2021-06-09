"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IdGenerator {
    constructor() {
        this.offset = -1;
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }
    randomId() {
        this.offset += 1;
        return this.characters.charAt(this.offset);
    }
}
const generator = new IdGenerator();
exports.default = generator;
