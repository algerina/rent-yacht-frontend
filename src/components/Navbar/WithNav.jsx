import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function WithNav() {
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <>
      <Navbar currentUser={currentUser.role} />
      <Outlet />
    </>
  );
}
export default WithNav;
