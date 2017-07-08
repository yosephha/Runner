import Player from './player';

class GameView {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;

    this.player = new Player("assets/runner_girl.png", 100, 104, 100, 50);

    this.maxBlock = 6;
    this.block = new Array ();
    this.blockWidth = 100;
    this.blockHeight = 100;

    this.left = false;
    this.right = false;
    this.space = false;

    this.player.weight = 0.1;
    this.player.gravity = 20;
    this.gap = 0;

    this.score = 0;
    this.frameCount = 0

    this.gameLoop = this.gameLoop.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.makePlatform = this.makePlatform.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
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

  gameOver(){
    if(this.player.Y > 500){
      return true;
    } else {
      return false;
    }
  }

  gameLoop(){
    let player = this.player;
    let block = this.block;
    let left = this.left;
    let right = this.right;

    block.forEach(blk => blk.X += -player.velocity_x)

    player.Y += player.velocity_y;

    if(left) player.velocity_x = -4.5;
    if(right) player.velocity_x = 4.5;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;

    // this.generatePlatform();
    // console.log(`${player.velocity_y}, ${this.player.Y}`);
    if (player.Y < -47){

      player.velocity_y = 1;
    }
    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;

    block.forEach(blk => {
      if (player.isColliding(blk) && player.Y + player.height < blk.Y + player.velocity_y) {
        player.Y = blk.Y - player.height;
        player.velocity_y = 0;
      }
    });

    if (this.space && player.velocity_y === 0){
      player.velocity_y = -5;
    }

    console.log(`${this.player.Y}`);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.forEach(block => this.ctx.drawImage(block.Sprite, block.X, block.Y, 100, 50))    // draw to screen


    // start animation

    const frameWidth = 1536/6;
    const frameHeight = 256;
    let standing = false;
    let playerFace = player.X;

    let walkingMod = Math.floor(this.frameCount) % 6;
    if(player.velocity_x === 0 || player.velocity_y !== 0) walkingMod = 1;


    if(player.velocity_x < 0){
      // playerFace *= -1;
      playerFace = -1 * (player.X) - 130;
      this.ctx.scale(-1,1);
    }

    this.ctx.drawImage(
      player.Sprite,
      (1536/6) * walkingMod, 0,
      1536/6, 256,
      playerFace, player.Y,
      (1536/6)- 150, 80
    );

    if(player.velocity_x < 0){
      this.ctx.scale(-1,1);
    }

    // debugger
    if(player.velocity_x !== 0){
      standing = false;
      this.frameCount += 0.2;
    } else if (player.velocity_x === 0) {
      standing = true;
      this.frameCount = 12
    }
    // ctx.scale(-1,1)
    this.ctx.fillText(`Score: ${this.score}`,10,30);
    this.ctx.font = "30px sanserif";
    // if(this.gameOver()){
    //   debugger
    //   this.start();
    // }
    setTimeout(this.gameLoop, 1000/60);
  }

  handleKey(e, value){
    switch (e.keyCode) {
      case 32: //up
      case 38:
      case 87:
        this.space = value;
        break
      case 37: //left
      case 65:
        this.left = value;
        break
      case 39: // right
        this.right = value;
        break
      default:
        return null;
    }
  }

  start(){
    document.addEventListener("keydown", (e) => {
      this.score += 1;
      this.handleKey(e, true);
    })

    document.addEventListener("keyup", (e) => {
      this.handleKey(e, false);
    })

    this.makePlatform(4, 400);

    for (let i = 0; i < 90; i++){
      this.generatePlatform();
    }
    this.gameLoop();
  }

  makePlatform (blockLength, height) {
    for (var i = 0; i <= blockLength; i++) {
      this.block.push(
        new Player(
          "assets/prop-block.png",
          (this.block.length) * 100,
          height,
          blockLength + 50,
          this.blockHeight
        )
      );
    }

    for (var i = 0; i < Math.ceil(Math.random() * 2); i++){
      this.block.push(new Player("", 0, 0));
    }
  }

  generatePlatform(){
    let prevHeight = this.block[this.block.length - 1].Y;

    if(this.block[this.block.length - 1].Y === 0){
      prevHeight = this.block[this.block.length - 2].Y;
    }

    if(prevHeight === 0){
      prevHeight = this.block[this.block.length - 3].Y;
    }

    let fixedHeights = [100, 200, 350];
    let height;

    let length = Math.ceil( Math.random() * 3 );
    let gap = Math.ceil( Math.random() * 3 );
    height = prevHeight;
    if(prevHeight === 300){
      height = 200;
    } else if (prevHeight === 200) {
      height = fixedHeights[Math.floor( Math.random() * 3 )];
    } else if (prevHeight === 100){
      height = fixedHeights[Math.floor( Math.random() * 3 )];
    } else {
      height = 300
    }

    this.makePlatform(length, height);

  }

}

export default GameView;
