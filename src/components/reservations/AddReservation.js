/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getToken } from '../../redux/actions/auth';
import './reservation-form.css';
import 'react-toastify/dist/ReactToastify.css';

const ReservationForm = () => {
  const [yachtName, setYachtName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://wishyacht-api.herokuapp.com/v1/yachts/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getToken(),
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setYachtName(data.attributes.name);
      }
    })();
  }, []);

  const onFormSubmit = async (data) => {
    const response = await fetch('https://wishyacht-api.herokuapp.com/v1/reservations', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken(),
      },
      body: JSON.stringify({
        reservation: {
          yacht_id: parseInt(id, 10),
          city: data.city,
          start_date: data.start_date,
          days_number: data.days_number.split(' ')[0],
        },
      }),
    });

    if (response.ok) {
      navigate('/reservations');
      toast.success('Reservation added successfully');
    } else {
      toast.error('Dates preceding today cannot be reserved.');
    }
  };

  return (
    <main className="main-2">
      <div className="effect-2" />
      <div className="showcase-2">
        <div className="mx-5">
          <h2 className="my-5 head-form">BOOK A RESERVATION</h2>
        </div>
        <form className="mx-5" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="form-group d-flex gap-3 flex-wrap">
            <label htmlFor="username">
              Username
              <input className="form-control form-control-lg" type="username" value={currentUser.username} disabled />
            </label>
            <label htmlFor="yacht">
              Yacht
              <input className="form-control form-control-lg" type="yacht" value={yachtName} disabled />
            </label>
          </div>
          <div className="d-flex justify-content-between mt-3 flex-wrap">
            <div className="box">
              <input
                type="date"
                name="Select a date"
                {...register('start_date', { required: 'Start_date is required' })}
              />
            </div>
            <div className="box">
              <select {...register('city', { required: 'Start_date is required' })}>
                <option selected="true" disabled="disabled" label="Port of departure?" />
                <option>Rotterdam</option>
                <option>Buenos Aires</option>
                <option>Los Angeles</option>
                <option>Alexandria</option>
                <option>Lisbon</option>
                <option>Shanghai</option>
              </select>
            </div>
            <div className="box">
              <select {...register('days_number', { required: 'days_number is required' })}>
                <option selected="true" disabled="disabled" label="How many days?" />
                <option>1 day</option>
                <option>2 days</option>
                <option>3 days</option>
                <option>4 days</option>
                <option>5 days</option>
                <option>6 days</option>
                <option>7 days</option>
              </select>
            </div>
          </div>
          <div className="action d-flex justify-content-center gap-3 my-3 flex-wrap">
            <input className="reserve" type="submit" value="Add Reservation" />
            <Link className="my-reserve" to="/reservations">
              Your Reservations
            </Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </main>
  );
};

export default ReservationForm;
