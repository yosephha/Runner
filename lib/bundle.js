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
  const player = new Player("assets/spiderman.png", 100, 50, 104, 94);
  const block = new Player("assets/grass.png", 100, 300, 100, 100);

  let left = false;
  let right = false;

  player.velocity_y = 3;
  player.weight = 0.1;
  player.gravity = 20;

  const keyUp = () => {
    if(String.fromCharCode(e.keyCode) == 37) left = false;
    if(String.fromCharCode(e.keyCode) == 39) right = false;
  }

  const keyDown = () => {
    if(String.fromCharCode(e.keyCode) == 37) left = true;
    if(String.fromCharCode(e.keyCode) == 39) right = true;
  }


  document.addEventListener("keydown", (e) => {
   switch (e.keyCode) {
     case 38: //up
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
     case 38: //up
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
    player.Y += player.velocity_y;

    if(left) player.velocity_x = -3;
    if(right) player.velocity_x = 3;
    if(!right && !left) player.velocity_x = 0;

    if (player.velocity_y < player.gravity) player.velocity_y += player.weight;
    if(player.isColliding(block)) player.velocity_y = 0; // stops when ground is reached

    if (player.isColliding(block) && player.Y + player.height < block.Y + player.velocity_y){
      player.Y = block.Y - player.height;
      player.velocity_y = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(player.Sprite, player.X, player.Y);
    ctx.drawImage(block.Sprite, block.X, block.Y);

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
    if (this.X + obj.width < obj.X) return false;

    if (this.Y >  obj.Y + obj.height) return false;
    if (this.Y + obj.height < obj.Y) return false;

    return true;
  }
}

module.exports = Player;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map