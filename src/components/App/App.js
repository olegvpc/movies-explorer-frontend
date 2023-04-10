import { useEffect, useState } from "react";
// import env from "react-dotenv";
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom'

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
import School from '../School/School';
import PageNotFound from'../PageNotFound/PageNotFound';
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import TeachersList from "../TeachersList/TeachersList";
import SubstituteAll from "../SubstituteAll/SubstituteAll"
import {
  getUserInfo,
  saveNewMovie,
  deleteMovie,
  updateUserInfo,
  getUsersMovies,
  register,
  login,
  verifyToken
} from '../../utils/MainApi';
// import { getUsersMovies } from '../../utils/MainApi'
import {SUCCESSFUL_CODE} from '../../utils/constants';
import Substitute from "../Substitute/Substitute";
// import { botToken } from '../../utils/index'


function App() {

  // startTelegramBot()
  // console.log(botToken)

  const history = useHistory();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   // состояния фильмов пользователя
  const [savedMovies, setSavedMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isTeachersError, setIsTeachersError] = useState(false);

  const [allTeachers, setAllTeachers] = useState([]);

    const [infoMessage, setInfoMessage] = useState({
    isShown: false,
    message: '',
    code: SUCCESSFUL_CODE,
  });


  // проверка наличия токена юзера в localStorage - если есть, то провести аутентификация юзера
  useEffect(() => {
      console.count("RENDER - TOKEN") // пустой массив зависимостей - Render только при монтировании
      checkToken();
      setIsLoading(false)
    // eslint-disable-next-line
  }, [])

  // если пользователь уже авторизован, загрузить его данные и корточки с сервера
  useEffect(() => {
    if (loggedIn) {
      setIsLoading(true)
      Promise.all([getUserInfo(), getUsersMovies()])
        .then(([userData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(moviesData);
          localStorage.setItem('savedMovies', JSON.stringify(moviesData)); // для тестирования
          setIsError(false);
        })
        .catch((err) => {
          setIsError(true);
          console.log(`ошибка получения данных по API при первичном обращении за карточками и юзером ${err}`);
        })
      .finally(() => setIsLoading(false))
    }
  }, [loggedIn])

  // обработчик добавления фильма в избранное(сохранение в базе MainApi)
  function handleSaveMovie(movie){
    saveNewMovie(movie)
      .then(newCard => {
        setSavedMovies([newCard, ...savedMovies]);
      })
      .catch(err => console.log(`Запись фильма на MainApi не прошла ${err}`))
  }

  // обработчик удаления фильма из избранного
  function handleDeleteMovie(movie){
    deleteMovie(movie._id)
      .then(() => {
        const newMoviesList = savedMovies.filter((m) => m._id === movie._id ? false : true);
        setSavedMovies(newMoviesList);
        localStorage.setItem('savedMovies', JSON.stringify(savedMovies)); // для тестирования
      })
      .catch(err => console.log(`Удаление фильма на MainApi не выполнено ${err}`))
  };

  // обработчик изменения данных пользователя
  function handleUpdateUser(name, email) {
    updateUserInfo(name, email)
      .then(data => {
        // console.log(data)
        setCurrentUser(data);
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          type: 'profile',
          code: SUCCESSFUL_CODE,
          message: "OK"
        });
      })
      .catch((err) => {
        // console.log(err)
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message: err.message,
          code: err.statusCode,
          type: 'profile',
        });
      })
  }

  // обработчик регистрации пользователя
  function handleRegister(name, email, password){
    register(name, email, password)
      .then(data => {
        if(data){
          // console.log(data); // {email: 'ol7-server@ya.ru', name: 'Ol-second', _id: '63802aea5e9d371a9785df5a'}
          handleLogin(data.email, password);
        }
      })
      .catch((err) => {
        // console.log(err)
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message: err.message,
          code: err.status,
          type: 'register',
        });
      })
  }

  // обработчик авторизации пользователя
  function handleLogin(email, password) {
    login(email, password)
      .then(res => {
        setLoggedIn(true)
        localStorage.setItem('jwt', res.jwt);
        history.push('/movies');
      })
      .catch((err) => {
        setInfoMessage({
          ...infoMessage,
          isShown: true,
          message: err.message,
          code:err.status,
          type: 'login',
        });
      })
  }

  function checkToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      verifyToken(token)
      .then((res) => {
        setLoggedIn(true);
        history.push(location.pathname);
      })
      .catch((err) => {
        handleSignOut()
        console.log(err);
      });
    }
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    setIsLoading(false);
    setCurrentUser({});
    history.push('/');
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
    {/*<TeachersContext.Provider value={allTeachers}>*/}

      <div className='app'>
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <Route path={["/", "/movies", "/saved-movies", "/profile", "/school"]}>
              <Header
                loggedIn={loggedIn}
              />
            </Route>

            <Switch>
              <ProtectedRoute
                exact path='/movies'
                loggedIn={loggedIn}
                component={Movies}
                savedMoviesList={savedMovies}
                onLikeClick={handleSaveMovie}
                onDeleteClick={handleDeleteMovie}
                // savedMoviesList={JSON.parse(localStorage.getItem('movies'))}
              />

              <ProtectedRoute
                exact path='/saved-movies'
                loggedIn={loggedIn}
                component={SavedMovies}
                savedMoviesList={savedMovies}
                onDeleteClick={handleDeleteMovie}
              />

              <Route path="/school">
                <AdminRoute
                  exect path='/school'
                  component={School}
                  loggedIn={loggedIn}
                  setAllTeachers={setAllTeachers}
                  setIsTeachersError={setIsTeachersError}
                />
                <Switch>
                  <Route
                    exact path="/school/teachers">
                    <TeachersList
                      isTeachersError={isTeachersError}
                      loggedIn={loggedIn}
                      allTeachers={allTeachers}
                    />
                  </Route>
                  <Route
                    exact path="/school/substitute">
                    <Substitute
                      allTeachers={allTeachers}
                    />
                  </Route>
                  <Route
                    exact path="/school/substitute-all">
                    <SubstituteAll
                      // allTeachers={allTeachers}
                    />
                  </Route>
                </Switch>
              </Route>


              <ProtectedRoute
                exact path='/profile'
                loggedIn={loggedIn}
                component={Profile}
                onSignOut={handleSignOut}
                onUpdate={handleUpdateUser}
                infoMessage={infoMessage}
                setInfoMessage={setInfoMessage}
              />




              <Route exact path='/' >
                <Main />
              </Route>

              <Route path='/signup'>
                {loggedIn ?
                  <Redirect to='/movies' /> :
                  <Register
                    onRegister={handleRegister}
                    infoMessage={infoMessage}
                    setInfoMessage={setInfoMessage}
                  />}
              </Route>

              <Route path='/signin'>
                {loggedIn ? <Redirect to='/movies' /> :
                  <Login onLogin={handleLogin}
                         infoMessage={infoMessage}
                         setInfoMessage={setInfoMessage}
                  />}
              </Route>

              <Route path="*">
                <PageNotFound />
              </Route>

            </Switch>

            <Route exact path={['/', '/movies', '/saved-movies', '/school']}>
              <Footer />
            </Route>
          </>
        )}
      </div>
    {/*</TeachersContext.Provider>*/}
    </CurrentUserContext.Provider>
  );
}

export default App;
