import Phaser, { Tilemaps } from "phaser";
import Hero from "../entities/hero";

class Game extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  init(data) {}

  preload() {
    this.loadLevelSheets();
    this.loadPlayerSpriteSheets();
  }

  create(data) {
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    this.loadPlayerAnimations();

    this.addMap();

    this.hero = new Hero(this, 250, 160);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.cameras.main.startFollow(this.hero);
  }

  addMap() {
    this.map = this.make.tilemap({ key: "level-1" });
    const groundTiles = this.map.addTilesetImage("world-1", "world-1-sheet");

    this.map.createStaticLayer("Ground", groundTiles);

    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.physics.world.setBoundsCollision(true, true, false, true);
  }

  update(time, delta) {}

  loadLevelSheets() {
    this.load.tilemapTiledJSON("level-1", "assets/tilemaps/level-1.json");
    this.load.image("world-1-sheet", "/assets/tilesets/world-1.png");
  }

  loadPlayerSpriteSheets() {
    this.load.spritesheet("hero-idle-sheet", "/assets/player/idle.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-run-sheet", "/assets/player/run.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-pivot-sheet", "/assets/player/pivot.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-jump-sheet", "/assets/player/jump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-flip-sheet", "/assets/player/spinjump.png", {
      frameWidth: 32,
      frameHeight: 64,
    });

    this.load.spritesheet("hero-fall-sheet", "/assets/player/fall.png", {
      frameWidth: 32,
      frameHeight: 64,
    });
  }

  loadPlayerAnimations() {
    this.anims.create({
      key: "hero-idle",
      frames: this.anims.generateFrameNumbers("hero-idle-sheet"),
    });

    this.anims.create({
      key: "hero-running",
      frames: this.anims.generateFrameNumbers("hero-run-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-pivoting",
      frames: this.anims.generateFrameNumbers("hero-pivot-sheet"),
    });

    this.anims.create({
      key: "hero-jumping",
      frames: this.anims.generateFrameNumbers("hero-jump-sheet"),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "hero-flipping",
      frames: this.anims.generateFrameNumbers("hero-flip-sheet"),
      frameRate: 30,
      repeat: 0,
    });

    this.anims.create({
      key: "hero-falling",
      frames: this.anims.generateFrameNumbers("hero-fall-sheet"),
      frameRate: 10,
      repeat: -1,
    });
  }
}

export default Game;
