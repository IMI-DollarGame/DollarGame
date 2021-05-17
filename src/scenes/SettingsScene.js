import BaseScene from "./BaseScene";

class SettingsScene extends BaseScene {
  constructor(config) {
    super("SettingsScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
    });

    //this.menu = [{ text: "Off" || "On" }, { text: "Off" || "On" }];
  }

  create() {
    super.create();
    this.createText();
    //this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  createText() {
    this.bgMusic = this.sound.add("music", { volume: 0.5, loop: true });

    let on = " ";

    if (this.game.config.bgMusicPlaying === true) {
      on = "On";
    } else {
      on = "Off";
    }

    const width = this.screenCenter[0];
    const height = this.screenCenter[1];

    const musicText = this.add.text(width, height, `Music: ${on}`);
    const soundText = this.add.text(width, height + 80, `Sound: ${on}`);

    musicText.setInteractive();
    soundText.setInteractive();

    musicText.on("pointerover", () => {
      musicText.setStyle({ fill: "#ff0" });
    });

    soundText.on("pointerover", () => {
      soundText.setStyle({ fill: "#ff0" });
    });

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
      } else {
        this.game.config.bgMusicPlaying = false;
        this.game.sound.stopAll();
      }
    });

    soundText.on("pointerup", () => {
      if (this.game.config.bgMusicPlaying === false) {
        this.game.config.bgMusicPlaying = true;
        this.bgMusic.play();
      } else {
        this.game.config.bgMusicPlaying = false;
        this.game.sound.stopAll();
      }
    });
  }
}

export default SettingsScene;
