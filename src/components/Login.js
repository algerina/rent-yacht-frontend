/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/auth';
import './registeration-form.css';
import logo from '../assets/Yacht-logo.svg';

const Login = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => dispatch(loginUser(data)).catch(() => setError('Invalid credentials. Try again'));

  return (
    <main className="main">
      <div className="showcase">
        {error && <p className="">{error}</p>}
        {errors.username && <p className="">Username is required</p>}
        {errors.email && <p className="">Email is required</p>}
        {errors.password && <p className="">Password is required</p>}
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="center">
          <div className="">
            <h1 className="">Sign Up</h1>
          </div>
          <form className="form" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="inputbox">
              <input
                className=""
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
              <span>Username</span>
            </div>
            <div className="inputbox">
              <input
                className="score"
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
              <span>Password</span>
            </div>
            <div className="submit">
              <input type="submit" value="Submit" />
              <Link className="login" to="/signup">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
