import './SchoolNavigation.css';
import { NavLink } from 'react-router-dom';
// import React, { useState } from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext';


function SchoolNavigation() {
  // const currentUser = React.useContext(CurrentUserContext);

  //---РАЗМЕТКА JSX---
  return (
    <nav className={`school_navigate`}>
        <>
          <div className={`school_navigate__box`}>
            <NavLink to='/school' activeClassName='school_navigate__film-link_active' className='school_navigate__film-link app__link'
            // onClick={handleMenuClose}
            >
              Главная страница школы
            </NavLink>
            <NavLink to='/school/substitute' activeClassName='school_navigate__film-link_active' className='school_navigate__film-link app__link'>
              Запрос на замену
            </NavLink>
            <NavLink to='/school/substitute-all' activeClassName='school_navigate__film-link_active' className='school_navigate__film-link app__link'>
              Отчет по заменам
            </NavLink>
            <NavLink to='/school/teachers' activeClassName='school_navigate__film-link_active' className='school_navigate__film-link app__link'>
              Список учителей
            </NavLink>
          </div>
        </>
    </nav>
  );
}

export default SchoolNavigation;
