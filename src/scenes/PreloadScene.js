import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super("PreloadScene", config);
  }

  preload() {
    //buttons
    this.load.image("arrow", "assets/buttons/backArrow.png");
    this.load.image("help", "assets/buttons/helpButton.png");
    this.load.image("undo", "assets/buttons/undoButton.png");
    this.load.image("restart", "assets/buttons/restartButton.png");
    this.load.image("soundOn", "assets/buttons/soundOn.png");
    this.load.image("soundOff", "assets/buttons/soundOff.png");
    this.load.image("musicOn", "assets/buttons/musicOn.png");
    this.load.image("musicOff", "assets/buttons/musicOff.png");
    this.load.image("nextLevel", "assets/buttons/rightArrow.png");
    this.load.image("all-levels-arrow", "assets/buttons/backToLvls.png");
    this.load.image("nextLvlArrow", "assets/buttons/nextLvlArrow.png");
    this.load.image("restartLvl", "assets/buttons/restartCurrentLvl.png");
    this.load.image("previous", "assets/buttons/previousArrow.png");
    this.load.image("next", "assets/buttons/nextArrow.png");

    //backgrounds
    this.load.image("game-over", "assets/backgrounds/game-over.png");
    this.load.image("game-won", "assets/backgrounds/game-won.png");
    this.load.image("play-bg", "assets/backgrounds/clouds-light.png");
    this.load.image("blueSky", "assets/backgrounds/blueSky.jpg");
    this.load.image("sky-easy", "assets/backgrounds/sky-easy.png");
    this.load.image("sky-medium", "assets/backgrounds/sky-medium.png");
    this.load.image("sky-hard", "assets/backgrounds/sky-hard.png");

    //node image

    this.load.image(
      "node-7",
      "assets/playSceneAssets/floating_island-7_cropped.png"
    );
    //this.load.image("node-7", "assets/playSceneAssets/floating_island-7.png");
    this.load.image(
      "node-6",
      "assets/playSceneAssets/floating_island-6_cropped.png"
    );
    // this.load.image("node-6", "assets/playSceneAssets/floating_island-6.png");
    this.load.image(
      "node-5",
      "assets/playSceneAssets/floating_island-5_cropped.png"
    );
    //this.load.image("node-5", "assets/playSceneAssets/floating_island-5.png");
    this.load.image(
      "node-4",
      "assets/playSceneAssets/floating_island-4_cropped.png"
    );
    //this.load.image("node-4", "assets/playSceneAssets/floating_island-4.png");
    this.load.image(
      "node-3",
      "assets/playSceneAssets/floating_island-3_cropped.png"
    );
    //this.load.image("node-3", "assets/playSceneAssets/floating_island-3.png");
    this.load.image(
      "node-2",
      "assets/playSceneAssets/floating_island-2_cropped.png"
    );
    //this.load.image("node-2", "assets/playSceneAssets/floating_island-2.png");
    this.load.image(
      "node-1",
      "assets/playSceneAssets/floating_island-1_cropped.png"
    );
    //this.load.image("node-1", "assets/playSceneAssets/floating_island-1.png");
    this.load.image("node0", "assets/playSceneAssets/floating_island0.png");
    this.load.image("node1", "assets/playSceneAssets/floating_island1.png");
    this.load.image("node2", "assets/playSceneAssets/floating_island2.png");
    this.load.image("node3", "assets/playSceneAssets/floating_island3.png");
    this.load.image("node4", "assets/playSceneAssets/floating_island4.png");
    this.load.image("node5", "assets/playSceneAssets/floating_island5.png");
    this.load.image("node6", "assets/playSceneAssets/floating_island6.png");
    this.load.image("node7", "assets/playSceneAssets/floating_island7.png");

    //bridge image
    this.load.image("bridge", "assets/playSceneAssets/bridge/bridge.png");
    this.load.image(
      "rock-1",
      "assets/playSceneAssets/bridge/floating-rock1.png"
    );
    this.load.image(
      "rock-2",
      "assets/playSceneAssets/bridge/floating-rock2.png"
    );
    this.load.image(
      "rock-3",
      "assets/playSceneAssets/bridge/floating-rock3.png"
    );
    this.load.image(
      "rock-4",
      "assets/playSceneAssets/bridge/floating-rock4.png"
    );
    this.load.image(
      "rock-5",
      "assets/playSceneAssets/bridge/floating-rock5.png"
    );
    this.load.image(
      "rock-6",
      "assets/playSceneAssets/bridge/floating-rock6.png"
    );
    this.load.image(
      "rock-7",
      "assets/playSceneAssets/bridge/floating-rock7.png"
    );

    //music
    this.load.audio("music", ["assets/sounds/Cipher2.mp3"]); //source: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100844
    this.load.audio("soundMenu", [
      "assets/sounds/Menu-Selection-Change-M-www.fesliyanstudios.com.mp3",
    ]); //source: https://www.fesliyanstudios.com/
    this.load.audio("soundNode", ["assets/sounds/lowRandom.mp3"]); //source: https://opengameart.org/content/63-digital-sound-effects-lasers-phasers-space-etc

    this.load.json("levels", "assets/jsonLevels/levels.json");
    this.load.json("tutorial", "assets/jsonLevels/tutorial.json");

    //fonts

    this.loadFont("SquadaOne", "assets/fonts/SquadaOne-Regular.ttf");
    this.loadFont("Montserrat-Regular", "assets/fonts/Montserrat-Regular.ttf");
    this.loadFont("Pixel", "assets/fonts/Fipps-Regular.otf");
    this.loadFont("Neon", "assets/fonts/Neon.ttf");
  }

  create() {
    this.scene.start("MenuScene");
    // this.scene.start("DifficultyScene");
    this.game.config.bgMusicPlaying = false;

    this.game.config.defaultFontOptions = {
      fontSize: "40px",
      fill: "#FFFFFF",
      fontFamily: "Neon",
    };
  }

  // source: https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont
      .load()
      .then(function (loaded) {
        document.fonts.add(loaded);
      })
      .catch(function (error) {
        return error;
      });
  }
}

export default PreloadScene;