import axios from 'axios';

export const post = (url, data, headers) =>
  axios
    .post(`${url}`, data)
    .then((res) => res)
    .catch((err) => {
      const res = err.response;
      return res;
    });

export const get = (url, headers) =>
  axios
    .get(`${url}`)
    .then((res) => res)
    .catch((err) => {
      const res = err.response;
      return res;
    })
