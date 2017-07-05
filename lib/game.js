const Player = require('./player.js');
// import Player from './player';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const player = new Player("assets/spiderman.png", 100, 50, 104, 94);
  const block = new Player("assets/grass.png", 100, 300, 100, 100);

  let left = false;
  let right = false;

  player.velocity_y = 3;
  player.weight = 0.1;
  player.gravity = 20;

  const keyUp = () => {
    if(String.fromCharCode(e.keyCode) == 37) left = false;
    if(String.fromCharCode(e.keyCode) == 39) right = false;
  }

  const keyDown = () => {
    if(String.fromCharCode(e.keyCode) == 37) left = true;
    if(String.fromCharCode(e.keyCode) == 39) right = true;
  }


  document.addEventListener("keydown", (e) => {
   switch (e.keyCode) {
     case 38: //up
       break
     case 37: //left
       left = true;
       break
     case 40: // down
       break
     case 39: // right
       right = true;
       break
     default:
       console.log('this is not the key you are looking for')
   }
  })

  document.addEventListener("keyup", (e) => {
   switch (e.keyCode) {
     case 38: //up
       break
     case 37: //left
       left = false;
       break
     case 40: // down
       break
     case 39: // right
       right = false;
       break
     default:
       console.log('this is not the key you are looking for')
   }
  })


  const loop = () => {
    player.X += player.velocity_x;
    player.Y += player.velocity_y;

    if(left) player.velocity_x = -3;
    if(right) player.velocity_x = 3;
    if(!right && !left) player.velocity_x = 0;

    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;
    if(player.isColliding(block)) player.velocity_y = 0; // stops when ground is reached

    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_y){
      player.Y = block.Y - player.height;
      player.velocity_y = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.Sprite, player.X, player.Y);
    ctx.drawImage(block.Sprite, block.X, block.Y);

    setTimeout(loop, 1000/60);
  };
  loop();
});
