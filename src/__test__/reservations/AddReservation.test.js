import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/storeSetUp';
import AddReservation from '../../components/reservations/AddReservation';

it('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <AddReservation />
      </Router>
    </Provider>,
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
