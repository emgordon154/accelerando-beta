import {storage} from '~/fire'

import Promise from 'bluebird'

const storageRef = storage.ref()

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

    const assetLoaders = Promise.map(assetNames, assetName => (
      storageRef.child(`${assetName}.png`).getDownloadURL()
        .then(url => this.game.load.image(assetName, url))
    ))
  },

  create() {
    this.game.state.start('Main menu')
  }
}



export default preload