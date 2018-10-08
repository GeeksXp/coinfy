import { localStorageSet, localStorageGet, localStorageRemove } from '/api/browser'
import { collect } from 'dop'
import { login, logout, validateToken } from '/api/server'
import state from '/store/state'
import { setHref}  from '/store/actions'
import routes from '/router/routes'
import { error } from 'util';

const KEY = 'profile'

export const signIn = (email, password) => {
  state.loading = true
  return new Promise((resolve, reject) => {
    login({ email, password}).then(data => {
      setUser(data)
      setHref(routes.home())
      resolve(data.username)
    }).catch(error => {
      state.loading = false
      reject(error)
    })
  })
}

export const signOut = () => {
  clean()
  logout();
}

export const isAuth = () => {
  const data = JSON.parse(localStorageGet(KEY));
  state.loading = true
  if(data) {
    return validateToken(data.token).then(data => {
      setUser(data)
    }).catch(error => {
      state.loading = false
      console.log('ERROR', error)
      // clean()
    })
  }
  clean()
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