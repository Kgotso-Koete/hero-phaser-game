import Phaser, { Tilemaps } from "phaser";

const MAX_X_VELOCITY = 250;
const MAX_Y_VELOCITY = 400;
const MAX_DOUBLE_JUMP_VEL = 300;
const DRAG = 750;

class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, xPos, yPos) {
    super(scene, xPos, yPos, "hero-run-sheet", 0);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.anims.play("hero-running");
    this.body.setCollideWorldBounds(true);
    this.body.setSize(12, 40);
    this.body.setOffset(12, 23);
    this.body.setMaxVelocity(MAX_X_VELOCITY, MAX_Y_VELOCITY);
    this.body.setDragX(DRAG);

    this.keys = scene.cursorKeys;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.keys.left.isDown) {
      this.body.setAccelerationX(-1000);
      this.setFlipX(true);
      this.body.offset.x = 8;
    } else if (this.keys.right.isDown) {
      this.body.setAccelerationX(1000);
      this.setFlipX(false);
      this.body.offset.x = 12;
    } else {
      this.body.setAccelerationX(0);
    }

    const didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

    if (didPressJump) {
      if (this.body.onFloor()) {
        this.canDoubleJump = true;
        this.body.setVelocityY(-400);
      } else if (this.canDoubleJump) {
        this.canDoubleJump = false;
        this.body.setVelocityY(-300);
      }
    }

    if (!this.keys.up.isDown && this.body.velocity.y < -150) {
      this.body.setVelocityY(-150);
    }
  }
}

export default Hero;
