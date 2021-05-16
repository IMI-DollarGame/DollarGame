import BaseScene from "./BaseScene";

class TutorialScene extends BaseScene {
  constructor(config) {
    super("TutorialScene", { ...config, canGoBack: true, addDevelopers: true });
  }

  create() {
    super.create();
    this.createTutorialTxt();
  }
  createTutorialTxt() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height / 2;

    this.make.text({
      x: xPos,
      y: yPos,
      text:
        "Here will be the text that will explain the whole logic of our game.",
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontFamily: "Indie Flower, cursive",
        fontSize: `${1.5}vw`,
        wordWrap: { width: 300, useAdvancedWrap: true }
      }
    });
  }
}

export default TutorialScene;
