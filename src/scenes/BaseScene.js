import Phaser from "phaser";
import { EventEmitter } from "events";

class BaseScene extends Phaser.Scene {
  constructor(key, config) {
    super(key);
    this.config = config;
    this.screenCenter = [config.width / 2, config.height / 3];
    this.fontSize = 40;
    this.lineHeight = 80;
    this.defaultTopBtnHeight = innerHeight / 20;
    this.bgMusic;
    this.quote = "Come and Join us to build the greatest Graphlands !!! \n http://graphlands.herokuapp.com/";
    this.completedLevel = [];
  }

  create() {
    this.creatingAllButtons();
    this.soundMenu = this.sound.add("soundMenu", { volume: 0.5 });
  }

  createMenu(menu, setupMenuEvents) {
    let lastMenuPositionY = 0;
    menu.forEach(menuItem => {
      const menuPosition = [
        this.screenCenter[0],
        this.screenCenter[1] + lastMenuPositionY
      ];
      menuItem.textGO = this.add
        .text(
          ...menuPosition,
          menuItem.text,
          this.game.config.defaultFontOptions
        )
        .setOrigin(0.5, 1);
      lastMenuPositionY += this.lineHeight;
      setupMenuEvents(menuItem);
    });
  }

  createBackButton() {
    const backButton = this.add
      .image(innerWidth / 20, innerHeight / 20, "arrow")
      .setInteractive()
      .setOrigin(0, 0);
    this.scaleObject(backButton, 25);

    backButton.on("pointerup", () => {
      this.playButtonSound();
      this.scene.start("MenuScene");
    });
  }

  displaySoundButton() {
    this.bgMusic = this.sound.add("music", { volume: 0.4, loop: true });

    this.soundMenu = this.sound.add("soundMenu", { volume: 0.5 });

    const musicOn = this.add
      .image(innerWidth * 0.85, this.defaultTopBtnHeight, "musicOn")
      .setOrigin(1, 0)
      .setInteractive();
    musicOn.visible = this.game.config.bgMusicPlaying;
    this.scaleObject(musicOn, 30);

    const musicOff = this.add
      .image(innerWidth * 0.85, this.defaultTopBtnHeight, "musicOff")
      .setOrigin(1, 0)
      .setInteractive();
    musicOff.visible = !this.game.config.bgMusicPlaying;
    this.scaleObject(musicOff, 30);

    const soundOn = this.add
      .image(innerWidth * 0.9, this.defaultTopBtnHeight, "soundOn")
      .setOrigin(1, 0)
      .setInteractive();
    soundOn.visible = this.game.config.soundPlaying;
    this.scaleObject(soundOn, 30);

    const soundOff = this.add
      .image(innerWidth * 0.9, this.defaultTopBtnHeight, "soundOff")
      .setOrigin(1, 0)
      .setInteractive();
    soundOff.visible = !this.game.config.soundPlaying;
    this.scaleObject(soundOff, 30);

    soundOn.on("pointerdown", () => {
      this.game.config.soundPlaying = false;
      soundOn.visible = this.game.config.soundPlaying;
      soundOff.visible = !this.game.config.soundPlaying;
    });

    soundOff.on("pointerdown", () => {
      this.game.config.soundPlaying = true;
      soundOn.visible = this.game.config.soundPlaying;
      soundOff.visible = !this.game.config.soundPlaying;
    });

    musicOn.on("pointerdown", () => {
      this.game.config.bgMusicPlaying = false;
      musicOff.visible = !this.game.config.bgMusicPlaying;
      musicOn.visible = this.game.config.bgMusicPlaying;
      this.game.sound.stopAll();
    });

    musicOff.on("pointerdown", () => {
      if (!this.sound.locked) {
        // already unlocked so play
        this.game.config.bgMusicPlaying = true;
        musicOff.visible = !this.game.config.bgMusicPlaying;
        musicOn.visible = this.game.config.bgMusicPlaying;
        this.bgMusic.play();
      } 
      else {
        // wait for 'unlocked' to fire and then play
        this.bgMusic.once(Phaser.Sound.Events.UNLOCKED, () => {
          this.game.config.bgMusicPlaying = true;
          musicOff.visible = !this.game.config.bgMusicPlaying;
          musicOn.visible = this.game.config.bgMusicPlaying;
          this.bgMusic.play();
        });
      }
    });
  }

  createDevelopersTxt() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.9;

    const footerText = this.add.text(
      0,
      0,
      "International Media and Computing \n HTW-Berlin",
      {
        fontSize: "15px",
        fontFamily: "Montserrat-Regular",
        fill: "#000",
        align: "center",
      }
    );
    footerText.setOrigin(0.5);

    var twitterBtn = this.add.image(-50, 50, 'twitterLogo').setInteractive();
    this.scaleObject(twitterBtn, 45);

    twitterBtn.on('pointerup', () => {
      this.openExternalLink("https://twitter.com/intent/tweet?text=" + encodeURIComponent(this.quote));
    });

    var facebookBtn = this.add.image(50, 50, 'facebookLogo').setInteractive();
    this.scaleObject(facebookBtn, 45);

    facebookBtn.on('pointerup', () => {
      this.openExternalLink("https://www.facebook.com/sharer/sharer.php?u=graphlands.herokuapp.com&quote=" + encodeURIComponent(this.quote));
    });

    var githubBtn = this.add.image(0, 50, 'githubLogo').setInteractive();
    this.scaleObject(githubBtn, 45);

    githubBtn.on('pointerup', () => {
      this.openExternalLink("https://github.com/IMI-DollarGame/DollarGame");
    });

    const container = this.add.container(
      xPos, yPos,
      [twitterBtn, facebookBtn, githubBtn, footerText]
    );
  }

  openExternalLink(url){
    var s = window.open(url, '_blank');
    if (s && s.focus) {
      s.focus();
    }
    else if (!s) {
      window.location.href = url;
    }
  }

  setupMenuEvents(menuItem) {
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#ff0" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#fff" });
    });

    textGO.on("pointerup", () => {
      menuItem.scene && this.scene.start(menuItem.scene);
      this.playButtonSound();
    });
  }

  creatingAllButtons() {
    if (this.config.canGoBack) {
      this.createBackButton();
    }
    if (this.config.addDevelopers) {
      this.createDevelopersTxt();
    }
    if (this.config.hasSoundButton) {
      this.displaySoundButton();
    }
  }

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
export default BaseScene;
