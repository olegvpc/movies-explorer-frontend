// import { useState } from 'react';
import './MoviesCard.css';
import { getTimeWithMin } from '../../utils/utils';
import { saveNewMovie } from '../../utils/MainApi'

function MoviesCard({ card, onLike, onDelete, liked, savedPage }) {

    //обработчик клика по кнопке лайка
  function handleLikeClick(movie) {
    const {_id, ...saveCard} = movie // убираем лишний параметр
    onLike(saveCard);
  }

  //обработчик клика по кнопке удаления/дизлайка
  function handleDeleteClick(movie) {
    onDelete(movie);
  }

  return (
    <article className='movie'>
      <div className='movie__header'>
        <div className='movie__info'>
          <h2 className='movie__title'>{card.nameRU}</h2>
          <p className='movie__duration'>{getTimeWithMin(card.duration)}</p>
        </div>
          <button
          className={`movie__btn
          ${savedPage ? 'movie__delete-btn' : 'movie__save-btn'}
          ${liked && !savedPage ? 'movie__save-btn_active' : ''}`}
          type='button'
          aria-label='Сохранить в избранное'
          // убрать call-back позже - тестирование
          onClick={savedPage || liked ? () => handleDeleteClick(card) : () => handleLikeClick(card)}
        />
      </div>
      <a className='movie__link' href={card.trailer || card.trailerLink} target='_blank' rel='noreferrer'>
        <img className='movie__pic' src={card.image} alt='Фильм'/>
      </a>
    </article>
  );
}

export default MoviesCard;
