abstract class Shape {
  abstract drawDot();
  abstract fillColor();
}

class FemaleShape extends Shape {
  constructor() {
    super();
  }
  drawDot() {}
  fillColor() {}
}

class MaleShape extends Shape {
  constructor() {
    super();
  }
  drawDot() {}
  fillColor() {}
}

class UnknownShape extends Shape {
  constructor() {
    super();
  }
  drawDot() {}
  fillColor() {}
}
