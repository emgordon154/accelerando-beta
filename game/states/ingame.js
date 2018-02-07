import gameVariables from '../variables'
var gv = gameVariables

import {Tone} from '~/audio'
import {startBpm, beginPsytrance, addGuitar, addHat, stopPsytrance} from '~/audio/loops'

import {database} from '~/fire'

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

      game.time.advancedTiming = true // necessary to track frames per second
  },
  create () {
    const game = this.game

    beginPsytrance()

    game.physics.startSystem(Phaser.Physics.ARCADE)

    resetProgress()

    gv.background = game.add.tileSprite(0, 0, 800, 600, 'space')
    gv.background.autoScroll(gv.currentVelocity, 0) // background moves left at 5px/s
    gv.startTime = Date.now()
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

    gv.bpmDisplay = game.add.text(0, 0, `BPM: ${Tone.Transport.bpm.value} `, {
      font: '12pt Monaco',
      fill: 'white',
      boundsAlignH: 'left'
    })
    gv.bpmDisplay.setTextBounds(0, 0, 800, 600)

    gv.player = game.add.sprite(32, 300, 'spaceship')
    game.physics.arcade.enable(gv.player)
    gv.player.body.collideWorldBounds = true

    gv.frameCounter = 0
  },
  update () {
    const game = this.game

    gv.frameCounter++
    
    if (game.physics.arcade.collide(gv.player, gv.asteroids)) {
      gameOver(game)
    }
    
    if (gv.player.alive) { // update score, score display, and BPM display every frame
      gv.bpmDisplay.setText(`BPM: ${Tone.Transport.bpm.value.toFixed(1)}`)
      // currentVelocity is negative and measured in units/second
      // and Phaser runs at 60 frames per second
      gv.score -= (gv.currentVelocity / game.time.fps)
      if (gv.score == Infinity) gv.score = 0 // bug fix :/
      gv.scoreDisplay.setText(`SCORE: ${gv.score|0} `) // truncate to integer
      gv.player.body.velocity.x = 400 * (gv.cursors.right.isDown - gv.cursors.left.isDown)
      gv.player.body.velocity.y = 300 * (gv.cursors.down.isDown - gv.cursors.up.isDown) // lmao "up.isDown"
    }
    
    if (gv.player.alive && gv.frameCounter % game.time.fps == 0) { // do this every second, not every frame
      gv.secondsElapsed = gv.frameCounter / game.time.fps
      if (gv.secondsElapsed < gv.tMax) {
        gv.currentVelocity += gv.acceleration
        gv.background.autoScroll(gv.currentVelocity, 0)
        Tone.Transport.bpm.rampTo(Tone.Transport.bpm.value + gv.bpmAccel, 1) // ramp it up over the next second
      }

      bigAsteroid() // spawn a big asteroid every second
      // and once BPM's over 130, spawn three little ones in addition to the big one every second!
      if (Tone.Transport.bpm.value > 130) tinyAsteroids()
    }
    
    if (!gv.hatOn && Tone.Transport.bpm.value > 130) addHat()
    if (!gv.guitarOn && Tone.Transport.bpm.value > 115) addGuitar()

  },
  shutdown () {
    resetProgress()
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

function resetProgress() {
  gv.startVelocity = -5 // 5 px/s left
  gv.maxVelocity = -1200
  gv.tMax = 20 // 120 seconds to max velocity
  gv.acceleration = (gv.maxVelocity - gv.startVelocity) / gv.tMax
  gv.currentVelocity = gv.startVelocity
  gv.score = 0
  gv.secondsElapsed = 0
  Tone.Transport.bpm.value = startBpm
  gv.maxBPM = 140
  gv.bpmAccel = (gv.maxBPM - Tone.Transport.bpm.value) / gv.tMax

}

function gameOver(game) {
  gv.explosion.x = gv.player.x
  gv.explosion.y = gv.player.y
  gv.explosion.play('boom')
  gv.player.kill()
  stopPsytrance()
  Tone.Master.mute = true
  Tone.Transport.bpm.value = startBpm
  gv.gameOverText = game.add.text(0, 300, 'GAME OVER', {
    boundsAlignH: 'center',
    font: '24pt Monaco',
    fill: 'white'
  }).setTextBounds(0, 0, 800, 600)

  setTimeout(submitScore, 1000)
  setTimeout(resetProgress, 1250)
  setTimeout(() => game.state.start('Leaderboard'), 1500)
}

function submitScore() {
  const newEntry = database.ref('/scores').push() // do NOT forget the .push() or you'll overwrite the leaderboard!!
  gv.playerName = window.prompt('Nice flying, pilot! What is your name, for the leaderboard?').slice(0,20) || 'anonymous'
  newEntry.set({
    name: gv.playerName,
    score: gv.score | 0 // truncate to integer
  })
}