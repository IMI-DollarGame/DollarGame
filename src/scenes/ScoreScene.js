import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {
  constructor(config) {
    super("ScoreScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSoundButton: true
    });
    this.fontSize = 2.3;
  }

  create() {
    this.createBG();
    super.create();
    this.getBestScore();
    this.createDevelopersTxt();
    this.createTutorialTxt();
  }

  getBestScore() {
    const bestScore = localStorage.getItem("bestScore");
    this.add
      .text(...this.screenCenter, `Your best score is: ${bestScore}`, {
        fontSize: `${this.fontSize}vw`,
        fill: "#F00"
      })
      .setOrigin(0.5);
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "clouds-bg")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
    backGround.x = backGround.displayWidth * 0.4;
  }

  createTutorialTxt() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.7;

    this.make.text({
      x: xPos,
      y: yPos,
      text: "Here we can place the highest score of the player,",
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontFamily: "Indie Flower, cursive",
        fontSize: 20,
        wordWrap: { width: 300, useAdvancedWrap: true }
      }
    });
  }
}
export default ScoreScene;
