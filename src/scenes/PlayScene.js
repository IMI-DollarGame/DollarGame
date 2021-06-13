import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSoundButton: true,
    });
    this.fontSize = 1;
    this.stepText = "Steps left: ";
    this.steps;
    this.stepsText;
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
    this.currentTutorialStep = 0;
    this.bestScoreText;
    this.undoBtn;
    this.restartBtn;
  }

  init(data) {
    this.nodes = data.nodes;
    this.edges = data.edges;
    this.maximumStepAllowed = data.maximumStepAllowed;
    this.level = data.level;
    this.difficulty = data.difficulty;
    this.tutorialMode = data.tutorialMode;
    this.tutorialSteps = data.tutorialSteps;
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
    if (this.tutorialMode === true) {
      this.createTutorialButton();
      this.turnOnTutorialMode();
    }
    super.create();
  }

  turnOnTutorialMode() {
    this.setNodeValueTextVisible(false);
    this.setNodeInputState(false);
    this.setBestscoreTextVisible(false);
    this.setStepTextVisible(false);
    this.setUndoButtonVisible(false);
    this.setRestartButtonVisible(false);
    //this.chageEdgeVisible(false);
  }

  renewScene() {
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
    this.currentTutorialStep = 0;
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
      lineStyle: { width: 4, color: 0xffffff },
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
    let nodeImage = this.createNodeImage(this.getNodeImage(value));

    let nodeValueText = this.createNodeValueText(value);

    let container = this.add.container(
      this.config.width * coordX,
      this.config.height * coordY,
      [nodeImage, nodeValueText]
    );
    container.setSize(innerWidth / 10, innerHeight / 10);

    var node = new Node(id, value, container);
    this.nodesArray.push(node);
  }

  createNodeImage(image) {
    let nodeImage = this.add.image(0, 0, image);
    this.scaleObject(nodeImage, 10);
    return nodeImage;
  }

  createNodeValueText(value) {
    let nodeValueText = this.add.text(
      innerWidth / 20,
      -innerHeight / 20,
      value,
      {
        fontSize: `${this.fontSize}vw`,
        fill: "#000",
        fontStyle: "bold",
      }
    );

    return nodeValueText;
  }

  setNodeValueTextVisible(state) {
    this.nodesArray.forEach((element) => {
      element.container.getAt(1).visible = state;
    });
  }

  setupNodeClick() {
    this.soundNode = this.sound.add("soundNode", { volume: 3.0 });
    this.nodesArray.forEach((node) => {
      node.container.setInteractive().on("pointerdown", () => {
        node.decreaseNodeValue();
        node.updateNeighborNodeValue();
        this.updateValues();
        this.updateNodeImages();
        if (this.game.config.soundPlaying === true) {
          this.soundNode.play();
        }
        if (!this.tutorialMode) {
          this.updateSteps();
          this.checkWinLoseCondition();
        }
      });
    });
  }

  setNodeInputState(state) {
    this.nodesArray.forEach((node) => {
      node.container.input.enabled = state;
    });
  }

  setBestscoreTextVisible(state) {
    this.bestScoreText.visible = state;
  }

  setStepTextVisible(state) {
    this.stepsText.visible = state;
  }

  setUndoButtonVisible(state) {
    this.undoBtn.visible = state;
  }

  setRestartButtonVisible(state) {
    this.restartBtn.visible = state;
  }

  addEdge(nodeIdA, nodeIdB) {
    let edge = new Edge(
      this.getNodeFromId(nodeIdA),
      this.getNodeFromId(nodeIdB)
    );
    this.graphics.strokeLineShape(edge.getEdgeLine());

    //let edgeImage = this.add.image(edge.getEdgeCoordX(),edge.getEdgeCoordY(), "bridge");

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

      this.addCompletedLevel(this.level, this.difficulty);

      this.scene.start("EndGameScene", {
        message: "Level Completed",
      });
    } else if (this.steps == 0) {
      this.scene.start("EndGameScene", {
        message: "You ran out of steps. Game over!!",
      });
    }
  }

  drawGraph() {
    this.drawNodes();
    this.setupNodeClick();
    this.drawEdges();
  }

  drawNodes() {
    for (var i = 0; i < this.nodes.length; i++) {
      this.addNode(
        this.nodes[i].id,
        this.nodes[i].value,
        this.nodes[i].x,
        this.nodes[i].y
      );
    }
  }

  drawEdges() {
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
    this.bestScoreText = this.add.text(
      innerWidth / 2,
      innerHeight / 10,
      `Best Score: ${0}`
    );

    if (bestScore) {
      this.bestScoreText.setText(`Best Score: ${bestScore}`);
    } else {
      this.bestScoreText.setText(`Best Score: ${0}`);
    }
  }

  updateSteps() {
    this.steps--;
    this.stepsText.setText(this.stepText + this.steps);
  }

  displayRestartButton() {
    this.restartBtn = this.add
      .image(innerWidth * 0.8, this.defaultTopBtnHeight, "restart")
      .setOrigin(1, 0)
      .setInteractive();

    this.scaleObject(this.restartBtn, 20);

    this.restartBtn.on("pointerup", () => {
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
    this.undoBtn = this.add
      .image(innerWidth * 0.7, this.defaultTopBtnHeight, "undo")
      .setOrigin(0, 0)
      .setInteractive();

    this.scaleObject(this.undoBtn, 20);

    this.undoBtn.on("pointerup", () => {
      this.playButtonSound();
    });
  }

  createTutorialButton() {
    const tutorialText = this.add.text(-150, -50, this.getHelpText(), {
      fontFamily: "Indie Flower, cursive",
      fontSize: 20,
      wordWrap: { width: 350, useAdvancedWrap: true },
    });

    const nextButton = this.add
      .image(250, 0, "next")
      .setInteractive()
      .on("pointerdown", () => {
        this.changeTutorialStep("next", tutorialText);
      });
    this.scaleObject(nextButton, 20);

    const prevButton = this.add
      .image(-250, 0, "previous")
      .setInteractive()
      .on("pointerdown", () => {
        this.changeTutorialStep("previous", tutorialText);
      });
    this.scaleObject(prevButton, 20);

    const container = this.add.container(
      this.config.width * 0.5,
      this.config.height * 0.1,
      [nextButton, prevButton, tutorialText]
    );
    container.setSize(innerWidth / 10, innerHeight / 10);
  }

  changeTutorialStep(action, tutorialText) {
    if (action == "next") {
      if (this.currentTutorialStep < this.tutorialSteps.length - 1)
        this.currentTutorialStep++;
    } else {
      if (this.currentTutorialStep > 0) this.currentTutorialStep--;
    }
    tutorialText.setText(this.getHelpText());
    //this.clearGraph();
    this.updateTutorialScene();
  }

  getHelpText() {
    return this.tutorialSteps[this.currentTutorialStep].text;
  }

  updateTutorialScene() {
    //show islands
    if (this.currentTutorialStep == 0) {
      this.setNodeValueTextVisible(false);
      //this.chageEdgeVisible(false);
    }
    //show island values
    else if (this.currentTutorialStep == 1) {
      this.setNodeValueTextVisible(true);
      //this.chageEdgeVisible(false);
    }
    //show edges
    else if (this.currentTutorialStep == 2) {
      this.drawEdges();
      this.setNodeInputState(false);
    }
    //make nodes clickable
    else if (this.currentTutorialStep == 3) {
      this.setNodeInputState(true);
    }
    //make nodes clickable
    else if (this.currentTutorialStep == 4) {
      this.setStepTextVisible(false);
    }
    //show steps
    else if (this.currentTutorialStep == 5) {
      this.setStepTextVisible(true);
      this.setUndoButtonVisible(false);
    }
    //undo btn
    else if (this.currentTutorialStep == 6) {
      this.setUndoButtonVisible(true);
      this.setRestartButtonVisible(false);
    }
    //restart btn
    else if (this.currentTutorialStep == 7) {
      this.setRestartButtonVisible(true);
      this.setBestscoreTextVisible(false);
    }
    //win condition
    else if (this.currentTutorialStep == 8) {
      this.setBestscoreTextVisible(true);
    }
  }

  clearGraph() {
    this.nodesArray.forEach((element) => {
      element.container.getAt(1).destroy();
      this.destroyNodeImage(element.container.getAt(0));
    });
    this.nodesArray = [];
    this.edgesArray = [];
  }

  destroyNodeImage(image) {
    image.destroy();
    image = null;
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

  getEdgeLine() {
    return new Phaser.Geom.Line(
      this.nodeA.container.x,
      this.nodeA.container.y,
      this.nodeB.container.x,
      this.nodeB.container.y
    );
  }

  getEdgeCoordX() {
    return (this.nodeA.container.x + this.nodeB.container.x) / 2;
  }

  getEdgeCoordY() {
    return (this.nodeA.container.y + this.nodeB.container.y) / 2;
  }
}
