class GameObject {
  constructor(img, x, y, width, height) {
    this.Sprite = new Image();
    this.Sprite.src = img;

    this.X = x;
    this.Y = y;
    this.width = width;
    this.height = height;

    this.velocity_x = 0;
    this.velocity_y = 0;
  }

  isColliding(obj){
    if(obj.constructor.name === "Enemy") {
      // debugger
      if (this.X >  obj.X + obj.width) return false;
      if (this.X + this.width < obj.X) return false;
      if (this.Y >  obj.Y + obj.height) return false;
      if (this.Y + this.height < obj.Y) return false;
      // if (this.X + 99 >= obj.X ) return false;
    } else {
      if (this.X >  obj.X + obj.width) return false;
      if (this.X + this.width < obj.X) return false;
      if (this.Y >  obj.Y + obj.height) return false;
      if (this.Y + this.height < obj.Y) return false;
    }
      

    // if(obj.constructor.name === "Enemy")
    //   debugger
    return true;
  }
}

export default GameObject;
