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
      strokeThickness: 1
    };
  }
  create() {
    this.creatingAllButtons();
  }

  resize() {
    let canvas = this.game.canvas;
    let wRatio = this.config.width / this.config.height;
    let ratio = canvas.width / canvas.height;

    if (wRatio < ratio) {
      canvas.style.width = this.config.width + "px";
      canvas.style.height = this.config.width / ratio + "px";
    } else {
      canvas.style.width = this.config.height * ratio + "px";
      canvas.style.height = this.config.height + "px";
    }
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach(menuItem => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY
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
    this.scaleButton(backButton, 18);

    backButton.on("pointerup", () => {
      this.scene.start("MenuScene");
    });
  }

  createSettingsBtn() {
    const settingBtn = this.add
      .image(innerWidth * 0.87, innerHeight / 20, "settings")
      .setOrigin(1, 0)
      .setInteractive();

    this.scaleButton(settingBtn, 20);
    settingBtn.on("pointerup", () => {
      this.scene.start("SettingsScene");
    });
  }

  createHelpBtn() {
    const helpBtn = this.add
      .image(innerWidth * 0.95, innerHeight / 20, "help")
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(1.95);
    this.scaleButton(helpBtn, 20);
    helpBtn.on("pointerup", () => {
      this.scene.start("TutorialScene");
    });
  }
  displaySoundButton() {
    const soundButton = this.add
      .sprite(innerWidth * 0.9, innerHeight / 20, "sound")
      .setOrigin(0, 0);

    const soundButtonOff = this.add
      .sprite(-750, innerHeight / 20, "soundOff")
      .setOrigin(0, 0);

    soundButton.setInteractive().on("pointerdown", () => {
      soundButtonOff.x = innerWidth * 0.9;
      soundButton.x = -750;
    });

    soundButtonOff.setInteractive().on("pointerdown", () => {
      soundButtonOff.x = -750;
      soundButton.x = innerWidth * 0.9;
    });
    this.scaleButton(soundButton, 20);
    this.scaleButton(soundButtonOff, 20);
  }
  displayUndoButton() {
    const undoBtn = this.add
      .image(innerWidth * 0.83, innerHeight / 20, "undo")
      .setOrigin(0, 0)
      .setInteractive();

    undoBtn.on("pointerup", () => {
      this.steps--;
      this.stepsText.setText("steps: " + this.steps);
    });
    this.scaleButton(undoBtn, 20);
  }
  displayRestartButton() {
    const restartBtn = this.add
      .image(innerWidth * 0.76, innerHeight / 20, "restart")
      .setOrigin(0, 0)
      .setInteractive();

    restartBtn.on("pointerup", () => {
      //this.scene.start(console.log("restart to be implemented"));
      this.steps = 0;
      this.stepsText.setText("steps: " + this.steps);
    });
    this.scaleButton(restartBtn, 20);

    restartBtn.on("pointerdown", () => {
      this.scene.restart("PlayScene");
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
        strokeThickness: 1
      }
    });
  }
  creatingAllButtons() {
    if (this.config.canGoBack) {
      this.createBackButton();
    }
    if (this.config.hasSettings) {
      this.createSettingsBtn();
    }
    if (this.config.hasTutorial) {
      this.createHelpBtn();
    }
    if (this.config.addDevelopers) {
      this.createDevelopersTxt();
    }
    if (this.config.hasSoundButton) {
      this.displaySoundButton();
    }
    if (this.config.hasRestartButton) {
      this.displayRestartButton();
    }
    if (this.config.hasUndoButton) {
      this.displayUndoButton();
    }
  }

  scaleButton(obj, per) {
    obj.displayWidth = this.game.config.width / per;
    obj.scaleY = obj.scaleX;
  }
}
export default BaseScene;
