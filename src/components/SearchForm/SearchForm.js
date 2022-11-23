import './SearchForm.css';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import findMovie from '../../images/find-movie.svg'


function SearchForm({ onSearchClick, savedMoviesPage, shortFilms, onCheckbox }) {

  const {values, errors, isValid, handleChange} = useFormAndValidation();


  return (
    <div className='search-form'>
      <form className='search-form__form' onSubmit={() => console.log("handleSubmit")}>
        <input
          type='text'
          placeholder='Фильм'
          className='search-form__input'
          name='query'
          value={values.query || ''}
          onChange={handleChange}
          required
        />
        <span id='email-error' className='search-form__error'>
          {errors.query ? 'Нужно ввести ключевое слово' : ''}
        </span>
        <button
          className='search-form__btn app__link'
          type='submit'
          disabled={!isValid}
        >
        <img className='search-form__btn_icon' src={findMovie} alt="иконка поиска фильма" />
        </button>
        <div className='search-form__filter-box'>
          <p className='search-form__filter-name'>Короткометражки</p>
          <label className={`search-form__filter
            ${shortFilms === 'on' ? 'search-form__filter_active' : ''}`
          }>
            <input className='search-form__radio'
              type='radio'
              name='shortFilms'
              value='off'
              checked={shortFilms === 'off' ? true : false}
              onChange={onCheckbox}
            />
            <input className='search-form__radio'
              type='radio'
              name='shortFilms'
              value='on'
              checked={shortFilms === 'on' ? true : false}
              onChange={onCheckbox}
            />
            <span className='search-form__switch'></span>
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
