import { useState, useEffect } from 'react'

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../hooks/useWindowWidth'

function MoviesCardList({
  isLoading,
  list,
  isEmptyList,
  isError,
  onLike,
  onDelete,
  savedMovies,
  savedMoviesPage
  }) {

  const width = useWindowWidth() // смотрим размер окна просмотра

  const [showCardList, setShowCardList] = useState([]);
  const [cardsShowParams, setCardsShowParams] = useState({sum: 0, more: 0});


  // стейт с параметрами стриницы меняется при изменении размера экрана
  useEffect(() => {
      // console.count(`рамер экрана ${width}`)
    if (width > 1331){
      setCardsShowParams({sum: 8, more: 4});
    } else if(width <= 1331 && width > 1027){
      setCardsShowParams({ sum: 12, more: 3});
    } else if (width <=1027 && width > 629){
      setCardsShowParams({sum: 8, more: 2});
    } else if (width <= 629){
      setCardsShowParams({sum: 5, more: 2});
    }
    // return () => setIsMount(false);
  }, [width]);

  // задаем массив отображаемых карточек на странице всех фильмов
  useEffect(() => {

    if(list.length && !savedMoviesPage){
      const res = list.filter((item, index) => index < cardsShowParams.sum);
      setShowCardList(res);
    }
  }, [list, savedMoviesPage, cardsShowParams.sum]);


  // ф-ия получения сохраненной карточки фильма
  function getSavedMovieCard(arr, id) {
    return arr.find((item) => {
      return item.movieId === id;
    });
  }

  // обработчик клика по кнопке "Еще"
  function handleClickMoreMovies () {
    const start = showCardList.length;
    const end = start + cardsShowParams.more;
    const residual = list.length - showCardList.length;

    if(residual > 0){
      const newCards = list.slice(start, end);
      setShowCardList([...showCardList, ...newCards]);
    }
  }

  // ф-ия создания массива сохраненных карточек
  function getSavedMoviesPage() {
    return list.map((item) => (
      <MoviesCard
        key={item._id}
        card={item}
        savedPage={savedMoviesPage}
        onDelete={onDelete}
      />
    ))
  }

  // ф-ия создания массива стандартных карточек
  function getInitialMoviesPage() {
    return showCardList.map((item) => {
      const isCardSaved = getSavedMovieCard(savedMovies, item.id);
      // получение ID карты в формате базы сохраненных фильмов
      const savedCardId = isCardSaved ? isCardSaved._id : null;
      return (
        <MoviesCard
          key={item.id}
          // card={{ ...item, _id: savedCardId }}
          card={{
            _id: savedCardId,
            country: item.country,
            director: item.director,
            duration: item.duration,
            year: item.year,
            description: item.description,
            trailerLink: item.trailerLink,
            nameRU: item.nameRU,
            nameEN: item.nameEN,
            movieId: item.id,
            image: `https://api.nomoreparties.co${item.image.url}`,
            thumbnail: `https://api.nomoreparties.co${item.image.formats.thumbnail.url}`}}
          onLike={onLike}
          onDelete={onDelete}
          liked={isCardSaved ? true : false}
          savedPage={savedMoviesPage}
        />)
    })
  }

  return (
    <section className='movies-list'>
      {isLoading ? (
        <Preloader />
        ) : (
          isEmptyList || isError ? (
            <p className={`movies-list__message ${isError &&
            'movies-list__message_type_err'}`}>
              {isError ? `Во время запроса произошла ошибка.
                  Возможно, проблема с соединением или сервер недоступен.
                  Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
            </p>
            ) : (
            <>
              <div className='movies-list__box'>
                {savedMoviesPage ? getSavedMoviesPage() : getInitialMoviesPage()}
              </div>
              <button
                className={`movies-list__more-btn
                ${(isEmptyList || savedMoviesPage || showCardList.length === list.length)
                && 'movies-list__more-btn_hidden'}`}
                type='button'
                onClick={handleClickMoreMovies}
                aria-label='Показать еще'
              >
                Ещё
              </button>
            </>
          )
        )}
    </section>
  );
}

export default MoviesCardList;
