import gameVariables from '../variables'
var gv = gameVariables

import {loadImages} from '../loaders'

function splashScreen(game) { }

splashScreen.prototype = {
  preload() {
    loadImages('space')(this.game)

    gv.socket = io.connect(window.location.origin)
    // Don't worry, io isn't undefined, it's loaded into the global scope
    // from an external file before bundle.js is loaded
  },

  create() {
    const game = this.game

    
    gv.background = game.add.tileSprite(0, 0, 800, 600, 'space')
    gv.title = game.add.text(0, 200, 'ACCELERANDO', {
      boundsAlignH: 'center',
      font: '20pt Monaco',
      fill: 'white'
    })
    gv.title.setTextBounds(0, 0, 800, 600)
    gv.startText = game.add.text(0, 400, 'press "space" when ready to start the music and enter the main menu', {
      boundsAlignH: 'center',
      font: '12pt Monaco',
      fill: 'white'
    })
    gv.startText.setTextBounds(0, 0, 800, 600)
  
    gv.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  },

  update() {
    if (gv.spacebar.justPressed()) {
      gv.spacebar.reset()
      this.game.state.start('Main menu')
    }
  }
}

export default splashScreen
