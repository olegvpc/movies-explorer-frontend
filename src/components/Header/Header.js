import { useLocation } from 'react-router-dom'
import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

  const mainSite = useLocation().pathname === "/" ? true : false

  return (
    <header className={`header ${(!loggedIn || mainSite )&& "header_main"}`}>
        <Logo />
        <Navigation loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;
