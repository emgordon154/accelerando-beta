export function loadImages(...imageNames) {
  // const imageNames = [
  //   'space', // https://opengameart.org/content/space-backdrop
  //   'spaceship', // https://opengameart.org/content/space-ships-side-scroller
  //   'tiny-ast', // https://opengameart.org/content/2d-asteroid-sprite
  //   'med-ast', // https://opengameart.org/content/2d-asteroid-sprite
  //   'big-ast', // https://opengameart.org/content/2d-asteroid-sprite
  // ]
  return function(game) {
    imageNames.forEach(imageName => game.load.image(imageName, `/img/${imageName}.png`))
  }
}

// I'm not sure modularizing the spritesheet loading will be helpful...
// There is currently only one spritesheet, 
// and spritesheet loading takes two additional parameters (dimensions of each animation frame).
// But modularizing might be good if more spritesheets are added,
// so I'm keeping this here for possible future use.

  // export function loadSpritesheets(...spritesheetNames) {
  //   // const spritesheetNames = [
  //   //   'explosion' // https://opengameart.org/content/explosion
  //   // ]

  //   return function(game) {
  //     spritesheetNames.forEach(spritesheetName =>
  //       game.load.spritesheet(`${spritesheetName}`, `/img/${spritesheetName}.png`, 64, 64)
  //     )
  //   }
  // }
