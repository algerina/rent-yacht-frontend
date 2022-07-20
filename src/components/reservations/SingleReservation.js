import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from '../../redux/actions/auth';
import { cancelReservation } from '../../redux/actions/reservations';

function SingleReservation({ city, cost, id, startDate, daysNumber, yachtId }) {
  const navigate = useNavigate();
  const [yachtName, setYachtName] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://wishyacht-api.herokuapp.com/v1/yachts/${yachtId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setYachtName(data.attributes.name);
      }
    })();
  }, []);

  const deleteReservation = () => {
    dispatch(cancelReservation(id));
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
