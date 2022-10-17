export const BASE_URL = "https://api.movie.nb.nomoredomains.sbs";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function regNewUser(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
}

export function logNewUser(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function changeProfileInfo(jwt, name, email) {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({ name: name, email: email })
  })
  .then(checkResponse);
}

export function getMyMovies(jwt) {
  return fetch(`${BASE_URL}/movies`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`,
      },
  })
  .then(checkResponse);
}

export function addNewMovie(jwt, movie) {
  return fetch(`${BASE_URL}/movies`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
  },
    body: JSON.stringify({
      country: movie.country || "undefined",
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailerLink: movie.trailerLink || "undefined",
      thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,
      nameRU: movie.nameRU || "undefined",
      nameEN: movie.nameEN || "undefined",
    }),
  }).then(checkResponse);
}

export function deleteMyMovie(jwt, id) {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": 'application/json',
  },
  }).then(checkResponse);
}

export function receiveToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}
