import BaseScene from "./BaseScene";

class SettingsScene extends BaseScene {
  constructor(config) {
    super("SettingsScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
    });
  }

  create() {
    super.create();
    this.createText();
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
    if (this.game.config.soundPlaying === false) {
      musicText.text = "Sound: Off";
    }
    else{
      musicText.text = "Sound: On";
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
