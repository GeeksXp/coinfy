import rq from './request'

export const validateToken = token => {
  return new Promise((resolve, reject) => {
    rq({
      path: '/validate-token',
      headers: {"Authorization" : token }
    }).then(data => {
      resolve(data)
    }).catch(error => {
      reject(error)
    })
  })
}
