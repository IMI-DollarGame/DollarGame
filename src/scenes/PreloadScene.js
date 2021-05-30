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
    this.load.image("nextLevel", "assets/right-arrow.png");

    //img
    this.load.image("country-bg", "assets/country-bg.png");
    this.load.image("house-lvl", "assets/house-bg.png");

    //playScene bg
    //source: https://wallpaperaccess.com/anime-island
    this.load.image("playScene-bg", "assets/playScene/bg_island.png");

    //node image
    this.load.image("node1", "assets/playScene/floating_island1.png");
    this.load.image("node2", "assets/playScene/floating_island2.png");
    this.load.image("node3", "assets/playScene/floating_island3.png");

    //music
    this.load.audio("music", ["assets/Cipher2.mp3"]);
    
    //json file
    this.load.json("level1", "assets/jsonLevels/level1.json");
  }
  
  create() {
    this.scene.start("MenuScene");
    this.game.config.bgMusicPlaying = false;
  }
}

export default PreloadScene;
