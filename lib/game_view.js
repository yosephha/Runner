import Player from './player';
import * as UTIl from './util';

class GameView {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.runTime = 0;

    this.initialVal();

    this.gameLoop = this.gameLoop.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }

  initialVal(){
    this.player = new Player("assets/images/runner_girl.png", 100, 104, 100, 80);

    this.block = new Array ();
    this.gameOver = false;

    this.player.weight = 0.12;
    this.player.gravity = 20;
    this.gap = 0;
    this.difficulty = 0;
    this.frameCount = 0;
    this.prevHeight = 0;

    this.left = false;
    this.right = false;

    UTIl.generatePlatforms(this.block, this.blockHeight);
  }

  keyUp() {
    if(String.fromCharCode(e.keyCode) == 37) this.left = false;
    if(String.fromCharCode(e.keyCode) == 39) this.right = false;
    if(String.fromCharCode(e.keyCode) == 39) this.space = false;
  }

  keyDown(){
    if(String.fromCharCode(e.keyCode) == 37) this.left = true;
    if(String.fromCharCode(e.keyCode) == 39) this.right = true;
    if(String.fromCharCode(e.keyCode) == 39) this.space = true;
  }

  checkBound(){
    this.gameOver = UTIl.isOutOfBounds(this.player);
  }

  gameLoop(){
    let player = this.player;
    let block = this.block;
    let left = this.left;
    let right = this.right;

    block.forEach(blk => blk.X += -player.velocity_x)
    player.Y += player.velocity_y;

    this.difficulty += 0.0008;

    if(left) player.velocity_x = -6.5 + this.difficulty;
    if(right) player.velocity_x = 6.5 + this.difficulty;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;
    if (player.Y < -47) player.velocity_y = 1;
    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;

    this.runTime += 1;
    this.checkCollision();

    if (this.space && player.velocity_y === 0) this.jump();

    this.drawBlocks();
    this.drawSprite();
    UTIl.displayScore(this.ctx, this.player);

    let t = setTimeout(this.gameLoop, 1000/60);

    this.checkBound();
    this.handleGameOver(t);
  }

  checkCollision(){
    this.block.forEach(blk => {
      if (this.player.isColliding(blk) && this.player.Y + this.player.height < blk.Y + this.player.velocity_y) {
        this.player.Y = blk.Y - this.player.height;
        this.player.velocity_y = 0;

        this.scoreUp();
      }
    });
  }

  jump() {
    this.player.velocity_y = -5;
    this.player.sndJump.play();
  }

  handleGameOver(t){
    if(this.gameOver) {
      clearTimeout(t);
      UTIl.gameOverDisplay(this.ctx);
    }
  }

  scoreUp(){
    if(this.prevHeight !== this.player.Y){
      this.player.score += 100;
      this.prevHeight = this.player.Y;
    }
  }

  drawBlocks(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.block.forEach(block => (
      this.ctx.drawImage(block.Sprite, block.X, block.Y, 100, 50)
    ));
  }

  drawSprite(){
    let player = this.player;
    const frameWidth = 1536/6;
    const frameHeight = 256;
    let standing = false;
    let playerFace = player.X;

    let walkingMod = Math.floor(this.frameCount) % 6;

    if(player.velocity_x === 0 || player.velocity_y !== 0) walkingMod = 1;

    if(player.velocity_x < 0){
      playerFace = -1 * (player.X) - 130;
      this.ctx.scale(-1,1);
    }

    this.ctx.drawImage(
      player.Sprite,
      frameWidth * walkingMod, 0,
      frameWidth, frameHeight,
      playerFace, player.Y,
      frameWidth - 150, 80
    );

    if(player.velocity_x < 0){
      this.ctx.scale(-1,1);
    }

    if(player.velocity_x !== 0){
      standing = false;
      this.frameCount += 0.2;
    } else if (player.velocity_x === 0) {
      standing = true;
      this.frameCount = 12
    }
  }

  handleKey(e, value){
    switch (e.keyCode) {
      case 87: //up
      case 38:
        this.space = value;
        break
      case 32: // space
        if(this.gameOver){
          this.initialVal();
          this.gameLoop();
        } else {
          this.space = value;
        }
        break
      case 37: //left
      case 65:
        this.player.score -= 5;
        this.left = value;
        break
      case 39: // right
      case 68:
        this.player.score += 5;
        this.right = value;
        break
      case 13: //start game
        if(this.gameOver){
          this.initialVal();
          this.gameLoop();
        } else if (this.runTime === 0){
          this.gameLoop();
        } else {
          null;
        }
        break;
      default:
        return null;
    }
  }

  start(){
    document.addEventListener("keydown", (e) => {
      this.handleKey(e, true);
    })

    document.addEventListener("keyup", (e) => {
      this.handleKey(e, false);
    })

    UTIl.introDisplay(this.ctx);
  }
}

export default GameView;
