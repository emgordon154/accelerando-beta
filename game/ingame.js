import gameVariables from './variables'
var gv = gameVariables

import {Tone} from '~/audio'
import {beginPsytrance, stopPsytrance} from '~/audio/loops'

function ingame(game) { }

ingame.prototype = {
  preload () {
      const game = this.game

      const assetNames = [
        'space', // https://opengameart.org/content/space-backdrop
        'spaceship', // https://opengameart.org/content/space-ships-side-scroller
        'tiny-ast', // https://opengameart.org/content/2d-asteroid-sprite
        'med-ast', // https://opengameart.org/content/2d-asteroid-sprite
        'big-ast', // https://opengameart.org/content/2d-asteroid-sprite
        'explosion' // https://opengameart.org/content/explosion
      ]
  
      assetNames.forEach(assetName => game.load.image(assetName, `/img/${assetName}.png`))
  },
  create () {
    const game = this.game

    game.physics.startSystem(Phaser.Physics.ARCADE)

      gv.startVelocity = -5 // 5 px/s left
      gv.maxVelocity = -1200
      gv.tMax = 90 // 120 seconds to max velocity
      gv.acceleration = (gv.maxVelocity - gv.startVelocity) / gv.tMax
    
      beginPsytrance()
  
      gv.currentVelocity = gv.startVelocity
      gv.background = game.add.tileSprite(0, 0, 800, 600, 'space')
      gv.background.autoScroll(gv.currentVelocity, 0) // background moves left at 5px/s
      gv.startTime = Date.now()
      gv.secondsElapsed = 0
      gv.score = 0
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
  
      gv.maxBPM = 160
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
      gv.explosion.x = gv.player.x
      gv.explosion.y = gv.player.y
      gv.explosion.play('boom')
      gv.player.kill()
    }

    if (gv.player.alive && gv.secondsElapsed < gv.tMax && Date.now() - gv.startTime > gv.secondsElapsed * 1000) {
      gv.secondsElapsed++
      gv.currentVelocity += gv.acceleration // sorry about the confusing signs :/
      gv.score -= gv.currentVelocity
      gv.scoreDisplay.setText(`SCORE: ${gv.score|0} `) // round to integer
      // console.log(secondsElapsed + ' s,', 'v = ' + -currentVelocity)
      gv.background.autoScroll(gv.currentVelocity, 0)
  
      Tone.Transport.bpm.rampTo(Tone.Transport.bpm.value + gv.bpmAccel, 1)
      gv.bpmDisplay.setText(`BPM: ${Tone.Transport.bpm.value.toFixed(1)}`)
  
      bigAsteroid()
  
      if (Tone.Transport.bpm.value > 130) tinyAsteroids()
    }

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