import React from 'react'

import {Switch, Route} from 'react-router-dom'

import {Navbar, Game, About, Login} from './components'

import {auth} from '~/fire'

class App extends React.Component {
  constructor() {
    super()

    this.state = {loggedIn: false}

    auth.onAuthStateChanged(user => {
      this.setState({loggedIn: !!user})
    })
  }

  render() {
    return this.state.loggedIn
      ? <div>
          <Navbar />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={Game} />
          </Switch>
        </div>
      : <Login />
  }
}

export default App
