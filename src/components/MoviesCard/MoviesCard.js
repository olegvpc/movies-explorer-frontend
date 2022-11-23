import { useState } from 'react';
import './MoviesCard.css';
import { getTimeWithMin } from '../../utils/getTimeWithMinutes';

function MoviesCard({ card, savedPages }) {
  const [isLiked, setIsLiked ] = useState(false)
  // console.log(savedPages)
  function handleLike () {
    setIsLiked(!isLiked)
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
          ${savedPages ? 'movie__delete-btn' : 'movie__save-btn'}
          ${isLiked && !savedPages ? 'movie__save-btn_active' : ''}`}
          type='button'
          aria-label='Сохранить в избранное'
          onClick={() => handleLike()}
        />
      </div>
      <a className='movie__link' href={card.trailer || card.trailerLink} target='_blank' rel='noreferrer'>
        <img className='movie__pic' src={`https://api.nomoreparties.co/${card.image.url}`} alt='Фильм'/>
      </a>
    </article>
  );
}

export default MoviesCard;
