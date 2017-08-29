/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__enemy__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_sound__ = __webpack_require__(2);




const makePlatform = (blockLength, height, block, blockHeight) => {
  for (let i = 0; i <= blockLength; i++) {
    block.push(
      new __WEBPACK_IMPORTED_MODULE_0__block__["a" /* default */](
        "assets/images/prop-block.png",
        (block.length) * 100,
        height,
        blockLength + 50,
        blockHeight
      )
    );
  }

  for (var i = 0; i < Math.ceil(Math.random() * 2); i++){
    block.push(new __WEBPACK_IMPORTED_MODULE_0__block__["a" /* default */]("", 0, 0));
    block.push(new __WEBPACK_IMPORTED_MODULE_0__block__["a" /* default */]("", 0, 0));
  }
}
/* unused harmony export makePlatform */


const generatePlatform = (block, blockHeight) => {
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
/* unused harmony export generatePlatform */


const generatePlatforms = (block, blockHeight) => {
  makePlatform(10, 380, block, blockHeight);

  for (let i = 0; i < 200; i++){
    generatePlatform(block, blockHeight);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = generatePlatforms;


const makeEnemy = (x,y, enemy) => {
    enemy.push(new __WEBPACK_IMPORTED_MODULE_1__enemy__["a" /* default */](
      "assets/images/bird_sprite1.png",
      (enemy.length) * 1200,
      y, 10, 10
    ));
}
/* unused harmony export makeEnemy */


const randomEnemy = (enemy) => {
  let prevHeight = enemy[enemy.length - 1].Y;

  let fixedHeights = [100, 150, 200, 300, 350, 400];
  let height;

  let length = Math.ceil( Math.random() * 6 );
  let gap = Math.ceil( Math.random() * 6 );
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

  makeEnemy(length, height, enemy);
}
/* unused harmony export randomEnemy */


const generateEnemies = (enemy) => {
  makeEnemy(0, 0, enemy);
  makeEnemy(350, 330, enemy);

  for (let i = 0; i < 300; i++){
    randomEnemy(enemy);
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = generateEnemies;


const gameOverDisplay = (ctx) => {
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
/* harmony export (immutable) */ __webpack_exports__["f"] = gameOverDisplay;


const introDisplay = (ctx) => {
  let base_image2 = new Image();
  base_image2.src = 'assets/images/start-page.png';

  base_image2.onload = () => {
    ctx.drawImage(base_image2, 0, 0, 900, 450);
  }
}
/* harmony export (immutable) */ __webpack_exports__["g"] = introDisplay;


const displayScore = (ctx, player) => {
  ctx.fillText(`Score: ${player.score}`,10,30);
  ctx.font = "30px sanserif";
}
/* harmony export (immutable) */ __webpack_exports__["d"] = displayScore;


const displayPauseButton = (ctx, mute) => {
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
/* harmony export (immutable) */ __webpack_exports__["e"] = displayPauseButton;


const isOutOfBounds = (player) => {
  if(player.Y > 450){
    return true;
  } else {
    return false;
  }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = isOutOfBounds;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    if (this.X >  obj.X + obj.width) return false;
    if (this.X + this.width < obj.X) return false;
    if (this.Y >  obj.Y + obj.height) return false;
    if (this.Y + this.height < obj.Y) return false;

    return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameObject);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
 class GameSound {
     constructor(){
        this.backgroundAudio = new Audio('./assets/sound/bk-sound.wav');
        this.jumpAudio = new Audio('./assets/sound/jump.wav');
        this.gameoverAudio = new Audio('./assets/sound/game_over.wav');
     }

     play(mute){
        if (!mute){
          this.backgroundAudio.loop = true;
          this.backgroundAudio.play();
          this.backgroundAudio.volume = .2;
        } else {
          this.backgroundAudio.pause();
        }
     }

     mute(){
        this.backgroundAudio.pause();
        this.jumpAudio.pause();
     }

     playJump(mute){
        if (!mute){
          this.backgroundAudio.volume = .1;
          this.jumpAudio.play();
          this.jumpAudio.volume = .5;
          this.backgroundAudio.volume = .2;
        } else {
          this.backgroundAudio.pause();
          this.jumpAudio.pause();
        }
     }

     palyGameover(mute){
        if(!mute){
          this.gameoverAudio.play();
          this.gameoverAudio.volme = .1;
        } else {
          this.gameoverAudio.pause();
        }
     }    
 }
 /* harmony default export */ __webpack_exports__["a"] = (GameSound);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__game_sound__ = __webpack_require__(2);




class GameView {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;
    this.runTime = 0;
    this.audio = new __WEBPACK_IMPORTED_MODULE_2__game_sound__["a" /* default */]();
    this.mute = true;

    this.initialVal();

    this.gameLoop = this.gameLoop.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.toggelMute = this.toggelMute.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSpace = this.handleSpace.bind(this);
  }

  initialVal(){
    this.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]("assets/images/runner_girl.png", 100, 104, 100, 80);

    this.block = new Array ();
    this.enemy = new Array ();;
    this.gameOver = false;

    this.player.weight = 0.12;
    this.player.gravity = 20;
    this.gap = 0;
    this.difficulty = -1;
    this.flap = 0;
    this.frameCount = 0;
    this.prevHeight = 0;
 
    this.left = false;
    this.right = false;

    __WEBPACK_IMPORTED_MODULE_1__util__["a" /* generatePlatforms */](this.block, this.blockHeight);
    __WEBPACK_IMPORTED_MODULE_1__util__["b" /* generateEnemies */](this.enemy);

  }

  keyUp() {
    if(String.fromCharCode(e.keyCode) == 37) this.left = false;
    if(String.fromCharCode(e.keyCode) == 39) this.right = false;
    if(String.fromCharCode(e.keyCode) == 39) this.space = false;
  }

  keyDown(){
    if(String.fromCharCode(e.keyCode) == 37) this.left = true;
    if(String.fromCharCode(e.keyCode) == 39) this.right = true;
    if(String.fromCharCode(e.keyCode) == 39) this.space = true;
  }

  checkBound(){
    this.gameOver = __WEBPACK_IMPORTED_MODULE_1__util__["c" /* isOutOfBounds */](this.player);
  }

  gameLoop(){
    let player = this.player;
    let block = this.block;
    let left = this.left;
    let right = this.right;
    let enemy = this.enemy;

    this.audio.play(this.mute);

    block.forEach(blk => blk.X += -player.velocity_x);
    enemy.forEach(enmy => enmy.X += this.difficulty * player.velocity_x);
    enemy.forEach(enmy => enmy.X += -2);

    player.Y += player.velocity_y;

    if(this.score % 100 === 0)
      this.difficulty -= 0.05;

    this.flap += 0.3;

    if(left) player.velocity_x = -6.5;
    if(right) player.velocity_x = 6.5;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;
    if (player.Y < -47) player.velocity_y = 1;
    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;

    this.runTime += 1;
    this.checkCollision();

    if (this.space && player.velocity_y === 0) this.jump();

    this.drawBlocks();
    this.drawEnemy();
    this.drawSprite();

    __WEBPACK_IMPORTED_MODULE_1__util__["d" /* displayScore */](this.ctx, this.player);
    __WEBPACK_IMPORTED_MODULE_1__util__["e" /* displayPauseButton */](this.ctx, this.mute);

    let t = setTimeout(this.gameLoop, 1000/60);       

    this.checkBound();
    this.handleEnemyCollision();
    this.handleGameOver(t);
  }

  handleEnemyCollision(){
    this.enemy.forEach(enm => {
      if (this.player.isColliding(enm)) {
        this.gameOver = true;
      }
    });
  }

  toggelMute(e){
    e.preventDefault();
    e.stopPropagation();
    let status = document.getElementById("sound-btn");

    if (status.value === 'unmute' && e.keyCode !== 13){
      status.value = 'mute';
      this.mute = false;
    }
    else if (status.value === 'mute' && e.keyCode !== 13){
      status.value = 'unmute';
      this.mute = true;
    }
  }

  checkCollision(){
    this.block.forEach(blk => {
      if (this.player.isColliding(blk) && this.player.Y + this.player.height < blk.Y + this.player.velocity_y) {
        this.player.Y = blk.Y - this.player.height;
        this.player.velocity_y = 0;

        this.scoreUp();
      }
    });
  }

  jump() {
    this.player.velocity_y = -5;
    this.audio.playJump(this.mute);
  }

  handleGameOver(t){
    if(this.gameOver) {
      clearTimeout(t);
      this.audio.palyGameover(this.mute);
      this.audio.mute();
      __WEBPACK_IMPORTED_MODULE_1__util__["f" /* gameOverDisplay */](this.ctx);
    }
  }

  scoreUp(){
    if(this.prevHeight !== this.player.Y){
      this.player.score += 100;
      this.prevHeight = this.player.Y;
    }
  }

  drawBlocks(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.block.forEach(block => (
      this.ctx.drawImage(block.Sprite, block.X, block.Y, 100, 50)
    ));
  }

  drawEnemy(){
    this.enemy.forEach(enemy => {
      const frameWidth = 640/5;
      const frameHeight = 115
      let flyingMod = Math.floor(this.flap) % 5;

      return this.ctx.drawImage(
        enemy.Sprite, 
        frameWidth * flyingMod, 0,
        frameWidth, frameHeight,
        enemy.X - 35, enemy.Y - 22, 
        100, 60
      )
    });
  }

  drawSprite(){
    let player = this.player;
    const frameWidth = 1536/6;
    const frameHeight = 256;
    let standing = false;
    let playerFace = player.X;

    let walkingMod = Math.floor(this.frameCount) % 6;

    if(player.velocity_x === 0 || player.velocity_y !== 0) walkingMod = 1;

    if(player.velocity_x < 0){
      playerFace = -1 * (player.X) - 130;
      this.ctx.scale(-1,1);
    }

    this.ctx.drawImage(
      player.Sprite,
      frameWidth * walkingMod, 0,
      frameWidth, frameHeight,
      playerFace, player.Y,
      frameWidth - 150, 80
    );

    if(player.velocity_x < 0){
      this.ctx.scale(-1,1);
    }

    if(player.velocity_x !== 0){
      standing = false;
      this.frameCount += 0.2;
    } else if (player.velocity_x === 0) {
      standing = true;
      this.frameCount = 12
    }
  }

  handleEnter(e){
    e.preventDefault();
    e.stopPropagation();
    if(this.gameOver){
      this.initialVal();
      this.gameLoop();
    } else if (this.runTime === 0){
      this.gameLoop();
    } else {
      null;
    }
  }

  handleSpace(e, value){
    e.preventDefault();
    e.stopPropagation();
    if(this.gameOver){
      this.initialVal();
      this.gameLoop();
    } else {
      this.space = value;
    } 
  }

  handleKey(e, value){
    switch (e.keyCode) {
      case 87: //up
      case 38:
        this.space = value;
        break
      case 32: // space
        this.handleSpace(e, value)
        break
      case 37: //left
      case 65:
        this.player.score -= 5;
        this.left = value;
        break
      case 39: // right
      case 68:
        this.player.score += 5;
        this.right = value;
        break
      case 13: //start game
        this.handleEnter(e);
        break
      default:
        return null;
    }
  }

  start(){
    document.addEventListener("keydown", (e) => {
      this.handleKey(e, true);
    });

    document.addEventListener("keyup", (e) => {
      this.handleKey(e, false);
    });
    
    document.getElementById("sound-btn").addEventListener("click", (e) => this.toggelMute(e));

    this.audio.play(this.mute);
    __WEBPACK_IMPORTED_MODULE_1__util__["g" /* introDisplay */](this.ctx);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_object__ = __webpack_require__(1);


class Block extends __WEBPACK_IMPORTED_MODULE_0__game_object__["a" /* default */] {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Block);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(0);



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_0__game_view__["a" /* default */](ctx, canvas);
  game.start();
});


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_object__ = __webpack_require__(1);


class Player extends __WEBPACK_IMPORTED_MODULE_0__game_object__["a" /* default */] {
  constructor(img, x, y, width, height) {
    super(img, x, y, width, height);
    this.score = 0;

    this.gravity = 0;
    this.weight = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_object__ = __webpack_require__(1);


class Enemy extends __WEBPACK_IMPORTED_MODULE_0__game_object__["a" /* default */] {
    constructor(img, x, y, width, height){
        super(img, x, y, width, height);
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map