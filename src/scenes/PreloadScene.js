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
    this.load.image("sound", "assets/volumeUp.png");
    this.load.image("soundOff", "assets/volumeOff.png");

    //img
    this.load.image("clouds-bg", "assets/clouds-cyan.png");
    this.load.image("cyan-lvl", "assets/bg-cyan.png");
    this.load.image("play-bg", "assets/clouds-light.png");
    this.load.image("settings-bg", "assets/bg-brown.png");

    this.load.image("node", "assets/village.svg");

    //music
    this.load.audio("music", ["assets/Cipher2.mp3"]);
  }

  create() {
    this.scene.start("MenuScene");
    //this.scene.start("LevelsScene");
    //this.scene.start("ScoreScene");
    //this.scene.start("PlayScene");
  }
}

export default PreloadScene;
