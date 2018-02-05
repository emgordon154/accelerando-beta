// just don't even look at this please... it's a chimera of old and failed code, for my eyes only :)

import PIXI from 'phaser-ce/build/custom/pixi.js'
import p2 from 'phaser-ce/build/custom/p2.js'
import Phaser from 'phaser-ce/build/custom/phaser-split.js'

// import {Tone} from '../audio'

// import {playTitleMusic, stopTitleMusic, playIngameMusic, beginPsytrance, stopPsytrance, addGuitar, addHat, stopHat} from '../audio/loops'

import preload from './preload'
import mainMenu from './main-menu'
import ingame from './ingame'

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-game',
  // {
  //   preload,
  //   create,
  //   update
  // }
)

game.state.add('Preload', preload)
game.state.add('Main menu', mainMenu)
game.state.add('In game', ingame)
game.state.start('Preload')

// game.state.preload = preload(game)
// game.state.create = create(game)
// game.state.add('update', update)
// game.state.start('preload')

// import {storage} from '~/fire'

// const storageRef = storage.ref()


// function preload() {
//   storageRef.child('spacefield.png').getDownloadURL().then(url =>
//     // https://opengameart.org/content/space-backdrop
//     game.load.image('space', url)
//   )

//   // https://opengameart.org/content/space-ships-side-scroller
//   // I love this background but it doesn't tile neatly.
//   // This could easily be fixed
//   // by cutting the image in half down the middle,
//   // swapping the two sides so the seam is in the middle,
//   // and just using a bit of blur on the seam?
//   // That might be obvious, but it would probably be good enough for version 0.1!
//   game.load.image('spaceship', '/assets/spaceship.png')

//   // https://opengameart.org/content/2d-asteroid-sprite
//   game.load.image('tiny-ast', '/assets/asteroid1.png')
//   game.load.image('med-ast', '/assets/asteroid2.png')
//   game.load.image('big-ast', '/assets/asteroid3.png')

//   // https://opengameart.org/content/explosion
//   game.load.spritesheet('explosion', '/assets/explosion.png', 64, 64)
// }


// Declaring outside create function so that these can be referenced in update function.
// This is the first time I've used var in a whiiiiile!
var title, startText, player, cursors, spacebar, background
var startVelocity, currentVelocity, maxVelocity, tMax, startTime
var acceleration, secondsElapsed, scoreDisplay, score
var guitarOn = false, hatOn = false
var asteroids, explosion, hitAsteroid

function create () {
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

var maxBPM = 160, bpmAccel, bpmDisplay // can't go much higher than this without audio crackling

function reload() {window.location.reload()}

function tinyAsteroids () {
  for (let i=0; i<3; i++) {
    let astY = 50 + Math.random()*700 | 0
    let asteroid = asteroids.create(800, astY, 'tiny-ast')
    asteroid.body.velocity.x = 20 + currentVelocity * 0.75 * Math.random()
    asteroid.body.velocity.y = Math.random() * 100 - Math.random() * 100
    asteroid.outOfBoundsKill = true
    asteroid.rotation = Math.random() - Math.random()
  }
}

function bigAsteroid () {
  let astSprite = ['med-ast', 'big-ast'][Math.random()*2|0]
  let astY = 50 + Math.random()*700 | 0
  let asteroid = asteroids.create(800, astY, astSprite)
  asteroid.body.velocity.x = 20 + currentVelocity * Math.random()
  asteroid.body.velocity.y = Math.random() * 100 - Math.random() * 100
  asteroid.outOfBoundsKill = true
  asteroid.rotation = Math.random() - Math.random()
}

function update (game) {
  hitAsteroid = game.physics.arcade.collide(player, asteroids)
  if (hitAsteroid) {
    explosion.x = player.x, explosion.y = player.y
    explosion.play('boom')
    player.kill()
    setTimeout(reload, 1000)
  }

  // if (spacebar.isDown) console.log('spacebar is down!')
  if (title.alive && spacebar.isDown) {
    // playIngameMusic()
    // stopTitleMusic()
    // beginPsytrance()

    title.kill()
    startText.kill()
    currentVelocity = startVelocity
    background.autoScroll(currentVelocity, 0) // background moves left at 5px/s
    startTime = Date.now()
    secondsElapsed = 0
    score = 0
    scoreDisplay = game.add.text(0, 550, `SCORE: ${score} `, {
      font: '12pt Monaco',
      fill: 'white',
      boundsAlignH: 'right'
    })
    scoreDisplay.setTextBounds(0, 0, 800, 600)

    // bpmAccel = (maxBPM - Tone.Transport.bpm.value) / tMax
    // console.log(bpmAccel)
    // bpmDisplay = game.add.text(0, 0, `BPM: ${Tone.Transport.bpm.value} `, {
    //   font: '12pt Monaco',
    //   fill: 'white',
    //   boundsAlignH: 'left'
    // })
    // bpmDisplay.setTextBounds(0, 0, 800, 600)

  }
  if (player.alive && secondsElapsed < tMax && Date.now() - startTime > secondsElapsed * 1000) {
    secondsElapsed++
    currentVelocity += acceleration // sorry about the confusing signs :/
    score -= currentVelocity
    scoreDisplay.setText(`SCORE: ${score|0} `) // round to integer
    // console.log(secondsElapsed + ' s,', 'v = ' + -currentVelocity)
    background.autoScroll(currentVelocity, 0)

    // Tone.Transport.bpm.rampTo(Tone.Transport.bpm.value + bpmAccel, 1)
    // bpmDisplay.setText(`BPM: ${Tone.Transport.bpm.value.toFixed(1)}`)

    bigAsteroid()

    // if (Tone.Transport.bpm.value > 130) tinyAsteroids()
  }

  if (player.alive && secondsElapsed >= tMax && Date.now() - startTime > secondsElapsed * 1000) {
    secondsElapsed++
    // if (Tone.Transport.bpm.value > 130) tinyAsteroids()
  }

  // if (!guitarOn && Tone.Transport.bpm.value > 115) addGuitar()
  // if (!hatOn && Tone.Transport.bpm.value > 130) addHat()

  // if (player.alive && Tone.Transport.bpm.value > 130) {
    
  // }

  player.body.velocity.x = 400 * (cursors.right.isDown - cursors.left.isDown)
  player.body.velocity.y = 300 * (cursors.down.isDown - cursors.up.isDown) // lmao "up.isDown"
}
