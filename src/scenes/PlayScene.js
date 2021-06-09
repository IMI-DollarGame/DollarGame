import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true,
    });
    this.fontSize = 1;
    this.steps = 0;
    this.stepText = "Steps left: ";
    this.steps;
    this.stepsText;
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
  }

  init(data) {
    this.nodes = data.nodes;
    this.edges = data.edges;
    this.maximumStepAllowed = data.maximumStepAllowed;
  }

  create() {
    this.renewScene();
    this.createBG();
    this.addGraphics();
    this.setMaxSteps();
    this.displayBestScore();
    this.displayRestartButton();
    this.displayUndoButton();
    this.drawGraph();
    super.create();
    this.createBackButton();
  }

  createBackButton() {
    const backButton = this.add
      .image(innerWidth / 20, innerHeight / 20, "arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(backButton, 20);

    backButton.on("pointerup", () => {
      this.playButtonSound();
      this.scene.stop();
      this.scene.start("LevelsScene");
    });
  }

  renewScene() {
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
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
      lineStyle: { width: 8, color: 0xffffff },
    });
  }

  getNodeImage(value) {
    if (value < 1) return "node1";
    else if (value >= 1 && value < 4) return "node2";
    else return "node3";
  }

  updateNodeImages() {
    this.nodesArray.forEach((element) => {
      element.container.getAt(0).setTexture(this.getNodeImage(element.value));
    });
  }

  addNode(id, value, coordX, coordY) {
    let nodeImage = this.add.image(0, 0, this.getNodeImage(value));
    this.scaleObject(nodeImage, 10);

    let nodeValueText = this.add.text(
      -innerWidth / 20,
      -innerHeight / 20,
      value,
      {
        fontSize: `${this.fontSize}vw`,
        fill: "#000",
        fontStyle: "bold",
      }
    );

    let container = this.add.container(
      this.config.width * coordX,
      this.config.height * coordY,
      [nodeImage, nodeValueText]
    );
    container.setSize(innerWidth / 10, innerHeight / 10);

    var node = new Node(id, value, container);
    this.nodesArray.push(node);
    this.setupNodeClick(node);
  }

  setupNodeClick(node) {
    this.soundNode = this.sound.add("soundNode", { volume: 3.0 });
    node.container.setInteractive().on("pointerdown", () => {
      this.updateSteps();
      node.decreaseNodeValue();
      node.updateNeighborNodeValue();
      this.updateValues();
      this.updateNodeImages();
      if (this.game.config.soundPlaying === true) {
        this.soundNode.play();
      }
      this.checkWinLoseCondition();
    });
  }

  addEdge(nodeIdA, nodeIdB) {
    let edge = new Edge(
      this.getNodeFromId(nodeIdA),
      this.getNodeFromId(nodeIdB)
    );
    this.graphics.strokeLineShape(edge.getEdgeCoord());
    this.edgesArray.push(edge);
  }

  updateValues() {
    this.nodesArray.forEach((element) => {
      element.container.getAt(1).setText(element.value);
    });
  }

  getNodeFromId(nodeId) {
    var node;
    this.nodesArray.forEach((element) => {
      if (element.id === nodeId) {
        node = element;
      }
    });
    return node;
  }

  checkWinLoseCondition() {
    if (this.nodesArray.every((element) => element.isPositiveValue())) {
      const bestScoreText = localStorage.getItem("bestScore");
      const bestScore = bestScoreText && parseInt(bestScoreText, 10);
      if (!bestScore || this.steps > bestScore) {
        localStorage.setItem("bestScore", this.steps);
      }
      sessionStorage.setItem("currentScore", this.steps)
      this.scene.start("EndGameScene", { message: "Level Completed" });
    } else if (this.steps == 0) {
      this.scene.start("EndGameScene", {
        message: "You ran out of steps. Game over!!",
      });
    }
  }

  drawGraph() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.addNode(
        this.nodes[i].id,
        this.nodes[i].value,
        this.nodes[i].x,
        this.nodes[i].y
      );
    }
    for (var i = 0; i < this.edges.length; i++) {
      this.addEdge(this.edges[i].nodeA, this.edges[i].nodeB);
    }
  }

  setMaxSteps() {
    this.steps = this.maximumStepAllowed;
    this.stepsText = this.add.text(
      innerWidth / 2,
      innerHeight / 20,
      this.stepText + this.steps,
      {
        fontSize: "30px",
        fill: "#000",
        align: "center",
      }
    );
  }

  displayBestScore() {
    const bestScore = localStorage.getItem("bestScore");
    const bestScoreText = this.add.text(
      innerWidth / 2,
      innerHeight / 10,
      `Best Score: ${0}`
    );

    if (bestScore) {
      bestScoreText.setText(`Best Score: ${bestScore}`);
    } else {
      bestScoreText.setText(`Best Score: ${0}`);
    }
  }

  updateSteps() {
    this.steps--;
    this.stepsText.setText(this.stepText + this.steps);
  }

  displayRestartButton() {
    const restartBtn = this.add
      .image(innerWidth * 0.8, this.defaultTopBtnHeight, "restart")
      .setOrigin(1, 0)
      .setInteractive();

    this.scaleObject(restartBtn, 20);

    restartBtn.on("pointerup", () => {
      this.playButtonSound();
      this.steps = this.maximumStepAllowed;
      this.stepsText.setText(this.stepText + this.steps);
      this.resetTheGame();
    });
  }

  resetTheGame() {
    this.nodesArray.forEach((element) => {
      element.resetValue();
    });
    this.updateValues();
    this.updateNodeImages();
  }

  displayUndoButton() {
    const undoBtn = this.add
      .image(innerWidth * 0.7, this.defaultTopBtnHeight, "undo")
      .setOrigin(0, 0)
      .setInteractive();

    this.scaleObject(undoBtn, 20);

    undoBtn.on("pointerup", () => {
      this.playButtonSound();
    });
  }
}

export default PlayScene;

class Node {
  constructor(id, value, container) {
    this.id = id;
    this.value = value;
    this.container = container;
    this.neighborNodes = [];
    this.baseValue = value;
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
    this.neighborNodes.forEach((element) => {
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

  resetValue() {
    this.value = this.baseValue;
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
      this.nodeA.container.x,
      this.nodeA.container.y,
      this.nodeB.container.x,
      this.nodeB.container.y
    );
  }
}
