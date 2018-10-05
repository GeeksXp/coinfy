import axios from 'axios';
import { API_URL } from '/const';


export const login = data => {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/login`, data)
    .then(response => {
      const {data: {status, response : responseData }} = response;
      if(!status) {
        return reject(responseData);
      }
      resolve(responseData);
    });
  });
};

export const logout = data => {
  return new Promise((resolve, reject) => {
    axios.delete(`${API_URL}/logout`)
    .then(response => {
      const {data: {status, response : responseData }} = response;
      if(!status) {
        return reject(responseData);
      }
      resolve(responseData);
    });
  });
};


export const validateToken = token => {
  return new Promise((resolve, reject) => {
    axios.get(`${API_URL}/validate-token`, { headers: {"Authorization" : token }} )
      .then(response => {
        const {data: {status, response : responseData }} = response;
        if(!status) {
          return reject(responseData);
        }
        resolve(responseData);
      })
  });
};