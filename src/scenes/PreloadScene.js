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

    //backgrounds
    this.load.image("clouds-bg", "assets/backgrounds/clouds-cyan.png");
    this.load.image("cyan-bg", "assets/backgrounds/bg-cyan.png");
    this.load.image("play-bg", "assets/backgrounds/clouds-light.png");
    this.load.image("settings-bg", "assets/backgrounds/bg-brown.png");

    //node image
    this.load.image("node1", "assets/playSceneAssets/floating_island1.png");
    this.load.image("node2", "assets/playSceneAssets/floating_island2.png");
    this.load.image("node3", "assets/playSceneAssets/floating_island3.png");

    //music
    this.load.audio("music", ["assets/sounds/Cipher2.mp3"]); //source: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100844
    this.load.audio("soundMenu", ["assets/sounds/Menu-Selection-Change-M-www.fesliyanstudios.com.mp3"]); //source: https://www.fesliyanstudios.com/
    this.load.audio("soundNode", ["assets/sounds/lowRandom.mp3"]); //source: https://opengameart.org/content/63-digital-sound-effects-lasers-phasers-space-etc

    //json file
    this.load.json("levels", "assets/jsonLevels/levels.json");
  }

  create() {
    this.scene.start("MenuScene");
    this.game.config.bgMusicPlaying = false;
    this.game.config.soundPlaying = true;
  }
}

export default PreloadScene;
