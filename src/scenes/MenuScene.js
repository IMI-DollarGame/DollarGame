import BaseScene from "./BaseScene";
import { brotliCompress } from "zlib";

class MenuScene extends BaseScene {
  constructor(config) {
    super("MenuScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true
    });

    this.menu = [
      { scene: "DifficultyScene", text: "Play" },
      { scene: "ScoreScene", text: "Score" },
      { scene: "TutorialScene", text: "Tutorial" }
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


}

export default MenuScene;
