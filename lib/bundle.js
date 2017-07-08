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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view__ = __webpack_require__(2);




document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');

  const game = new __WEBPACK_IMPORTED_MODULE_1__game_view__["a" /* default */](ctx, canvas);
  game.start();
});


/***/ }),
/* 1 */
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

    this.previous_x;
    this.previous_y;

    this.velocity_x = 0;
    this.velocity_y = 0;

    this.gravity = 0;
    this.weight = 0;
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__player__ = __webpack_require__(1);


class GameView {
  constructor(ctx, canvas){
    this.ctx = ctx;
    this.canvas = canvas;

    this.player = new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */]("assets/runner_girl.png", 100, 104, 100, 50);

    this.maxBlock = 6;
    this.block = new Array ();
    this.blockWidth = 100;
    this.blockHeight = 100;

    this.left = false;
    this.right = false;
    this.space = false;

    this.player.weight = 0.1;
    this.player.gravity = 20;
    this.gap = 0;

    this.score = 0;
    this.frameCount = 0

    this.gameLoop = this.gameLoop.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.makePlatform = this.makePlatform.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.generatePlatform = this.generatePlatform.bind(this);
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

  gameOver(){
    if(this.player.Y > 500){
      return true;
    } else {
      return false;
    }
  }

  gameLoop(){
    let player = this.player;
    let block = this.block;
    let left = this.left;
    let right = this.right;

    block.forEach(blk => blk.X += -player.velocity_x)

    player.Y += player.velocity_y;

    if(left) player.velocity_x = -4.5;
    if(right) player.velocity_x = 4.5;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;

    // this.generatePlatform();
    // console.log(`${player.velocity_y}, ${this.player.Y}`);
    if (player.Y < -47){

      player.velocity_y = 1;
    }
    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;

    block.forEach(blk => {
      if (player.isColliding(blk) && player.Y + player.height < blk.Y + player.velocity_y) {
        player.Y = blk.Y - player.height;
        player.velocity_y = 0;
      }
    });

    if (this.space && player.velocity_y === 0){
      player.velocity_y = -5;
    }

    console.log(`${this.player.Y}`);
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.forEach(block => this.ctx.drawImage(block.Sprite, block.X, block.Y, 100, 50))    // draw to screen


    // start animation

    const frameWidth = 1536/6;
    const frameHeight = 256;
    let standing = false;
    let playerFace = player.X;

    let walkingMod = Math.floor(this.frameCount) % 6;
    if(player.velocity_x === 0 || player.velocity_y !== 0) walkingMod = 1;


    if(player.velocity_x < 0){
      // playerFace *= -1;
      playerFace = -1 * (player.X) - 130;
      this.ctx.scale(-1,1);
    }

    this.ctx.drawImage(
      player.Sprite,
      (1536/6) * walkingMod, 0,
      1536/6, 256,
      playerFace, player.Y,
      (1536/6)- 150, 80
    );

    if(player.velocity_x < 0){
      this.ctx.scale(-1,1);
    }

    // debugger
    if(player.velocity_x !== 0){
      standing = false;
      this.frameCount += 0.2;
    } else if (player.velocity_x === 0) {
      standing = true;
      this.frameCount = 12
    }
    // ctx.scale(-1,1)
    this.ctx.fillText(`Score: ${this.score}`,10,30);
    this.ctx.font = "30px sanserif";
    // if(this.gameOver()){
    //   debugger
    //   this.start();
    // }
    setTimeout(this.gameLoop, 1000/60);
  }

  handleKey(e, value){
    switch (e.keyCode) {
      case 32: //up
      case 38:
      case 87:
        this.space = value;
        break
      case 37: //left
      case 65:
        this.left = value;
        break
      case 39: // right
        this.right = value;
        break
      default:
        return null;
    }
  }

  start(){
    document.addEventListener("keydown", (e) => {
      this.score += 1;
      this.handleKey(e, true);
    })

    document.addEventListener("keyup", (e) => {
      this.handleKey(e, false);
    })

    this.makePlatform(4, 400);

    for (let i = 0; i < 90; i++){
      this.generatePlatform();
    }
    this.gameLoop();
  }

  makePlatform (blockLength, height) {
    for (var i = 0; i <= blockLength; i++) {
      this.block.push(
        new __WEBPACK_IMPORTED_MODULE_0__player__["a" /* default */](
          "assets/prop-block.png",
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

}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map