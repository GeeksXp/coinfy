import axios from 'axios'
import { API_URL } from '/const'

export default ({method = 'get', data, path, headers }) => {
  try {
    return new Promise((resolve, reject) => {
      axios({ url: `${API_URL}${path}`, method, headers, data })
      .then(response => {
        const {data: {status, response : responseData }} = response
        if(!status) {
          return reject(responseData)
        }
        resolve(responseData)
      }).catch(e => {
        reject(e)
      })
    })
  } catch(e) {
    return e
  }
}
