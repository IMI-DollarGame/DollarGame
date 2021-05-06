var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var steps = 0;
var stepsText;
var values = [-2, -1, 2, 5, -2];
var nodes = [];

function preload() {
  this.load.image("sky", "assets/sky.png");
  this.load.image("node", "assets/village.svg");
  this.load.image("sound", "assets/sound.png");
  this.load.image("soundOff", "assets/soundOff.png");
}

function create() {
  // background
  this.add.image(400, 300, "sky");

  // coordinates for nodes and edges
  let coords = [
    [200, 150],
    [600, 150],
    [400, 300],
    [200, 450],
    [600, 450],
  ];

  // edges
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

  // nodes
  /*nodes = this.physics.add.staticGroup();
    for(var i = 0; i<5; i++){
        nodes.create(coords[i][0],coords[i][1], 'node').setScale(2).refreshBody();
    }*/

  for (var i = 0; i < 5; i++) {
    var node = this.add.image(coords[i][0], coords[i][1], "node");
    nodes.push(node);
  }

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

  // display number of steps
  stepsText = this.add.text(330, 100, "steps: " + steps, {
    fontSize: "30px",
    fill: "#000",
    align: "center",
  });

  // buttons
  //  sound.setInteractive().on("pointerdown", this.onObjectClicked);

  //var soundButton = this.add.image(750, 40, "sound");
  var soundButton = this.add.sprite(750, 40, "sound");
  var soundButtonOff = this.add.sprite(-750, 40, "soundOff");

  // soundButton
  //   .setInteractive()
  //   .on("pointerdown", () => changeSound(soundButton));

  soundButton.setInteractive().on(
    "pointerdown",
    () =>{
        soundButtonOff.x = 750
        soundButton.x=-750
    }
  );

  soundButtonOff.setInteractive().on(
    "pointerdown",
    () =>{
        soundButtonOff.x = -750
        soundButton.x=750
    }
  );
}

function update() {}

// function onObjectClicked(gameObject) {
//   console.log("yes");
// }

function changeSoundMusic(id) {
  var button = document.getElementById(id);

  if (button.innerText.slice(-2) === "on") {
    button.innerHTML = id + ": " + "off";
  } else button.innerHTML = id + ":" + "on";
}

function changeSound(soundButton) {
  console.log("clicked");
  //var soundButton = this.add.image(750, 40, "soundOff");
  soundButton = game.add.image(750, 40, "soundOff");
}

// TODO
// function to increase steps
//  function to fit the viewport
// need to implement undirected graph
