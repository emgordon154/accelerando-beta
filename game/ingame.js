import gameVariables from './variables'
var gv = gameVariables

function ingame(game) { }

ingame.prototype = {
  preload () {
      const game = this.game
    // playIngameMusic()
      // stopTitleMusic()
      // beginPsytrance()
  
      // title.kill()
      // startText.kill()
      gv.currentVelocity = gv.startVelocity
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
  
      // bpmAccel = (maxBPM - Tone.Transport.bpm.value) / tMax
      // console.log(bpmAccel)
      // bpmDisplay = game.add.text(0, 0, `BPM: ${Tone.Transport.bpm.value} `, {
      //   font: '12pt Monaco',
      //   fill: 'white',
      //   boundsAlignH: 'left'
      // })
      // bpmDisplay.setTextBounds(0, 0, 800, 600)
  },
  create () {
    const game = this.game

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
  
      // Tone.Transport.bpm.rampTo(Tone.Transport.bpm.value + bpmAccel, 1)
      // bpmDisplay.setText(`BPM: ${Tone.Transport.bpm.value.toFixed(1)}`)
  
      // bigAsteroid()
  
      // if (Tone.Transport.bpm.value > 130) tinyAsteroids()
    }

    gv.player.body.velocity.x = 400 * (gv.cursors.right.isDown - gv.cursors.left.isDown)
    gv.player.body.velocity.y = 300 * (gv.cursors.down.isDown - gv.cursors.up.isDown) // lmao "up.isDown"
  }
}

export default ingame
