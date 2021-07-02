import BaseScene from "./BaseScene";

class FirstScene extends BaseScene {
  constructor(config) {
    super("FirstScene", {
      ...config,
    });
    this.fontSize = 2.3;
    this.animationIsOver = false;
    this.lettersAreInTheMiddle =false;
    this.letters = [];
    this.delay = 1000;
  }

  create() {
    this.createBG();
    this.navigateToMenuScene();
    this.addLogoLetters();
    super.create();
  }

  createBG() {
    const backGround = this.add
      .image(this.config.width / 2, this.config.height / 2, "blueSky")
      .setOrigin(0.5, 0.5);
  }

  navigateToMenuScene() {
    const clickText = this.make
      .text({
        x: this.config.width / 2,
        y: this.config.height * 0.8,
        text: "Click here to start",
        origin: { x: 0.5, y: 0.5 },
        style: this.game.config.defaultFontOptions,
      })
      .setInteractive();
    clickText.on("pointerover", () => {
      clickText.setStyle({ fill: "#ff0" });
    });
    clickText.on("pointerout", () => {
      clickText.setStyle({ fill: "#fff" });
    });
    clickText.on("pointerup", () => {
      this.scene.start("MenuScene");
    });
  }

  addLogoLetters() {
    this.g = this.add.image(
      this.config.width * 0.32,
      this.config.height * 0.9,
      "G"
    );
    this.r = this.add.image(
      this.config.width * 0.36,
      this.config.height * 0.9,
      "R"
    );
    this.a1 = this.add.image(
      this.config.width * 0.4,
      this.config.height * 0.9,
      "A1"
    );
    this.p = this.add.image(
      this.config.width * 0.44,
      this.config.height * 0.9,
      "P"
    );
    this.h = this.add.image(
      this.config.width * 0.48,
      this.config.height * 0.9,
      "H"
    );
    this.l = this.add.image(
      this.config.width * 0.52,
      this.config.height * 0.9,
      "L"
    );
    this.a2 = this.add.image(
      this.config.width * 0.56,
      this.config.height * 0.9,
      "A2"
    );
    this.n = this.add.image(
      this.config.width * 0.6,
      this.config.height * 0.9,
      "N"
    );
    this.d = this.add.image(
      this.config.width * 0.64,
      this.config.height * 0.9,
      "D"
    );
    this.s = this.add.image(
      this.config.width * 0.68,
      this.config.height * 0.9,
      "S"
    );

    this.letters.push(this.g, this.r, this.a1, this.p, this.h , this.l , this.a2, this.n, this.d, this.s)
   //this.letters.push(this.r, this.p, this.a1, this.g, this.h , this.n , this.d, this.l, this.a2, this.s)
  }

  moveLetter(letter, maxY, speedY) {
    if (letter.y > maxY) {
      letter.y -= speedY;
    } else {
       letter.y = maxY;
       this.lettersAreInTheMiddle = true;
    
     }
     
  }

  splashAnimation(letter, x, y) {
    const effect = this.add.sprite(x, y, "graySmoke", 0);
    this.scaleObject(effect, 6);
    effect.depth = 100;
    this.anims.create({
      key: "graySmokeTransform",
      frameRate: 15,
      frames: this.anims.generateFrameNames("graySmoke", { start: 1, end: 6 }),
    });
    effect.play("graySmokeTransform");
    effect.once("animationcomplete", () => {
      effect.destroy();
      this.animationIsOver = true;
    });
    //letter.destroy();
    //this.time.delayedCall(3000,() => { this.scene.start("MenuScene");});
  }

  animateLogo() {
    this.moveLetter(this.g, this.config.height * 0.46, 2);
    //
    //maxX = this.config.width * 0.32,

    this.moveLetter(this.r, this.config.height * 0.45, 2);
    //maxX = this.config.width * 0.36,

    this.moveLetter(this.a1, this.config.height * 0.47, 2);
    //maxX = this.config.width * 0.4,

    this.moveLetter(this.p, this.config.height * 0.46, 2);
    //maxX = this.config.width * 0.44,

    this.moveLetter(this.h, this.config.height * 0.465, 2);
    //maxX =  this.config.width * 0.48,

    this.moveLetter(this.l, this.config.height * 0.46, 2);
    //maxX =  this.config.width * 0.52,

    this.moveLetter(this.a2, this.config.height * 0.455, 2);
    //maxX =  this.config.width * 0.56,

    this.moveLetter(this.n, this.config.height * 0.45, 2);
    //maxX =   this.config.width * 0.6,

    this.moveLetter(this.d, this.config.height * 0.465, 2);
    //maxX =   this.config.width * 0.64,

    this.moveLetter(this.s, this.config.height * 0.46, 2);
    //maxX =  this.config.width * 0.68,
  }

  update() {
    if (!this.lettersAreInTheMiddle) {
      this.animateLogo();
    }else if (!this.animationIsOver){
  
        for (const val of this.letters){
            this.time.delayedCall(this.delay, () => {
            this.splashAnimation(val, val.x, val.y)});
            this.delay += 400;
        }
        this.animationIsOver = true;
    }
  }
}

export default FirstScene;
