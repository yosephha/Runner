import Player from './player';

class GameView {

  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;

    this.player = new Player("assets/running_turt.gif", 100, 50, 104, 115);
    this.maxBlock = 6;
    this.block = new Array ();
    this.blockWidth = 100;
    this.blockHeight = 100;

    this.left = false;
    this.right = false;
    this.space = false;

    // player.velocity_y = 3;
    this.player.weight = 0.1;
    this.player.gravity = 20;

    this.loop = this.loop.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.makePlatform = this.makePlatform.bind(this);

  }
  // const player = new Player("assets/running_turt.gif", 100, 50, 104, 115);

  makePlatform (length, height, gap) { //utils
    for (var i = 0; i < length; i++) {
      this.block.push(
        new Player(
          "assets/grass.png",
          (this.block.length + gap) * 100,
          height,
          this.blockWidth,
          this.blockHeight
        )
      );
    }
  }

  // makePlatform(9, 300, 0);
  // makePlatform(2, 200, 2);
  // makePlatform(2, 150, 3);
  // makePlatform(12, 300, 4);
  // makePlatform(5, 100, 4);


  // let left = false;
  // let right = false;
  // let space = false;
  //
  // // player.velocity_y = 3;
  // player.weight = 0.1;
  // player.gravity = 20;


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

  loop(){
    let player = this.player;
    let block = this.block;
    let left = this.left;
    let right = this.right;

    player.X += player.velocity_x;
    block.forEach(blk => blk.X += -player.velocity_x)

    player.Y += player.velocity_y;

    if(left) player.velocity_x = -3;
    if(right) player.velocity_x = 3;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;

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

    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.forEach(block => this.ctx.drawImage(block.Sprite, block.X, block.Y))    // draw to screen

    this.ctx.drawImage(player.Sprite, player.X, player.Y);

    setTimeout(this.loop, 1000/60);
  }

  start(){
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 32:
        case 38: //up
        case 87: //up
        this.space = true;
        break
        case 37: //left
        this.left = true;
        break
        case 40: // down
        break
        case 39: // right
        this.right = true;
        break
        default:
        console.log('this is not the key you are looking for')
      }
    })

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case 32:
        this.space = false;
        break
        case 38:
        case 87: //up
        this.space = false;
        break
        case 37: //left
        this.left = false;
        break
        case 40: // down
        break
        case 39: // right
        this.right = false;
        break
        default:
        console.log('this is not the key you are looking for')
      }
    })

    this.makePlatform(9, 300, 0);
    this.makePlatform(2, 200, 2);
    this.makePlatform(2, 150, 3);
    this.makePlatform(12, 300, 4);
    this.makePlatform(5, 100, 4);

    this.loop();
  }

}

export default GameView;
