import { END_POINT, X_ACCESS_TOKEN } from './constants';

const ResponseCode = {
  SUCCESS: 200,
  REDIRECT: 300,
};

const checkStatus = (response) => {
  if (response.status >= ResponseCode.SUCCESS && response.status < ResponseCode.REDIRECT) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class API {
  constructor() {
    this.endPoint = END_POINT;
    this.accessToken = X_ACCESS_TOKEN;
  }

  getSummary() {
    return this.load({
      url: 'summary',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then((response) => response.json());
  }

  getAll() {
    return this.load({
      url: 'all',
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
      .then((response) => response.json());
  }

  load({ url, headers = new Headers() }) {
    return fetch(`${this.endPoint}/${url}`, { headers })
      .then(checkStatus)
      .catch((err) => {
        throw new Error(`fetch error: ${err}`);
      });
  }
}
