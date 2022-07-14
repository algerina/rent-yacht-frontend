// import axios from 'axios';
import React, { useId } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import style from './Navbar.module.css';
import Logo from '../../assets/Yacht-logo2.svg';

function Navbar() {
  const navigate = useNavigate();
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
      path: '/reserve',
      name: 'Reserve',
    },
    {
      id: useId(),
      path: '/my-reservations',
      name: 'My reservations',
    },
    {
      id: useId(),
      path: '/add',
      name: 'Add yacht',
    },
    {
      id: useId(),
      path: '/delete',
      name: 'Delete yacht',
    },

  ];

  const handleLogout = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3001/logout', {
      method: 'delete',
      headers,
    });

    if (response.status === 200) {
      localStorage.removeItem('token');
      console.log(navigate('/login'));
    }
  };

  return (
    <aside className={style.sidebar}>
      <nav className={style.nav}>
        <img src={Logo} alt="Yacht logo" className={style.logo} />
        <ul>
          {navLinks.map(({ id, path, name }) => (
            <li key={id}>
              <NavLink to={path}>{name}</NavLink>
            </li>
          ))}
          <li>
            <button type="button" onClick={(e) => handleLogout(e)}>LOG OUT</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navbar;
