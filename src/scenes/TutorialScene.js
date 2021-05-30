import BaseScene from "./BaseScene";

class TutorialScene extends BaseScene {
    constructor(config) {
        super("TutorialScene", { ...config, canGoBack: true, addDevelopers: true });
        this.helpTextIndex = 0
        this.textXPos = this.config.width / 2
        this.textYPos = this.config.height * 0.1
        this.textWidth = 300
        this.tutorialText = [
            "These are your islands.",
            "Each island has a certain number assigned to it representing its wealth and population.",
            "Many islands are connected by travel routes, that enable you to spread your wealth.",
            "Your goal is to populate as many islands as possible. You do so by clicking on the islands you want to populate. Click on the middle island!",
            "Every connected island will share a wealth point with the island you clicked on.",
            "If every island has a wealth score of 0 or higher, you win the game. Try it!",
            "If an island is too wealthy or poor, it will crumble and fall from the sky, so avoid wealth scores higher or lower than +7 or -7",
            "Try to win the game with as few moves as possible. Good luck!"
        ]
        this.buttonStyle = { fill: '#F00', fontSize: '5em', backgroundColor: '#fff' }
    }

    create() {
        super.create();
        this.createTutorialTxt();
        this.createButtons();
        
    }
    
    createTutorialTxt() {
        this.helpText = this.make.text({
            x: this.textXPos,
            y: this.textYPos,
            text:
                "Here will be the text that will explain the whole logic of our game.",
            origin: { x: 0.5, y: 0.5 },
            style: {
                fontFamily: "Indie Flower, cursive",
                fontSize: 20,
                wordWrap: { width: this.textWidth, useAdvancedWrap: true },
            },
        });
    }

    createButtons() {
      this.nextButton = this.add.text(this.textXPos + (this.textWidth / 1.5), this.textYPos, '›', this.buttonStyle)
          .setInteractive()
          .on('pointerdown', () => this.nextHelptext())

      this.prevButton = this.add.text(this.textXPos - (this.textWidth / 1.5), this.textYPos, '‹', this.buttonStyle)
          .setInteractive()
          .on('pointerdown', () => this.prevHelptext())
    }

    updateHelptext() {
        this.helpText.text = this.tutorialText[this.helpTextIndex]
    }

    nextHelptext() {
        this.helpTextIndex++
        if(this.helpTextIndex >= this.tutorialText.length)
        {
            this.helpTextIndex = 0
            this.updateHelptext()
            this.scene.start("MenuScene")
        }
        this.updateHelptext()
    }

    prevHelptext() {
        this.helpTextIndex = --this.helpTextIndex < 0 ? 0 : this.helpTextIndex
        this.updateHelptext()
    }

}

export default TutorialScene;
