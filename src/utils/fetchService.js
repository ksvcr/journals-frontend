import axios from 'axios';

class fetchService {
  constructor(config) {
    this.instance = axios.create(config);
  }

  request(url, options={}) {
    const config = {
      url,
      ...options
    };
    return new Promise((resolve, reject) => {
      if (!url) reject(new Error('URL parameter required'));
      return this.instance.request(config)
        .then(response => {
          resolve(response.data);
        }).catch(reject);
    }).catch(this.handleError);
  }

  handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } if (error.config) {
      console.error(error.config);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw error.message;
    }
  }

}

export default fetchService;
