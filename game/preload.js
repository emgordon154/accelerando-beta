// this file is not needed, it's only here because i'm afraid to delete stuff in case it turns out i do need it

// import {storage} from '~/fire'

// import Promise from 'bluebird'
// import Axios from 'axios'

// const storageRef = storage.ref()

function preload(game) { }

preload.prototype = {
  preload() {
    const assetNames = [
      'space', // https://opengameart.org/content/space-backdrop
      'spaceship', // https://opengameart.org/content/space-ships-side-scroller
      'tiny-ast', // https://opengameart.org/content/2d-asteroid-sprite
      'med-ast', // https://opengameart.org/content/2d-asteroid-sprite
      'big-ast', // https://opengameart.org/content/2d-asteroid-sprite
      'explosion' // https://opengameart.org/content/explosion
    ]

    assetNames.forEach(assetName => this.game.load.image(assetName, `/img/${assetName}.png`))

    // return Promise.map(assetNames, assetName => (
    //   storageRef.child(`${assetName}.png`).getDownloadURL()
    //     .then(url => {
    //       console.log(this.game, assetName, url)
    //       return this.game.load.image(assetName, url)
    //     })
    // ))
    //   .then(() => this.game.state.start('Main menu'))
  },

  create() {
    this.game.state.start('Main menu')
  }
}



export default preload