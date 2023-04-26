# movies-explorer-api
Репозиторий дипломного проекта `Movie`, включающий фронтенд 
и бэкенд части приложения со следующими возможностями: авторизации 
и регистрации пользователей, операции с карточками и пользователями. 
* Бэкенд расположен в репозитории 
```html
movies-explorer-api
``` 
* Фронтэнд расположен в репозитории 
```html
movies-explorer-frontend
``` 

Проект включает регистрацию ВМ в ЯндексОблаке с привязкой доменого имени 
с  публичным IP и выпуск SSL сертификата



# Frontend приложения:
https://olegvpc.diplom.nomoredomains.icu

# Backend приложения:
https://api.olegvpc.diplom.nomoredomains.icu

## Публичный ip: 
158.160.39.232
* [Ссылка на макет в Figma](https://www.figma.com/file/WF9s5zRvAfIl9eTCZAOC3a/Diploma-(Copy)?node-id=891%3A3857&t=LcUsEubaaOLSTN75-1)

# Ссылка на pull Request
https://github.com/olegvpc/movies-explorer-frontend/pull/2

## start in serve
```
npm uninstall -g serve 
npm i -S serve
npx serve -s build 
```

## deploy on server
* 1- ssh olegvpc-diplom@158.160.39.232
* 2- git clone https://github.com/olegvpc/movies-explorer-frontend.git
* 3- npm install
* 4- Change export const BASE_URL = 'https://api.olegvpc.diplom.nomoredomains.icu'; (constants.js)
* 5- npm run build
