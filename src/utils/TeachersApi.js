import { BASE_URL } from './constants';

const token = () => localStorage.getItem('jwt');

function getResponse(res) {
  // console.log(res) // {type: 'cors', url: 'http://localhost:4000/users/me', redirected: false, status: 200, ok: true,…}
  // console.log(res.json())
  //   if(res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(res.json());
  return res.ok ? res.json() : res.json().then((err) => Promise.reject({message: err.message, status: res.status}))
}

  // Получение сохраненных пользователем фильмов
export const getAllTeachers = () => {
  return fetch(`${BASE_URL}/teachers`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return getResponse(res)
  });
}
