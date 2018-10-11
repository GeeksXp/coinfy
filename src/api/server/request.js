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
      })
    })
  } catch(e) {
    return e;
  }
}

const cleanObject = obj => {
  obj && Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
  return obj;
};