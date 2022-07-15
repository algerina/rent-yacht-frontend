import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getReservations from '../../redux/actions/reservations';
import SingleReservation from './SingleReservation';
import './reservations-display.css';

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  return (
    <main className="main">
      <div className="background" />
      <div className="foreground">
        <table className="table table-hover">
          <thead className="text-white bg-primary">
            <tr>
              <th scope="col">Yacht Name</th>
              <th scope="col">City</th>
              <th scope="col">Start Date</th>
              <th scope="col">Days</th>
              <th scope="col">Cost</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
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
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Reservations;
