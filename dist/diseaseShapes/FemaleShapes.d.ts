import Shape from "./Shape";
export default class FemaleShape extends Shape {
    private radius;
    private drawQuarterShape;
    fillFirstQuarterColor(color: string): void;
    fillSecondQuarterColor(color: string): void;
    fillThirdQuarterColor(color: string): void;
    fillFourthQuarterColor(color: string): void;
}
