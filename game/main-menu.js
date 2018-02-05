import gameVariables from './variables'
var gv = gameVariables

import {playTitleMusic, stopTitleMusic} from '~/audio/loops'


function mainMenu(game) { }

mainMenu.prototype = {
  preload() {
    const assetNames = [
      'space', // https://opengameart.org/content/space-backdrop
    ]

    assetNames.forEach(assetName => this.game.load.image(assetName, `/img/${assetName}.png`))
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
    gv.startText = game.add.text(0, 400, 'press "space" when ready', {
      boundsAlignH: 'center',
      font: '12pt Monaco',
      fill: 'white'
    })
    gv.startText.setTextBounds(0, 0, 800, 600)
  
    
  
    gv.cursors = game.input.keyboard.createCursorKeys()
    gv.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
    // console.log('spacebar:', spacebar)
    playTitleMusic()
  },

  update() {
    if (gv.title.alive && gv.spacebar.isDown) {
      this.game.state.start('In game')
      stopTitleMusic()
    }
  }
}

export default mainMenu
