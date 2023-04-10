import './Substitute.css';
import { useState } from 'react'

import useFormAndValidation from '../../hooks/useFormAndValidation';

import { saveSubstitute } from '../../utils/TelegramApi'



function Substitute({ allTeachers, onSignOut, onUpdate, infoMessage, setInfoMessage}) {
  const [substitute, setSubstitute] = useState([])
  // const currentUser = React.useContext(CurrentUserContext);
  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();
  // const [isInputActive, setIsInputActive] = useState(false);


  // обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(values.dateSubstutute, typeof values.dateSubstutute) // 2023-04-11 string
    const dateSubs = new Date(values.dateSubstitute)
    const [lastNameSubs, firstNameSubs, familyNameSubs] = values.teacherSubstitute.split(' ')
    const subsTeacher = allTeachers.find((item) => item.lastName === lastNameSubs && item.firstName === firstNameSubs)
    const [lastNameIll, firstNameIll, familyNameIll] = values.teacherIll.split(' ')
    // console.log(lastName, firstName, familyName, user.chatId)
    // console.log(dateSubs, typeof dateSubs) //  Mon Apr 10 2023 07:00:00 GMT+0700 (Индокитай) 'object'
    saveSubstitute({
      teacherSubstitute: values.teacherSubstitute,
      dateSubstitute: dateSubs,
      chatId: subsTeacher.chatId,
      teacherIll: `${lastNameIll} ${firstNameIll}`,
      comment: values.comment,
    })
      .then((result) => {
        setSubstitute((prev)=> [...prev, result])
        // console.log(result) // {teacherSubstitute: 'oleg', status: 'No data', dateSubstitute: '2023-04-10T00:00:00.000Z',
        // _id: '6431081b30051f39105a42d8', createdAt: '2023-04-08T06:22:19.413Z'}
      })
      .then(() => console.log(substitute))
      .catch((err) => console.log(err))
  }

  // обработчик для очистки полей ввода
  function handleResetClick() {
    resetForm();
  }
  function getDateShort(dateString){
    return dateString ? dateString.split('T')[0] : ''
  }

  return (
    <>
      <section className='subs'>
        <div className='subs__box'>
          <h2 className='subs__title'>{'Заполните поля для замены'}</h2>
          <form className='subs__form' onSubmit={handleSubmit}>
            {/*==================================================*/}
            <label className='subs__label'>Учитель на замену
              <input
                value={values.teacherSubstitute || ''}
                onChange={handleChange}
                type='text'
                className='subs__input'
                name='teacherSubstitute'
                minLength='2'
                maxLength='50'
                autoComplete="off"
                list="teachersName"
                required
                title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
                id='teacherSubstitute'
              />
              <span id="teacherSubstitute-error" className='subs__error'>
                {errors.teacherSubstitute ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
              </span>
            </label>

            <datalist id='teachersName'>
              {allTeachers.length !== 0 ? (
                allTeachers.map((item) => (
                  <option key={item._id}>
                    {`${item.lastName} ${item.firstName} ${item.familyName}`}
                  </option>
                ))
              ) : (
                <option>Список пустой</option>
              )}
            </datalist>
            {/*===========================================================*/}
            <label className='subs__label'>Дата замены
              <input
                value={values.dateSubstitute || ''}
                onChange={handleChange}
                type='date'
                className='subs__input'
                name='dateSubstitute'
                required
                id='dateSubstitute'
              />
              <span id='dateSubstitute-error' className='subs__error'>
                {errors.dateSubstitute || ''}
              </span>
            </label>
            {/*============================================================*/}
            <label className='subs__label'>Заболевший учитель
              <input
                value={values.teacherIll || ''}
                onChange={handleChange}
                type='text'
                className='subs__input'
                name='teacherIll'
                minLength='2'
                maxLength='50'
                autoComplete="off"
                list="teachersNameIll"
                required
                title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
                id='teacherIll'
              />
              <span id="teacherSubstitute-error" className='subs__error'>
                {errors.teacherIll ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
              </span>
            </label>

            <datalist id='teachersNameIll'>
              {allTeachers.length !== 0 ? (
                allTeachers.map((item) => (
                  <option key={item._id}>
                    {`${item.lastName} ${item.firstName} ${item.familyName}`}
                  </option>
                ))
              ) : (
                <option>Список пустой</option>
              )}
            </datalist>
            {/*==================================================================*/}
            <label className='subs__label'>Комментарий
              <input
                value={values.comment || 'урок__, предмет __'}
                onChange={handleChange}
                type='text'
                className='subs__input'
                name='comment'
                minLength='2'
                maxLength='50'
                autoComplete="off"
                required
                title='Разрешено использовать латиницу, кириллицу, пробел или дефис'
                id='comment'
              />
              <span id="comment-error" className='subs__error'>
                {errors.comment ? 'Поле должно быть заполнено и может содержать только латиницу, кириллицу, пробел или дефис' : ''}
              </span>
            </label>
            {/*==============================================================*/}
            <button
              className={`subs__btn subs__btn_type_submit app__link`}
              type='submit'
              disabled={!isValid }
            >
              Отправить сообщение
            </button>
            <button
              className={`subs__btn subs__btn_type_redact app__link`}
              type='button'
              onClick={handleResetClick}
            >
              Очистить форму
            </button>

          </form>
        </div>
      </section>

      <section className='subs__list-box'>
            {/*Отрисовка всех замен*/}
        {substitute.length !== 0 ? (
          <div className='subs-list'>

          <table className='cubs-card'>
            <caption className='subs-list-title'>Созданные замены</caption>
            <thead>
              <tr>
                <th scope="col">Фамилия</th>
                <th scope="col">Дата замены</th>
                {/*<th scope="col">Подтверждение</th>*/}
                <th scope="col">Дата информирования</th>
                <th scope="col">Заболевший Учитель</th>
                <th scope="col">Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {substitute.length !== 0 ? substitute.map((item) => (
                <tr key={item._id}>
                  <td>{item.teacherSubstitute}</td>
                  <td>{getDateShort(item.dateSubstitute)}</td>
                  {/*<td>{item.status}</td>*/}
                  <td>{getDateShort(item.createdAt)}</td>
                  <td>{getDateShort(item.teacherIll)}</td>
                  <td>{getDateShort(item.comment)}</td>
                </tr>
              )) : ""}
            </tbody>
          </table>
         </div>
        ) : (
          "еще нет данных со списком на замену "
        )}
      </section>
    </>

  );
}


export default Substitute;
