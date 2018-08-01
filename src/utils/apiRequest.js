import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL
});

function apiRequest(url, options={}) {
  const config = {
    url,
    baseURL: process.env.API_URL,
    ...options
  };
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));
    return instance.request(config)
      .then(response => {
        resolve(response.data);
      }).catch(reject);
  }).catch(errorHandler);
}

function errorHandler(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } if (error.config) {
    console.log(error.config);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }

  throw new Error(error.message);
}

export default apiRequest
