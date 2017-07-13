import GameObject from './game_object';

class Player extends GameObject {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
    this.score = 0;

    this.gravity = 0;
    this.weight = 0;
  }
}

export default Player;
