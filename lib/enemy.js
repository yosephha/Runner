import GameObject from './game_object';

class Enemy extends GameObject {
    constructor(img, x, y, width, height){
        super(img, x, y, width, height);
    }
}

export default Enemy;