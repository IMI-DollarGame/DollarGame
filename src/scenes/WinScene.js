import BaseScene from "./BaseScene";

class WinScene extends BaseScene {
  constructor(config) {
    super("WinScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSettings: true,
    });
  }

  create() {
    super.create();
    this.getBestScore();
    this.createDevelopersTxt();
    this.createPassedLevelTxt();
    this.createNextLevelButton();
    this.getScore();
  }

  getBestScore() {
    const bestScore = localStorage.getItem("bestScore");
    this.add
      .text(...this.screenCenter, `Congratulations!🥳`, {
        fontSize: "55px",
        fill: "#a2e5a2"
      })
      .setOrigin(0.5);
  }

  createPassedLevelTxt() {

    this.make.text({
      x: this.config.width / 2,
      y: this.config.height * 0.4,
      text: "You just passed level ### ",
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontFamily: "Indie Flower, cursive",
        fontSize: 25,
        wordWrap: { width: 300, useAdvancedWrap: true }
      }
    });
  }
  createNextLevelButton(){
  const nextLevelButton = this.add
      .text(innerWidth * 0.48 , innerHeight *0.55, "➡️", {fontSize:"100px"})
      .setInteractive()
      .setOrigin(0, 0);

    nextLevelButton.on("pointerup", () => {
      this.scene.start("MenuScene");
    });
  }
  getScore() {
    const bestScore = localStorage.getItem("bestScore");
    this.add
        .text(innerWidth * 0.50, innerHeight * 0.46,  `Your score: ${bestScore}`, {
          fontSize: "30px",
          fill: "#a2e5a2"
        })
        .setOrigin(0.5);
  }





}
export default WinScene;
