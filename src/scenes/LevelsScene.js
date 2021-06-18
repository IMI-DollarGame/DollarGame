import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true
    });
    this.fontSize = 2.3;
    this.lineHeight = config.height / 12.5;
    this.menu = [];
    this.fontOptions = {
      fontSize: `${this.fontSize}vw`,
      fill: "#ffffff",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1
    };
  }

  init(data) {
    this.difficulty = data.difficulty;
  }

  create() {
    this.menu = [];
    this.createBG();
    super.create();
    this.createBackButton();
    this.loadAllLevel(this.menu);
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  createBackButton() {
    const backButton = this.add
      .image(innerWidth / 20, innerHeight / 20, "arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(backButton, 20);

    backButton.on("pointerup", () => {
      this.playButtonSound();
      this.scene.stop();
      this.scene.start("DifficultyScene");
    });
  }

  loadAllLevel(menu) {
    this.obj = this.cache.json.get("levels");

    const allLevels = this.obj.scenario;

    for (var i = 0; i < allLevels.length; i++) {
      const level = allLevels[i];
      if (level.difficulty === this.difficulty) {
        const item = {
          scene: "PlayScene",
          text: "Level " + level.level,
          steps: level.steps,
          nodes: level.nodes,
          edges: level.edges,
          level: level.level
        };

        if (menu.findIndex(x => x.text === item.text) === -1) {
          menu.push(item);
        }
      }
    }
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "cyan-bg")
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
      textGO.setStyle({ fill: "#fffafa" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene &&
        this.scene.start(menuItem.scene, {
          nodes: menuItem.nodes,
          edges: menuItem.edges,
          maximumStepAllowed: menuItem.steps,
          tutorialMode: false,
          level: menuItem.level,
          difficulty: this.difficulty,
        });        
      this.playButtonSound();
    });
  }
}

export default LevelsScene;
