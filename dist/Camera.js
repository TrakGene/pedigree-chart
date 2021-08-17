"use strict";
/**
 * Used for navigaton. Append points by offset to achieve diagram panning functionality.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Camera {
    constructor() {
        this.OffsetX = 0;
        this.OffsetY = 0;
    }
}
const camera = new Camera();
exports.default = camera;
