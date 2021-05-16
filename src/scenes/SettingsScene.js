import BaseScene from "./BaseScene";

class SettingsScene extends BaseScene {

  constructor(config) {
    super("SettingsScene", { ...config, canGoBack: true, addDevelopers: true });

    this.menu = [
      { scene: null, text: "Music: On" },
      { scene: null, text: "Sound: On" },
    ];
  }

  create() {
    super.create();
    this.createMenu(this.menu, this.setupMenuEvents.bind(this));
  }

  setupMenuEvents(menuItem) {
    this.bgMusic = this.sound.add("music", { volume: 0.5,loop: true });
    const textGO = menuItem.textGO;
    textGO.setInteractive();

    textGO.on("pointerover", () => {
      textGO.setStyle({ fill: "#ff0" });
    });

    textGO.on("pointerout", () => {
      textGO.setStyle({ fill: "#f00" });
    });

    textGO.on("pointerup", () => {
      //    textGO.setStyle({ fill: "#fff" });
      menuItem.scene && this.scene.start(menuItem.scene);

      if(this.game.config.bgMusicPlaying === false ){

        this.game.config.bgMusicPlaying = true;
        this.bgMusic.play();
      }
      else{
        this.game.config.bgMusicPlaying = false;
        this.game.sound.stopAll();
      }

      if (menuItem.text === "Exit") {
        this.game.destroy(true);
      }
    });
  }
}

export default SettingsScene;
