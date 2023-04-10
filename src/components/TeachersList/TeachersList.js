import './TeachersList.css';

import React from 'react'
import TeacherCard from "../TeacherCard/TeacherCard";

function TeachersList({
  allTeachers,
  isTeachersError,
  }) {

  // console.log(allTeachers)

  return (
      <section className='teachers-list'>
          {allTeachers.length === 0 || isTeachersError ? (
              <p className={`teachers-list__message ${isTeachersError &&
              'teachers-list__message_type_err'}`}>
                {isTeachersError ? `Во время запроса произошла ошибка.
                    Возможно, проблема с соединением или сервер недоступен.
                    Подождите немного и попробуйте ещё раз.` : 'Ничего не найдено'}
              </p>
              ) : (
                    <table className='teacher-card'>
                      <caption className='teachers-list-title'>Список Учителей</caption>
                      <thead>
                          <tr>
                              <th scope="col">Фамилия</th>
                              <th scope="col">Имя</th>
                              <th scope="col">Отчество</th>
                              <th scope="col">Должность</th>
                              <th scope="col">Телефон</th>
                              <th scope="col">E-mail</th>
                              <th scope="col">Дата рождения</th>
                              <th scope="col">Справка о несудимости</th>
                              <th scope="col">Образование</th>
                              <th scope="col">Категория</th>
                              <th scope="col">Дата аттестации</th>
                              <th scope="col">Дата приема на работу</th>
                              <th scope="col">ChatId</th>

                          </tr>
                      </thead>
                      <tbody>
                        {allTeachers ? allTeachers.map((item) => (
                          <TeacherCard
                            key={item._id}
                            teacher={item}
                            // onClick={onClick}
                          />
                        )) : "нет данных со списком учителей "}

                      </tbody>
                    </table>
          )}
      </section>
  );
}

export default TeachersList;
