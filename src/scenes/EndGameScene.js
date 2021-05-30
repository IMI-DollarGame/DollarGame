import BaseScene from "./BaseScene";

class EndGameScene extends BaseScene {
  constructor(config) {
    super("EndGameScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSettings: true,
      hasTutorial: true
    });
    this.fontSize = 2.3;
  }

  create() {
    this.createBG();
    super.create();
    this.createGOTxt();
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "clouds-bg")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.4;
  }

  init(data) {
    this.message = data.message;
  }

  createGOTxt() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.5;

    this.make.text({
      x: xPos,
      y: yPos,
      text: this.message,
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontFamily: "Indie Flower, cursive",
        fontSize: `${this.fontSize}vw`,
        fill: "#F00",
        stroke: "#FF0",
        strokeThickness: 1,
        wordWrap: { width: 800, useAdvancedWrap: true }
      }
    });
  }
}
export default EndGameScene;
