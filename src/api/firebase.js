import { FIREBASE } from '/const'
import firebase from 'firebase/app'
import 'firebase/auth'

// Initialization firebase
if (!firebase.apps.length) {
  firebase.initializeApp(FIREBASE)
}

const auth = firebase.auth()

export { auth }