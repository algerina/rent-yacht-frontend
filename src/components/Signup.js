/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signupUser } from '../redux/actions/auth';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onFormSubmit = (data) => {
    console.log(data);
    dispatch(signupUser(data));
    navigate('/');
  };

  return (
    <main className="">
      <div className="">
        <div className="">
          <div className="">
            <h2 className="">Sign Up</h2>
          </div>
          <form className="" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="">
              <input
                className=""
                type="text"
                placeholder="Username"
                {...register('username', { required: 'Username is required' })}
              />
            </div>
            <div className="">
              <input
                className=""
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
            </div>
            <div className="">
              <input
                className=""
                type="password"
                placeholder="Password"
                {...register('password', { required: 'Password is required' })}
              />
            </div>
            <input
              className=""
              type="submit"
              value="Sign Up"
            />
            <Link className="" to="/login">Log In</Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signup;
