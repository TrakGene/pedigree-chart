"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdenticalTwinsLine = exports.TwinsLine = exports.SiblingLine = exports.SeparationLine = exports.ConsanguineousLine = exports.MarriageLine = void 0;
class MarriageLine {
    static init(ctx, points, lineWidth) {
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
    }
}
exports.MarriageLine = MarriageLine;
class ConsanguineousLine {
    static init(ctx, points, lineWidth) {
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
exports.ConsanguineousLine = ConsanguineousLine;
class SeparationLine {
    static init(ctx, points, lineWidth) {
        ctx.beginPath();
        ctx.moveTo(points.x1, points.y1);
        ctx.lineTo(points.x2, points.y2);
        ctx.moveTo((points.x1 + 48 + points.x2) / 2 - 5, (points.y1 + points.y2) / 2 - 24);
        ctx.lineTo((points.x1 - 48 + points.x2) / 2 - 5, (points.y1 + points.y2) / 2 + 24);
        ctx.moveTo((points.x1 + 48 + points.x2) / 2 + 5, (points.y1 + points.y2) / 2 - 24);
        ctx.lineTo((points.x1 - 48 + points.x2) / 2 + 5, (points.y1 + points.y2) / 2 + 24);
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
    }
}
exports.SeparationLine = SeparationLine;
class SiblingLine {
    static init(ctx, points, lineWidth) {
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
exports.SiblingLine = SiblingLine;
class TwinsLine {
    static init(ctx, points, lineWidth) {
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
exports.TwinsLine = TwinsLine;
class IdenticalTwinsLine {
    static init(ctx, points, lineWidth) {
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
exports.IdenticalTwinsLine = IdenticalTwinsLine;
