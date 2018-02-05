import React from 'react'

import {Switch, Route, Redirect, BrowserRouter as Router} from 'react-router-dom'

import {Navbar, Game, About} from './components'

import {FirebaseAuth} from 'react-firebaseui'
import firebase, {auth} from '~/fire'

class App extends React.Component {
  constructor() {
    super()

    this.state = {loggedIn: false}

    auth.onAuthStateChanged(user => {
        this.setState({loggedIn: !!user})
        console.log('logged in?', this.state.loggedIn)
    })

    this.uiConfig = {
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => {
          this.setState({loggedIn: true})
          return false
        }
      }
    }
  }

  render() {
    console.log(auth)
    return this.state.loggedIn
      ? <div>
          <Navbar />
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/" component={Game} />
          </Switch>
        </div>
      : <FirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />
  }
}

// const uiConfig = {
//   signInFlow: 'popup',
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     // firebase.auth.GithubAuthProvider.PROVIDER_ID
//   ],
//   signInSuccessUrl: '/'
// }

// const Login = () => (
  
// )

// auth.onAuthStateChanged(user => {
//   loggedIn = !!user
//   console.log("logged in? ",loggedIn)
// })

// const App = () => (
//   loggedIn
//   ? <div>
//       <Navbar />
//       <Switch>
//         <Route path="/about" component={About} />
//         <Route path="/" component={Game} />
//       </Switch>
//     </div>
//   : <Login />
// )

export default App
