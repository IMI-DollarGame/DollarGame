import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super("PreloadScene", config);
  }

  preload() {
    //icons
    this.load.image("arrow", "assets/arrow2x.png");
    this.load.image("settings", "assets/settings2x.png");
    this.load.image("help", "assets/help2x.png");
    this.load.image("undo", "assets/undo_icon2x.png");
    this.load.image("restart", "assets/restart_icon2x.png");
    this.load.image("sound", "assets/sound.png");
    this.load.image("soundOff", "assets/soundOff.png");

    //img
    this.load.image("country-bg", "assets/country-bg.png");
    this.load.image("house-lvl", "assets/house-bg.png");

    //this.load.image("paper", "assets/paper.jpg");
    this.load.image("paper", "assets/sky_blue.png");

    //this.load.image("node", "assets/index3.png");
    this.load.image("node", "assets/island1_250px.png");

    //music
    this.load.audio("music", ["assets/Cipher2.mp3"]);
  }

  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
