import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true,
    });
    this.fontSize = 2.3;
    this.lineHeight = config.height / 12.5;
    this.menu = [];
    this.fontOptions = {
      fontSize: `${this.fontSize}vw`,
      fill: "#ffffff",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1,
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
    this.scaleObject(backButton, 25);

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
          level: level.level,
        };

        if (menu.findIndex((x) => x.text === item.text) === -1) {
          menu.push(item);
        }
      }
    }
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.2;
    this.createFloatingIslands(18);
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
          difficulty: this.difficulty
        });
        
      this.playButtonSound();
    });
  }

  createFloatingIslands(per) {
    this.NegIsland7 = this.add.image(
      this.config.width * 0.3,
      this.config.height * 0.2,
      "node-7"
    );
    this.NegIsland5 = this.add.image(
      this.config.width * 0.2,
      this.config.height * 0.9,
      "node-5"
    );
    this.NegIsland2 = this.add.image(
      this.config.width * 0.5,
      this.config.height * 0.2,
      "node-2"
    );
    this.NegIsland1 = this.add.image(
      this.config.width * 0.8,
      this.config.height * 0.3,
      "node-1"
    );
    this.island1 = this.add.image(
      this.config.width * 0.1,
      this.config.height * 0.1,
      "node0"
    );
    this.island2 = this.add.image(
      this.config.width * 0.1,
      this.config.height * 0.55,
      "node1"
    );
    this.island3 = this.add.image(
      this.config.width * 0.4,
      this.config.height * 0.55,
      "node2"
    );
    this.island4 = this.add.image(
      this.config.width * 0.5,
      this.config.height * 0.9,
      "node3"
    );

    this.island5 = this.add.image(
      this.config.width * 0.6,
      this.config.height * 0.5,
      "node5"
    );

    this.island7 = this.add.image(
      this.config.width * 0.8,
      this.config.height * 0.7,
      "node7"
    );
    this.scaleObject(this.NegIsland7, per);
    this.scaleObject(this.NegIsland5, per);
    this.scaleObject(this.NegIsland2, per);
    this.scaleObject(this.NegIsland1, per);
    this.scaleObject(this.island1, per);
    this.scaleObject(this.island2, per);
    this.scaleObject(this.island3, per);
    this.scaleObject(this.island4, per);
    this.scaleObject(this.island5, per);
    this.scaleObject(this.island7, per);
  }
  
  scaleObject(obj, wPer) {
    obj.displayWidth = this.game.config.width / wPer;
    let hPer = (innerHeight / innerWidth) * wPer;
    obj.displayHeight = this.game.config.height / hPer;
  }
}

export default LevelsScene;