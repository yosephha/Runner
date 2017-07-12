import GameView from './game_view';
import * as UTIl from './util';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new GameView(ctx, canvas);
  game.start();
});
