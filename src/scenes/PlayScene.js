import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
    });
    this.stepText = "Steps left till you die: ";
    this.maximumStepAllowed = 30;
    this.steps; 
    this.stepsText; 
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
  }

  create() {
    this.addBackGround();
    this.addGraphics();
    this.setMaxSteps();
    this.displayBestScore();
    this.displaySoundButton();
    this.displayRestartButton();
    this.displayUndoButton();
    this.drawGraph();
    super.create();
  }

  addBackGround() {
    const backGround = this.add.image(0, 0, "paper").setOrigin(0, 0);
    backGround.displayHeight = innerHeight;
    backGround.displayWidth = innerWidth;
  }

  addGraphics() {
    this.graphics = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });
  }

  addNode(id, value, coordX, coordY) {
    let nodeImage = this.physics.add.sprite(0, 0, "node");
    let nodeValueText = this.add.text(-55, -80, value, {
      fontSize: "20px",
      fill: "#000",
      fontStyle: "bold",
    });

    let nodeContainer = this.add.container(coordX, coordY, [
      nodeImage,
      nodeValueText,
    ]);
    nodeContainer.setSize(128, 128);

    var node = new Node(id, value, nodeContainer);
    this.nodesArray.push(node);

    nodeContainer.setInteractive().on("pointerdown", () => {
      this.updateSteps();
      node.decreaseNodeValue();
      node.updateNeighborNodeValue();
      this.updateValues();
      if (this.checkWinCondition()) {
        this.winTheGame();
      } else {
        if (this.steps == 0) {
          this.loseTheGame();
        }
      }
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

  checkWinCondition() {
    return this.nodesArray.every((element) => element.isPositiveValue());
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

  setMaxSteps() {
    this.steps = this.maximumStepAllowed;
    this.stepsText = this.add.text(
      800,
      100,
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
    const bestScoreText = this.add.text(800, 200, `Best Score: ${0}`);

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

  displaySoundButton() {
    this.bgMusic = this.sound.add("music", { volume: 0.5,loop: true });

    const soundButton = this.add
      .sprite(-750, innerHeight / 10, "sound")
      .setScale(1.9);
    const soundButtonOff = this.add
      .sprite(innerWidth * 0.9, innerHeight / 10, "soundOff")
      .setScale(1.9);

      soundButton.setInteractive().on("pointerdown", () => {
        soundButtonOff.x = innerWidth * 0.9;
        soundButton.x = -750;
        this.game.config.bgMusicPlaying = false;
        this.game.sound.stopAll();
      });

      soundButtonOff.setInteractive().on("pointerdown", () => {
        soundButtonOff.x = -750;
        soundButton.x = innerWidth * 0.9;
        this.game.config.bgMusicPlaying = true;
        this.bgMusic.play();
      });
  }

  displayRestartButton() {
    const restartBtn = this.add
      .image(innerWidth * 0.8, innerHeight / 20, "restart")
      .setOrigin(1, 0)
      .setInteractive();

    restartBtn.on("pointerup", () => {
      this.steps = this.maximumStepAllowed;
      this.stepsText.setText(this.stepText + this.steps);
      this.resetTheGame();
    });
  }

  resetTheGame(){
    this.nodesArray.forEach((element) => {
      element.resetValue();
    });
    this.updateValues();
  }

  displayUndoButton() {
    const undoBtn = this.add
      .image(innerWidth * 0.85, innerHeight / 15, "undo")
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(0.7);

    undoBtn.on("pointerup", () => {
      //TODO: undo to be implemented here;
      //////////////////
      // this.steps--;
      // this.stepsText.setText("steps: " + this.steps);
    });
  }

  winTheGame() {

    const bestScoreText = localStorage.getItem("bestScore");
    const bestScore = bestScoreText && parseInt(bestScoreText, 10);
    if (!bestScore || this.steps > bestScore) {
      localStorage.setItem("bestScore", this.steps);
    }
    this.scene.start("WinScene");
  }

  loseTheGame() {
    const looserText = this.add.text(
      800,
      200,
      "Game over :( You used too many steps  ",
      {
        fontSize: "50px",
        fill: "#000",
        fontStyle: "bold",
      }
    );
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
      this.nodeA.coordX,
      this.nodeA.coordY,
      this.nodeB.coordX,
      this.nodeB.coordY
    );
  }
}
