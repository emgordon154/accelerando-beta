import gameVariables from './variables'
var gv = gameVariables

import {Tone} from '~/audio'
import {beginPsytrance, addGuitar, addHat, stopPsytrance} from '~/audio/loops'

function ingame(game) { }

ingame.prototype = {
  preload () {
      const game = this.game

      const spriteNames = [
        'space', // https://opengameart.org/content/space-backdrop
        'spaceship', // https://opengameart.org/content/space-ships-side-scroller
        'tiny-ast', // https://opengameart.org/content/2d-asteroid-sprite
        'med-ast', // https://opengameart.org/content/2d-asteroid-sprite
        'big-ast', // https://opengameart.org/content/2d-asteroid-sprite
      ]
  
      spriteNames.forEach(spriteName => game.load.image(spriteName, `/img/${spriteName}.png`))

      const spritesheetNames = [
        'explosion' // https://opengameart.org/content/explosion
      ]

      spritesheetNames.forEach(spritesheetName =>
        game.load.spritesheet(`${spritesheetName}`, `/img/${spritesheetName}.png`, 64, 64)
      )
  },
  create () {
    const game = this.game

    beginPsytrance()

    game.physics.startSystem(Phaser.Physics.ARCADE)

    gv.startVelocity = -5 // 5 px/s left
    gv.maxVelocity = -1200
    gv.tMax = 20 // 120 seconds to max velocity
    gv.acceleration = (gv.maxVelocity - gv.startVelocity) / gv.tMax
    gv.currentVelocity = gv.startVelocity
    gv.score = 0


    gv.background = game.add.tileSprite(0, 0, 800, 600, 'space')
    gv.background.autoScroll(gv.currentVelocity, 0) // background moves left at 5px/s
    gv.startTime = Date.now()
    gv.secondsElapsed = 0
    gv.scoreDisplay = game.add.text(0, 550, `SCORE: ${gv.score} `, {
      font: '12pt Monaco',
      fill: 'white',
      boundsAlignH: 'right'
    })
    gv.scoreDisplay.setTextBounds(0, 0, 800, 600)

    gv.asteroids = game.add.group()
    gv.asteroids.enableBody = true
  
    gv.explosion = game.add.sprite(800,600, 'explosion')
    gv.explosion.animations.add('boom', [15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 10, false)

    gv.maxBPM = 140
    gv.bpmAccel = (gv.maxBPM - Tone.Transport.bpm.value) / gv.tMax
    console.log(gv.bpmAccel)
    gv.bpmDisplay = game.add.text(0, 0, `BPM: ${Tone.Transport.bpm.value} `, {
      font: '12pt Monaco',
      fill: 'white',
      boundsAlignH: 'left'
    })
    gv.bpmDisplay.setTextBounds(0, 0, 800, 600)

    gv.player = game.add.sprite(32, 300, 'spaceship')
    game.physics.arcade.enable(gv.player)
    gv.player.body.collideWorldBounds = true
  },
  update () {
    const game = this.game

    gv.hitAsteroid = game.physics.arcade.collide(gv.player, gv.asteroids)
    if (gv.hitAsteroid) {
      gameOver(game)
    }

    if (gv.player.alive && Date.now() - gv.startTime > gv.secondsElapsed * 1000) {
      gv.secondsElapsed++

      if (gv.secondsElapsed < gv.tMax) {
        gv.currentVelocity += gv.acceleration // sorry about the confusing signs :/
        gv.background.autoScroll(gv.currentVelocity, 0)
        Tone.Transport.bpm.rampTo(Tone.Transport.bpm.value + gv.bpmAccel, 1)
      }
      gv.bpmDisplay.setText(`BPM: ${Tone.Transport.bpm.value.toFixed(1)}`)
      gv.score -= gv.currentVelocity
      gv.scoreDisplay.setText(`SCORE: ${gv.score|0} `) // round to integer

      bigAsteroid()
  
      if (Tone.Transport.bpm.value > 130) tinyAsteroids()
    }
    
    if (!gv.hatOn && Tone.Transport.bpm.value > 130) addHat()
    if (!gv.guitarOn && Tone.Transport.bpm.value > 115) addGuitar()

    gv.player.body.velocity.x = 400 * (gv.cursors.right.isDown - gv.cursors.left.isDown)
    gv.player.body.velocity.y = 300 * (gv.cursors.down.isDown - gv.cursors.up.isDown) // lmao "up.isDown"
  }
}

export default ingame

function bigAsteroid () {
  let astSprite = ['med-ast', 'big-ast'][Math.random()*2|0]
  let astY = 50 + Math.random()*700 | 0
  let asteroid = gv.asteroids.create(800, astY, astSprite)
  asteroid.body.velocity.x = 20 + gv.currentVelocity * Math.random()
  asteroid.body.velocity.y = Math.random() * 100 - Math.random() * 100
  asteroid.outOfBoundsKill = true
  asteroid.rotation = Math.random() - Math.random()
}

function tinyAsteroids () {
  for (let i=0; i<3; i++) {
    let astY = 50 + Math.random()*700 | 0
    let asteroid = gv.asteroids.create(800, astY, 'tiny-ast')
    asteroid.body.velocity.x = 20 + gv.currentVelocity * 0.75 * Math.random()
    asteroid.body.velocity.y = Math.random() * 100 - Math.random() * 100
    asteroid.outOfBoundsKill = true
    asteroid.rotation = Math.random() - Math.random()
  }
}

function gameOver(game) {
  gv.explosion.x = gv.player.x
  gv.explosion.y = gv.player.y
  gv.explosion.play('boom')
  gv.player.kill()
  stopPsytrance()
  Tone.Master.mute = true

  gv.gameOverText = game.add.text(0, 300, 'GAME OVER', {
    boundsAlignH: 'center',
    font: '24pt Monaco',
    fill: 'white'
  }).setTextBounds(0, 0, 800, 600)

  setTimeout(() => game.state.start('Main menu'), 1500)
}