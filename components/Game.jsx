import React from 'react'

import createGame from '~/game'
import {Tone} from '~/audio'
import { auth } from '~/fire'

class Game extends React.Component {
  constructor() {
    super()
    this.state = {loggedIn: false}
    auth.onAuthStateChanged(user => {
      this.setState({loggedIn: !!user})
      // console.log('logged in?', this.state.loggedIn)
    })
  }

  componentDidUpdate () {
    // console.log('game component updated')
    if (this.state.loggedIn && !this.state.game) this.setState({game: createGame()})
  }

  componentWillUnmount () {
    Tone.Master.mute = true
    Tone.Transport.stop()
    Tone.Transport.cancel()
    if (this.state.game) this.state.game.destroy()
    this.setState({game: null})
  }

  render() {
    return <div id="phaser-game" />
  }
}

export default Game
