import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getToken } from '../../redux/actions/auth';
import { cancelReservation } from '../../redux/actions/reservations';
import './single-reservations.css';

function SingleReservation({
  city, cost, id, startDate, daysNumber, yachtId,
}) {
  const [yachtName, setYachtName] = useState('');
  const [yachtDescription, setYachtDescription] = useState('');
  const [yachtImage, setYachtImage] = useState('');
  const dispatch = useDispatch();

  function addDays(originalDate, days) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
  }

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
        setYachtDescription(data.attributes.description);
        setYachtImage(data.attributes.image_url);
      }
    })();
  }, []);

  const deleteReservation = () => {
    dispatch(cancelReservation(id));
    toast.success('Reservation canceled successfully');
  };

  return (
    <div id="container">
      <div className="product-details">
        <h1>{yachtName}</h1>
        <br />
        <span className="hint-star star">
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star" aria-hidden="true" />
          <i className="fa fa-star-o" aria-hidden="true" />
        </span>
        <div className="information">
          <p className="description">{`" ${yachtDescription} "`}</p>
          <p className="price">
            Price per day: $
            {cost / daysNumber}
          </p>
          <p className="date">
            <strong>From: </strong>
            {' '}
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(startDate))}
            {' '}
            <strong>To: </strong>
            {' '}
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(addDays(startDate, daysNumber)))}
          </p>
          <p className="city">
            City:
            {' '}
            {city}
          </p>
        </div>
        <div className="control">
          <button onClick={deleteReservation} type="button" className="btn-cancel">
            <span className="price">
              $
              {cost}
            </span>
            <span className="remove">
              <i className="fa fa-trash-o" aria-hidden="true" />
            </span>
            <span className="cancel">Cancel?</span>
          </button>
        </div>
      </div>

      <div className="product-image">
        <img src={yachtImage} alt="Yacht" />
      </div>
    </div>
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
