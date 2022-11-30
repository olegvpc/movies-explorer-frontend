import { useState, useEffect } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import { filterMovies } from '../../utils/utils';


function SavedMovies({ savedMoviesList, onDeleteClick }) {

    // состояния запросов
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilms, setShortFilms] = useState('off');
  // состояния фильмов
  const [filteredMovies, setFilteredMovies] = useState(savedMoviesList);
  // состояния вспомогательные
  const [isNothingFound, setIsNothingFound] = useState(false);

  // ---ОБРАБОТЧИКИ---
  // обработчик отправки формы
  function handleSearchSubmit(value) {
    setSearchQuery(value);
    const resultList = filterMovies(savedMoviesList, searchQuery, shortFilms);
    setFilteredMovies(resultList);
  };

  // обработчик клика по радиокнопке
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
  };

  // ---ЭФФЕКТЫ---
  // по новому запросу фильтруем фильмы
  useEffect(() => {
    const arr = filterMovies(savedMoviesList, searchQuery, shortFilms);
    setFilteredMovies(arr);
    if (searchQuery) {
      arr.length === 0 ? setIsNothingFound(true) : setIsNothingFound(false);
    }
  }, [searchQuery, shortFilms, savedMoviesList]);


  return (
    <section className='saved-movies'>
      <SearchForm
        onSearchClick={handleSearchSubmit}
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
        savedMoviesPage={true}
      />
      <MoviesCardList
        list={filteredMovies}
        isEmptyList={isNothingFound}
        savedMovies={savedMoviesList}
        onDelete={onDeleteClick}
        savedMoviesPage={true}
      />
    </section>
  );
}

export default SavedMovies;
