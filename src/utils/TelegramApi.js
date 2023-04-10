import { BASE_URL } from './constants';

// const { URL } = require('../utils/constants');


function getResponse(res) {
  if(res.ok ){
    return res.json()
  }
  console.log(res)
  return res.json().then((err) => Promise.reject({message: err.message, status: res.status}))

  // if (res.ok) {
  //   // console.log(res.status)
  //   return res.json(); // true
  // }
  // return console.log(`ошибка в TelrgramApi.js - getResponse - ${res}`);

  // return res.ok ? res.json() : res.json().then((err) => Promise.reject({message: err.message, status: res.status}))
}

// Получение всех chatId из DB
export const getAllChatId = () => {
  return fetch(`${BASE_URL}/chatid`, {
    method: 'GET',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return getResponse(res);
    });
};

// Сохраненение chatID
export const saveNewChatId = (chatIdData) => {
  return fetch(`${BASE_URL}/chatid`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatIdData),
  })
    .then((res) => {
      // console.log('ОТВЕТ В api.js -');
      // console.log(chatIdData, URL);
      return getResponse(res);
    }).catch((err) => console.log(`ERROR В api.js -${err}`));
};

// Получение всех chatId из DB
export const saveSubstitute = (subsData) => {
  // console.log(subsData)
  return fetch(`${BASE_URL}/substitute`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subsData),
  })
    .then((res) => {
      return getResponse(res);
    });
};
export const getAllSubstitutes = () => {
  return fetch(`${BASE_URL}/substitute`, {
    method: 'GET',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json'
    }
  })
  .then((res) => {
    return getResponse(res)
  });
}

export const getAllSubstitutesInserval = (dateInterval) => {
  return fetch(`${BASE_URL}/substitute/interval`, {
    method: 'POST',
    headers: {
      // authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dateInterval),
  })
  .then((res) => {
    return getResponse(res)
  });
}
