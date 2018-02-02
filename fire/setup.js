require('~/secrets')

module.exports = firebase => firebase.initializeApp(process.ENV.firebaseSettings)

