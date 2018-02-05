import gameVariables from './variables'
var gv = gameVariables

function mainMenu(game) { }

mainMenu.prototype = {
  preload() {

  },

  create() {
    const game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)
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
  
    gv.startVelocity = -5 // 5 px/s left
    gv.maxVelocity = -1200
    gv.tMax = 90 // 120 seconds to max velocity
    gv.acceleration = (gv.maxVelocity - gv.startVelocity) / gv.tMax
  
    // playTitleMusic()
    gv.guitarOn = false
    gv.hatOn = false
  
    gv.asteroids = game.add.group()
    gv.asteroids.enableBody = true
  
    gv.explosion = game.add.sprite(800,600, 'explosion')
    gv.explosion.animations.add('boom', [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 10, false)
  },

  update() {
    if (gv.title.alive && gv.spacebar.isDown) {
      this.game.state.start('In game')
    }
  }
}

export default mainMenu
