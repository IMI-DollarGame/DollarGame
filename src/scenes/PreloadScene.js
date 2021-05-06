import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super("PreloadScene", config);
  }

  preload() {
    this.load.image("arrow", "assets/arrow2x.png");
    this.load.image("settings", "assets/settings2x.png");
    this.load.image("help", "assets/help2x.png");
  }

  create() {
    this.scene.start("MenuScene");
  }
}

export default PreloadScene;
