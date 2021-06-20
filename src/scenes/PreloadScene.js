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
    this.load.image("cloud", "assets/buttons/cloud.png");
    this.load.image("cloudflag", "assets/buttons/cloudflag.png");


    //backgrounds
    this.load.image("clouds-bg", "assets/backgrounds/clouds-cyan.png");
    this.load.image("cyan-bg", "assets/backgrounds/bg-cyan.png");
    this.load.image("play-bg", "assets/backgrounds/clouds-light.png");
    this.load.image("settings-bg", "assets/backgrounds/bg-brown.png");
    this.load.image("blueSky", "assets/backgrounds/blueSky.jpg");
    this.load.image("collageMenu2", "assets/backgrounds/collageMenu2.png");
    this.load.image("collageMenu3", "assets/backgrounds/collageMenu3.png");

    //node image
    this.load.image("node-7", "assets/playSceneAssets/floating_island-7.png");
    this.load.image("node-6", "assets/playSceneAssets/floating_island-6.png");
    this.load.image("node-5", "assets/playSceneAssets/floating_island-5.png");
    this.load.image("node-4", "assets/playSceneAssets/floating_island-4.png");
    this.load.image("node-3", "assets/playSceneAssets/floating_island-3.png");
    this.load.image("node-2", "assets/playSceneAssets/floating_island-2.png");
    this.load.image("node-1", "assets/playSceneAssets/floating_island-1.png");
    this.load.image("node0", "assets/playSceneAssets/floating_island0.png");
    this.load.image("node1", "assets/playSceneAssets/floating_island1.png");
    this.load.image("node2", "assets/playSceneAssets/floating_island2.png");
    this.load.image("node3", "assets/playSceneAssets/floating_island3.png");

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
    this.game.config.bgMusicPlaying = false;

    this.game.config.defaultFontOptions = {
      fontSize: "40px",
      fill: "#FFFFFF",
      fontFamily: "Neon",
    }
  }

  // source: https://stackoverflow.com/questions/51217147/how-to-use-a-local-font-in-phaser-3
  loadFont(name, url) {
    var newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
}}

export default PreloadScene;
