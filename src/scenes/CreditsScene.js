import BaseScene from "./BaseScene";

class CreditsScene extends BaseScene {
  constructor(config) {
    super("CreditsScene", {
      ...config,

      hasSoundButton: true,
      allRightsReserved: true
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
  createLink(link, xPer, yPer) {
    let x = this.make
      .text({
        x: this.config.width * xPer,
        y: this.config.height * yPer,
        text: link,
        origin: { x: 0, y: 0 },
        style: {
          ...this.fontOptions,
          fill: "#000",
          fontSize: `20px`,
          fontWeight: "bold"
        }
      })
      .setInteractive();
    x.on("pointerover", () => {
      x.setStyle({ fill: "#EEE" });
    });

    x.on("pointerout", () => {
      x.setStyle({ fill: "#000" });
    });
    x.on("pointerup", () => {
      this.openExternalLink(link);
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
    this.createLink(
      "https://www.scottbuckley.com.au/library/wanderlust/",
      0.05,
      0.35
    );
    this.createLink("https://www.youtube.com/watch?v=s3fEbZwiJ94", 0.05, 0.38);
    this.createLink(
      "https://www.fesliyanstudios.com/play-mp3/2903",
      0.05,
      0.41
    );
    this.createLink("https://mixkit.co/free-sound-effects/", 0.05, 0.44);

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
    this.createLink(
      "https://en.wikipedia.org/wiki/File:Octicons-mark-github.svg",
      0.05,
      0.52
    );
    this.createLink("https://de.wikipedia.org/wiki/Facebook", 0.05, 0.55);
    this.createLink("https://de.wikipedia.org/wiki/Twitter", 0.05, 0.58);
    this.createLink("https://fonts.google.com/icons", 0.05, 0.61);

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
    this.createLink(
      "https://pixabay.com/de/photos/himmel-wolken-d%c3%bcster-dramatisch-592415/",
      0.05,
      0.7
    );
    this.createLink(
      "https://pixabay.com/de/photos/wolke-dunkel-sturm-hintergrund-2725520/",
      0.05,
      0.73
    );
    this.createLink(
      "https://pixabay.com/de/photos/wolken-natur-himmel-cumulus-4215608/",
      0.05,
      0.76
    );
    this.createLink(
      "https://pixabay.com/de/photos/wolken-himmel-hell-tageslicht-1282314/",
      0.05,
      0.79
    );
    this.createLink(
      "https://pixabay.com/de/photos/wolken-himmel-2483302/",
      0.05,
      0.82
    );
    this.createLink("https://unsplash.com/photos/AnGx1n-gtw8", 0.05, 0.85);

    // ************************************************************
    // this.createLink("",0.05,0.82)
    this.make.text({
      x: this.config.width * 0.5,
      y: this.config.height * 0.3,
      text: `Fonts & Animation:`,
      origin: { x: 0, y: 0 },
      style: {
        ...this.fontOptions,
        fill: "#000",
        fontSize: `35px`,
        fontWeight: "bold"
      }
    });
    this.createLink(
      "https://www.freepik.com/free-photos-vectors/background%22%3EBackground",
      0.5,
      0.35
    );
    this.createLink(
      "https://fonts.google.com/specimen/Montserrat?selection.family=Montserrat",
      0.5,
      0.38
    );
    this.createLink("https://www.dafont.com/de/neon-80s.font", 0.5, 0.41);
  }
}

export default CreditsScene;
