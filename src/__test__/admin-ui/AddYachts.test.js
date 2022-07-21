import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/storeSetUp';
import AddYachts from '../../components/admin-ui/AddYachts';

it ('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <AddYachts />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
} );