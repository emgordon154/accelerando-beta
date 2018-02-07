import React from 'react'
import {FirebaseAuth} from 'react-firebaseui'
import firebase, {auth} from '~/fire'

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID
  ]
}

const Login = () => (
  <FirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
)

export default Login
