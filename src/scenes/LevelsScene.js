import BaseScene from "./BaseScene";

class LevelsScene extends BaseScene {
  constructor(config) {
    super("LevelsScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSettings: true,
      hasTutorial: true
    });
    this.fontOptions = {
      fontSize: "20px",
      fill: "#F00",
      fontFamily: "Indie Flower, cursive",
      stroke: "#FF0",
      strokeThickness: 1
    };
  }

  create() {
    this.createBG();
    super.create();
    this.createTutorialTxt();
  }
  createBG() {
    const backGround = this.add.image(0, 0, "house-lvl").setOrigin(0);
    backGround.displayHeight = innerHeight;
    backGround.displayWidth = innerWidth;
  }

  createTutorialTxt() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height / 2;

    this.make.text({
      x: xPos,
      y: yPos,
      text: "Here we can place all the levels....",
      origin: { x: 0.5, y: 0.5 },
      style: {
        ...this.fontOptions,
        wordWrap: { width: 300, useAdvancedWrap: true }
      }
    });
  }
}

export default LevelsScene;
