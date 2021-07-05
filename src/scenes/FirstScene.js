import BaseScene from "./BaseScene";

class FirstScene extends BaseScene {
  constructor(config) {
    super("FirstScene", {
      ...config,
    });
    this.fontSize = 2.3;
    this.animationIsOver = false;
    this.lettersAreInTheMiddle = 0;
    this.logoLetterImages = [
      this.g,
      this.r,
      this.a1,
      this.p,
      this.h,
      this.l,
      this.a2,
      this.n,
      this.d,
      this.s,
    ];
    this.stopYposArray = [
      0.46, 0.45, 0.47, 0.46, 0.465, 0.46, 0.455, 0.45, 0.465, 0.46,
    ];
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
      this.logoLetterImages[i] = this.addImage(xPosition, letters[i]).setScale(1.5);
      xPosition += 0.04;
    }
  }

  addImage(posX, letter) {
    return this.add.image(this.config.width * posX, this.startYpos, letter);
  }

  animateLogo() {
    let i = 0;
    for (const val of this.logoLetterImages) {
      this.moveLetter(val, this.config.height * this.stopYposArray[i], 3);
      i++;
    }
  }
  

  moveLetter(letter, maxY, speedY) {
    if (letter.y >= maxY) {
      letter.y -= speedY;
    } else {
      this.lettersAreInTheMiddle++;
    }
  }

  splashAnimation(x, y, scale, framerate) {
    const effect = this.add.sprite(x, y, "graySmoke", 0);
    this.scaleObject(effect, scale);
    effect.depth = 100;
    this.anims.create({
      key: "graySmokeTransform",
      frameRate: framerate,
      frames: this.anims.generateFrameNames("graySmoke", { start: 1, end: 6 }),
    });
    effect.play("graySmokeTransform");
    effect.once("animationcomplete", () => {
      effect.destroy();
    });
    
  }

  playGraySmokeAnimation(x, y) {
    const effect = this.add.sprite(x, y, "graySmoke", 0);
    this.scaleObject(effect, 0.5);
    effect.depth = 100;
    this.anims.create({
      key: "graySmokeTransform",
      frameRate: 12,
      frames: this.anims.generateFrameNames("graySmoke", { start: 1, end: 5 })
    });
    effect.play("graySmokeTransform");
    effect.once("animationcomplete", () => {
      this.animationIsOver = true;
    });
  }

  update() {
    if (this.lettersAreInTheMiddle<11) {
      this.animateLogo();
    } else if (!this.animationIsOver) {
      const arr = [3, 1, 5, 8, 0, 6, 2, 7, 4, 9];
      for (let j = 0; j < this.logoLetterImages.length; j++) {
        let num = arr[j];
        this.time.delayedCall(this.delay, () => {
          this.splashAnimation(
            this.logoLetterImages[num].x,
            this.logoLetterImages[num].y,
            4,
            15
          );
          if (j == 9) {
            this.time.delayedCall(1000, () => {
              for(const val of this.logoLetterImages){
                this.playGraySmokeAnimation(val.x, val.y);
              }
            });
          }
        });
        this.delay += 300;
      }
    }else if(this.animationIsOver){
        this.scene.start("MenuScene");
    }
  }
}

export default FirstScene;
