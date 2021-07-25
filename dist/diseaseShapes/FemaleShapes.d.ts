import Shape from "./Shape";
export default class FemaleShape extends Shape {
    private x;
    private y;
    private radius;
    private drawQuarterShape;
    fillFirstQuarterColor(color: string): void;
    fillSecondQuarterColor(color: string): void;
    fillThirdQuarterColor(color: string): void;
    fillFourthQuarterColor(color: string): void;
}
