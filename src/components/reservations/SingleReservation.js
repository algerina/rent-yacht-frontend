import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../redux/actions/auth';

function SingleReservation({
  city, cost, id, startDate, daysNumber, yachtId,
}) {
  const navigate = useNavigate();
  const [yachtName, setYachtName] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:3001/v1/yachts/${yachtId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setYachtName(data.name);
      }
    })();
  }, []);

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
      navigate('/reservations');
    }
  };

  return (
    <tr>
      <td>{yachtName}</td>
      <td>{city}</td>
      <td>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(startDate))}
      </td>
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
  yachtId: PropTypes.number.isRequired,
};

export default SingleReservation;
