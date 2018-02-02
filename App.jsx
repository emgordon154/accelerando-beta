import React from 'react'

import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom'

import {Navbar, Game, About} from './components'

const App = () => (
  <div>
    <Navbar />
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/" component={Game} />
    </Switch>
  </div>
)

export default App
