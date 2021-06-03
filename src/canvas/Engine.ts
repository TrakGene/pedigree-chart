import CanvasPedigree from './CanvasPedigree'

export default class Engine {
    shapes = []
    diagramId
    diagram
    ctx
    posX = 0
    posY = 0
    offsetX = 0
    offsetY = 0
    constructor(id) {
        this.diagramId = id
        this.diagram = document.getElementById(id);
        this.ctx = this.diagram.getContext("2d");
        this.diagram.onmousedown = (e) => {
            this.handleMouseDown(e)
        }
        this.diagram.onmousemove = (e) => {
            this.dragPedigree(e)
        }
        this.diagram.onmouseup = (e) => {
            for (var i = 0; i < this.shapes.length; i++) {
                var shape = this.shapes[i];
                shape.dragEnabled = false
            }
        }
    }
    dragPedigree(e) {
        var rect = this.diagram.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        for (var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            if(shape.dragEnabled) {
                shape.x = x - this.offsetX
                shape.y = y - this.offsetY
                this.draw()
            }
        }

    }
    add(msg) {
        let x = new CanvasPedigree(this.diagramId, msg, this.posX, this.posY)
        this.shapes.push(x)
        this.draw()
        this.posX = this.posX + 120
        this.posY = this.posY + 0
    }
    draw() {
        this.ctx.clearRect(0, 0, 1000, 1000)
        this.shapes.forEach(shape => {
            shape.create()
        })
    }
    handleMouseDown(e) {
        e.preventDefault();

        for (var i = 0; i < this.shapes.length; i++) {
            var shape = this.shapes[i];
            var rect = this.diagram.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            shape.define()
            if (this.ctx.isPointInPath(x, y)) {
                shape.dragEnabled = true
                this.offsetX = x - shape.x
                this.offsetY = y - shape.y
            }
        }
    }
    dragPlugin() {

    }
}