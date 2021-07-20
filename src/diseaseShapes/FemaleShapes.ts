import Shape from "./Shape";
import Camera from "../Camera";

export default class FemaleShape extends Shape {
  fillFirstQuarterColor(color: string) {
    const cx=this.pedigree.x+this.pedigree.size/2;
    const cy=this.pedigree.y+this.pedigree.size/2;
    const radius=this.pedigree.size/2;
    const colors=['transparent', 'transparent', color, 'transparent'];

    for(let i=0;i<4;i++){
        let startAngle=i*Math.PI/2;
        let endAngle=startAngle+Math.PI/2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.arc(cx,cy,radius,startAngle,endAngle);
        this.ctx.closePath();
        this.ctx.fillStyle=colors[i];
        this.ctx.fill();
    }
  }
  fillSecondQuarterColor(color: string) {
    const cx=this.pedigree.x+this.pedigree.size/2;
    const cy=this.pedigree.y+this.pedigree.size/2;
    const radius=this.pedigree.size/2;
    const colors=['transparent', 'transparent', 'transparent', color];


    for(let i=0;i<4;i++){
        let startAngle=i*Math.PI/2;
        let endAngle=startAngle+Math.PI/2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.arc(cx,cy,radius,startAngle,endAngle);
        this.ctx.closePath();
        this.ctx.fillStyle=colors[i];
        this.ctx.fill();
    }
  }
  fillThirdQuarterColor(color: string) {
    const cx=this.pedigree.x+this.pedigree.size/2;
    const cy=this.pedigree.y+this.pedigree.size/2;
    const radius=this.pedigree.size/2;
    const colors=[color, 'transparent', 'transparent', 'transparent'];

    for(let i=0;i<4;i++){
        let startAngle=i*Math.PI/2;
        let endAngle=startAngle+Math.PI/2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.arc(cx,cy,radius,startAngle,endAngle);
        this.ctx.closePath();
        this.ctx.fillStyle=colors[i];
        this.ctx.fill();
    }
  }
  fillFourthQuarterColor(color: string) {
    const cx=this.pedigree.x+this.pedigree.size/2;
    const cy=this.pedigree.y+this.pedigree.size/2;
    const radius=this.pedigree.size/2;
    const colors=['transparent', color, 'transparent', 'transparent'];

    for(let i=0;i<4;i++){
        let startAngle=i*Math.PI/2;
        let endAngle=startAngle+Math.PI/2;
        this.ctx.beginPath();
        this.ctx.moveTo(cx,cy);
        this.ctx.arc(cx,cy,radius,startAngle,endAngle);
        this.ctx.closePath();
        this.ctx.fillStyle=colors[i];
        this.ctx.fill();
    }
  }
}