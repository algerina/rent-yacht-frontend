import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './ProtectedRoutes';
import useAuth from './hooks/useAuth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const Signup = React.lazy(() => import('./components/logs/Signup'));
const Login = React.lazy(() => import('./components/logs/Login'));
const WithNav = React.lazy(() => import('./components/Navbar/WithNav'));
const WithoutNav = React.lazy(() => import('./components/Navbar/WithoutNav'));
const AddYachts = React.lazy(() => import('./components/admin-ui/AddYachts'));
const DeleteYachts = React.lazy(() => import('./components/admin-ui/DeleteYachts'));
const AddReservation = React.lazy(() => import('./components/reservations/AddReservation'));
const Reservations = React.lazy(() => import('./components/reservations/Reservations'));
const Yacht = React.lazy(() => import('./components/yachts/Yacht'));
const Yachtshow = React.lazy(() => import('./components/yachts/Yachtshow'));

function App() {
  const { authChecked, loggedIn } = useAuth();

  return (
    <React.Suspense
      fallback={(
        <Spinner
          animation="grow"
          variant="primary"
          style={{
            width: '4rem',
            height: '4rem',
            position: 'absolute',
            top: '0',
            bottom: '0',
            right: '0',
            left: '0',
            margin: 'auto auto',
          }}
        />
      )}
    >
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route path="/login" element={<Login loggedIn={loggedIn} />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route element={<WithNav />}>
            <Route element={<ProtectedRoutes isAllowed={loggedIn} authChecked={authChecked} redirectPath="/login" />}>
              <Route path="/add" element={<AddYachts />} />
              <Route path="/delete" element={<DeleteYachts />} />
              <Route path="/reserve/:id" element={<AddReservation />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/yacht/:yacht_id" element={<Yachtshow />} />
              <Route path="/" element={<Yacht />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </React.Suspense>
  );
}

export default App;
