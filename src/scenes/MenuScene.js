import BaseScene from "./BaseScene";
import { brotliCompress } from "zlib";

class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true,
    });

    this.menu = [
      { scene: "LevelsScene", text: "Play" },
      { scene: "ScoreScene", text: "Score" },
      { scene: "TutorialScene", text: "Tutorial" },
    ];
  }

  create() {
    this.createBG();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    super.create();
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "clouds-bg")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.4;
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
      if (this.game.config.soundPlaying === true) {
        this.soundMenu.play();
      }
    });
  }
}

export default MenuScene;
