class mainApi {
  constructor(apiConfig) {
    this._url = apiConfig.url;
    this._headers = apiConfig.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const MainApi = new mainApi({
  url: "https://api.movie.nb.nomoredomains.sbs",
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "content-Type": "application/json",
  },
});
