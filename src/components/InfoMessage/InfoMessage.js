import './InfoMessage.css';
import React from 'react';
import { SUCCESSFUL_CODE } from '../../utils/constants';


function InfoMessage({isShown, message, code, type}) {

  const [textMessage, setTextMessage] = React.useState('');
  // console.log(message, code)

  function getMessage(type) {
    if (type === 'profile') {
      return 'При обновлении профиля произошла ошибка'
    } else if(type === 'register'){
      return 'При регистрации пользователя произошла ошибка'
    } else if(type === 'login'){
      return 'Вы ввели неправильный логин или пароль'
    }
  };

  React.useEffect(() => {
    console.log(message, code)
    if (code === SUCCESSFUL_CODE) {
     setTextMessage('Данные успешно обновлены')
    } else {
      message ? setTextMessage(message) : setTextMessage(getMessage(type))
    }
    // switch (code) {
    //   case SUCCESSFUL_CODE:
    //     setTextMessage('Данные успешно обновлены');
    //     break;
    //   case !SUCCESSFUL_CODE:
    //     setTextMessage(getMessage(type));
    //     break;
    //   default:
    //     setTextMessage(message);
    // }
  }, [code, message, type]);

  return (
    <div className='message'>
      {isShown && (
        <p className={`message__text ${code === SUCCESSFUL_CODE && 'message__text_type_success'}`}>
          {textMessage}
        </p>
      )}
    </div>
  );
}

export default InfoMessage;
