import BaseScene from "./BaseScene";

class EndGameScene extends BaseScene {
  constructor(config) {
    super("EndGameScene", {
      ...config,

      addDevelopers: true,
      hasSoundButton: true,
      hasTutorial: true
    });
    this.fontSize = 2.3;
    this.allLvlsCompleted = false;
    this.tutorialEndMsg = "Congratulations! You have finished the tutorial!";
    this.tutorialLost = "You ran out of steps!!";
  }

  create() {
    this.createBG();
    this.createBackButton();
    super.create();
    this.createGOTxt();
    this.storeScene();
  }

  init(data) {
    this.message = data.message;
    this.level = data.level;
    this.difficulty = data.difficulty;
    this.edges = data.edges;
    this.nodes = data.nodes;
    this.maximumStepAllowed = data.maximumStepAllowed;
    this.tutorialMode = data.tutorialMode;
  }

  storeScene() {
    sessionStorage.setItem(
      "currentScene",
      JSON.stringify({
        scene: "EndGameScene",
        difficulty: this.difficulty,
        message: this.message,
        level: this.level,
        edges: this.edges,
        nodes: this.nodes,
        maximumStepAllowed: this.maximumStepAllowed,
        tutorialMode: this.tutorialMode
      })
    );
  }

  createBG() {
    let thePic = "";
    if (
      this.message ===
      "Level " + this.level + " (" + this.difficulty + ") Completed"
    ) {
      thePic = "game-won";
    } else {
      thePic = "game-over";
    }
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, thePic)
      .setOrigin(0.5, 0.65)
      .setScale(1.9);
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
  createBackButton() {
    const backButton = this.add
      .image(innerWidth / 20, innerHeight / 20, "arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(backButton, 25);

    backButton.on("pointerup", () => {
      this.playButtonSound();
      this.scene.stop();
      this.scene.start("LevelsScene");
    });
  }
  checkScene() {
    const bestScore = localStorage.getItem(
      "levelbestscore_" + this.difficulty + "_" + this.level
    );
    const winMsg =
      "Level " + this.level + " (" + this.difficulty + ") Completed";
    const loseMsg =
      "You ran out of steps of " +
      "Level " +
      this.level +
      " (" +
      this.difficulty +
      "). Game over!!";
    if (this.message === winMsg) {
      this.createLevelScoreText();
      this.createBestScoreText();
      this.createRestartLvlBtn(0.43);
      this.createToNxtLvlBtn(0.53);
    } else if (this.message === loseMsg && bestScore !== null) {
      this.createBestScoreText();
      this.createRestartLvlBtn(0.47);
    } else if (this.message === loseMsg && bestScore === null) {
      this.createRestartLvlBtn(0.47);
    } else if (this.message === this.tutorialEndMsg) {
      this.createTutorialEndText();
    } else if (this.message === this.tutorialLost) {
      this.createTutorialEndText();
    }
  }

  /*--------- BEST SCORE AND CURRENT SCORE ---------- */
  createTutorialEndText() {
    let message = "";
    if (this.message === this.tutorialEndMsg) {
      message = `Hope you will enjoy the game!!!`;
    } else if (this.message === this.tutorialLost) {
      message = "But dont give up!";
    }
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.5;
    const endMsg = this.make.text({
      x: xPos,
      y: yPos,
      text: message,
      origin: { x: 0.5, y: 0.5 },
      style: this.game.config.defaultFontOptions
    });
    this.toMenuTxt();
  }
  toMenuTxt() {
    let message = "";
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.6;

    if (this.message === this.tutorialEndMsg) {
      message = `Click here to return to the main menu!`;
    } else if (this.message === this.tutorialLost) {
      message = "Click here to try again !!!";
    }
    const endClickMsg = this.make.text({
      x: xPos,
      y: yPos,
      text: message,
      origin: { x: 0.5, y: 0.5 },
      style: this.game.config.defaultFontOptions
    });
    endClickMsg.setInteractive();
    endClickMsg.on("pointerover", () => {
      endClickMsg.setStyle({ fill: "#ff0" });
    });
    endClickMsg.on("pointerout", () => {
      endClickMsg.setStyle({ fill: "#fff" });
    });
    endClickMsg.on("pointerup", () => {
      if (this.message === this.tutorialEndMsg) {
        this.scene.start("MenuScene");
      } else if (this.message === this.tutorialLost) {
        this.scene.start("PlayScene");
      }
      this.playButtonSound();
    });
  }

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
    const bestScore = localStorage.getItem(
      "levelbestscore_" + this.difficulty + "_" + this.level
    );
    this.make.text({
      x: xPos,
      y: yPos,
      text: `Best score: ${bestScore}`,
      origin: { x: 0.5, y: 0.5 },
      style: this.game.config.defaultFontOptions
    });
  }
  /*-----------CREATING BUTTONS -------------- */
  // createToAllLvlsBtn(per) {
  //   const allLvlBtn = this.add
  //     .image(innerWidth * per, innerHeight * 0.7, "all-levels-arrow")
  //     .setInteractive()
  //     .setOrigin(0, 0);
  //   this.scaleObject(allLvlBtn, 20);

