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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Player {
  constructor(img, x, y, width, height) {
    this.Sprite = new Image();
    this.Sprite.src = img;
    this.X = x;
    this.Y = y;

    this.width = width;
    this.height = height;

    this.sndJump = new Audio()

    this.previous_x;
    this.previous_y;

    this.velocity_x = 0;
    this.velocity_y = 0;

    this.gravity = 0;
    this.weight = 0;
    this.score = 0;

    this.isColliding = this.isColliding.bind(this)
  }

  isColliding(obj){
    if (this.X >  obj.X + obj.width) return false;
    if (this.X + this.width < obj.X) return false;
    if (this.Y >  obj.Y + obj.height) return false;
    if (this.Y + this.height < obj.Y) return false;

    return true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Player);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(0);


class GameView {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;

    this.initialVal();

    this.gameLoop = this.gameLoop.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.makePlatform = this.makePlatform.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
    this.scoreUp = this.scoreUp.bind(this);
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

  gameIsOver(){
    if(this.player.Y > 450){
      this.gameOver = true;
    } else {
      this.gameOver = false;
    }
  }

  gameLoop(){
    let player = this.player;
    let block = this.block;
    let left = this.left;
    let right = this.right;

    block.forEach(blk => blk.X += -player.velocity_x ) //subtract this.difficulty for level up

    if(player.score > 700 && player.velocity_y !== 0){
      this.difficulty += 0.008;
    }

    player.Y += player.velocity_y;

    if(left) player.velocity_x = -4.5;
    if(right) player.velocity_x = 4.5;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;

    if (player.Y < -47){
      player.velocity_y = 1;
    }
    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;

    block.forEach(blk => {
      if (player.isColliding(blk) && player.Y + player.height < blk.Y + player.velocity_y) {
        player.Y = blk.Y - player.height;
        player.velocity_y = 0;

        this.scoreUp();
      }
    });


    if (this.space && player.velocity_y === 0){
      player.velocity_y = -5;
      player.sndJump.play();
    }

    console.log(`${this.gameOver}`);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.forEach(block => this.ctx.drawImage(block.Sprite, block.X, block.Y, 100, 50))    // draw to screen

    this.draw();
    this.displayScore();

    let t = setTimeout(this.gameLoop, 1000/60);

    this.ctx.fillText("",10,30);
    this.ctx.font = "30px sanserif";
    this.gameIsOver();

    if(this.gameOver) {
      clearTimeout(t);
      this.gameOverDisplay();
    }
  }

  gameOverDisplay(){ //take to util
    let base_image1 = new Image();
    base_image1.src = 'assets/images/game-over-blk.png';
    base_image1.onload = () => {
      this.ctx.drawImage(base_image1, 90, 10, 700, 300);
    }

    let base_image2 = new Image();
    base_image2.src = 'assets/images/space-bar-continue.png';

    base_image2.onload = () =>{
      this.ctx.drawImage(base_image2, 90, 250, 700, 200);
    }
  }

  introDisplay(){ //take to util
    let base_image2 = new Image();
    base_image2.src = 'assets/images/start-page.png';

    base_image2.onload = () =>{
      this.ctx.drawImage(base_image2, 0, 0, 900, 450);
    }
  }

  initialVal(){
    this.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]("assets/images/runner_girl.png", 100, 104, 100, 50);

    // this.maxBlock = 6;
    this.block = new Array ();
    this.gameOver = false;

    this.player.weight = 0.1;
    this.player.gravity = 20;
    this.gap = 0;
    this.difficulty = 0;
    this.frameCount = 0;
    this.prevHeight = 0;

    this.makePlatform(10, 400);

    for (let i = 0; i < 500; i++){
      this.generatePlatform();
    }
  }

  scoreUp(){
    if(this.prevHeight !== this.player.Y){
      this.player.score += 100;
      this.prevHeight = this.player.Y;
    }
  }

  draw(){
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

  displayScore(){
    this.ctx.fillText(`Score: ${this.player.score}`,10,30);
    this.ctx.font = "30px sanserif";
  }

  handleKey(e, value){
    switch (e.keyCode) {
      case 87: //up
      case 38:
        this.space = value;
        break
      case 32:
        if(this.gameOver){
          this.initialVal();
          this.gameLoop();
        } else {
          this.space = value;
        }

        break
      case 37: //left
      case 65:
        this.player.score -= 5;
        this.left = value;
        break
      case 39: // right
        this.player.score += 5;
        this.right = value;
        break
      case 13: //start game
        this.gameLoop();
        break;
      default:
        return null;
    }
  }

  start(){
    document.addEventListener("keydown", (e) => {
      this.handleKey(e, true);
    })

    document.addEventListener("keyup", (e) => {
      this.handleKey(e, false);
    })
    this.introDisplay()
    // this.gameLoop();
  }

  makePlatform (blockLength, height) {
    for (var i = 0; i <= blockLength; i++) {
      this.block.push(
        new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](
          "assets/images/prop-block.png",
          (this.block.length) * 100,
          height,
          blockLength + 50,
          this.blockHeight
        )
      );
    }

    for (var i = 0; i < Math.ceil(Math.random() * 2); i++){
      this.block.push(new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]("", 0, 0));
    }
  }

  generatePlatform(){
    let prevHeight = this.block[this.block.length - 1].Y;

    if(this.block[this.block.length - 1].Y === 0){
      prevHeight = this.block[this.block.length - 2].Y;
    }

    if(prevHeight === 0){
      prevHeight = this.block[this.block.length - 3].Y;
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

    this.makePlatform(length, height);
  }

  gameAudio(){
    let backgroundAudio = document.getElementById("game-audio");

    backgroundAudio.play();
    const gameAudioRep = () => backgroundAudio.play();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(1);




document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](ctx, canvas);

  game.start();
});


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map