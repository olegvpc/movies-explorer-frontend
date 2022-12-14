import './Promo.css';
import logoPromo from '../../images/logo-promo.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__logo" src={logoPromo} alt="Логотип для Промо" />
    </section>
  );
}

export default Promo;
