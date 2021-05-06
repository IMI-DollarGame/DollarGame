import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import SettingsScene from "./scenes/SettingsScene";
import TutorialScene from "./scenes/TutorialScene";
import ScoreScene from "./scenes/ScoreScene";
import LevelsScene from "./scenes/LevelsScene";

//const WIDTH = window.screen.availWidth;
//const HEIGHT = window.screen.availHeight;

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT
};

const Scenes = [
  PreloadScene,
  MenuScene,
  LevelsScene,
  ScoreScene,
  TutorialScene,
  SettingsScene
];
const createScene = Scene => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.HEIGHT_CONTROLS_WIDTH,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  },
  backgroundColor: "rgb(163, 163, 194)",

  //Basically what a user sees on the screen
  scene: initScenes()
};

new Phaser.Game(config);
