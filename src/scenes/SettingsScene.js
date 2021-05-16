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
    this.playMusic();
  }

  playMusic() {
    const bgMusic = this.sound.add("music", { loop: true });
    bgMusic.play();
  }

  setupMenuEvents(menuItem) {
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

      if (menuItem.text === "Music: On") {
        menuItem.text = "Music: Off";
      }

      if (menuItem.text === "Exit") {
        this.game.destroy(true);
      }
    });
  }
}

export default SettingsScene;
