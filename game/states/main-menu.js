// this is where the socket is initialized

import gameVariables from '../variables'
var gv = gameVariables

import {loadImages} from '../loaders'

import {playTitleMusic, stopTitleMusic} from '~/audio/loops'

function mainMenu(game) { }

mainMenu.prototype = {
  preload() {
    loadImages('space', 'spaceship')(this.game)
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

    gv.menuOptions = choices.map((choice, position) => {
      const menuOption = game.add.text(0, 400 + position * 40, choice, {
        boundsAlignH: 'center',
        font: '14pt Monaco',
        fill: 'white'
      }).setTextBounds(0,0,800,600)

      menuOption.inputEnabled = true

      return menuOption
    })

    console.log('menu options at create', gv.menuOptions)

    gv.player = game.add.sprite(200, 400, 'spaceship')

    gv.selectedMenuOption = 0
  
    gv.cursors = game.input.keyboard.createCursorKeys()
    gv.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  },

  update() {
    const game = this.game

    if (gv.cursors.up.justPressed()) {
      gv.selectedMenuOption = gv.selectedMenuOption - 1
      if (gv.selectedMenuOption < 0) gv.selectedMenuOption = 2
    }

    if (gv.cursors.down.justPressed()) {
      gv.selectedMenuOption = (gv.selectedMenuOption + 1) % gv.menuOptions.length
    }

    gv.player.y = 400 + gv.selectedMenuOption * 40

    gv.menuOptions.forEach((option, position) => {
      if (option.input.checkPointerOver(game.input.activePointer)) { 
        gv.selectedMenuOption = position
      }
    })

    // if the spacebar is pressed, or a menu option is clicked
    if (gv.spacebar.justPressed() || gv.menuOptions.some(option => option.input.checkPointerDown(game.input.activePointer))) {
      switch (gv.selectedMenuOption) {

        case 0: // Single Player
          startSinglePlayer(game)
          break

        case 1: // Online Multiplayer
          startMultiplayer(game)
          break

        case 2: // Sound Test
          alert('not implemented')
          break

        default:
          alert('how did you select a non-existent menu option??')
      }
    }
  }
}

function startSinglePlayer(game) {
  stopTitleMusic()
  gv.player2id = null
  game.state.start('In game') // one player
}

function startMultiplayer(game) {
  gv.socket.emit('playerReady')
  console.log('playerReady signal sent')
  gv.socket.on('bothReady', otherPlayer => {
    console.log('bothReady signal received')
    gv.player2id = otherPlayer
    game.state.start('In game')
  })
}

export default mainMenu
