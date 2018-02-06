import gameVariables from './variables'
var gv = gameVariables

import {database} from '~/fire'

function leaderboard(game) { }

// there seems to be nothing I can do to make preload wait
// for that database snapshot before create is called.
// I tried all kinds of async/await magic.
// then i realized i can just put the rendering in the .then
// :/

leaderboard.prototype = {
  preload()  {
    const assetNames = [
      'space', // https://opengameart.org/content/space-backdrop
    ]

    assetNames.forEach(assetName => this.game.load.image(assetName, `/img/${assetName}.png`))
  },

  create() {
    const game = this.game
    
    gv.background = game.add.tileSprite(0, 0, 800, 600, 'space')
    gv.title = game.add.text(0, 100, 'High Scores', {
      boundsAlignH: 'center',
      font: '20pt Monaco',
      fill: 'white'
    })
    gv.title.setTextBounds(0, 0, 800, 600)

    const leaderboardPlaceholder = game.add.text(0, 200, 'Fetching high scores from server. Please wait.', {
      boundsAlignH: 'center',
      font: '12pt Monaco',
      fill: 'white'
    }).setTextBounds(0, 0, 800, 600)

    gv.leaderboard = database.ref('/scores').once('value')
      .then(snapshot => Object.values(snapshot.val()))
      .then(unsortedScores => unsortedScores.sort((entry1, entry2) => entry2.score - entry1.score))
      .then(highScores => {
        leaderboardPlaceholder.destroy()
        return highScores.map((entry, position) => {
          const {name, score} = entry
          const y = 200 + 40 * position
          game.add.text(200, y,`${position + 1}. ${name}`, { // The leaderboard ain't an array; it starts at 1 :)
            boundsAlignH: 'left',
            font: '12pt Monaco',
            fill: 'white'
          }).setTextBounds(0, 0, 800, 600)
          game.add.text(0, y, score, {
            boundsAlignH: 'right',
            font: '12pt Monaco',
            fill: 'white'
          }).setTextBounds(0, 0, 600, 600)
        })
      })
      .catch(err =>
        leaderboardPlaceholder.setText('Sorry, unable to fetch high scores from server.')
      )
    
    gv.startText = game.add.text(0, 700, 'press "space" to return to the main menu', {
      boundsAlignH: 'center',
      font: '12pt Monaco',
      fill: 'white'
    })
    gv.startText.setTextBounds(0, 0, 800, 600)
  
    gv.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
    game.input.keyboard.addKeyCapture(Phaser.KeyCode.SPACEBAR)
  },

  update() {
    if (gv.spacebar.justPressed()) {
      gv.spacebar.reset()
      this.game.state.start('Main menu')
    }
  }
}

export default leaderboard
