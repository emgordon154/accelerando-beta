import gameVariables from '../variables'
var gv = gameVariables

import {playTitleMusic, stopTitleMusic} from '~/audio/loops'


function mainMenu(game) { }

mainMenu.prototype = {
  preload() {
    const assetNames = [
      'space', // https://opengameart.org/content/space-backdrop
      'spaceship', // https://opengameart.org/content/space-ships-side-scroller
    ]

    assetNames.forEach(assetName => this.game.load.image(assetName, `/img/${assetName}.png`))
  },

  create() {
    const game = this.game
    
    playTitleMusic()
    
    gv.background = game.add.tileSprite(0, 0, 800, 600, 'space')
    gv.title = game.add.text(0, 200, 'ACCELERANDO', {
      boundsAlignH: 'center',
      font: '24pt Monaco',
      fill: 'white'
    })
    gv.title.setTextBounds(0, 0, 800, 600)

    const choices = [
      'Single Player',
      'Online Multiplayer',
      'Sound Test',
    ]

    gv.menuOptions = choices.map((choice, position) =>
      game.add.text(0, 400 + position * 40, choice, {
        boundsAlignH: 'center',
        font: '14pt Monaco',
        fill: 'white'
      }).setTextBounds(0,0,800,600)
    )

    gv.player = game.add.sprite(200, 400, 'spaceship')

    gv.selectedMenuOption = 0
  
    gv.cursors = game.input.keyboard.createCursorKeys()
    gv.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  },

  update() {
    if (gv.cursors.up.justPressed()) {
      gv.selectedMenuOption = gv.selectedMenuOption - 1
      if (gv.selectedMenuOption < 0) gv.selectedMenuOption = 2
    }

    if (gv.cursors.down.justPressed()) {
      gv.selectedMenuOption = (gv.selectedMenuOption + 1) % gv.menuOptions.length
    }

    gv.player.y = 400 + gv.selectedMenuOption * 40

    if (gv.spacebar.justPressed()) {
      switch (gv.selectedMenuOption) {

        case 0:
          stopTitleMusic()
          this.game.state.start('In game')
      }
    }
  }
}

export default mainMenu
