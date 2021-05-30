import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import SettingsScene from "./scenes/SettingsScene";
import TutorialScene from "./scenes/TutorialScene";
import ScoreScene from "./scenes/ScoreScene";
import LevelsScene from "./scenes/LevelsScene";
import PlayScene from "./scenes/PlayScene";
import WinScene from "./scenes/WinScene";
import gameEnded from "./scenes/gameEnded";

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
  SettingsScene,
  PlayScene,
  WinScene,
  gameEnded
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
    mode: Phaser.Scale.ScaleModes.EXACT_FIT,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  },
  backgroundColor: "rgb(163, 163, 194)",

  bgMusicPlaying: false,

  //Basically what a user sees on the screen
  scene: initScenes()
};

new Phaser.Game(config);
