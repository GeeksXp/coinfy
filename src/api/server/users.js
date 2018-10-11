
import { localStorageGet } from '/api/browser'
import rq from './request'

export const getAllUsers = () => {
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

export const getUser = id => {
  return new Promise((resolve, reject) => {
    rq({
      path: `/users/${id}`,
      headers: {"Authorization" : localStorageGet('token') }
    }).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const createUser = data => {
  return new Promise((resolve, reject) => {
    rq({
      method: 'post',
      path: `/users`,
      headers: {"Authorization" : localStorageGet('token') },
      data
    }).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const editUser = (id, data) => {
  return new Promise((resolve, reject) => {
    rq({
      method: 'put',
      path: `/users/${id}`,
      headers: {"Authorization" : localStorageGet('token') },
      data
    }).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}

export const deleteUser = id => {
  return new Promise((resolve, reject) => {
    rq({
      method: 'delete',
      path: `/users/${id}`,
      headers: {"Authorization" : localStorageGet('token') }
    }).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}