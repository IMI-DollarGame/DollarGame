import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSettings: true,
    });
    this.menu = [
      { scene: "PlayScene", text: "Level 1" },
      { scene: "PlayScene", text: "Level 2" },
      { scene: "playScene", text: "Level 3" },
      { scene: "playScene", text: "Level 4" },
      { scene: "playScene", text: "Level 5" },
    ];
    this.fontOptions = {
      fontSize: "20px",
      fill: "#F00",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1,
    };
  }

  create() {
    this.createBG();
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }
  createBG() {
    const backGround = this.add.image(0, 0, "house-lvl").setOrigin(0);
    backGround.displayHeight = innerHeight;
    backGround.displayWidth = innerWidth;
  }


  setupMenuEvents(menuItem) {
    this.soundMenu = this.sound.add("soundMenu", { volume: 0.8});
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
      if (this.game.config.soundPlaying === true) {
        this.soundMenu.play();
      }
    });
  }
}

export default LevelsScene;
