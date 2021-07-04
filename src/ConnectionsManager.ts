import { BasePedigree } from "./Pedigree";
import {
  SiblingLine,
  MarriageLine,
  ConsanguineousLine,
  SeparationLine,
  TwinsLine,
  IdenticalTwinsLine,
} from "./Lines";
import Camera from "./Camera";

interface Connection {
  pedigreeA: BasePedigree;
  pedigreeB: BasePedigree;
  type: string;
}

interface TwinConnection {
  parent: BasePedigree;
  twinA: BasePedigree;
  twinB: BasePedigree;
  type: string;
}

export default class ConnectionsManager {
  pedigreeDiagram: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  linesToRender: Array<Connection> = [];
  twinLinesToRender: Array<TwinConnection> = [];
  lineWidth = 2;

  constructor(diagram) {
    this.pedigreeDiagram = diagram;
    this.ctx = diagram.getContext("2d");
  }

  createConnection(pedigreeA, pedigreeB, lineType) {
    this.linesToRender.push({
      pedigreeA: pedigreeA,
      pedigreeB: pedigreeB,
      type: lineType,
    });
  }

  createTwinsConnection(parent, twinA, twinB, type) {
    this.twinLinesToRender.push({
      parent: parent,
      twinA: twinA,
      twinB: twinB,
      type: type,
    });
  }

  removeConnection(id) {
    for (let index = 0; index < this.linesToRender.length; index++) {
      const element = this.linesToRender[index];
      if (id == element.pedigreeA.id || id == element.pedigreeB.id) {
        this.linesToRender.splice(index, 1);
      }
    }
    for (let index = 0; index < this.linesToRender.length; index++) {
      const element = this.linesToRender[index];
      if (id == element.pedigreeA.id || id == element.pedigreeB.id) {
        this.linesToRender.splice(index, 1);
      }
    }
  }

  drawConnections() {
    this.linesToRender.forEach((connection) => {
      if (connection.type == "marriage") {
        this.drawMarriageLines(connection);
      }
      if (connection.type == "sibling") {
        this.drawSiblingLines(connection);
      }
      if (connection.type == "separation") {
        this.drawSeparationLines(connection);
      }
      if (connection.type == "consanguineous") {
        this.drawConsanguineousLines(connection);
      }
    });
    this.twinLinesToRender.forEach((connection) => {
      if (connection.type == "non-identical") {
        this.drawTwinsLines(connection);
      }
      if (connection.type == "identical") {
        this.drawIdenticalTwinsLines(connection);
      }
    });
  }

  drawMarriageLines(connection: Connection) {
    const nodeA: BasePedigree = connection.pedigreeA;
    const nodeB: BasePedigree = connection.pedigreeB;
    const pointsToRender = {
      x1: nodeA.calculateMiddle().x + Camera.OffsetX,
      y1: nodeA.calculateMiddle().y + Camera.OffsetY,
      x2: nodeB.calculateMiddle().x + Camera.OffsetX,
      y2: nodeB.calculateMiddle().y + Camera.OffsetY,
    };
    MarriageLine.init(this.ctx, pointsToRender, this.lineWidth);
  }

  drawConsanguineousLines(connection: Connection) {
    const nodeA: BasePedigree = connection.pedigreeA;
    const nodeB: BasePedigree = connection.pedigreeB;
    const pointsToRender = {
      x1: nodeA.calculateMiddle().x + Camera.OffsetX,
      y1: nodeA.calculateMiddle().y + Camera.OffsetY,
      x2: nodeB.calculateMiddle().x + Camera.OffsetX,
      y2: nodeB.calculateMiddle().y + Camera.OffsetY,
    };
    ConsanguineousLine.init(this.ctx, pointsToRender, this.lineWidth);
  }

