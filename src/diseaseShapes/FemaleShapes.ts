import Shape from "./Shape";
import camera from "../Camera";

export default class FemaleShape extends Shape {
  private x = this.pedigree.x + this.pedigree.size / 2
  private y = this.pedigree.y + this.pedigree.size / 2 
  private radius = this.pedigree.size / 2;

  private drawQuarterShape(colors) {
    for (let i = 0; i < 4; i++) {
      let startAngle = (i * Math.PI) / 2;
      let endAngle = startAngle + Math.PI / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.x + camera.OffsetX, this.y + camera.OffsetY);
      this.ctx.arc(this.x + camera.OffsetX, this.y + camera.OffsetY, this.radius, startAngle, endAngle);
      this.ctx.closePath();
      this.ctx.fillStyle = colors[i];
      this.ctx.fill();
    }
  }

  fillFirstQuarterColor(color: string) {
    const colorsSchema = ["transparent", "transparent", color, "transparent"];
    this.drawQuarterShape(colorsSchema);
  }
  fillSecondQuarterColor(color: string) {
    const colorsSchema = ["transparent", "transparent", "transparent", color];
    this.drawQuarterShape(colorsSchema);
  }
  fillThirdQuarterColor(color: string) {
    const colorsSchema = [color, "transparent", "transparent", "transparent"];
    this.drawQuarterShape(colorsSchema);
  }
  fillFourthQuarterColor(color: string) {
    const colorsSchema = ["transparent", color, "transparent", "transparent"];
    this.drawQuarterShape(colorsSchema);
  }
}
