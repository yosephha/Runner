import GameView from './game_view';
import * as UTIl from './util';

document.addEventListener("DOMContentLoaded", () => {
  // const canvas = document.querySelector('canvas');
  // const ctx = canvas.getContext('2d');

  const game = new GameView(ctx, canvas);
  game.start();
});

window.onload = () =>{
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  let base_image2 = new Image();
  base_image2.src = 'assets/images/start-page.jpg';

  ctx.drawImage(base_image2, 0, 0, 900, 450);
}
