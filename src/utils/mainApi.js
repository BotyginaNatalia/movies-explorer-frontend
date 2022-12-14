export const BASE_URL = "https://api.movie.nb.nomoredomains.sbs";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export function getUser(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${jwt}`,
    },
    credentials: "include",    
  }).then(checkResponse);
}

export function changeProfileInfo(jwt, name, email) {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "Content-Type": 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({ name: name, email: email })
  })
  .then(checkResponse);
}

export function getMyMovies(jwt) {
  return fetch(`${BASE_URL}/movies`, {
      method: "GET",
      credentials: "include",
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
    credentials: "include",
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

export function deleteMyMovie(jwt, movieId) {
  return fetch(`${BASE_URL}/movies/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Authorization": `Bearer ${jwt}`,
      "Content-Type": "application/json",
  },
  }).then(checkResponse);
}
