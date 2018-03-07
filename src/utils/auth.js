import { localStorageSet, localStorageGet, localStorageRemove } from '/api/browser'
import state from '/store/state'
import { setHref}  from '/store/actions'
import routes from '/router/routes'

const KEY = 'profile'

export function signIn(value) {
  localStorageSet(KEY, value)
  state.isLoggedIn = true
  setHref(routes.home())
}

export function signOut() {
  localStorageRemove(KEY)
  state.isLoggedIn = false
  setHref(routes.signIn())
}

export function isAuth() { 
  if(localStorageGet(KEY)) {
    state.isLoggedIn = true
  } else {
    state.isLoggedIn = false
    setHref(routes.signIn())
  }
}