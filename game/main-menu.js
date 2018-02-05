function mainMenu(game) { }

mainMenu.prototype = {
  preload() {

  },

  create() {
    const game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)
    background = game.add.tileSprite(0, 0, 800, 600, 'space')
    title = game.add.text(0, 200, 'ACCELERANDO', {
      boundsAlignH: 'center',
      font: '20pt Monaco',
      fill: 'white'
    })
    title.setTextBounds(0, 0, 800, 600)
    startText = game.add.text(0, 400, 'press "space" when ready', {
      boundsAlignH: 'center',
      font: '12pt Monaco',
      fill: 'white'
    })
    startText.setTextBounds(0, 0, 800, 600)
  
    player = game.add.sprite(32, 300, 'spaceship')
    game.physics.arcade.enable(player)
    player.body.collideWorldBounds = true
  
    cursors = game.input.keyboard.createCursorKeys()
    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
    // console.log('spacebar:', spacebar)
  
    startVelocity = -5 // 5 px/s left
    maxVelocity = -1200
    tMax = 90 // 120 seconds to max velocity
    acceleration = (maxVelocity - startVelocity) / tMax
  
    // playTitleMusic()
    guitarOn = false
    hatOn = false
  
    asteroids = game.add.group()
    asteroids.enableBody = true
  
    explosion = game.add.sprite(800,600, 'explosion')
    explosion.animations.add('boom', [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 10, false)
  }
}



export default mainMenu