  drawSeparationLines(connection: Connection) {
    const nodeA: BasePedigree = connection.pedigreeA;
    const nodeB: BasePedigree = connection.pedigreeB;
    const pointsToRender = {
      x1: nodeA.calculateMiddle().x + Camera.OffsetX,
      y1: nodeA.calculateMiddle().y + Camera.OffsetY,
      x2: nodeB.calculateMiddle().x + Camera.OffsetX,
      y2: nodeB.calculateMiddle().y + Camera.OffsetY,
    };
    SeparationLine.init(this.ctx, pointsToRender, this.lineWidth);
  }

  drawSiblingLines(connection: Connection) {
    const nodeA: BasePedigree = connection.pedigreeA;
    const nodeB: BasePedigree = connection.pedigreeB;

    const x1 = nodeA.calculateMiddle().x;
    const y1 = nodeA.calculateMiddle().y;

    // Distance beetwen pedigreeA and pedigreeB
    let shift = (nodeA.x - (nodeB.x + nodeB.size)) / 2;
    let x2;
    x2 = nodeB.x + nodeB.size + shift;
    if (nodeA.marriagePartner) {
      shift =
        (nodeA.x - (nodeA.marriagePartner.x + nodeA.marriagePartner.size)) / 2;
      x2 = nodeA.marriagePartner.x + nodeA.marriagePartner.size + shift;
    }

    const y2 = y1

    const y3 = nodeB.calculateMiddle().y;
    const x3 = nodeB.calculateMiddle().x;

    const pointsToRender = {
      x1: x1 + Camera.OffsetX,
      y1: y1 + Camera.OffsetY,
      x2: x2 + Camera.OffsetX,
      y2: y2 + Camera.OffsetY,
      x3: x3 + Camera.OffsetX,
      y3: y3 + Camera.OffsetY,
    };
    SiblingLine.init(this.ctx, pointsToRender, this.lineWidth);
  }

  drawTwinsLines(connection: TwinConnection) {
    const twinA: BasePedigree = connection.twinA
    const twinB: BasePedigree = connection.twinB
    const parent: BasePedigree = connection.parent

    // Point where twins are connected
    const x1 = (twinA.calculateMiddle().x + twinB.calculateMiddle().x) / 2;

    // Middle of twin A
    const x21 = twinA.calculateMiddle().x
    const y21 = twinA.calculateMiddle().y

    // Middle of twin B
    const x22 = twinB.calculateMiddle().x
    const y22 = twinB.calculateMiddle().y

    // Calculate twin connection length
    const y1 = y21 - 100 | y22 - 100

    // Connection to the parent
    if (!parent.marriagePartner) {
      const x3 = x1;
      const y3 = (y1 + (parent.y + parent.size / 2)) / 2;
      const x4 = parent.x + parent.size / 2;
      const y4 = y3;
      const x5 = x4;
      const y5 = parent.y + parent.size / 2;
      const pointsToRender = {
        x1: x1 + Camera.OffsetX,
        y1: y1 + Camera.OffsetY,
        x21: x21 + Camera.OffsetX,
        y21: y21 + Camera.OffsetY,
        x22: x22 + Camera.OffsetX,
        y22: y22 + Camera.OffsetY,
        x3: x3 + Camera.OffsetX,
        y3: y3 + Camera.OffsetY,
        x4: x4 + Camera.OffsetX,
        y4: y4 + Camera.OffsetY,
        x5: x5 + Camera.OffsetX,
        y5: y5 + Camera.OffsetY,
      };

      TwinsLine.init(this.ctx, pointsToRender, this.lineWidth);
    } else {
      const nodeA = parent;
      const nodeB = parent.marriagePartner;

      let shift = (nodeA.x - (nodeB.x + nodeB.size)) / 2;
      let x3;
      x3 = nodeB.x + nodeB.size + shift;
      if (nodeA.marriagePartner) {
        shift =
          (nodeA.x - (nodeA.marriagePartner.x + nodeA.marriagePartner.size)) /
          2;
        x3 = nodeA.marriagePartner.x + nodeA.marriagePartner.size + shift;
      }
      const y3 = y1;

      const x4 = x3;
      const y4 = parent.y + parent.size / 2;

      const x5 = parent.x + parent.size / 2;
      const y5 = y4;
      const pointsToRender = {
        x1: x1 + Camera.OffsetX,
        y1: y1 + Camera.OffsetY,
        x21: x21 + Camera.OffsetX,
        y21: y21 + Camera.OffsetY,
        x22: x22 + Camera.OffsetX,
        y22: y22 + Camera.OffsetY,
        x3: x3 + Camera.OffsetX,
        y3: y3 + Camera.OffsetY,
        x4: x4 + Camera.OffsetX,
        y4: y4 + Camera.OffsetY,
        x5: x5 + Camera.OffsetX,
        y5: y5 + Camera.OffsetY,
      };
      TwinsLine.init(this.ctx, pointsToRender, this.lineWidth);
    }
  }

