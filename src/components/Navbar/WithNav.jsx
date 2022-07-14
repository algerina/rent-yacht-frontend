import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function WithNav() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default WithNav;
