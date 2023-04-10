import './School.css';
// import Logo from '../Logo/Logo';
import { useState, useEffect } from 'react'
import SchoolNavigation from "../SchoolHeader/SchoolNavigation";
import {getAllTeachers} from "../../utils/TeachersApi";
import Preloader from "../Preloader/Preloader";

function School({ setAllTeachers, setIsTeachersError }) {

  const [isTeachersLoading, setIsTeachersLoading] = useState(false);


   useEffect(() =>{
    setIsTeachersLoading(true)
    getAllTeachers()
      .then((teachers) => {
         //console.log(teachers)  // {_id: '642cf465284bac9430e8ed8e', lastName: 'Sugasvilli', firstName: 'Oleg', fa...}
        return setAllTeachers(teachers)
      })
      .catch((err) => {
        setIsTeachersError(true);
        console.log(err);
      })
      .finally(() => setIsTeachersLoading(false))
  },[])

  return (
    <>
      {isTeachersLoading ? (<Preloader />) : (
        <section
        className={`school_navigate header_main`}
        >
          {/*<Logo />*/}
          <SchoolNavigation />
        </section>
        )
      }
    </>


  );
}

export default School;
