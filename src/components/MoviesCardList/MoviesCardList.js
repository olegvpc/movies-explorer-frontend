import { useState, useEffect } from 'react'

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  savedMovies,
  savedMoviesPage
  }) {

  const [isEmptyList, setIsEmptyList] = useState(false)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
      savedMovies === null ? setIsError(true) : setIsError(false)
  if (savedMovies && savedMovies.length === 0) {
    setIsEmptyList(true)
  }
  },[savedMovies])


  const showCardsList =  savedMovies?.filter((item, index) => {
    return savedMoviesPage ? index < 5 : index < 12})

  return (
    <section className='movies-list'>
          <>
            <div className='movies-list__box'>
              {isEmptyList || isError ? (
                <p className={`movies-list__message ${isError && 'movies-list__message_type_err'}`}>
                {isError ? `Во время запроса произошла ошибка.
                Возможно, проблема с соединением или сервер недоступен.
                Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
                </p>
                ) : (
                  showCardsList?.map((item) => (
                    <MoviesCard
                      key={item.id}
                      card={item}
                      savedPages={savedMoviesPage}
                    />)
                    )
                )}
            </div>
            <button
              className={`movies-list__more-btn ${(!showCardsList || savedMoviesPage) && 'movies-list__more-btn_hidden'}`}
              type='button'
              aria-label='Показать еще'
            >
              Ещё
            </button>

          </>
    </section>
  );
}

export default MoviesCardList;
