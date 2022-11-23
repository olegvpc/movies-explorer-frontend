import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useState } from 'react';


function SavedMovies({ savedList }) {

  // состояния запросов

  const [shortFilms, setShortFilms] = useState('off');



  // обработчик клика по радиокнопке
  function handleShortFilms(e) {
    setShortFilms(e.target.value);
  }


  return (
    <section className='saved-movies'>
      <SearchForm
        onCheckbox={handleShortFilms}
        shortFilms={shortFilms}
      />
      <MoviesCardList
        savedMovies={savedList}
        savedMoviesPage={true}
      />
    </section>
  );
}

export default SavedMovies;
