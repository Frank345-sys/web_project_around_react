export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._method = options.method;
    this._body = options.body;
    this._headers = options.headers;
  }

  card() {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_08/${this._baseUrl}`,
      {
        method: this._method,
        body: this._body,
        headers: this._headers,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  profile() {
    return fetch(
      `https://around.nomoreparties.co/v1/web_es_08/${this._baseUrl}`,
      {
        method: this._method,
        body: this._body,
        headers: this._headers,
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
