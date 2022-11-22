import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from 'react-router-dom'

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css';
import Preloader from '../Preloader/Preloader';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import PageNotFound from'../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute";
import { MOVIES_URL, MESSAGE_ERROR } from '../../utils/constants';

function App() {

  // загружаем тестовые данные для показа - пока без фильтров и паджинации
  function getMovies() {
    return fetch(MOVIES_URL)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  useEffect(() => {
    getMovies()
      .then((data) => {
        console.log(`savedMoviesList`)
        localStorage.setItem('movies', JSON.stringify(data))

      })
      .catch((err) => {
        console.log(err.message)
      });
    },[])

  // тестовые состояния авторизации пользователя и других стейтов
  const [currentUser, setCurrentUser] = useState({name: "Oleg", email: "ol@ya.ru"});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaging, setIsLoaging] = useState(false);


  // тестовое состояние уведомления пользователя при регистрации и входе
  const [infoMessage, setInfoMessage] = useState(MESSAGE_ERROR)

  return (

    <CurrentUserContext.Provider value={currentUser}>

      <div className='app'>
        {isLoaging ? (
          <Preloader />
        ) : (
          <>
            <Route exact path={["/", "/movies", "/saved-movies", "/profile"]}>
              <Header loggedIn={loggedIn} />
            </Route>

            <Switch>
              <ProtectedRoute
                exact path='/movies'
                loggedIn={loggedIn}
                component={Movies}
                savedMoviesList={JSON.parse(localStorage.getItem('movies'))}
              />

              <ProtectedRoute
                exact path='/saved-movies'
                loggedIn={loggedIn}
                component={SavedMovies}
                savedList={JSON.parse(localStorage.getItem('movies'))}
              />

              <ProtectedRoute
                exact path='/profile'
                loggedIn={loggedIn}
                component={Profile}
                infoMessage={infoMessage}
              />

              <Route exact path='/' >
                <Main />
              </Route>

              <Route path='/signup'>
                {loggedIn ? <Redirect to='/movies' /> : <Register onRegister={console.log("handleRegister")} infoMessage={infoMessage} />}
              </Route>

              <Route path='/signin'>
                {loggedIn ? <Redirect to='/movies' /> : <Login onLogin={console.log("handleLogin")} infoMessage={infoMessage} />}
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>

            </Switch>
            <Route exact path={['/', '/movies', '/saved-movies']}>
              <Footer />
            </Route>
          </>
        )}
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
