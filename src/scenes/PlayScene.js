import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true,
    });
    this.fontSize = 1;
    this.stepText = "Steps left: ";
    this.steps;
    this.stepsText;
    this.nodesArray = [];
    this.edgesArray = [];
    this.allValuesArray = [];
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
    this.tutorialMode = data.tutorialMode;
    this.tutorialSteps = data.tutorialSteps;
    this.level = data.level;
    this.difficulty = data.difficulty;
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
    this.monitorValues();
    this.displayLevelInfo();
    if (this.tutorialMode === true) {
      this.createTutorialButton();
      this.turnOnTutorialMode();
    }
    super.create();
    this.createBackButton();
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

  createBackButton() {
    const backButton = this.add
      .image(innerWidth / 20, innerHeight / 20, "arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(backButton, 20);

    backButton.on("pointerup", () => {
      this.playButtonSound();
      this.scene.stop();
      if (this.tutorialMode === true) {
        this.scene.start("MenuScene");
      } else {
        this.scene.start("LevelsScene", { difficulty: this.difficulty });
      }
    });
  }

  renewScene() {
    this.nodesArray = [];
    this.edgesArray = [];
    this.allValuesArray = [];
    this.graphics;
    this.currentTutorialStep = 0;
  }

  createBG() {
    // const backGround = this.add
    //   .image(this.config.width / 2, this.config.height / 2, "play-bg")
    //   .setOrigin(0.5, 0.5)
    //   .setScale(1.8);
    // backGround.x = backGround.displayWidth * 0.5;
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5)
      .setScale(1.0);
    backGround.x = backGround.displayWidth * 0.5;
  }

  addGraphics() {
    this.graphics = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });
  }

  getNodeImage(value) {
    if (value < -6) return "node-7";
    else if (value == -6) return "node-6";
    else if (value == -5) return "node-5";
    else if (value == -4) return "node-4";
    else if (value == -3) return "node-3";
    else if (value == -2) return "node-2";
    else if (value == -1) return "node-1";
    else if (value == 0) return "node0";
    else if (value == 1) return "node1";
    else if (value == 2) return "node2";
    else if (value == 3) return "node3";
    else if (value == 4) return "node4";
    else if (value == 5) return "node5";
    else if (value == 6) return "node6";
    else if (value > 6) return "node7";
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
    container.setDepth(1);

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

  updateStep(state) {
    if (state == "increase") {
      if (this.steps < this.maximumStepAllowed) this.steps++;
    } else {
      this.steps--;
    }
    this.stepsText.setText(this.stepText + this.steps);
  }

  setupNodeClick() {
    this.nodesArray.forEach((node) => {
      this.soundNode = this.sound.add("soundNode", { volume: 3.0 });
      node.container.setInteractive().on("pointerdown", () => {
        this.updateStep("decrease");
        node.decreaseNodeValue();
        node.updateNeighborNodeValue();
        this.updateValues();
        this.updateNodeImages();
        if (this.game.config.soundPlaying === true) {
          this.soundNode.play();
        }
        this.monitorValues();
        this.checkWinLoseCondition();
      });
    });
  }

  monitorValues() {
    let currrentValues = [];
    for (const node of this.nodesArray) {
      currrentValues.push({ id: node.id, value: node.value * 1 });
    }

    let currentValuesAndStep = {
      allValue: currrentValues,
      step: this.steps,
    };

    let currentObjIndex = this.allValuesArray.findIndex(
      (x) => x.step === this.steps
    );

    if (currentObjIndex !== -1) {
      this.allValuesArray.splice(currentObjIndex, 1, currentValuesAndStep);
    } else {
      this.allValuesArray.push(currentValuesAndStep);
    }
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

    let nodeBX = edge.nodeB.container.x;
    let nodeBY = edge.nodeB.container.y;
    let nodeAX = edge.nodeA.container.x;
    let nodeAY = edge.nodeA.container.y;
    let getXcoord;
    let getYcoord;
    let deltaX;
    let deltaY;
    let distanceBetweenX;
    let distanceBetweenY;
    let numberOfRocks;
    let prevRandom = 0;

    if (nodeBX == nodeAX) {
      getXcoord = nodeAX;
      deltaX = 0;
      distanceBetweenY = nodeBY - nodeAY;
      numberOfRocks = Math.round(distanceBetweenY / (this.config.width * 0.04));
    } else if (nodeBX > nodeAX) {
      if (nodeBX - nodeAX < 200) {
        distanceBetweenY = nodeBY - nodeAY;
        numberOfRocks = Math.round(
          distanceBetweenY / (this.config.width * 0.04)
        );
        getXcoord = nodeAX + (nodeBX - nodeAX) / numberOfRocks;
        distanceBetweenX = nodeBX - nodeAX;
        deltaX = distanceBetweenX / numberOfRocks;
      } else {
        distanceBetweenX = nodeBX - nodeAX;
        numberOfRocks = Math.round(
          distanceBetweenX / (this.config.width * 0.04)
        );
        getXcoord = nodeAX + (nodeBX - nodeAX) / numberOfRocks;
        deltaX = distanceBetweenX / numberOfRocks;
      }
    } else {
      if (nodeAX - nodeBX < 200) {
        distanceBetweenY = nodeBY - nodeAY;
        numberOfRocks = Math.round(
          distanceBetweenY / (this.config.width * 0.04)
        );
        getXcoord = nodeAX - (nodeBX - nodeAX) / numberOfRocks;
        distanceBetweenX = nodeAX - nodeBX;
        deltaX = distanceBetweenX / numberOfRocks;
      } else {
        distanceBetweenX = nodeAX - nodeBX;
        numberOfRocks = Math.round(
          distanceBetweenX / (this.config.width * 0.04)
        );
        getXcoord = nodeAX - (nodeBX - nodeAX) / numberOfRocks;
        deltaX = distanceBetweenX / numberOfRocks;
      }
    }

    if (nodeBY == nodeAY) {
      getYcoord = nodeBY;
      deltaY = 0;
    } else {
      getYcoord = nodeAY + (nodeBY - nodeAY) / numberOfRocks;
      distanceBetweenY = nodeBY - nodeAY;
      deltaY = distanceBetweenY / numberOfRocks;
    }

    for (let i = 1; i < numberOfRocks - 1; i++) {
      let randomRock = Math.floor(Math.random() * (8 - 1) + 1);
      if (randomRock === prevRandom) {
        while (randomRock === prevRandom) {
          randomRock = Math.floor(Math.random() * (8 - 1) + 1);
        }
      }

      if (nodeBX < nodeAX && nodeBY > nodeAY) {
        if (i == 1) {
          getXcoord -= deltaX * 2;
          getYcoord += deltaY;
        } else {
          getXcoord -= deltaX;
          getYcoord += deltaY;
        }
      } else {
        if (i == 1) {
          getXcoord += deltaX * 0.4;
          getYcoord += deltaY * 0.5;
        } else {
          getXcoord += deltaX;
          getYcoord += deltaY;
        }
      }
      this.add.image(getXcoord, getYcoord, `rock-${randomRock}`);
      prevRandom = randomRock;
    }
    this.edgesArray.push(edge);
  }

  updateValues() {
    this.nodesArray.forEach((element) => {
      element.container.getAt(1).setText(element.value);
    });
  }

  getNodeFromId(nodeId) {
    let node;
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
      sessionStorage.setItem("currentScore", this.steps);
      this.scene.start("EndGameScene", {
        message: "Level Completed",
        level: this.level,
        difficulty: this.difficulty,
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
    this.stepsText = this.add
      .text(innerWidth / 2, innerHeight / 20, this.stepText + this.steps, {
        fontSize: "30px",
        fontFamily: "Montserrat-Regular",
        fill: "#000",
        align: "center",
      })
      .setOrigin(0.5);
  }

  displayBestScore() {
    const bestScore = localStorage.getItem("bestScore");
    this.bestScoreText = this.add
      .text(innerWidth / 2, innerHeight / 10, `Best Score: ${0}`, {
        fill: "#3b3b3b",
        fontFamily: "Montserrat-Regular",
      })
      .setOrigin(0.5);

    if (bestScore) {
      this.bestScoreText.setText(`Best Score: ${bestScore}`);
    } else {
      this.bestScoreText.setText(`Best Score: ${0}`);
    }
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
      this.updateStep("increase");
      if (this.steps <= this.maximumStepAllowed) {
        this.undoNodeValue();
        this.updateNodeImages();
        this.updateValues();
      }
    });
  }

  undoNodeValue() {
    var index = this.allValuesArray.findIndex((p) => p.step == this.steps);
    this.allValuesArray[index].allValue.forEach((element) => {
      this.getNodeFromId(element.id).value = element.value;
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

  destroyNodeImage(image) {
    image.destroy();
    image = null;
  }

  displayLevelInfo() {
    const levelInfo = this.add
      .text(
        innerWidth / 2,
        innerHeight / 20,
        "Level " + this.level + " - " + this.difficulty,
        {
          //fontSize: "22px",
          fontFamily: "Montserrat-Regular",
          fill: "#000",
          align: "center",
        }
      )
      .setOrigin(0.5);
    if (this.tutorialMode === true) {
      levelInfo.setText("Tutorial");
    }
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
}