  //   allLvlBtn.on("pointerup", () => {
  //     this.playButtonSound();
  //     this.scene.start("LevelsScene", { difficulty: this.difficulty });
  //   });

  //   this.buttonEffect(allLvlBtn);
  // }

  createRestartLvlBtn(per) {
    const restartLvlBtn = this.add
      .image(innerWidth * per, innerHeight * 0.7, "restartLvl")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(restartLvlBtn, 20);

    restartLvlBtn.on("pointerup", () => {
      this.playButtonSound();
      const currentScene = JSON.parse(sessionStorage.getItem("currentScene"));
      this.scene.start("PlayScene", {
        nodes: currentScene.nodes,
        edges: currentScene.edges,
        maximumStepAllowed: currentScene.maximumStepAllowed,
        level: currentScene.level,
        difficulty: currentScene.difficulty
      });
    });

    this.buttonEffect(restartLvlBtn);
  }

  createToNxtLvlBtn(per) {
    const nexttLvlBtn = this.add
      .image(innerWidth * per, innerHeight * 0.7, "nextLvlArrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(nexttLvlBtn, 20);

    nexttLvlBtn.on("pointerup", () => {
      this.playButtonSound();
      this.goToNextLvl();
    });

    this.buttonEffect(nexttLvlBtn);
  }

  goToNextLvl() {
    this.obj = this.cache.json.get("levels");
    const allLevels = this.obj.scenario;
    this.checkNextLvl(allLevels);
    let toImportSteps, toImportNodes, toImportEdges;
    for (var i = 0; i < allLevels.length; i++) {
      const level = allLevels[i];
      if (level.difficulty === this.difficulty && level.level === this.level) {
        toImportSteps = level.steps;
        toImportNodes = level.nodes;
        toImportEdges = level.edges;
      }
    }
    if (this.allLvlsCompleted) {
      this.scene.start("MenuScene");
    } else {
      this.scene.start("PlayScene", {
        nodes: toImportNodes,
        edges: toImportEdges,
        maximumStepAllowed: toImportSteps,
        difficulty: this.difficulty,
        level: this.level
      });
    }
  }

  checkNextLvl(allLevels) {
    let easyLvls = [];
    let normalLvls = [];
    let hardLvls = [];

    for (let i = 0; i < allLevels.length; i++) {
      if (allLevels[i].difficulty === "easy") {
        easyLvls.push(allLevels[i]);
      } else if (allLevels[i].difficulty === "normal") {
        normalLvls.push(allLevels[i]);
      } else {
        hardLvls.push(allLevels[i]);
      }
    }

    if (this.difficulty === "easy") {
      if (this.level === easyLvls.length) {
        this.level = 1;
        this.difficulty = "normal";
      } else {
        this.level++;
      }
    } else if (this.difficulty === "normal") {
      if (this.level === normalLvls.length) {
        this.level = 1;
        this.difficulty = "hard";
      } else {
        this.level++;
      }
    } else if (this.difficulty === "hard") {
      if (this.level === hardLvls.length) {
        this.allLvlsCompleted = true;
      } else {
        this.level++;
      }
    }
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
