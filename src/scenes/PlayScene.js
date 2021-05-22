import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSoundButton: true,
      hasRestartButton: true,
      hasUndoButton: true
    });
    this.fontSize = 1;
    this.steps = 0;
    this.stepsText;
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
  }

  create() {
    this.createBG();
    this.addGraphics();
    this.displayNumberOfSteps();
    this.drawGraph();
    super.create();
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "play-bg")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.5;
  }

  addGraphics() {
    this.graphics = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff }
    });
  }

  addNode(id, value, coordX, coordY) {
    let nodeFront = this.physics.add.sprite(coordX, coordY, "node");
    let valueFront = this.add.text(coordX - 55, coordY - 80, value, {
      fontSize: `${this.fontSize}vw`,
      fill: "#000",
      fontStyle: "bold"
    });

    var node = new Node(id, value, coordX, coordY, nodeFront, valueFront);
    this.nodesArray.push(node);

    nodeFront.setInteractive().on("pointerdown", () => {
      this.steps++;
      this.stepsText.setText("steps: " + this.steps);
      node.decreaseNodeValue();
      node.updateNeighborNodeValue();
      this.updateValues();
      if (this.checkWinCondition()) {
        this.displayEndgameMess();
      }
    });
  }

  displayEndgameMess() {
    const posX = this.config.width / 2;
    const posY = this.config.height / 2;
    let winnerText = this.make.text({
      x: posX,
      y: posY,
      text: "Congratulations, you won the game!!!",
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontFamily: "Indie Flower, cursive",
        fontSize: `${2}vw`,
        fill: "#F00",
        stroke: "#FF0",
        strokeThickness: 1,
        wordWrap: { width: 400, useAdvancedWrap: true },
        align: "center"
      }
    });
  }

  updateValues() {
    this.nodesArray.forEach(element => {
      element.valueFront.setText(element.value);
    });
  }

  getNodeFromId(nodeId) {
    var node;
    this.nodesArray.forEach(element => {
      if (element.id === nodeId) {
        node = element;
      }
    });
    return node;
  }

  addEdge(nodeIdA, nodeIdB) {
    let edge = new Edge(
      this.getNodeFromId(nodeIdA),
      this.getNodeFromId(nodeIdB)
    );
    this.graphics.strokeLineShape(edge.getEdgeCoord());
    this.edgesArray.push(edge);
  }

  checkWinCondition() {
    return this.nodesArray.every(element => element.isPositiveValue());
  }

  drawGraph() {
    this.addNode("A", -2, 600, 350);
    this.addNode("B", -1, 1000, 350);
    this.addNode("C", 2, 800, 500);
    this.addNode("D", 5, 600, 650);
    this.addNode("E", -2, 1000, 650);
    this.addEdge("A", "D");
    this.addEdge("A", "C");
    this.addEdge("B", "C");
    this.addEdge("D", "E");
    this.addEdge("C", "E");
  }

  displayNumberOfSteps() {
    const posX = this.config.width / 2;
    const posY = this.config.height * 0.1;

    this.stepsText = this.add.text(posX, posY, "steps: " + this.steps, {
      fontFamily: "Indie Flower, cursive",
      fontSize: `${2}vw`,
      fill: "#F00",
      stroke: "#FF0",
      strokeThickness: 1,
      wordWrap: { width: 300, useAdvancedWrap: true },
      align: "center"
    });
  }
}

export default PlayScene;

class Node {
  constructor(id, value, coordX, coordY, nodeFront, valueFront) {
    this.id = id;
    this.value = value;
    this.coordX = coordX;
    this.coordY = coordY;
    this.nodeFront = nodeFront;
    this.valueFront = valueFront;
    this.neighborNodes = [];
  }

  addNodeNeighbor(node) {
    if (this.neighborNodes.indexOf(node) == -1) this.neighborNodes.push(node);
  }

  decreaseNodeValue() {
    this.value = this.value - this.neighborNodes.length;
  }

  increaseNodeValueBy1() {
    this.value++;
  }

  updateNeighborNodeValue() {
    this.neighborNodes.forEach(element => {
      element.increaseNodeValueBy1();
    });
  }

  isPositiveValue() {
    if (this.value >= 0) return true;
    else return false;
  }

  isNegativeValue() {
    if (this.value < 0) return true;
    else return false;
  }
}

class Edge {
  constructor(nodeA, nodeB) {
    this.nodeA = nodeA;
    this.nodeB = nodeB;
    this.init();
  }

  init() {
    this.nodeA.addNodeNeighbor(this.nodeB);
    this.nodeB.addNodeNeighbor(this.nodeA);
  }

  getEdgeCoord() {
    return new Phaser.Geom.Line(
      this.nodeA.coordX,
      this.nodeA.coordY,
      this.nodeB.coordX,
      this.nodeB.coordY
    );
  }
}
