import React from 'react';
import { Outlet } from 'react-router-dom';

function WithoutNav() {
  return (
    <Outlet />
  );
}

export default WithoutNav;
