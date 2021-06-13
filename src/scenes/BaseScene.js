import Phaser from "phaser";
import { EventEmitter } from "events";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 3];
    this.fontSize = 2.3;
    this.lineHeight = config.height / 12.5;
    this.fontOptions = {
      fontSize: `${this.fontSize}vw`,
      fill: "#F00",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1,
    };
    this.defaultTopBtnHeight = innerHeight / 20;
    this.bgMusic;
    this.completedLevel = [];
  }

  create() {
    this.creatingAllButtons();
    this.soundMenu = this.sound.add("soundMenu", { volume: 0.5 });
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY,
      ];
      menuItem.textGO = this.add
        .text(...menuPosition, menuItem.text, this.fontOptions)
        .setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }

  createBackButton() {
    const backButton = this.add
      .image(innerWidth / 20, innerHeight / 20, "arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(backButton, 20);

    backButton.on("pointerup", () => {
      this.playButtonSound();
      this.scene.start("MenuScene");
    });
  }

  displaySoundButton() {
    if (!this.game.config.bgMusicPlaying) {
      this.bgMusic = this.sound.add("music", { volume: 0.4, loop: true });
    } else {
      this.bgMusic = this.bgMusic;
    }
    this.soundMenu = this.sound.add("soundMenu", { volume: 0.5 });

    const musicOn = this.add
      .image(innerWidth * 0.85, this.defaultTopBtnHeight, "musicOn")
      .setOrigin(1, 0)
      .setInteractive();
    musicOn.visible = this.game.config.bgMusicPlaying;
    this.scaleObject(musicOn, 20);

    const musicOff = this.add
      .image(innerWidth * 0.85, this.defaultTopBtnHeight, "musicOff")
      .setOrigin(1, 0)
      .setInteractive();
    musicOff.visible = !this.game.config.bgMusicPlaying;
    this.scaleObject(musicOff, 20);

    const soundOn = this.add
      .image(innerWidth * 0.9, this.defaultTopBtnHeight, "soundOn")
      .setOrigin(1, 0)
      .setInteractive();
    soundOn.visible = this.game.config.soundPlaying;
    this.scaleObject(soundOn, 20);

    const soundOff = this.add
      .image(innerWidth * 0.9, this.defaultTopBtnHeight, "soundOff")
      .setOrigin(1, 0)
      .setInteractive();
    soundOff.visible = !this.game.config.soundPlaying;
    this.scaleObject(soundOff, 20);

    soundOn.on("pointerdown", () => {
      this.game.config.soundPlaying = false;
      soundOn.visible = this.game.config.soundPlaying;
      soundOff.visible = !this.game.config.soundPlaying;
    });

    soundOff.on("pointerdown", () => {
      this.game.config.soundPlaying = true;
      soundOn.visible = this.game.config.soundPlaying;
      soundOff.visible = !this.game.config.soundPlaying;
    });

    musicOn.on("pointerdown", () => {
      this.game.config.bgMusicPlaying = false;
      musicOff.visible = !this.game.config.bgMusicPlaying;
      musicOn.visible = this.game.config.bgMusicPlaying;
      this.bgMusic.stop();
    });

    musicOff.on("pointerdown", () => {
      this.game.config.bgMusicPlaying = true;
      musicOff.visible = !this.game.config.bgMusicPlaying;
      musicOn.visible = this.game.config.bgMusicPlaying;
      this.bgMusic.play();
    });
  }

  createDevelopersTxt() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.95;

    this.make.text({
      x: xPos,
      y: yPos,
      text: "Created by the group of enthusiasts",
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontSize: `${1.5}vw`,
        fill: "#F00",
        fontFamily: "Indie Flower, cursive",
        stroke: "#FF0",
        strokeThickness: 1,
      },
    });
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#ff0" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#f00" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene && this.scene.start(menuItem.scene);
      this.playButtonSound();
    });
  }

  creatingAllButtons() {
    if (this.config.canGoBack) {
      this.createBackButton();
    }
    if (this.config.addDevelopers) {
      this.createDevelopersTxt();
    }
    if (this.config.hasSoundButton) {
      this.displaySoundButton();
    }
  }

  scaleObject(obj, wPer) {
    obj.displayWidth = this.game.config.width / wPer;
    let hPer = (innerHeight / innerWidth) * wPer;
    obj.displayHeight = this.game.config.height / hPer;
  }

  playButtonSound() {
    if (this.game.config.soundPlaying === true) {
      this.soundMenu.play();
    }
  }
}
export default BaseScene;
