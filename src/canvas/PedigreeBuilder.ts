// import { CanvasPedigree } from ".."
// import { ICanvasPedigree } from "./interfaces"

// abstract class Builder {
//     abstract createPedigree()
//     abstract setAffected()
// }

// export class PedigreeBuilderDirector {
//     builder: Builder
//     config: ICanvasPedigree
//     canvasDiagram: HTMLCanvasElement

//     constructor(config: ICanvasPedigree, canvasDiagramId: string) {
//         this.config = config
//         this.setBuilder()
//         this.canvasDiagram = document.getElementById(canvasDiagramId) as HTMLCanvasElement
//     }

//     setBuilder() {
//         switch (this.config.sex) {
//             case 'male': {
//                 this.builder = new MaleBuilder(this.config, this.canvasDiagram); break;
//             } 
//         }
//     }
//     createPedigree() {
//         const pedigree = this.builder.createPedigree()
//         return pedigree
//     }
// }

// class MaleBuilder extends Builder {
//     config: ICanvasPedigree
//     pedigree: CanvasPedigree
//     canvasDiagram: HTMLCanvasElement

//     constructor(config: ICanvasPedigree, canvasDiagram: HTMLCanvasElement) {
//         super()
//         this.config = config
//         this.canvasDiagram = canvasDiagram
//     }

//     createPedigree() {
//         const pedigree = new CanvasPedigree()
//         return pedigree
//     }

//     initShape() {
//         const ctx = this.canvasDiagram.getContext("2d");
//         ctx.beginPath();
//         ctx.rect(this.config.x, this.config.x, this.config.size, this.config.size);
//         ctx.lineWidth = 5
//         ctx.stroke();
//         ctx.closePath();
//     }
//     setAffected() {

//     }
// }