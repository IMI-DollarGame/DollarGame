import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      addDevelopers: true,
      hasSoundButton: true
    });
    this.fontSize = 2.3;
    this.lineWidth = config.width / 10.5;
    this.menu = [];
  }

  init(data) {
    this.difficulty = data.difficulty;
  }

  create() {
    this.menu = [];
    this.createBG();
    super.create();
    this.createHeader();
    this.createBackButton();
    this.loadAllLevel(this.menu);
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    let items = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [
        innerWidth*0.25 + lastMenuPositionY,
        innerHeight*0.3,
      ];
      if (items > 5 ) {
        menuPosition[0] = menuPosition[0] - (this.lineWidth*6)
        menuPosition[1] += innerHeight*0.15
      }
      menuItem.textGO = this.add
          .image(menuPosition[0], menuPosition[1], "level")

          .setOrigin(0.4, 0.28);
      menuItem.textGO = this.add
          .text(menuPosition[0], menuPosition[1], menuItem.text, this.game.config.defaultFontOptions);

      lastMenuPositionY += this.lineWidth;
      items += 1;
      setupMenuEvents(menuItem);
    });
  }

  createHeader() {
      this.add
          .text(
          innerWidth * 0.428,
          innerHeight * 0.065,
          "Select Level",
          this.game.config.defaultFontOptions
      )}

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
          text:  level.level,
          steps: level.steps,
          nodes: level.nodes,
          edges: level.edges,
          level: level.level,
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
          level: menuItem.text,
          difficulty: this.difficulty,
        });
      this.playButtonSound();
    });
  }
}

export default LevelsScene;
