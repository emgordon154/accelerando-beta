// this file is not used and possibly needs deletion.
// this functionality has been moved to App.jsx for ease of state handling.

import React from 'react'
import {FirebaseAuth} from 'react-firebaseui'
import firebase from '~/fire'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
}

const Login = () => (
  <FirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
)

export default Login
