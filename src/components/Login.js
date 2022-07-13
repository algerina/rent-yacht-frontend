/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  return (
    <main className="">
      <div className="">
        <div className="">
          <div className="">
            <h2 className="">LOG IN</h2>
          </div>
          <form
            className=""
            onSubmit={handleSubmit((data) => console.log(data))}
          >
            <div className="">
              {errors.email && <p>Email is required</p>}
              <input className="" type="text" placeholder="Email" {...register('email', { required: true })} />
            </div>
            <div className="w-full">
              {errors.password && <p>Password is required</p>}
              <input className="" type="password" placeholder="Password" {...register('password', { required: true })} />
            </div>
            <input className="" type="submit" value="Log In" />
            <Link className="" to="/signup">Sign Up</Link>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
