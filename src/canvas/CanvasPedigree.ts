export default class CanvasPedigree {
    element
    id
    points = []
    message
    x
    y
    dragEnabled = false
    constructor(id, message, x, y) {
        this.id = id
        this.message = message
        this.x = x
        this.y = y
    }
    create() {
        this.element = document.getElementById(this.id);
        var ctx = this.element.getContext("2d");
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        ctx.fill();
        ctx.stroke();

    }
    define() {
        var ctx = this.element.getContext("2d");
        ctx.beginPath();
        ctx.rect(this.x, this.y, 100, 100);
        ctx.fill();
        ctx.stroke();
      }
}