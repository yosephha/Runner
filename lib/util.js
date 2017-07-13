import Block from './block';
import GameSound from './game_sound';

export const makePlatform = (blockLength, height, block, blockHeight) => {
  for (var i = 0; i <= blockLength; i++) {
    block.push(
      new Block(
        "assets/images/prop-block.png",
        (block.length) * 100,
        height,
        blockLength + 50,
        blockHeight
      )
    );
  }

  for (var i = 0; i < Math.ceil(Math.random() * 2); i++){
    block.push(new Block("", 0, 0));
    block.push(new Block("", 0, 0));
  }
}

export const generatePlatform = (block, blockHeight) => {
  let prevHeight = block[block.length - 1].Y;

  if(block[block.length - 1].Y === 0){
    prevHeight = block[block.length - 2].Y;
  }

  if(prevHeight === 0){
    prevHeight = block[block.length - 3].Y;
  }

  let fixedHeights = [100, 200, 350];
  let height;

  let length = Math.ceil( Math.random() * 3 );
  let gap = Math.ceil( Math.random() * 3 );
  height = prevHeight;
  if(prevHeight === 300){
    height = 200;
  } else if (prevHeight === 200) {
    height = fixedHeights[Math.floor( Math.random() * 3 )];
  } else if (prevHeight === 100){
    height = fixedHeights[Math.floor( Math.random() * 3 )];
  } else {
    height = 300
  }

  makePlatform(length, height, block, blockHeight);
}

export const gameOverDisplay = (ctx) => {
  let base_image1 = new Image();
  base_image1.src = 'assets/images/game-over-blk.png';
  base_image1.onload = () => {
    ctx.drawImage(base_image1, 90, 10, 700, 300);
  }

  let base_image2 = new Image();
  base_image2.src = 'assets/images/space-bar-continue.png';

  base_image2.onload = () => {
    ctx.drawImage(base_image2, 90, 250, 700, 200);
  }
}

export const generatePlatforms = (block, blockHeight) => {
  makePlatform(10, 380, block, blockHeight);

  for (let i = 0; i < 200; i++){
    generatePlatform(block, blockHeight);
  }
}

export const introDisplay = (ctx) => {
  let base_image2 = new Image();
  base_image2.src = 'assets/images/start-page.png';

  base_image2.onload = () => {
    ctx.drawImage(base_image2, 0, 0, 900, 450);
  }
}

export const displayScore = (ctx, player) => {
  ctx.fillText(`Score: ${player.score}`,10,30);
  ctx.font = "30px sanserif";
}
export const displayPauseButton = (ctx, mute) => {
  let base_image = new Image();
  let base_image2 = new Image();

  base_image.src = 'assets/images/muted.png';
  base_image2.src = 'assets/images/unmuted.png';

  if (mute){
    ctx.drawImage(base_image, 850, 5, 35, 35);
  } else {
    ctx.drawImage(base_image2, 850, 5, 40, 40);
  }

}

export const isOutOfBounds = (player) => {
  if(player.Y > 450){
    return true;
  } else {
    return false;
  }
}

