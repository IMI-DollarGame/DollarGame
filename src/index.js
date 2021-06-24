import Phaser from "phaser";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import TutorialScene from "./scenes/TutorialScene";
import LevelsScene from "./scenes/LevelsScene";
import PlayScene from "./scenes/PlayScene";
import EndGameScene from "./scenes/EndGameScene";
import DifficultyScene from "./scenes/DifficultyScene";
import ImpressumScene from "./scenes/ImpressumScene";
import CreditsScene from "./scenes/CreditsScene";

const WIDTH = innerWidth;
const HEIGHT = innerHeight;

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT
};

const Scenes = [
  PreloadScene,
  MenuScene,
  TutorialScene,
  ImpressumScene,
  CreditsScene,
  LevelsScene,
  DifficultyScene,
  TutorialScene,
  PlayScene,
  EndGameScene
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

  bgMusicPlaying: true,
  soundPlaying: true,

  //Basically what a user sees on the screen
  scene: initScenes()
};

new Phaser.Game(config);
