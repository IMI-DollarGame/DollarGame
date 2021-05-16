import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
  constructor(config) {
    super("PlayScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
    });
    this.steps = 0;
    this.stepsText;
    this.nodesArray = [];
    this.edgesArray = [];
    this.graphics;
  }

  create() {
    this.addBackGround();
    this.addGraphics();
    this.displayNumberOfSteps();
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
    let nodeFront = this.physics.add.sprite(coordX, coordY, "node");
    let valueFront = this.add.text(coordX - 55, coordY - 80, value, {
      fontSize: "20px",
      fill: "#000",
      fontStyle: "bold",
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
      };
    });
  }

  displayEndgameMess() {
    let winnerText = this.add.text(800, 200, "Congratulation, you won the game!!!", {
      fontSize: "50px",
      fill: "#000",
      fontStyle: "bold",
    });
  }

  updateValues() {
    this.nodesArray.forEach(element => {
      element.valueFront.setText(element.value)
    })
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
    let edge = new Edge(this.getNodeFromId(nodeIdA), this.getNodeFromId(nodeIdB));
    this.graphics.strokeLineShape(edge.getEdgeCoord());
    this.edgesArray.push(edge);
  }

  checkWinCondition() {
    return this.nodesArray.every(element => element.isPositiveValue()
    );
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
    this.stepsText = this.add.text(800, 100, "steps: " + this.steps, {
      fontSize: "30px",
      fill: "#000",
      align: "center",
    });
  }

  displaySoundButton() {
    this.bgMusic = this.sound.add("music", { volume: 0.5,loop: true });
    //innerWidth * 0.1, innerHeight / 20
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
      //this.scene.start(console.log("restart to be implemented"));
      this.steps = 0;
      this.stepsText.setText("steps: " + this.steps);
    });
  }

  displayUndoButton() {
    const undoBtn = this.add
      .image(innerWidth * 0.85, innerHeight / 15, "undo")
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(0.7);

    undoBtn.on("pointerup", () => {
      //this.scene.start(console.log("undo to be implemented"));
      this.steps--;
      this.stepsText.setText("steps: " + this.steps);
    });
  }

  //update(){}
}

export default PlayScene;

// changeSoundMusic(id) {
//     var button = document.getElementById(id);

//     if (button.innerText.slice(-2) === "on") {
//       button.innerHTML = id + ": " + "off";
//     } else button.innerHTML = id + ":" + "on";
//   }

// nodes
/*nodes = this.physics.add.staticGroup();
      for(var i = 0; i<5; i++){
          nodes.create(coords[i][0],coords[i][1], 'node').setScale(2).refreshBody();
      }*/

// TODO
// function to increase steps
//  function to fit the viewport
// need to implement undirected graph

class Node {
  constructor(id, value, coordX, coordY, nodeFront, valueFront) {
    this.id = id
    this.value = value;
    this.coordX = coordX;
    this.coordY = coordY;
    this.nodeFront = nodeFront;
    this.valueFront = valueFront;
    this.neighborNodes = [];
  }

  addNodeNeighbor(node) {
    if (this.neighborNodes.indexOf(node) == -1)
      this.neighborNodes.push(node);
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
    })
  }

  isPositiveValue() {
    if (this.value >= 0)
      return true;
    else
      return false;
  }

  isNegativeValue() {
    if (this.value < 0)
      return true;
    else
      return false;
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
    return new Phaser.Geom.Line(this.nodeA.coordX, this.nodeA.coordY, this.nodeB.coordX, this.nodeB.coordY);
  }
}
