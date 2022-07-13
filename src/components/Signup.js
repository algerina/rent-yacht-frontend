/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../redux/actions/auth';
import './registeration-form.css';
import logo from '../assets/Yacht-logo.svg';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onFormSubmit = (data) => {
    dispatch(signupUser(data));
    navigate('/');
  };

  return (
    <main className="main">
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
              <input type="submit" value="Submit" />
              <Link className="login" to="/login">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
