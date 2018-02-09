import React from 'react'
import { Link } from 'react-router-dom'

import {auth} from '~/fire'

function signOut () {
  auth.signOut()
    .then(() => {
      // console.log('signed out successfully')
      // window.location.reload()
    })
    .catch(err => console.error(err))
}

class Navbar extends React.Component {
  constructor(){
    super()

    this.state = {loggedIn: false}

    auth.onAuthStateChanged(user => {
        this.setState({loggedIn: !!user})
    })
  }
  render () {
    return (
      <nav>
          <Link to="/" className="navlink">
            Game
          </Link>
          {/* <Link to="/about" className="navlink">
            About
          </Link> */}
          <a onClick={signOut} className="navlink">
            Sign out
          </a>
      </nav>
    )
  }
}

export default Navbar