  drawIdenticalTwinsLines(connection: TwinConnection) {
    const twinA: BasePedigree = connection.twinA
    const twinB: BasePedigree = connection.twinB
    const parent: BasePedigree = connection.parent

    // Point where twins are connected
    const x1 = (twinA.calculateMiddle().x + twinB.calculateMiddle().x) / 2;

    // Middle of twin A
    const x21 = twinA.calculateMiddle().x
    const y21 = twinA.calculateMiddle().y

    // Middle of twin B
    const x22 = twinB.calculateMiddle().x
    const y22 = twinB.calculateMiddle().y

    // Calculate twin connection length
    const y1 = y21 - 100 | y22 - 100

    // Connection to the parent
    if (!parent.marriagePartner) {
      const x3 = x1;
      const y3 = (y1 + (parent.y + parent.size / 2)) / 2;
      const x4 = parent.x + parent.size / 2;
      const y4 = y3;
      const x5 = x4;
      const y5 = parent.y + parent.size / 2;
      const points = {
        x1: x1 + Camera.OffsetX,
        y1: y1 + Camera.OffsetY,
        x21: x21 + Camera.OffsetX,
        y21: y21 + Camera.OffsetY,
        x22: x22 + Camera.OffsetX,
        y22: y22 + Camera.OffsetY,
        x3: x3 + Camera.OffsetX,
        y3: y3 + Camera.OffsetY,
        x4: x4 + Camera.OffsetX,
        y4: y4 + Camera.OffsetY,
        x5: x5 + Camera.OffsetX,
        y5: y5 + Camera.OffsetY,
      };

      IdenticalTwinsLine.init(this.ctx, points, this.lineWidth);
    } else {
      const nodeA = parent;
      const nodeB = parent.marriagePartner;

      let shift = (nodeA.x - (nodeB.x + nodeB.size)) / 2;
      let x3;
      x3 = nodeB.x + nodeB.size + shift;
      if (nodeA.marriagePartner) {
        shift =
          (nodeA.x - (nodeA.marriagePartner.x + nodeA.marriagePartner.size)) /
          2;
        x3 = nodeA.marriagePartner.x + nodeA.marriagePartner.size + shift;
      }
      const y3 = y1;

      const x4 = x3;
      const y4 = parent.y + parent.size / 2;

      const x5 = parent.x + parent.size / 2;
      const y5 = y4;
      const points = {
        x1: x1 + Camera.OffsetX,
        y1: y1 + Camera.OffsetY,
        x21: x21 + Camera.OffsetX,
        y21: y21 + Camera.OffsetY,
        x22: x22 + Camera.OffsetX,
        y22: y22 + Camera.OffsetY,
        x3: x3 + Camera.OffsetX,
        y3: y3 + Camera.OffsetY,
        x4: x4 + Camera.OffsetX,
        y4: y4 + Camera.OffsetY,
        x5: x5 + Camera.OffsetX,
        y5: y5 + Camera.OffsetY,
      };
      IdenticalTwinsLine.init(this.ctx, points, this.lineWidth);
    }
  }
}
