import Phaser from "phaser";
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

    this.setOrigin(0.5, 1);
    this.body.setCollideWorldBounds(true);
    this.body.setSize(12, 40);
    this.body.setOffset(12, 23);
    this.body.setMaxVelocity(MAX_X_VELOCITY, MAX_Y_VELOCITY);
    this.body.setDragX(DRAG);

    this.keys = scene.cursorKeys;
    this.input = {};

    this.setUpAnimations();
    this.setUpMovement();
  }

  setUpAnimations() {
    this.animState = new StateMachine({
      init: "idle",
      transitions: [
        { name: "idle", from: ["falling", "running", "pivoting"], to: "idle" },
        { name: "run", from: ["falling", "idle", "pivoting"], to: "running" },
        { name: "pivot", from: ["falling", "running"], to: "pivoting" },
        { name: "jump", from: ["idle", "running", "pivoting"], to: "jumping" },
        { name: "flip", from: ["jumping", "falling"], to: "flipping" },
        { name: "fall", from: "*", to: "falling" },
      ],
      methods: {
        onEnterState: (lifecycle) => {
          this.anims.play("hero-" + lifecycle.to);
          console.log(lifecycle);
        },
      },
    });

    this.animPredicates = {
      idle: () => {
        const onGround = this.body.onFloor();
        const notMovingHorizontally = this.body.velocity.x === 0;
        return onGround && notMovingHorizontally;
      },
      run: () => {
        const onGround = this.body.onFloor();
        const direction = this.flipX ? -1 : 1;
        const movement = Math.sign(this.body.velocity.x);
        const movementMatchDirection = movement === direction;
        return onGround && movementMatchDirection;
      },
      pivot: () => {
        const onGround = this.body.onFloor();
        const direction = this.flipX ? 1 : -1;
        const movement = Math.sign(this.body.velocity.x);
        const movementIsNotDirection = movement === direction;
        return onGround && movementIsNotDirection;
      },
      jump: () => {
        const movingUpwards = this.body.velocity.y < 0;
        return movingUpwards;
      },
      flip: () => {
        const isInFlipState = this.moveState.is("flipping");
        const movingUpwards = this.body.velocity.y < 0;
        return isInFlipState && movingUpwards;
      },
      fall: () => {
        const movingDownwards = this.body.velocity.y > 0;
        return movingDownwards;
      },
    };
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

  updateMovement() {
    for (const t of this.moveState.transitions()) {
      if (t in this.movePredicates && this.movePredicates[t]()) {
        this.moveState[t]();
        break;
      }
    }
  }

  updateAnimations() {
    for (const t of this.animState.transitions()) {
      if (t in this.animPredicates && this.animPredicates[t]()) {
        this.animState[t]();
        break;
      }
    }
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

    this.updateMovement();
    this.updateAnimations();
  }
}

export default Hero;
