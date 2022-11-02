class moviesApi {
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

  getOriginalMovies() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}

export const MoviesApi = new moviesApi({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "content-Type": "application/json",
  },
});
