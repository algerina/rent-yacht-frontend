import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';

function SingleReservation({
  city, cost, id, startDate, daysNumber,
}) {
  const navigate = useNavigate();

  const deleteReservation = async () => {
    const response = await fetch(`http://localhost:3001/v1/reservations/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
    });
    navigate(0);
    if (response.ok) {
      console.log('Reservation deleted');
    } else {
      console.log(response);
    }
  };

  return (
    <tr>
      <td>{id + 1}</td>
      <td>{city}</td>
      <td>{startDate}</td>
      <td>{daysNumber}</td>
      <td>{cost}</td>
      <td>
        <button onClick={deleteReservation} type="button" className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
}

SingleReservation.propTypes = {
  id: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  daysNumber: PropTypes.number.isRequired,
  cost: PropTypes.number.isRequired,
};

export default SingleReservation;
