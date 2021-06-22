import BaseScene from "./BaseScene";

class TutorialScene extends BaseScene {
  constructor(config) {
    super("TutorialScene", {
      ...config,
    });
    this.nodes;
    this.edges;
    this.steps;
    this.tutorialSteps;
  }

  create() {
    this.getTutorialInfo();
    this.scene.start("PlayScene", {
      nodes: this.nodes,
      edges: this.edges,
      maximumStepAllowed: this.steps,
      tutorialMode: true,
      tutorialSteps: this.tutorialSteps,
    });
  }

  getTutorialInfo() {
    var obj = this.cache.json.get("tutorial");
    this.nodes = obj.nodes;
    this.edges = obj.edges;
    this.steps = obj.steps;
    this.tutorialSteps = obj.tutorialSteps;
  }
}

export default TutorialScene;
