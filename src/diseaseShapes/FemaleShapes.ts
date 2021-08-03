import Shape from "./Shape";

export default class FemaleShape extends Shape {
  private radius = this.pedigree.size / 2;

  private drawQuarterShape(colors) {
    for (let i = 0; i < 4; i++) {
      let startAngle = (i * Math.PI) / 2;
      let endAngle = startAngle + Math.PI / 2;
      this.ctx.beginPath();
      this.ctx.moveTo(this.pedigree.getMidX(), this.pedigree.getMidY());
      this.ctx.arc(this.pedigree.getMidX(), this.pedigree.getMidY(), this.radius, startAngle, endAngle);
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
