import './SubstituteAll.css';

import React, { useEffect, useState } from "react";

import {
  getAllSubstitutes,
  getAllSubstitutesInserval,
} from '../../utils/TelegramApi'
import useFormAndValidation from "../../hooks/useFormAndValidation";
// import TeacherCard from "../TeacherCard/TeacherCard";

function SubstituteAll({ onDelete }) {

  const [allSubstitutes, setAllSubstitutes] = useState([])
  const [allSubstitutesInterval, setAllSubstitutesInterval] = useState([])
  const [isSubsError, setIsSubsError] = useState(false)
  // const [showSubTeachersInterval, setShowSubTeachersInterval] = useState(false)

  const {values, errors, isValid, handleChange, resetForm} = useFormAndValidation();

  useEffect(()=> {
    getAllSubstitutes()
      .then((responseData) => setAllSubstitutes(responseData))
      .catch((err)=> {
        setIsSubsError(true)
        console.log('Error in SubstituteAll - Api')
      })
  },[])

  function handleSubstitutesInteval(e) {
    e.preventDefault();
    getAllSubstitutesInserval({start: values.startInterval, end: values.endInterval})
      .then((response) => {
        console.log(response);
        setAllSubstitutesInterval(response)
      })
      .catch((err) => {
        setIsSubsError(true);
        console.log('Error in SubstituteAll ILL - Api')
      })
  }

    // обработчик для очистки полей ввода
  function handleResetClick() {
    resetForm();
    setAllSubstitutesInterval([])
  }

  function getDateShort(dateString){
    return dateString ? dateString.split('T')[0] : 'нет даты'
  }

  // console.log(allSubstitutes)
  return (
    <>
      <section className='subs-all-list'>
          {allSubstitutes.length === 0 || isSubsError ? (
              <p className={`subs-all-list__message ${isSubsError &&
              'subs-all-list__message_type_err'}`}>
                {isSubsError ? `Во время запроса произошла ошибка.
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
              </p>
              ) : (
                    <table className='subs-all-card'>
                      <caption className='subs-all-list-title'>Список Учителей на замещение, созданный сегодня</caption>
                      <thead>
                        <tr>
                          <th scope="col">Учитель на замену</th>
                          <th scope="col">Дата замены</th>
                          <th scope="col">Заболевший учитель</th>
                          <th scope="col">Комментарий</th>
                          <th scope="col">Статус</th>
                          <th scope="col">Дата согласования замены</th>
                        </tr>
                      </thead>
                      <tbody>
                      {allSubstitutes.map((item) => (
                        <tr key={item._id}>
                          <td>{item.teacherSubstitute}</td>
                          <td>{getDateShort(item?.dateSubstitute)}</td>
                          <td>{item?.teacherIll}</td>
                          <td>{item?.comment}</td>
                          <td className={`${item?.status === "Disagree" && 'subs-all-list__message_type_err'}`}>{item?.status}</td>
                          <td>{getDateShort(item.createdAt)}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
          )}
      </section>
      <section className='subs-all-list'>
        <div className='subs-interval__box'>
          <h2 className='subs__title'>{'Заполните интервал для поиска замен'}</h2>
          <form className='subs__form' onSubmit={handleSubstitutesInteval}>
            {/*==================================================*/}
            <label className='subs__label'>С даты
              <input
                value={values.startInterval || ''}
                onChange={handleChange}
                type='date'
                className='subs__input'
                name='startInterval'
                required
                id='startInterval'
              />
              <span id='startInterval-error' className='subs__error'>
                {errors.startInterval || ''}
              </span>
            </label>
            {/*===========================================================*/}
            <label className='subs__label'>По дату
              <input
                value={values.endInterval || ''}
                onChange={handleChange}
                type='date'
                className='subs__input'
                name='endInterval'
                required
                id='endInterval'
              />
              <span id='endInterval-error' className='subs__error'>
                {errors.endInterval || ''}
              </span>
            </label>
            <button
              className={`subs__btn subs__btn_type_submit app__link`}
              type='submit'
              disabled={!isValid }
            >
              Начать поиск
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
      <section className='subs-all-list'>
          {allSubstitutesInterval.length === 0 || isSubsError ? (
              <p className={`subs-all-list__message ${isSubsError &&
              'subs-all-list__message_type_err'}`}>
                {isSubsError ? `Во время запроса произошла ошибка.
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
              </p>
              ) : (
                    <table className='subs-all-card'>
                      <caption className='subs-all-list-title'>{`Список Учителей на замещение в интервале c ${values.startInterval} по ${values.endInterval}`}</caption>
                      <thead>
                        <tr>
                          <th scope="col">Учитель на замену</th>
                          <th scope="col">Дата замены</th>
                          <th scope="col">Заболевший учитель</th>
                          <th scope="col">Комментарий</th>
                          <th scope="col">Статус</th>
                          <th scope="col">Дата согласования замены</th>
                        </tr>
                      </thead>
                      <tbody>
                      {allSubstitutesInterval.map((item) => (
                        <tr key={item._id}>
                          <td>{item.teacherSubstitute}</td>
                          <td>{getDateShort(item?.dateSubstitute)}</td>
                          <td>{item?.teacherIll}</td>
                          <td>{item?.comment}</td>
                          <td className={`${(item?.status === "Disagree" || item?.status === "No data") && 'subs-all-list__message_type_err'}`}>{item?.status}</td>
                          <td>{getDateShort(item.createdAt)}</td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
          )}
      </section>
    </>
  );
}

export default SubstituteAll;