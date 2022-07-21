import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import getReservations from '../../redux/actions/reservations';
import SingleReservation from './SingleReservation';
import 'react-toastify/dist/ReactToastify.css';
import './reservations-display.css';

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  if (reservations.length === 0) {
    return (
      <main className="main">
        <div className="cards">
          <div className="alert alert-danger" role="alert">
            No reservation found, you can add a reservation from the
            {' '}
            <Link to="/" class="alert-link">
              Home page
            </Link>
            {' '}
            by opening a specific yacht page
          </div>
        </div>
        <ToastContainer />
      </main>
    );
  }

  return (
    <main className="main">
      <div className="cards">
        {reservations.map((reservation) => (
          <SingleReservation
            key={reservation.id}
            id={reservation.id}
            city={reservation.city}
            startDate={reservation.start_date}
            daysNumber={reservation.days_number}
            cost={reservation.cost}
            yachtId={reservation.yacht_id}
          />
        ))}
      </div>
      <ToastContainer />
    </main>
  );
};

export default Reservations;
