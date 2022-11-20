import './Portfolio.css';
import arrow from '../../images/arrow.svg';


function Portfolio() {

  return (
    <section className='portfolio'>
    <h2 className='portfolio__title'>Портфолио</h2>
    <ul className='portfolio__projects'>
      <li className='portfolio__project'>
        <p className='portfolio__name'>Статичный сайт</p>
        <a className='portfolio__link app__link' href='http://olegvpc.github.io/how-to-learn/' target='_blank' rel='noopener noreferrer'><img className='portfolio__pic' src={arrow} alt='Ссылка на проект со статичным сайтом'/></a>
      </li>
      <li className='portfolio__project'>
        <p className='portfolio__name'>Адаптивный сайт</p>
        <a className='portfolio__link app__link' href='http://olegvpc.github.io/russian-travel' target='_blank' rel='noopener noreferrer'><img className='portfolio__pic' src={arrow} alt='Ссылка на проект с адаптивным сайтом'/></a>
      </li>
      <li className='portfolio__project'>
        <p className='portfolio__name'>Одностраничное приложение</p>
        <a className='portfolio__link app__link' href='https://github.com/olegvpc/react-mesto-api-full' target='_blank' rel='noopener noreferrer'><img className='portfolio__pic' src={arrow} alt='Ссылка на проект с одностраничным приложением'/></a>
      </li>
    </ul>
    </section>
  );
}

export default Portfolio;
