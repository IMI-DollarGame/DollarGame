import BaseScene from "./BaseScene";

class DifficultyScene extends BaseScene {
  constructor(config) {
    super("DifficultyScene", {
      ...config,
      bGWithIslands: true,
      canGoBack: true,
      hasSoundButton: true
    });
    this.fontSize = 2.3;
    this.lineHeight = config.height / 12.5;
    this.menu = [
      { scene: "LevelsScene", text: "Easy", difficulty: "easy" },
      { scene: "LevelsScene", text: "Normal", difficulty: "normal" },
      { scene: "LevelsScene", text: "Difficult", difficulty: "hard" }
    ];
    this.fontOptions = {
      fontSize: `${this.fontSize}vw`,
      fill: "#ffffff",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1
    };
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#ff0" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#ffffff" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene &&
        this.scene.start(menuItem.scene, { difficulty: menuItem.difficulty });
      this.playButtonSound();
    });
  }
}

export default DifficultyScene;
