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
      text: "Here we can place all the levels....",
      origin: { x: 0.5, y: 0.5 },
      style: {
        fontFamily: "Indie Flower, cursive",
        fontSize: 20,
        wordWrap: { width: 300, useAdvancedWrap: true }
      }
    });
  }
}

export default LevelsScene;
