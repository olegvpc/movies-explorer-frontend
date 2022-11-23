import './AboutMe.css';
import photo from '../../images/photo-oleg.png';


function AboutMe() {

  return (
    <section className='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <article className='about-me__info-box'>
        <div className='about-me__text-box'>
            <h3 className='about-me__name'>Олег</h3>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 44 года</p>
            <p className='about-me__text'>Я родился в Украине, живу в Москве. Имею высшее образование по специальности Автоматизированные системы управления. В прошлом - руководитель подразделений продаж в компаниях Билайн, Ростелеком, МТС, сейчас - начинающий frontend разработчик. Недавно я принял решение, изменить свою жизнь и сменить профессию. Область программирования, привлекла меня необходимостью постоянного обучения и выполнения современных задач, напрямую влияющих на качество жизни людей. Теперь, после окончания курсов по языку Python и JS, я хочу приносить пользу, получать опыт и знания на реальных проектах.
            </p>
          <ul className='about-me__contacts'>
            <li className='about-me__contact'>
              <a className='about-me__link app__link' href='https://github.com/olegvpc' target='_blank' rel='noopener noreferrer'>Github</a>
            </li>
          </ul>
        </div>
        <div className='about-me__photo-box'>
          <img className='about-me__photo' src={photo} alt='Фото студента' />
        </div>
      </article>
    </section>
  );
}

export default AboutMe;
