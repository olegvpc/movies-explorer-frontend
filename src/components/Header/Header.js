import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn }) {

  return (
    <header className={`header ${!loggedIn && "header_main"}`}>
        <Logo />
        <Navigation loggedIn={loggedIn}/>
    </header>
  );
}

export default Header;
