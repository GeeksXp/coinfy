import axios from 'axios'
import { API_URL } from '/const'

export default ({method = 'get', path, headers = {} }) => {
  try {
    return new Promise((resolve, reject) => {
    axios[method](`${API_URL}${path}`, { headers } )
    .then(response => {
      const {data: {status, response : responseData }} = response
      if(!status) {
        return reject(responseData)
      }
      resolve(responseData)
    })
  })
  } catch(e) {
    return e;
  }
}