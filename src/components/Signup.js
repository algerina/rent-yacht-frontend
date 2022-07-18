/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signupUser } from '../redux/actions/auth';
import './registeration-form.css';
import logo from '../assets/Yacht-logo.svg';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signUpError, setSignUpError] = useState([]);

  const notifyError = (error) => toast.error(error, {
    position: 'top-right',
    autoClose: 15000,
    pauseOnHover: true,
    draggable: true,
  });

  const onFormSubmit = (data) => {
    if (data.password.length >= 6) {
      dispatch(signupUser(data)).then(navigate('/')).catch((err) => notifyError(err.error));
    } else {
      notifyError('Password must be at least 6 characters long');
    }
  };

  const isEmpty = Object.keys(errors).length === 0;

  const updateErrors = () => {
    const newErrors = [];
    handleSubmit(onFormSubmit);
    if (!isEmpty) {
      Object.entries(errors).forEach(([key, value]) => {
        newErrors.push([key, value.message]);
      });
      setSignUpError(newErrors);
    }
  };

  useEffect(() => {
    if (signUpError.length !== 0) {
      console.log(signUpError);
      signUpError.forEach((error) => notifyError(error[1]));
    }
  }, [signUpError]);

  return (
    <div className="main">
      <div className="effect" />
      <div className="showcase">
        <div className="logo"><img src={logo} alt="logo" /></div>
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
                className="name"
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              <span>Email</span>
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
              <input type="submit" value="Submit" onClick={() => updateErrors()} />
              <Link className="login" to="/login">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
