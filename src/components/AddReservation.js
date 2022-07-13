/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getToken } from '../redux/actions/auth';

const ReservationForm = () => {
  const [error, setError] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  const onFormSubmit = async (data) => {
    const response = await fetch('http://localhost:3001/v1/reservations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        yacht_id: parseInt(id, 10),
        city: data.city,
        start_date: data.start_date,
        end_date: data.end_date,
      }),
    });

    if (response.ok) {
      navigate('/reservations');
    } else {
      setError('We could not add your reservation.');
    }
  };

  return (
    <main className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column col-8 border border-dark my-5">
        <div className="mx-5">
          <h2 className="my-5">BOOK A RESERVATION</h2>
        </div>
        {error && <p className="mx-5">{error}</p>}
        <form className="mx-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-group my-3">
            <input className="form-control form-control-lg" type="city" placeholder="City" {...register('city', { required: 'City is required' })} />
          </div>
          <div className="form group my-3">
            <input className="form-control form-control-lg" type="start_date" placeholder="Start date" {...register('start_date', { required: 'Start_date is required' })} />
          </div>
          <div className="form-group my-3">
            <input className="form-control form-control-lg" type="end_date" placeholder="End date" {...register('end_date', { required: 'End-date is required' })} />
          </div>
          <input className="btn btn-primary my-5 mx-5" type="submit" value="Add Reservation" />
          <Link className="" to="/reservations">Your Reservations</Link>
        </form>
      </div>
    </main>
  );
};

export default ReservationForm;
