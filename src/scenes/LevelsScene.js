import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSettings: true
    });
    this.fontSize = 2.3;
    this.lineHeight = config.height / 12.5;
    this.menu = [
      { scene: "PlayScene", text: "Level 1" },
      { scene: "PlayScene", text: "Level 2" },
      { scene: "playScene", text: "Level 3" },
      { scene: "playScene", text: "Level 4" },
      { scene: "playScene", text: "Level 5" }
    ];
    this.fontOptions = {
      fontSize: `${this.fontSize}vw`,
      fill: "#F00",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1
    };
  }

  create() {
    this.createBG();
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }
  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "cyan-lvl")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.2;
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
      //    textGO.setStyle({ fill: "#fff" });
      menuItem.scene && this.scene.start(menuItem.scene);
    });
  }
}

export default LevelsScene;
