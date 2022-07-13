import React from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/auth';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: { status: { message: '' } },
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props
      .dispatchSignupUser({ email, password })
      .then(() => this.props.history.push('/'))
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className=""
      >
        <h1 className="">Sign Up</h1>
        <p className="">{this.state.errors.status.message}</p>
        <fieldset>
          <label className="" htmlFor="email">
            Email:
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className=""
            onChange={this.handleChange}
            value={this.state.email}
          />
        </fieldset>
        <fieldset>
          <label className="" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className=""
            onChange={this.handleChange}
            value={this.state.password}
          />
        </fieldset>
        <input
          className=""
          type="submit"
          value="Sign Up"
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSignupUser: (credentials) => dispatch(signupUser(credentials)),
});

export default connect(null, mapDispatchToProps)(Signup);
