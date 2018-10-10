
import { localStorageGet } from '/api/browser'
import rq from './request'

export const getAllUsers = (data, token) => {
  return new Promise((resolve, reject) => {
    rq({
      path: '/users',
      headers: {"Authorization" : localStorageGet('token') }
    }).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}