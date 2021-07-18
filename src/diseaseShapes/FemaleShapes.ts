import Shape from "./Shape";
import Camera from "../Camera";

export default class FemaleShape extends Shape {
  drawDot(color: string) {
    const size = 15;
    this.ctx.beginPath();
    this.ctx.arc(
      this.pedigree.x + this.pedigree.size / 2 + Camera.OffsetX,
      this.pedigree.y + this.pedigree.size / 2 + Camera.OffsetY,
      size / 2,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.closePath();
  }
  fillColor(color: string) {
    this.pedigree.fillColor = color
  }
  fillFirstQuarterColor(color: string) {
    const cx=this.pedigree.x+this.pedigree.size/2;
    const cy=this.pedigree.y+this.pedigree.size/2;
    const radius=this.pedigree.size/2;
    const colors=['white', 'white', color, 'white'];

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
    const colors=['white', 'white', color, 'white'];

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
    const colors=['white', 'white', color, 'white'];

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
    const colors=['white', 'white', color, 'white'];

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