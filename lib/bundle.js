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
/***/ (function(module, exports, __webpack_require__) {

const Player = __webpack_require__(1);
// import Player from './player';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const player = new Player("assets/running_turt.gif", 100, 50, 104, 115);
  // const block = new Player("assets/grass.png", 100, 300, 100, 100);

  //create blocks
  let maxBlock = 6;
  let block = new Array ();
  const blockWidth = 100;
  const blockHeight = 100;

  // for (var i = 0; i < 4; i++) {
  //  block[i] = new Player("assets/grass.png", i * 100, 300, blockWidth, blockHeight);
  // }
  const makePlatform = (length, height, gap) => {
    for (var i = 0; i < length; i++) {
      block.push(new Player("assets/grass.png", (block.length + gap) * 100, height, blockWidth, blockHeight));
    }
  }
  makePlatform(4, 300, 0);
  makePlatform(2, 200, 2);

  //far block
  // block[4] = new Player("assets/grass.png", 600, 200, 100, 100);
  // block[5] = new Player("assets/grass.png", 800, 200, 100, 100);

  // block[5] = new Player("assets/grass.png", 700, 300, 100, 100);

  let left = false;
  let right = false;
  let space = false;

  // player.velocity_y = 3;
  player.weight = 0.1;
  player.gravity = 20;


  const keyUp = () => {
    if(String.fromCharCode(e.keyCode) == 37) left = false;
    if(String.fromCharCode(e.keyCode) == 39) right = false;
    if(String.fromCharCode(e.keyCode) == 39) space = false;
  }

  const keyDown = () => {
    if(String.fromCharCode(e.keyCode) == 37) left = true;
    if(String.fromCharCode(e.keyCode) == 39) right = true;
    if(String.fromCharCode(e.keyCode) == 39) space = true;
  }


  document.addEventListener("keydown", (e) => {
   switch (e.keyCode) {
     case 32:
     case 38: //up
     case 87: //up
       space = true;
       break
     case 37: //left
       left = true;
       break
     case 40: // down
       break
     case 39: // right
       right = true;
       break
     default:
       console.log('this is not the key you are looking for')
   }
  })

  document.addEventListener("keyup", (e) => {
   switch (e.keyCode) {
     case 32:
       space = false;
       break
     case 38:
     case 87: //up
       space = false;
       break
     case 37: //left
       left = false;
       break
     case 40: // down
       break
     case 39: // right
       right = false;
       break
     default:
       console.log('this is not the key you are looking for')
   }
  })




  const loop = () => {
    player.X += player.velocity_x;
    //Pre Variable Adjustments pan screen based on char
    // for (var i = 0; i < maxBlock; i++) {
    //   block[i].X += -player.velocity_x;
    // }

    block.forEach(blk => blk.X += -player.velocity_x)

    player.Y += player.velocity_y;

    if(left) player.velocity_x = -3;
    if(right) player.velocity_x = 3;
    if(!right && !left && player.velocity_y === 0) player.velocity_x = 0;

    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;

    // for (var i = 0; i < maxBlock; i++) {
    //   if (player.isColliding(block[i]) && player.Y + player.height < block[i].Y + player.velocity_y) {
    //     player.Y = block[i].Y - player.height;
    //     player.velocity_y = 0;
    //   }
    // }

    block.forEach(blk => {
      if (player.isColliding(blk) && player.Y + player.height < blk.Y + player.velocity_y) {
        player.Y = blk.Y - player.height;
        player.velocity_y = 0;
      }
    });

    if (space && player.velocity_y === 0){
      player.velocity_y = -5;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    block.forEach(block => ctx.drawImage(block.Sprite, block.X, block.Y))    // draw to screen

    ctx.drawImage(player.Sprite, player.X, player.Y);
    // ctx.drawImage(player.Sprite, player.X, player.Y, 100, 100);
    // ctx.drawImage(player.Sprite, 10, 10, 30, 30 player.X, player.Y, 300, 300);
    // ctx.drawImage(player.Sprite, sx, sy, sWidth, sHeight, player.X, player.Y, dWidth, dHeight);

    setTimeout(loop, 1000/60);
  };
  loop();
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

module.exports = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map