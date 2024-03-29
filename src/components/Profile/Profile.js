import './Profile.css';
import React, { useEffect } from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormAndValidation from '../../hooks/useFormAndValidation';
import InfoMessage from '../InfoMessage/InfoMessage';
import { SUCCESSFUL_CODE } from '../../utils/constants';

function Profile({ onSignOut, onUpdate, infoMessage, setInfoMessage }) {

  const currentUser = React.useContext(CurrentUserContext);
  const {values, errors, isValid, handleChange, setValues, setIsValid} = useFormAndValidation();
  const [isInputActive, setIsInputActive] = React.useState(false);

  // получаем текущие значения для установки в поля формы
  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name,
        email: currentUser.email,
      });
    }
  }, [setValues, currentUser]);

  // блокируем кнопку отправки формы если значения в полях и контексте одинаковые
  React.useEffect(() => {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsValid(false);
    }
  }, [setIsValid, values, currentUser]);

  // блокируем поля если редактирование прошло успешно
  React.useEffect(() => {
    if (infoMessage.isShown && infoMessage.code === SUCCESSFUL_CODE) {
      setIsInputActive(false);
    }
  }, [setIsInputActive, infoMessage.isShown, infoMessage.code]);

  // убираем показ блока InfoMessage через 5 сек
  useEffect(() => {
    // console.count("PROFILE CHANGED")
    setTimeout(() => setInfoMessage({...infoMessage, isShown: false}), 5000)
    // eslint-disable-next-line
  }, [infoMessage.isShown])

  // обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values.name, values.email);
  }

  // обработчик для разблокирования полей ввода
  function handleRedactClick() {
    setIsInputActive(true);
  }
  // console.log(currentUser)
  return (
    <section className='profile'>
      <div className='profile__box'>
        <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
        <form className='profile__form' onSubmit={handleSubmit}>
          <label className='profile__label'>Имя
            <input
              value={values.name || ''}
              onChange={handleChange}
              type='text'
              className='profile__input'
              name='name'
              minLength='2'
              maxLength='30'
              required
              title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
              pattern='^[A-Za-zА-Яа-яЁё /s -]+$'
              id='name'
              disabled={!isInputActive}
            />
            <span id="name-error" className='profile__error'>
              {errors.name ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
            </span>
          </label>
          <label className='profile__label'>Email
            <input
              value={values.email || ''}
              onChange={handleChange}
              type='email'
              className='profile__input'
              name='email'
              minLength='2'
              maxLength='30'
              required
              id='email'
              disabled={!isInputActive}
            />
            <span id='email-error' className='profile__error'>
              {errors.email || ''}
            </span>
          </label>

          <InfoMessage {...infoMessage} />

          {isInputActive ? (
            <button
              className={`profile__btn profile__btn_type_submit app__link`}
              type='submit'
              disabled={!isValid }
            >
              Сохранить
            </button>
          ) : (
            <>
            <button
              className={`profile__btn profile__btn_type_redact app__link`}
              type='button'
              onClick={handleRedactClick}
            >
              Редактировать
            </button>
            <button
              className='profile__btn profile__btn_type_logout app__link'
              type='button'
              onClick={onSignOut}
            >
              Выйти из аккаунта
            </button>
            </>
          )}

        </form>
      </div>

    </section>
  );
}

export default Profile;