import BaseScene from "./BaseScene";

class FirstScene extends BaseScene {
  constructor(config) {
    super("FirstScene", {
      ...config,
    });
    this.fontSize = 2.3;
    this.animationIsOver = false;
    this.lettersAreInTheMiddle = false;
    this.logoLetterImages = [this.g, this.r, this.a1, this.p, this.h, this.l, this.a2, this.n, this.d, this.s];
    this.stopYposArray = [0.46, 0.45, 0.47, 0.46, 0.465, 0.46, 0.455, 0.45, 0.465,0.46];
    this.delay = 500;
    this.startYpos = this.config.height * 0.9 + 200;
  }

  create() {
    this.createBG();
    this.addLogoLetters();
    super.create();
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5);
  }

  addLogoLetters() {
    const letters = ["G", "R", "A1", "P", "H", "L", "A2", "N", "D", "S"];
    let xPosition = 0.32;
    for (let i = 0; i < this.logoLetterImages.length; i++) {
      this.logoLetterImages[i] = this.addImage(xPosition, letters[i]);
      xPosition += 0.04;
    }
  }

  addImage(posX,letter) {
   return this.add.image(
      this.config.width * posX,
      this.startYpos,
      letter
    );
  }

  animateLogo() {
    let i = 0;
    for (const val of this.logoLetterImages){
      this.moveLetter(val, this.config.height * this.stopYposArray[i], 2);
      i++;
    } 
  }

  moveLetter(letter, maxY, speedY) {
    if (letter !== this.s && letter.y >= maxY) {
      letter.y -= speedY;
    } else {
      letter.y = maxY;
      this.lettersAreInTheMiddle = true;
    }
  }

  splashAnimation(x, y) {
    const effect = this.add.sprite(x, y, "graySmoke", 0);
    this.scaleObject(effect, 4);
    effect.depth = 100;
    this.anims.create({
      key: "graySmokeTransform",
      frameRate: 20,
      frames: this.anims.generateFrameNames("graySmoke", { start: 1, end: 6 }),
    });
    effect.play("graySmokeTransform");
    effect.once("animationcomplete", () => {
      effect.destroy();
      this.animationIsOver = true;
    });
    this.time.delayedCall(4000,() => { this.scene.start("MenuScene");});
  }


  update() {
    if (!this.lettersAreInTheMiddle) {
      this.animateLogo();
    } else if (!this.animationIsOver) {
      const arr = [3,1,5,8,0,6,2,7,4,9];
      for (let j =0; j <this.logoLetterImages.length; j++){
        let num = arr[j];
        this.time.delayedCall(this.delay, () => {
        this.splashAnimation(this.logoLetterImages[num].x, this.logoLetterImages[num].y);
      });
       this.delay += 300;
      }
      this.animationIsOver = true;
    }
  }
}

export default FirstScene;
