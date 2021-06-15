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
    this.createFloatingIslands();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
    super.create();
  }

  createFloatingIslands() {
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

    // this.testLogo = this.add.image(
    //   this.config.width * 0.5,
    //   this.config.height * 0.5,
    //   "node7"
    // );
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5)
      .setScale(2);
  }

  moveIsland(island, speedX, speedY) {
    island.x += speedX;
    island.y -= speedY;

    if (
      island.getBounds().bottom < -30 ||
      //   island.getBounds().top > this.config.height + 30 ||
      island.getBounds().left > this.config.width + 30 ||
      island.getBounds().right < -30
    ) {
      this.resetIslandPos(island);
    }
  }

  resetIslandPos(island) {
    let randomXPos = Phaser.Math.Between(
      this.config.width * 0.1,
      this.config.width * 0.9
    );
    // let randomYPos = Phaser.Math.Between(0, this.config.height * 0.1);
    island.y = this.config.height + 55;
    island.x = randomXPos;
  }
  animateAllIslands() {
    //Speed x++ , y--
    this.moveIsland(this.island1, 0.2, 0.5);
    this.moveIsland(this.island2, -0.22, 0.8);
    this.moveIsland(this.island3, 0.25, 0.5);
    this.moveIsland(this.island4, -0.05, 0.7);
    this.moveIsland(this.island5, -0.06, 0.7);
    this.moveIsland(this.island7, 0.09, 0.5);
    this.moveIsland(this.NegIsland1, -0.09, 0.6);
    this.moveIsland(this.NegIsland2, 0.092, 0.55);
    this.moveIsland(this.NegIsland5, -0.095, 0.8);
    this.moveIsland(this.NegIsland7, 0.098, 0.65);
  }
  update() {
    this.animateAllIslands();
  }
}

export default MenuScene;
