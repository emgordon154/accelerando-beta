webpackHotUpdate(0,{

/***/ "./game/states/main-menu.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__variables__ = __webpack_require__("./game/variables.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_loops__ = __webpack_require__("./audio/loops/index.js");
// this is where the socket is initialized


var gv = __WEBPACK_IMPORTED_MODULE_0__variables__["a" /* default */];



function mainMenu(game) {}

mainMenu.prototype = {
  preload: function preload() {
    var _this = this;

    var assetNames = ['space', // https://opengameart.org/content/space-backdrop
    'spaceship'];

    assetNames.forEach(function (assetName) {
      return _this.game.load.image(assetName, '/img/' + assetName + '.png');
    });

    gv.socket = io.connect(window.location.origin);
  },
  create: function create() {
    var game = this.game;

    Object(__WEBPACK_IMPORTED_MODULE_1__audio_loops__["d" /* playTitleMusic */])();

    gv.background = game.add.tileSprite(0, 0, 800, 600, 'space');
    gv.title = game.add.text(0, 200, 'ACCELERANDO', {
      boundsAlignH: 'center',
      font: '24pt Monaco',
      fill: 'white'
    });
    gv.title.setTextBounds(0, 0, 800, 600);

    var choices = ['Single Player', 'Online Multiplayer', 'Sound Test'];

    gv.menuOptions = choices.map(function (choice, position) {
      return game.add.text(0, 400 + position * 40, choice, {
        boundsAlignH: 'center',
        font: '14pt Monaco',
        fill: 'white'
      }).setTextBounds(0, 0, 800, 600);
    });

    gv.player = game.add.sprite(200, 400, 'spaceship');

    gv.selectedMenuOption = 0;

    gv.cursors = game.input.keyboard.createCursorKeys();
    gv.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR);
  },
  update: function update() {
    var _this2 = this;

    if (gv.cursors.up.justPressed()) {
      gv.selectedMenuOption = gv.selectedMenuOption - 1;
      if (gv.selectedMenuOption < 0) gv.selectedMenuOption = 2;
      console.log('selectedMenuOption: ', gv.selectedMenuOption);
    }

    if (gv.cursors.down.justPressed()) {
      gv.selectedMenuOption = (gv.selectedMenuOption + 1) % gv.menuOptions.length;
      console.log('selectedMenuOption: ', gv.selectedMenuOption);
    }

    gv.player.y = 400 + gv.selectedMenuOption * 40;

    if (gv.spacebar.justPressed()) {
      switch (gv.selectedMenuOption) {

        case 0:
          // Single Player
          Object(__WEBPACK_IMPORTED_MODULE_1__audio_loops__["g" /* stopTitleMusic */])();
          gv.player2id = null;
          this.game.state.start('In game'); // one player
          break;

        case 1:
          // Online Multiplayer
          console.log('case 1 was hit');
          gv.socket.emit('playerReady');
          gv.socket.on('bothReady', function (otherPlayer) {
            console.log('bothReady signal received');
            gv.player2id = otherPlayer;
            _this2.game.state.start('In game');
          });
          break;

        // why are these two things triggering whenever option 1 is selected??
        // case 2:
        //   alert('not implemented')
        //   break

        default:
          alert('how did you select a non-existent menu option??');

      }
    }
  }
};

var _default = mainMenu;
/* harmony default export */ __webpack_exports__["a"] = (_default);
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(gv, 'gv', '/Users/emilygordon/accelerando2/game/states/main-menu.js');

  __REACT_HOT_LOADER__.register(mainMenu, 'mainMenu', '/Users/emilygordon/accelerando2/game/states/main-menu.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '/Users/emilygordon/accelerando2/game/states/main-menu.js');
}();

;

/***/ })

})
//# sourceMappingURL=0.8bb1eaa4ec5f8e6d2726.hot-update.js.map