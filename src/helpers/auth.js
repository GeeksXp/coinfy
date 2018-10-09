import { localStorageSet, localStorageGet, localStorageRemove } from '/api/browser'
import { collect } from 'dop'
import { login, logout, validateToken } from '/api/server'
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
    
      const { user: { uid: id, stsTokenManager: {accessToken: token} } } = JSON.parse(JSON.stringify(result));
      console.log(token)
      login({ id }, token).then(data => {
        setUser(data)
        setHref(routes.home())
        resolve(data.username)
      }).catch(error => {
        state.loading = false
        reject(error)
      })
    }).catch(error => {
      state.loading = false
      reject(error)
    });
  })
}

export const signOut = () => {
  auth.signOut().then(function() {
    clean()
  }).catch(function(error) {
    console.log(error)
  });
}

export const isAuth = () => {
  state.loading = true
  auth.onAuthStateChanged(function(user) {
    if (user) {
      auth.currentUser.getIdToken(true).then(idToken => {
        return validateToken(idToken).then(data => {
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
  const collector = collect()
  localStorageRemove(KEY)
  state.isLoggedIn = false
  state.loading = false
  state.user = {}
  collector.emit()
  setHref(routes.signIn())
}

const setUser = data => {
  const collector = collect()
  localStorageSet(KEY, JSON.stringify(data))
  state.isLoggedIn = true
  state.loading = false
  state.user = data
  collector.emit()
}