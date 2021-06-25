import BaseScene from "./BaseScene";

class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", {
      ...config,

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
    this.createBG();
    this.createBackButton();
    super.create();
    this.createAllText();
    this.createRightsReservedText();
  }
  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5)
      .setScale(1.8);
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
      this.scene.start("ImpressumScene");
    });
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

  createAllText() {
    const xPos = this.config.width * 0.5;
    const yPos = this.config.height * 0.1;

    this.make.text({
      x: xPos,
      y: yPos,
      text: `Credits`,
      origin: { x: 0.5, y: 0.5 },
      style: {
        ...this.fontOptions,
        fill: "#000000",
        fontSize: `45px`,
        fontWeight: "bold",
        stroke: "#000",
        strokeThickness: 1
      }
    });

    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.15,
      text: `
      During the development of the game, several free images,music and assets were downloaded from various sources. 
      All images, music and assets can be used for free and without any restrictions.`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `20px`,
        fontWeight: "bold"
      }
    });

    // *******************************************************
    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.3,
      text: `Music/Sound effects:`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `35px`,
        fontWeight: "bold"
      }
    });

    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.35,
      text: `Background music: www.chosic.com
Sound effects: mixkit.co/free-sound-effects/`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `20px`,
        fontWeight: "bold"
      }
    });
    // *******************************************************
    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.47,
      text: `Buttons/Icons:`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `35px`,
        fontWeight: "bold"
      }
    });

    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.52,
      text: `https://de.wikipedia.org/wiki/Facebook
https://de.wikipedia.org/wiki/Twitter
https://fonts.google.com/icons
    `,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `20px`,
        fontWeight: "bold"
      }
    });
    // *******************************************************
    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.65,
      text: `Background Images:`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `35px`,
        fontWeight: "bold"
      }
    });

    this.make.text({
      x: this.config.width * 0.05,
      y: this.config.height * 0.7,
      text: `https://pixabay.com/de/photos/himmel-wolken-d%c3%bcster-dramatisch-592415/
https://pixabay.com/de/photos/wolke-dunkel-sturm-hintergrund-2725520/
https://pixabay.com/de/photos/wolken-natur-himmel-cumulus-4215608/
https://pixabay.com/de/photos/wolken-himmel-hell-tageslicht-1282314/
https://pixabay.com/de/photos/wolken-himmel-2483302/
https://unsplash.com/photos/AnGx1n-gtw8 
    `,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `20px`,
        fontWeight: "bold"
      }
    });
    // ************************************************************
    // *******************************************************
    this.make.text({
      x: this.config.width * 0.5,
      y: this.config.height * 0.3,
      text: `Fonts:`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `35px`,
        fontWeight: "bold"
      }
    });

    this.make.text({
      x: this.config.width * 0.5,
      y: this.config.height * 0.35,
      text: `https://www.dafont.com/de/neon-80s.font
https://fonts.google.com/specimen/Montserrat?selection.family=Montserrat`,
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
