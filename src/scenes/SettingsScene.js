import BaseScene from "./BaseScene";

class SettingsScene extends BaseScene {
  constructor(config) {
    super("SettingsScene", { ...config, canGoBack: true, addDevelopers: true });
    this.menu = [
      { scene: null, text: "Music: On" },
      { scene: null, text: "Sound: On" }
    ];
    this.fontSize = 2.3;
  }

  create() {
    this.createBG();
    super.create();
    this.createText();
  }

  playMusic() {
    const bgMusic = this.sound.add("music", { loop: true });
    bgMusic.play();
  }
  
  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "settings-bg")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.4;
  }
  
  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();
  }
  
  createText() {
    this.bgMusic = this.sound.add("music", { volume: 0.4, loop: true });
    this.soundMenu = this.sound.add("soundMenu", { volume: 0.8});

    const width = this.screenCenter[0];
    const height = this.screenCenter[1];

    const musicText = this.add.text(width, height, "Music: Off", this.fontOptions).setOrigin(0.5, 1);
    const soundText = this.add.text(width, height + 80, "Sound: Off",this.fontOptions).setOrigin(0.5, 1);

    if (this.game.config.soundPlaying === false) {
      soundText.text = "Sound: Off";
    }
    else{
      soundText.text = "Sound: On";
    }
    if (this.game.config.bgMusicPlaying === false) {
      musicText.text = "Music: Off";
    }
    else{
      musicText.text = "Music: On";
    }

    musicText.setInteractive();
    soundText.setInteractive();

    musicText.on("pointerover", () => {
      musicText.setStyle({ fill: "#ff0" });
    });

    soundText.on("pointerover", () => {
      soundText.setStyle({ fill: "#ff0" });
    });

    musicText.on("pointerout", () => {
      musicText.setStyle({ fill: "#f00" });
    });

    soundText.on("pointerout", () => {
      soundText.setStyle({ fill: "#f00" });
    });

    musicText.on("pointerup", () => {
      if (this.game.config.bgMusicPlaying === false) {
        this.game.config.bgMusicPlaying = true;
        this.bgMusic.play();
        musicText.text = "Music: On";
      } else {
        this.game.config.bgMusicPlaying = false;
        this.game.sound.stopAll();
        musicText.text = "Music: Off";
      }
    });

    soundText.on("pointerup", () => {
      if (this.game.config.soundPlaying === false) {
        this.game.config.soundPlaying = true;
        this.soundMenu.play();
        soundText.text = "Sound: On";
      } else {
        this.game.config.soundPlaying = false;
        soundText.text = "Sound: Off";
      }
    });
  }
}

export default SettingsScene;