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

export function receiveToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  }).then(checkResponse);
}
