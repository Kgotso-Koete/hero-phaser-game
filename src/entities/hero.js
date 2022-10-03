import Phaser, { Tilemaps } from "phaser";
import StateMachine from "javascript-state-machine";

const MAX_X_VELOCITY = 250;
const MAX_Y_VELOCITY = 400;
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
    this.input = {};

    this.setUpMovement();
  }

  setUpMovement() {
    this.moveState = new StateMachine({
      init: "standing",
      transitions: [
        { name: "jump", from: "standing", to: "jumping" },
        { name: "flip", from: "jumping", to: "flipping" },
        { name: "fall", from: "standing", to: "falling" },
        {
          name: "touchdown",
          from: ["jumping", "flipping", "falling"],
          to: "standing",
        },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          console.log(lifecycle);
        },
        onJump: () => {
          this.body.setVelocityY(-400);
        },
        onFlip: () => {
          this.body.setVelocityY(-300);
        },
      },
    });

    this.movePredicates = {
      jump: () => {
        return this.input.didPressJump;
      },
      flip: () => {
        return this.input.didPressJump;
      },
      fall: () => {
        return !this.body.onFloor();
      },
      touchdown: () => {
        return this.body.onFloor();
      },
    };
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.input.didPressJump = Phaser.Input.Keyboard.JustDown(this.keys.up);

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

    if (this.moveState.is("jumping") || this.moveState.is("flipping")) {
      if (!this.keys.up.isDown && this.body.velocity.y < -150) {
        this.body.setVelocityY(-150);
      }
    }

    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }
}

export default Hero;
