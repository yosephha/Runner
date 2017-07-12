import GameView from './game_view';
import * as UTIl from './util';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new GameView(ctx, canvas);

  ctx.fillText(`Loading...`,450,225);
  ctx.font = "300px sanserif";

  game.start();
});
