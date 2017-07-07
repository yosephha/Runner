
import Player from './player';
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new GameView(ctx, canvas);
  game.start();
});
