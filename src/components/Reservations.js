import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getReservations from '../redux/actions/reservations';

const Reservations = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

  const reservations = useSelector((state) => state.reservations);

  return (
    <table className="table table-hover">
      <thead className="text-white bg-dark text-center">
        <tr>
          <th scope="col">#</th>
          <th scope="col">City</th>
          <th scope="col">Start date</th>
          <th scope="col">Number of days</th>
          <th scope="col">Cost</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation, id) => (
          <tr key={id}>
            <td>{id + 1}</td>
            <td>{reservation.city}</td>
            <td>{reservation.start_date}</td>
            <td>{reservation.days_number}</td>
            <td>{reservation.cost}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Reservations;
