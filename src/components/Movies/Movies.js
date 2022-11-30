import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getAllMovies } from '../../utils/MoviesApi';
import { filterMovies, filterShortMovies } from '../../utils/utils';

function Movies({ savedMoviesList, onLikeClick, onDeleteClick }) {
  const existSearch = JSON.parse(localStorage.getItem('searchedMovies'));
  const existQuery = localStorage.getItem('searchQuery')

  const initialStateCheckbox = localStorage.getItem('shortFilms') === 'on' ? 'on' : 'off';
  const [shortFilms, setShortFilms] = useState(initialStateCheckbox);
  const [searchQuery, setSearchQuery] = useState(existQuery ? existQuery : '');

  // состояния фильмов
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [isSavedSearchedMovie, setIsSavedSearchedMovie] = useState(existSearch? true: false);
  const [searchedMovies, setSearchedMovies] = useState(existSearch?.length ? existSearch : [])
  // состояния вспомогательные
  const [isNothingFound, setIsNothingFound] = useState(false);
  const [isMoviesLoaging, setIsMoviesLoaging] = useState(false);
  const [isError, setIsError] = useState(false);

    // ф-я фильтрации массива и установки его в хранилище и стейт
  function filterShortMovie (arr) {
    setFilteredMovies(shortFilms === 'on' ? filterShortMovies(arr) : arr);
    console.log(arr, filteredMovies)
  }

  function handleSetFilteredMovies (movies, query) {
    const moviesList = filterMovies(movies, query, "off"); // все фильмы по запросу
    // сохраняем с учетом переключателя shortFilms
    filterShortMovie(moviesList)
    localStorage.setItem('searchedMovies', JSON.stringify(moviesList));
  }

    // обработчик отправки формы
  function handleSearchSubmit(value) {
    setIsMoviesLoaging(true);
    setSearchQuery(value);
    localStorage.setItem('searchQuery', value);

    if (!allMovies.length) {
      console.log("Cтейт allMovies пустой")
      getAllMovies()
        .then((data) => {
          setAllMovies(data);
          setIsSavedSearchedMovie(false)
          localStorage.setItem('allMovies', JSON.stringify(data)); // тестово
          handleSetFilteredMovies(data, value);
        })
        .catch((err) => {
          setIsError(true);
          console.log(err);
        })
        .finally(() => setIsMoviesLoaging(false))
    } else {
      console.log("allMovies имеет данные")
      handleSetFilteredMovies(allMovies, value);
      setIsMoviesLoaging(false);
    }
  }

  // обработчик клика по радиокнопке
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
    localStorage.setItem('shortFilms', e.target.value); // сохраняем состояние
	}

  // обработчик устновки значения, когда ничего не найдено
  function handleCheckFilteredMovies(arr) {
    arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
	}

    // по новому запросу фильтруем фильмы с рендерингом по shortFilms и query
  useEffect(() => {
    if (searchQuery && allMovies && !isSavedSearchedMovie) {
      const arr = filterMovies(allMovies, searchQuery, shortFilms);
      filterShortMovie(arr)
      handleCheckFilteredMovies(arr);
      console.log(`query length massive - ${arr.length}`)
      console.log(arr)
    }
    if (isSavedSearchedMovie) {
      console.log(`short: ${shortFilms} savedMassive: ${searchedMovies}`)
      const arr = filterMovies(searchedMovies, searchQuery, shortFilms);
      filterShortMovie(arr)
      handleCheckFilteredMovies(arr)
      console.log(`saved- length filtered massive: ${filteredMovies.length}`)
    }
  }, [searchQuery, allMovies, shortFilms])

  // НАЧАЛЬНОЕ МОНТИРОВАНИЕ И УСТАНОВКА СТЕЙТА сохраненных фильмов - true
  // useEffect(() => {
  //   if (searchedMovies?.length) {
  //     setIsSavedSearchedMovie(true)
  //     filterShortMovie(searchedMovies)
  //     handleCheckFilteredMovies(filteredMovies)
  //
  //     console.log(
  //       `start exist Mount - short: ${shortFilms}, arr: ${searchedMovies}`)
  //     }
  //   }, [])


  return (
    <section className='movies'>
      <SearchForm
        onSearchClick={handleSearchSubmit}
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
        savedMoviesPage={false}
      />
      <MoviesCardList
        isLoading={isMoviesLoaging}
        list={filteredMovies}
        isEmptyList={isNothingFound}
        isError={isError}
        onLike={onLikeClick}
        onDelete={onDeleteClick}
        savedMovies={savedMoviesList}
        savedMoviesPage={false}
      />
    </section>
  );
}

export default Movies;
