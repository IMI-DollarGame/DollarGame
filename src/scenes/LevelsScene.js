import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      hasSoundButton: true,
      bGWithIslands: true,
    });
    this.fontSize = 2.3;
    this.lineWidth = config.width / 7;
    this.menu = [];
  }

  init(data) {
    this.difficulty = data.difficulty;
  }

  create() {
    this.menu = [];
    super.create();
    this.createHeader();
    this.createBackButton();
    this.loadAllLevel(this.menu);
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    this.storeScene();
  }

  storeScene() {
    sessionStorage.setItem(
      "currentScene",
      JSON.stringify({
        scene: "LevelsScene",
        difficulty: this.difficulty,
      })
    );
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    let items = 0;
    menu.forEach((menuItem) => {
      const menuPosition = [
        innerWidth * 0.18 + lastMenuPositionY,
        innerHeight * 0.31,
      ];
      if (items > 4) {
        menuPosition[0] = menuPosition[0] - this.lineWidth * 5;
        menuPosition[1] += innerHeight * 0.15;
      }

      let levelNumber = this.add.text(0, 0, menuItem.text, {
        fontSize: "30px",
        fill: "#4a6dc4",
        fontFamily: "Neon",
      });

      let buttonImage;
      if (
        localStorage.getItem(
          "level_" + this.difficulty + "_" + menuItem.text
        ) === "completed"
      ) {
        buttonImage = this.add.image(10, 16, "cloudflag");
      } else {
        buttonImage = this.add.image(10, 16, "cloud");
      }

      let bestScore;
      if (
        localStorage.getItem(
          "levelbestscore_" + this.difficulty + "_" + menuItem.text
        )
      ) {
        bestScore = this.add.text(
          -70,
          33,
          "Best Score: " +
          localStorage.getItem(
            "levelbestscore_" + this.difficulty + "_" + menuItem.text
          ),
          {
            fontSize: "25px",
            fill: "#4ac4b6",
            fontFamily: "Neon",
          }
        );
        menuItem.textGO = this.add.container(menuPosition[0], menuPosition[1], [
          buttonImage,
          levelNumber,
          bestScore,
        ]);
      } else {
        menuItem.textGO = this.add.container(menuPosition[0], menuPosition[1], [
          buttonImage,
          levelNumber,
        ]);
      }

      menuItem.textGO.setSize(100, 100);
      menuItem.textGO.displayWidth = this.game.config.width / 22;
      menuItem.textGO.displayHeight = this.game.config.height / 12;
      lastMenuPositionY += this.lineWidth;
      items += 1;
      setupMenuEvents(menuItem);
    });
  }

  createHeader() {
    this.add
      .text(
        innerWidth * 0.43,
        innerHeight * 0.065,
        "Select Level",
        {
          fontSize: "53px",
          fill: "#ffffff",
          fontFamily: "Neon",
        }
      )
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

    this.buttonEffect(backButton);
  }

  loadAllLevel(menu) {
    this.obj = this.cache.json.get("levels");

    const allLevels = this.obj.scenario;

    for (var i = 0; i < allLevels.length; i++) {
      const level = allLevels[i];
      if (level.difficulty === this.difficulty) {
        const item = {
          scene: "PlayScene",
          text: level.level,
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

  setupMenuEvents(menuItem) {
    menuItem.textGO.getAt(0).setInteractive();

    menuItem.textGO.getAt(0).on("pointerover", () => {
      menuItem.textGO.getAt(1).setStyle({ fill: "#ff0" });
    });

    menuItem.textGO.getAt(0).on("pointerout", () => {
      menuItem.textGO.getAt(1).setStyle({ fill: "#4a6dc4" });
    });

    menuItem.textGO.getAt(0).on("pointerup", () => {
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
