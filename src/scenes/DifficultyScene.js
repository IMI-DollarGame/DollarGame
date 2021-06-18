import BaseScene from "./BaseScene";

class DifficultyScene extends BaseScene {
  constructor(config) {
    super("DifficultyScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
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
    this.createBG();
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
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
      textGO.setStyle({ fill: "#ffffff" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene &&
        this.scene.start(menuItem.scene, { difficulty: menuItem.difficulty });
      this.playButtonSound();
    });
  }
  createFloatingIslands(per) {
    this.NegIsland7 = this.add.image(
      this.config.width * 0.3,
      this.config.height * 0.1,
      "node-7"
    );

    this.NegIsland5 = this.add.image(
      this.config.width * 0.2,
      this.config.height * 0.8,
      "node-5"
    );
    this.NegIsland2 = this.add.image(
      this.config.width * 0.6,
      this.config.height * 0.1,
      "node-2"
    );
    this.NegIsland1 = this.add.image(
      this.config.width * 0.7,
      this.config.height * 0.4,
      "node-1"
    );
    this.island1 = this.add.image(
      this.config.width * 0.1,
      this.config.height * 0.4,
      "node0"
    );
    this.island2 = this.add.image(
      this.config.width * 0.3,
      this.config.height * 0.5,
      "node1"
    );
    this.island3 = this.add.image(
      this.config.width * 0.4,
      this.config.height * 0.7,
      "node2"
    );
    this.island4 = this.add.image(
      this.config.width * 0.5,
      this.config.height * 0.9,
      "node3"
    );

    this.island5 = this.add.image(
      this.config.width * 0.6,
      this.config.height * 0.7,
      "node5"
    );

    this.island7 = this.add.image(
      this.config.width * 0.8,
      this.config.height * 0.5,
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

export default DifficultyScene;
