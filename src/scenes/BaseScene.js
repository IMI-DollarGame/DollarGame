import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 3];
    this.fontSize = 40;
    this.lineHeight = 80;
    this.fontOptions = {
      fontSize: `${this.fontSize}px`,
      fill: "#F00",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1,
    };
  }

  create() {
    this.creatingAllButtons();
    this.soundMenu = this.sound.add("soundMenu", { volume: 0.5});
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
      .setScale(1)
      .setOrigin(0, 0);

    backButton.on("pointerup", () => {
      if (this.game.config.soundPlaying === true) {
        this.game.config.soundPlaying = true;
        this.soundMenu.play();
      } else {
        this.game.config.soundPlaying = false;
      }
      this.scene.start("MenuScene");
    });
  }

  createSettingsBtn() {
    const settingBtn = this.add
      .image(innerWidth * 0.86, innerHeight / 20, "settings")
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(1);

    settingBtn.on("pointerup", () => {
      if (this.game.config.soundPlaying === true) {
        this.soundMenu.play();
      }
      this.scene.start("SettingsScene");
    });
  }

  createHelpBtn() {
    const helpBtn = this.add
      .image(innerWidth * 0.95, innerHeight / 20, "help")
      .setOrigin(1, 0)
      .setInteractive()
      .setScale(1.95);

    helpBtn.on("pointerup", () => {
      if (this.game.config.soundPlaying === true) {
        this.soundMenu.play();
      }
      this.scene.start("TutorialScene");
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
        fontSize: "15px",
        fill: "#F00",
        fontFamily: "Indie Flower, cursive",
        stroke: "#FF0",
        strokeThickness: 1,
      },
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
  }
}
export default BaseScene;
