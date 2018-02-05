import PIXI from 'phaser-ce/build/custom/pixi.js'
import p2 from 'phaser-ce/build/custom/p2.js'
import Phaser from 'phaser-ce/build/custom/phaser-split.js'

import preload from './preload'
import mainMenu from './main-menu'
import ingame from './ingame'

function createGame () {
  const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game')

  // game.state.add('Preload', preload)
  game.state.add('Main menu', mainMenu)
  game.state.add('In game', ingame)

  game.state.start('Main menu')

  return game
}

export default createGame
