/* eslint-disable react/jsx-props-no-spreading */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions/auth';

const Login = ({ loggedIn }) => {
  if (loggedIn) return <Navigate to="/" replace />;

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFormSubmit = (data) => dispatch(loginUser(data)).catch(() => setError('Invalid credentials. Try again'));

  return (
    <main className="">
      <div className="">
        <div className="">
          <h2 className="">LOG IN</h2>
        </div>
        {error && <p className="">{error}</p>}
        {errors.username && <p className="">Username is required</p>}
        {errors.email && <p className="">Email is required</p>}
        {errors.password && <p className="">Password is required</p>}
        <form className="" onSubmit={handleSubmit(onFormSubmit)}>
          <div className="">
            <input className="" type="username" placeholder="Username" {...register('username', { required: 'Username is required' })} />
          </div>
          <div className="">
            <input className="" type="password" placeholder="Password" {...register('password', { required: 'Password is required' })} />
          </div>
          <input className="" type="submit" value="Log In" />
          <Link className="" to="/signup">Sign Up</Link>
        </form>
      </div>
    </main>
  );
};

Login.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Login;
