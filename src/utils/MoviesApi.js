import { MOVIES_URL } from './constants'

export function getAllMovies() {
    return fetch(MOVIES_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }