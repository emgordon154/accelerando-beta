import PIXI from 'phaser-ce/build/custom/pixi.js'
import p2 from 'phaser-ce/build/custom/p2.js'
import Phaser from 'phaser-ce/build/custom/phaser-split.js'

import {splashScreen, mainMenu, ingame, leaderboard} from './states'

function createGame () {
  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game')

  game.state.add('Splash screen', splashScreen)
  game.state.add('Main menu', mainMenu)
  game.state.add('In game', ingame)
  game.state.add('Leaderboard', leaderboard)

  game.state.start('Splash screen')

  return game
}

export default createGame
