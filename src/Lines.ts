interface MarriageLinePoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface SiblingLinePoints {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
}

interface TwinsLinePoints {
  x1: number;
  y1: number;
  x21: number;
  y21: number;
  x22: number;
  y22: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
  x5: number;
  y5: number;
}

export class MarriageLine {
  static init(
    ctx: CanvasRenderingContext2D,
    points: MarriageLinePoints,
    lineWidth: number
  ) {
    ctx.beginPath();
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x2, points.y2);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

export class ConsanguineousLine {
  static init(
    ctx: CanvasRenderingContext2D,
    points: MarriageLinePoints,
    lineWidth: number
  ) {
    const offset = 4;
    ctx.beginPath();
    ctx.moveTo(points.x1, points.y1 - offset);
    ctx.lineTo(points.x2, points.y2 - offset);
    ctx.moveTo(points.x1, points.y1 + offset);
    ctx.lineTo(points.x2, points.y2 + offset);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

export class SeparationLine {
  static init(
    ctx: CanvasRenderingContext2D,
    points: MarriageLinePoints,
    lineWidth: number
  ) {
    ctx.beginPath();
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x2, points.y2);
    ctx.moveTo(
      (points.x1 + 48 + points.x2) / 2 - 5,
      (points.y1 + points.y2) / 2 - 24
    );
    ctx.lineTo(
      (points.x1 - 48 + points.x2) / 2 - 5,
      (points.y1 + points.y2) / 2 + 24
    );
    ctx.moveTo(
      (points.x1 + 48 + points.x2) / 2 + 5,
      (points.y1 + points.y2) / 2 - 24
    );
    ctx.lineTo(
      (points.x1 - 48 + points.x2) / 2 + 5,
      (points.y1 + points.y2) / 2 + 24
    );
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

export class SiblingLine {
  static init(
    ctx: CanvasRenderingContext2D,
    points: SiblingLinePoints,
    lineWidth: number
  ) {
    ctx.beginPath();
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x2, points.y2);
    ctx.lineTo(points.x2, points.y3 - 100);
    ctx.lineTo(points.x3, points.y3 - 100);
    ctx.lineTo(points.x3, points.y3);
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}

export class TwinsLine {
  static init(
    ctx: CanvasRenderingContext2D,
    points: TwinsLinePoints,
    lineWidth: number
  ) {
    ctx.beginPath();
    // line to connect twins
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x21, points.y21);
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x22, points.y22);

    // line connecting to diagram
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x3, points.y3);
    ctx.lineTo(points.x4, points.y4);
    ctx.lineTo(points.x5, points.y5);

    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}
export class IdenticalTwinsLine {
  static init(
    ctx: CanvasRenderingContext2D,
    points: TwinsLinePoints,
    lineWidth: number
  ) {
    ctx.beginPath();
    // line to connect twins
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x21, points.y21);
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x22, points.y22);

    ctx.moveTo(points.x1, points.y1 + 50);
    // ctx.moveTo(points.x21, points.y1+30);
    const middleX1 = (points.x21 - points.x1) / 2;
    ctx.lineTo(points.x1 + middleX1, points.y1 + 50);
    const middleX2 = (points.x22 - points.x1) / 2;
    ctx.lineTo(points.x1 + middleX2, points.y1 + 50);

    // line connecting to diagram
    ctx.moveTo(points.x1, points.y1);
    ctx.lineTo(points.x3, points.y3);
    ctx.lineTo(points.x4, points.y4);
    ctx.lineTo(points.x5, points.y5);

    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.closePath();
  }
}
