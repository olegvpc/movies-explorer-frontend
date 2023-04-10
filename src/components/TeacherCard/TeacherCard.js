// import { useState } from 'react';
import './TeacherCard.css';
//
// import { saveNewMovie } from '../../utils/MainApi'

function TeacherCard({
  teacher,
  // onClick
  }) {

  function getDateShort(dateString){
    return dateString ? dateString.split('T')[0] : ''
  }


  return (
    <tr>
      <td>{teacher.lastName}</td>
      <td>{teacher.firstName}</td>
      <td>{teacher.familyName}</td>
      <td>{teacher.subject}</td>
      <td>{teacher.phone}</td>
      <td>{teacher.email}</td>
      <td>{getDateShort(teacher.birthday)}</td>
      <td>{getDateShort(teacher.dateCriminalRecord)}</td>
      <td>{teacher.education}</td>
      <td>{teacher.category}</td>
      <td>{getDateShort(teacher.dateAttestat)}</td>
      <td>{getDateShort(teacher.dateWork)}</td>
      <td>{teacher.chatId}</td>
      <td>{teacher._id}</td>
    </tr>
  );
}

export default TeacherCard;
