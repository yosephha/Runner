import GameView from './game_view';
import * as UTIl from './util';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');


  let base_image2 = new Image();
  base_image2.src = 'assets/images/start-page.jpg';

  // base_image2.onload = () => {
    ctx.drawImage(base_image2, 0, 0, 900, 450);
  // }

  const game = new GameView(ctx, canvas);

  // ctx.fillText(`Loading...`,450,225);
  // ctx.font = "300px sanserif";

  game.start();
});
