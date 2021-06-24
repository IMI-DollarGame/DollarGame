import BaseScene from "./BaseScene";

class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", {
      ...config,
      bGWithIslands: true,
      canGoBack: true,
      hasSoundButton: true
    });
    this.fontSize = 1.5;
    this.lineHeight = config.height / 12.5;

    this.fontOptions = {
      fontSize: `${this.fontSize}vw`,
      fill: "#FFF",
      fontFamily: "Neon"
    };
  }

  create() {
    super.create();
    this.createImpressum();
    this.createRightsReservedText();
  }

  createRightsReservedText() {
    const xPos = this.config.width / 2;
    const yPos = this.config.height * 0.95;

    this.make.text({
      x: xPos,
      y: yPos,
      text: `© 2021  https://graphlands.herokuapp.com - All Rights Reserved.`,
      origin: { x: 0.5, y: 0.5 },
      style: { ...this.fontOptions, fill: "#000000" }
    });
  }

  createImpressum() {
    const xPos = this.config.width * 0.25;
    const yPos = this.config.height * 0.25;

    let impressum = this.make.text({
      x: xPos,
      y: yPos,
      text: `Impressum \n 
      Information according to § 5 TMG:`,
      origin: { x: 0.5, y: 0.5 },
      style: {
        ...this.fontOptions,
        fill: "#000000",
        fontSize: `35px`,
        fontWeight: "bold",
        stroke: "#000",
        strokeThickness: 1
      }
    });

    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.35,
      text: `
      HTW Berlin - University of Applied Sciences
      Creators: Muhammad Safarov, Nadzeya Kandakova, 
                  Linh Pham, Markus Merker, Felix Deumlich,
                  Marie-Christin Grundmann, Laura Unverzagt
      E-Mail: pressestelle@htw-berlin.de
      Tel: +49 30 5019
      Treskowallee 8, 
      10318 Berlin`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `20px`,
        fontWeight: "bold"
      }
    });
  }
}

export default CreditsScene;

// HTW Berlin - University of Applied Sciences
// WEBDESIGN made simple
// Treskowallee 8
// 10318 Berlin
