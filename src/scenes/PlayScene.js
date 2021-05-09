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
  }

  create() {
    this.addBackGround();
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

  drawGraph() {
    let nodesArray = [];
    var values = [-2, -1, 2, 5, -2];

    // coordinates for nodes and edges
    let coords = [
      [600, 350],
      [1000, 350],
      [800, 500],
      [600, 650],
      [1000, 650],
    ];

    // drawing nodes
    for (var i = 0; i < 5; i++) {
      let node = this.physics.add.sprite(coords[i][0], coords[i][1], "node");
      nodesArray.push(node);
      //console.log(node.body);
      node.setInteractive().on("pointerdown", () => {
        this.steps++;
        this.stepsText.setText("steps: "+ this.steps);
      });
    }

    // drawing edges
    var graphics = this.add.graphics({
      lineStyle: { width: 4, color: 0xffffff },
    });

    const line1 = new Phaser.Geom.Line(
      coords[0][0],
      coords[0][1],
      coords[2][0],
      coords[2][1]
    );

    const line2 = new Phaser.Geom.Line(
      coords[0][0],
      coords[0][1],
      coords[3][0],
      coords[3][1]
    );

    const line3 = new Phaser.Geom.Line(
      coords[3][0],
      coords[3][1],
      coords[4][0],
      coords[4][1]
    );

    const line4 = new Phaser.Geom.Line(
      coords[2][0],
      coords[2][1],
      coords[1][0],
      coords[1][1]
    );

    const line5 = new Phaser.Geom.Line(
      coords[2][0],
      coords[2][1],
      coords[4][0],
      coords[4][1]
    );

    graphics.strokeLineShape(line1);
    graphics.strokeLineShape(line2);
    graphics.strokeLineShape(line3);
    graphics.strokeLineShape(line4);
    graphics.strokeLineShape(line5);

    // text with values for each node
    for (var i = 0; i < values.length; i++) {
      let textValues = this.add.text(
        coords[i][0] - 55,
        coords[i][1] - 80,
        values[i],
        {
          fontSize: "20px",
          fill: "#000",
          fontStyle: "bold",
        }
      );
    }
  }

  displayNumberOfSteps() {
    //let steps = 0;
    this.stepsText = this.add.text(800, 100, "steps: " + this.steps, {
      fontSize: "30px",
      fill: "#000",
      align: "center",
    });
  }

  displaySoundButton() {
    //innerWidth * 0.1, innerHeight / 20
    const soundButton = this.add
      .sprite(innerWidth * 0.9, innerHeight / 10, "sound")
      .setScale(1.9);
    const soundButtonOff = this.add
      .sprite(-750, innerHeight / 10, "soundOff")
      .setScale(1.9);

    soundButton.setInteractive().on("pointerdown", () => {
      soundButtonOff.x = innerWidth * 0.9;
      soundButton.x = -750;
    });

    soundButtonOff.setInteractive().on("pointerdown", () => {
      soundButtonOff.x = -750;
      soundButton.x = innerWidth * 0.9;
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
      this.stepsText.setText("steps: "+ this.steps);
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
      this.stepsText.setText("steps: "+ this.steps);
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
