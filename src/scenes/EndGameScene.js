import BaseScene from "./BaseScene";

class EndGameScene extends BaseScene {
  constructor(config) {
    super("EndGameScene", {
      ...config,
      canGoBack: true,
      addDevelopers: true,
      hasSoundButton: true,
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
    const yPos = this.config.height * 0.3;

    this.make.text({
      x: xPos,
      y: yPos,
      text: this.message,
      origin: { x: 0.5, y: 0.5 },
      style: this.game.config.defaultFontOptions
    });
    this.checkScene();
  }
  checkScene() {
    if (this.message === "Level Completed") {
      this.createLevelScoreText();
      this.createBestScoreText();
      this.createToAllLvlsBtn(0.37);
      this.createRestartLvlBtn(0.47);
      this.createToNxtLvlBtn(0.57);
    } else {
      this.createLevelScoreText();
      this.createBestScoreText();
      this.createToAllLvlsBtn(0.42);
      this.createRestartLvlBtn(0.52);
    }
  }

  /*--------- BEST SCORE AND CURRENT SCORE ---------- */
  createLevelScoreText() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.5;
    const currentScore = sessionStorage.getItem("currentScore");
    this.make.text({
      x: xPos,
      y: yPos,
      text: `Your current score: ${currentScore}`,
      origin: { x: 0.5, y: 0.5 },
      style: this.game.config.defaultFontOptions
    });
  }
  createBestScoreText() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.55;
    const bestScore = localStorage.getItem("bestScore");
    this.make.text({
      x: xPos,
      y: yPos,
      text: `Best score: ${bestScore}`,
      origin: { x: 0.5, y: 0.5 },
      style: this.game.config.defaultFontOptions
    });
  }
  /*-----------CREATING BUTTONS -------------- */
  createToAllLvlsBtn(per) {
    const allLvlBtn = this.add
      .image(innerWidth * per, innerHeight * 0.7, "all-levels-arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(allLvlBtn, 20);

    allLvlBtn.on("pointerup", () => {
      this.playButtonSound();
      this.scene.start("LevelsScene");
    });
  }
  createRestartLvlBtn(per) {
    const restartLvlBtn = this.add
      .image(innerWidth * per, innerHeight * 0.7, "restartLvl")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(restartLvlBtn, 20);

    restartLvlBtn.on("pointerup", () => {
      this.playButtonSound();
      this.scene.start("PlayScene");
    });
  }
  createToNxtLvlBtn(per) {
    const nexttLvlBtn = this.add
      .image(innerWidth * per, innerHeight * 0.7, "nextLvlArrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(nexttLvlBtn, 20);

    nexttLvlBtn.on("pointerup", () => {
      this.playButtonSound();
      this.scene.start("LevelsScene");
    });
  }
  /*-------------- SCALING BUTTONS AND SOUND ------------- */
  scaleObject(obj, wPer) {
    obj.displayWidth = this.game.config.width / wPer;
    let hPer = (innerHeight / innerWidth) * wPer;
    obj.displayHeight = this.game.config.height / hPer;
  }
  playButtonSound() {
    if (this.game.config.soundPlaying === true) {
      this.soundMenu.play();
    }
  }
}
export default EndGameScene;
