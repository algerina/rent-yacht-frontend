import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/storeSetUp';
import Login from '../../components/logs/Login';

it('renders correctly', () => {
  const loggedIn = true;
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <Login loggedIn={loggedIn} />
      </Router>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
