// const Player = require('./player.js');
import Player from './player';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new GameView(ctx, canvas);
  game.start();
  // const player = new Player("assets/running_turt.gif", 100, 50, 104, 115);
  // // const block = new Player("assets/grass.png", 100, 300, 100, 100);
  //
  // //create blocks
  // let maxBlock = 6;
  // let block = new Array ();
  // const blockWidth = 100;
  // const blockHeight = 100;
  //
  // const makePlatform = (length, height, gap) => { //utils
  //   for (var i = 0; i < length; i++) {
  //     block.push(
  //       new Player(
  //         "assets/grass.png",
  //         (block.length + gap) * 100,
  //         height,
  //         blockWidth,
  //         blockHeight
  //       )
  //     );
  //   }
  // };
  //
  // makePlatform(9, 300, 0);
  // makePlatform(2, 200, 2);
  // makePlatform(2, 150, 3);
  // makePlatform(12, 300, 4);
  // makePlatform(5, 100, 4);
  //
  //
  // let left = false;
  // let right = false;
  // let space = false;
  //
  // // player.velocity_y = 3;
  // player.weight = 0.1;
  // player.gravity = 20;
  //
  //
  // const keyUp = () => {
  //   if(String.fromCharCode(e.keyCode) == 37) left = false;
  //   if(String.fromCharCode(e.keyCode) == 39) right = false;
  //   if(String.fromCharCode(e.keyCode) == 39) space = false;
  // }
  //
  // const keyDown = () => {
  //   if(String.fromCharCode(e.keyCode) == 37) left = true;
  //   if(String.fromCharCode(e.keyCode) == 39) right = true;
  //   if(String.fromCharCode(e.keyCode) == 39) space = true;
  // }
  //
  //
  // document.addEventListener("keydown", (e) => {
  //  switch (e.keyCode) {
  //    case 32:
  //    case 38: //up
  //    case 87: //up
  //      space = true;
  //      break
  //    case 37: //left
  //      left = true;
  //      break
  //    case 40: // down
  //      break
  //    case 39: // right
  //      right = true;
  //      break
  //    default:
  //      console.log('this is not the key you are looking for')
  //  }
  // })
  //
  // document.addEventListener("keyup", (e) => {
  //  switch (e.keyCode) {
  //    case 32:
  //      space = false;
  //      break
  //    case 38:
  //    case 87: //up
  //      space = false;
  //      break
  //    case 37: //left
  //      left = false;
  //      break
  //    case 40: // down
  //      break
  //    case 39: // right
  //      right = false;
  //      break
  //    default:
  //      console.log('this is not the key you are looking for')
  //  }
  // })
  //
  //
  //
  //
  // const loop = () => {
  //   player.X += player.velocity_x;
  //   block.forEach(blk => blk.X += -player.velocity_x)
  //
  //   player.Y += player.velocity_y;
  //
  //   if(left) player.velocity_x = -3;
  //   if(right) player.velocity_x = 3;
  //   if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;
  //
  //   if (player.velocity_y < player.gravity) player.velocity_y += player.weight;
  //
  //   // for (var i = 0; i < maxBlock; i++) {
  //   //   if (player.isColliding(block[i]) && player.Y + player.height < block[i].Y + player.velocity_y) {
  //   //     player.Y = block[i].Y - player.height;
  //   //     player.velocity_y = 0;
  //   //   }
  //   // }
  //
  //   block.forEach(blk => {
  //     if (player.isColliding(blk) && player.Y + player.height < blk.Y + player.velocity_y) {
  //       player.Y = blk.Y - player.height;
  //       player.velocity_y = 0;
  //     }
  //   });
  //
  //   if (space && player.velocity_y === 0){
  //     player.velocity_y = -5;
  //   }
  //
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   block.forEach(block => ctx.drawImage(block.Sprite, block.X, block.Y))    // draw to screen
  //
  //   ctx.drawImage(player.Sprite, player.X, player.Y);
  //   // ctx.drawImage(player.Sprite, player.X, player.Y, 100, 100);
  //   // ctx.drawImage(player.Sprite, 10, 10, 30, 30 player.X, player.Y, 300, 300);
  //   // ctx.drawImage(player.Sprite, sx, sy, sWidth, sHeight, player.X, player.Y, dWidth, dHeight);
  //
  //   setTimeout(loop, 1000/60);
  // };
  // loop();
});
