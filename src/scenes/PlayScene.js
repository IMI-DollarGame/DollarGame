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
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
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
    const bg = this.add.image(
      this.windowWidth / 2,
      this.windowHeight / 2,
      "playScene-bg"
    );
    bg.setDisplaySize(this.windowWidth, this.windowHeight);
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
    let nodeImage = this.physics.add.sprite(0, 0, this.getNodeImage(value));
    nodeImage.setDisplaySize(200, 200);

    let nodeValueText = this.add.text(-100, -100, value, {
      fontSize: "20px",
      fill: "#000",
      fontStyle: "bold",
    });

    let container = this.add.container(coordX, coordY,[nodeImage, nodeValueText]);
    container.setSize(200, 200);

    var node = new Node(id, value, container);
    this.nodesArray.push(node);
    this.setupNodeClick(node);
  }

  setupNodeClick(node){

    this.soundNode = this.sound.add("soundNode", { volume: 2.0});

    node.container.setInteractive().on("pointerdown", () => {
      this.updateSteps();
      node.decreaseNodeValue();
      node.updateNeighborNodeValue();
      this.updateValues();
      this.updateNodeImages();
      if (this.checkWinCondition()) {
        this.winTheGame();
      } else {
        if (this.steps == 0) {
          this.loseTheGame();
        }
      }

      if (this.game.config.soundPlaying === true) {
        this.soundNode.play();
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
    var obj = this.cache.json.get("level1");
    for(var i = 0; i < obj.nodes.length; i++){
      this.addNode(obj.nodes[i].id,obj.nodes[i].value,obj.nodes[i].x,obj.nodes[i].y);
    }
    for(var i = 0; i < obj.edges.length; i++){
      this.addEdge(obj.edges[i].nodeA,obj.edges[i].nodeB);
    }
  }

  setMaxSteps() {
    this.steps = this.maximumStepAllowed;
    this.stepsText = this.add.text(800, 100, this.stepText + this.steps, {
      fontSize: "30px",
      fill: "#000",
      align: "center",
    });
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

    this.bgMusic = this.sound.add("music", { volume: 0.4, loop: true });

    const musicOn = this.add
      .sprite(-720, innerHeight / 10, "musicOn")
      .setScale(1.9);
    const musicOff = this.add
      .sprite(innerWidth * 0.95, innerHeight / 10, "musicOff")
      .setScale(1.9);

    const soundButton = this.add
      .sprite(-750, innerHeight / 10, "sound")
      .setScale(1.9);
    const soundButtonOff = this.add
      .sprite(innerWidth * 0.9, innerHeight / 10, "soundOff")
      .setScale(1.9);
      
    if(this.game.config.bgMusicPlaying === true){
      musicOff.x = -750;
      musicOn.x = innerWidth * 0.95;
    }
    else {
      musicOff.x = innerWidth * 0.95;
      musicOn.x = -750;
    }

    if(this.game.config.soundPlaying === true){
      soundButtonOff.x = -750;
      soundButton.x = innerWidth * 0.9;
    }
    else {
      soundButtonOff.x = innerWidth * 0.9;
      soundButton.x = -750;
    }


    soundButton.setInteractive().on("pointerdown", () => {
      soundButtonOff.x = innerWidth * 0.9;
      soundButton.x = -750;


      this.game.config.soundPlaying = false;
    });

    soundButtonOff.setInteractive().on("pointerdown", () => {
      soundButtonOff.x = -750;
      soundButton.x = innerWidth * 0.9;

      this.game.config.soundPlaying = true;
    });

    musicOn.setInteractive().on("pointerdown", () => {
      musicOff.x = innerWidth * 0.95;
      musicOn.x = -750;

      this.game.config.bgMusicPlaying = false;
      this.game.sound.stopAll();
    });

    musicOff.setInteractive().on("pointerdown", () => {
      musicOff.x = -750;
      musicOn.x = innerWidth * 0.95;

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

  resetTheGame() {
    this.nodesArray.forEach((element) => {
      element.resetValue();
    });
    this.updateValues();
    this.updateNodeImages();
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

    const winnerText = this.add.text(
      800,
      200,
      "Congratulations, you won the game!!!",
      {
        fontSize: "50px",
        fill: "#000",
        fontStyle: "bold",
      }
    );
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
      this.nodeA.container.x,
      this.nodeA.container.y,
      this.nodeB.container.x,
      this.nodeB.container.y
    );
  }
}
