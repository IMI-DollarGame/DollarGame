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
    this.island1 = this.add.image(
      this.config.width * 0.2,
      this.config.height * 0.4,
      "node1"
    );
    this.island2 = this.add.image(
      this.config.width * 0.3,
      this.config.height * 0.6,
      "node2"
    );
    this.island3 = this.add.image(
      this.config.width * 0.4,
      this.config.height * 0.7,
      "node-1"
    );
    this.island4 = this.add.image(
      this.config.width * 0.5,
      this.config.height * 0.9,
      "node-4"
    );
    this.island5 = this.add.image(
      this.config.width * 0.6,
      this.config.height * 0.9,
      "node-5"
    );
    this.island6 = this.add.image(
      this.config.width * 0.6,
      this.config.height * 0.5,
      "node-7"
    );
    this.island7 = this.add.image(
      this.config.width * 0.7,
      this.config.height * 0.5,
      "node0"
    );
    this.island8 = this.add.image(
      this.config.width * 0.8,
      this.config.height * 0.7,
      "node3"
    );
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
      island.getBounds().bottom < -40 ||
      island.getBounds().top > this.config.height + 40 ||
      island.getBounds().left > this.config.width + 40 ||
      island.getBounds().right < -40
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
    island.y = this.config.height;
    island.x = randomXPos;
  }
  animateAllIslands() {
    //Speed x++ , y--
    this.moveIsland(this.island1, 0.2, 0.5);
    this.moveIsland(this.island2, -0.22, 0.8);
    this.moveIsland(this.island3, 0.25, 0.5);
    this.moveIsland(this.island4, -0.05, 0.7);
    this.moveIsland(this.island5, 0.06, 0.5);
    this.moveIsland(this.island6, -0.06, 0.7);
    this.moveIsland(this.island7, 0.09, 0.5);
    this.moveIsland(this.island8, -0.09, 0.4);
  }
  update() {
    this.animateAllIslands();
  }
}

export default MenuScene;
