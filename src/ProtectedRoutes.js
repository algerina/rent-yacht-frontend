/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ isAllowed, redirectPath }) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return <Outlet />;
};

export default ProtectedRoutes;
