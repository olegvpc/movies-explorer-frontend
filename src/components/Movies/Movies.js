import { useState } from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ savedMoviesList }) {

  const initialStateCheckbox = localStorage.getItem('shortFilms') === 'on' ? 'on' : 'off';
  const [shortFilms, setShortFilms] = useState(initialStateCheckbox);

  // обработчик клика по радиокнопке
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
    localStorage.setItem('shortFilms', e.target.value);
	}


  return (
    <section className='movies'>
      <SearchForm
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
      />
      <MoviesCardList
        savedMovies={savedMoviesList}
        savedMoviesPage={false}
      />
    </section>
  );
}

export default Movies;
