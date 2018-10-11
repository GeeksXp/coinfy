import rq from './request'
import { localStorageSet, localStorageRemove } from '/api/browser'
import { collect } from 'dop'
import { auth as serverAuth} from '/api/server'
import { auth } from '/api/firebase'
import state from '/store/state'
import { setHref}  from '/store/actions'
import routes from '/router/routes'
import { error } from 'util'

const KEY = 'profile'

export const signIn = (email, password) => {
  state.loading = true
  return new Promise((resolve, reject) => {
    auth.signInWithEmailAndPassword(email, password).then(result => {
      const { user: { displayName } } = JSON.parse(JSON.stringify(result));
      resolve(displayName)
    }).catch(error => {
      state.loading = false
      reject(error)
    });
  })
}

export const signOut = () => {
  auth.signOut().then(function() {
   // clean()
  }).catch(function(error) {
    console.log(error)
  });
}

export const isAuth = () => {
  state.loading = true
  auth.onAuthStateChanged(function(user) {
    if (user) {
      auth.currentUser.getIdToken(true).then(idToken => {
        rq({
          path: '/validate-token',
          headers: {"Authorization" : idToken }
        }).then(data => {
          localStorageSet('token', idToken)
          setUser(data)
        }).catch(error => {
          state.loading = false
          console.log('ERROR', error)
          // clean()
        })
      }).catch(error => {
        state.loading = false
        console.log('ERROR', error)
        // clean()
      });
    } else {
      clean()
    }
  })
}

const clean = () => {
  console.log('clean')
  const collector = collect()
  state.isLoggedIn = false
  state.loading = false
  state.user = {}
  localStorageRemove(KEY)
  localStorageRemove('token')
  setHref(routes.signIn())
  collector.emit()
}

const setUser = data => {
  const collector = collect()
  localStorageSet(KEY, JSON.stringify(data))
  state.isLoggedIn = true
  state.loading = false
  state.user = data
  collector.emit()
}