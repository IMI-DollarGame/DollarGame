import BaseScene from "./BaseScene";

class ImpressumScene extends BaseScene {
  constructor(config) {
    super("ImpressumScene", {
      ...config,
      //  bGWithIslands: true,
      canGoBack: true,
      hasSoundButton: true,
      hasCredits: true
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
    this.createBG();
    super.create();
    this.createImpressum();
    this.createRightsReservedText();
  }
  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
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
    const xPos = this.config.width * 0.5;
    const yPos = this.config.height * 0.1;

    this.make.text({
      x: xPos,
      y: yPos,
      text: `Impressum`,
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
      x: this.config.width * 0.5,
      y: this.config.height * 0.18,
      text: `Information according to § 5 TMG:`,
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
      y: this.config.height * 0.4,
      text: `
      HTW Berlin - University of Applied Sciences

      E-Mail: pressestelle@htw-berlin.de

      Tel: +49 30 5019

      Treskowallee 8 

      10318 Berlin`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `20px`,
        fontWeight: "bold"
      }
    });
    this.make.text({
      x: this.config.width * 0.45,
      y: this.config.height * 0.42,
      text: `This game was developed as part of a semester project by the following
students of the International Media Computing study course:

Project supervisor: Professor Dr. Klaus Jung

Muhammad Safarov
Felix Deumlich
Nadzeya Kandakova
Linh Pham
Markus Merker
Marie-Christin Grundmann
Laura Unverzagt
`,
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

export default ImpressumScene;
