import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
  constructor(config) {
    super("PreloadScene", config);
  }

  preload() {
    //buttons
    this.load.image("arrow", "assets/buttons/backArrow.png");
    this.load.image("undo", "assets/buttons/undoButton.png");
    this.load.image("restart", "assets/buttons/restartButton.png");
    this.load.image("soundOn", "assets/buttons/soundOn.png");
    this.load.image("soundOff", "assets/buttons/soundOff.png");
    this.load.image("musicOn", "assets/buttons/musicOn.png");
    this.load.image("musicOff", "assets/buttons/musicOff.png");
    this.load.image("nextLvlArrow", "assets/buttons/nextLvlArrow.png");
    this.load.image("restartLvl", "assets/buttons/restartCurrentLvl.png");
    this.load.image("previous", "assets/buttons/previousArrow.png");
    this.load.image("next", "assets/buttons/nextArrow.png");
    this.load.image("cloud", "assets/buttons/cloud.png");
    this.load.image("cloudflag", "assets/buttons/cloudflag.png");
    this.load.image("twitterLogo", "assets/buttons/Twitter-Logo.png");
    this.load.image("facebookLogo", "assets/buttons/Facebook-Logo.png");
    this.load.image("githubLogo", "assets/buttons/GitHub-Logo.png");
    this.load.image("pointer", "assets/buttons/pointer.png");
    this.load.image("copyright", "assets/buttons/copyright.png");
    this.load.image("impressum", "assets/buttons/impressum.png");

    //Logo
    this.load.image("Logo", "assets/Logo/logo.png");

    //backgrounds
    this.load.image("game-over", "assets/backgrounds/game-over.jpg");
    this.load.image("game-won", "assets/backgrounds/game-won.jpg");
    this.load.image("blueSky", "assets/backgrounds/blueSky.jpg");
    this.load.image("sky-easy", "assets/backgrounds/sky-easy.jpg");
    this.load.image("sky-medium", "assets/backgrounds/sky-medium.jpg");
    this.load.image("sky-hard", "assets/backgrounds/sky-hard.jpg");
    this.load.image(
      "tutorial-border",
      "assets/backgrounds/tutorial-txt-border.png"
    );
    //https://pngtree.com/so/border-clipart

    //animation
    this.load.spritesheet("graySmoke", "assets/spriteSheets/graySmoke.png", {
      frameWidth: 37,
      frameHeight: 45,
    });
    this.load.spritesheet("darkSmoke", "assets/spriteSheets/darkSmoke.png", {
      frameWidth: 37,
      frameHeight: 45,
    });
    this.load.spritesheet("splash", "assets/spriteSheets/splash.png", {
      frameWidth: 37,
      frameHeight: 45,
    });

    //node image
    this.load.image(
      "node-7",
      "assets/playSceneAssets/islands/floating_island-7_cropped.png"
    );
    this.load.image(
      "node-6",
      "assets/playSceneAssets/islands/floating_island-6_cropped.png"
    );
    this.load.image(
      "node-5",
      "assets/playSceneAssets/islands/floating_island-5_cropped.png"
    );
    this.load.image(
      "node-4",
      "assets/playSceneAssets/islands/floating_island-4_cropped.png"
    );
    this.load.image(
      "node-3",
      "assets/playSceneAssets/islands/floating_island-3_cropped.png"
    );
    this.load.image(
      "node-2",
      "assets/playSceneAssets/islands/floating_island-2_cropped.png"
    );
    this.load.image(
      "node-1",
      "assets/playSceneAssets/islands/floating_island-1_cropped.png"
    );
    this.load.image(
      "node0",
      "assets/playSceneAssets/islands/floating_island0.png"
    );
    this.load.image(
      "node1",
      "assets/playSceneAssets/islands/floating_island1.png"
    );
    this.load.image(
      "node2",
      "assets/playSceneAssets/islands/floating_island2.png"
    );
    this.load.image(
      "node3",
      "assets/playSceneAssets/islands/floating_island3.png"
    );
    this.load.image(
      "node4",
      "assets/playSceneAssets/islands/floating_island4.png"
    );
    this.load.image(
      "node5",
      "assets/playSceneAssets/islands/floating_island5.png"
    );
    this.load.image(
      "node6",
      "assets/playSceneAssets/islands/floating_island6.png"
    );
    this.load.image(
      "node7",
      "assets/playSceneAssets/islands/floating_island7.png"
    );

    this.load.image("nodeValueBg", "assets/playSceneAssets/nodeValueBg.png");

    //bridge image
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

    //logo letters
    this.load.image("G", "assets/logoAssets/G.png");
    this.load.image("R", "assets/logoAssets/R.png");
    this.load.image("A1", "assets/logoAssets/A1.png");
    this.load.image("P", "assets/logoAssets/P.png");
    this.load.image("H", "assets/logoAssets/H.png");
    this.load.image("L", "assets/logoAssets/L.png");
    this.load.image("A2", "assets/logoAssets/A2.png");
    this.load.image("N", "assets/logoAssets/N.png");
    this.load.image("D", "assets/logoAssets/D.png");
    this.load.image("S", "assets/logoAssets/S.png");

    //music
    this.load.audio("music", ["assets/sounds/sb_wanderlust.mp3"]); //source: https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100844
    this.load.audio("soundMenu", [
      "assets/sounds/Menu-Selection-Change-M-www.fesliyanstudios.com.mp3",
    ]); //source: https://www.fesliyanstudios.com/
    this.load.audio("soundNode", [
      "assets/sounds/mixkit-game-ball-tap-2073.mp3",
    ]); //source: https://opengameart.org/content/63-digital-sound-effects-lasers-phasers-space-etc

    this.load.json("levels", "assets/jsonLevels/levels.json");
    this.load.json("tutorial", "assets/jsonLevels/tutorial.json");

    //fonts

    this.loadFont("SquadaOne", "assets/fonts/SquadaOne-Regular.ttf");
    this.loadFont("Montserrat-Regular", "assets/fonts/Montserrat-Regular.ttf");
    this.loadFont("Pixel", "assets/fonts/Fipps-Regular.otf");
    this.loadFont("Neon", "assets/fonts/Neon.ttf");
  }

  create() {
    this.startScene();
    this.game.config.bgMusicPlaying = true;
    this.game.config.soundPlaying = true;
    this.game.config.gameStarted = false;
    this.game.config.defaultFontOptions = {
      fontSize: "40px",
      fill: "#FFFFFF",
      fontFamily: "Neon",
    };
  }

  startScene() {
    const currentScene = JSON.parse(sessionStorage.getItem("currentScene"));
    if (currentScene) {
      this.scene.start(currentScene.scene, {
        nodes: currentScene.nodes,
        edges: currentScene.edges,
        maximumStepAllowed: currentScene.maximumStepAllowed,
        tutorialSteps: currentScene.tutorialSteps,
        tutorialMode: currentScene.tutorialMode,
        level: currentScene.level,
        difficulty: currentScene.difficulty,
        message: currentScene.message,
      });
    } else {
      this.scene.start("FirstScene");
    }
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
