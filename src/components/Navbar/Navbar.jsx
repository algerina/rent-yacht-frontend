import React, { useId, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './Navbar.module.css';
import Logo from '../../assets/Yacht-logo2.svg';
import HamburgerMenu from '../../assets/menu.svg';
import CloseMenu from '../../assets/close.svg';

function Navbar({ currentUser }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  };

  const navLinks = [
    {
      id: useId(),
      path: '/',
      name: 'Yachts',
    },
    {
      id: useId(),
      path: '/reservations',
      name: 'My reservations',
    },
  ];

  const adminLinks = [{
    id: useId(),
    path: '/add',
    name: 'Add yacht',
  },
  {
    id: useId(),
    path: '/delete',
    name: 'Delete yacht',
  }];

  const isAdmin = () => {
    if (currentUser === 'admin') {
      return true;
    }
    return false;
  };

  const openMenu = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:3001/logout', {
      method: 'delete',
      headers,
    });
    if (response.status === 200) {
      localStorage.removeItem('token');
      navigate('/login');
      navigate(0);
    }
  };

  return (
    <>
      <div className={style.hamburgerMenu}>
        <button className={style.hamburgerButton} onClick={(e) => openMenu(e)} type="button" id="menu-options">
          <img className={style.hamburgerImage} src={isOpen ? CloseMenu : HamburgerMenu} alt="logo" />
        </button>
      </div>
      <aside className={isOpen ? `${style.open} ${style.sidebar}` : `${style.sidebar}`}>
        <nav className={style.nav}>
          <img src={Logo} alt="Yacht logo" className={style.logo} />
          <ul>
            {navLinks.map(({ id, path, name }) => (
              <li key={id}>
                <NavLink to={path} onClick={() => setIsOpen(false)}>{name}</NavLink>
              </li>
            ))}
            {isAdmin()
              ? adminLinks.map(({ id, path, name }) => (
                <li key={id}>
                  <NavLink to={path} onClick={() => setIsOpen(false)}>{name}</NavLink>
                </li>
              ))
              : null}
            <li>
              <button className={style.logoutButton} type="button" onClick={() => handleLogout()}>LOG OUT</button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Navbar;

Navbar.defaultProps = {
  currentUser: 'user',
};

Navbar.propTypes = {
  currentUser: PropTypes.string,
};
