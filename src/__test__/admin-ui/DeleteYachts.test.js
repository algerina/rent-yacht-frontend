import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../redux/storeSetUp';
import DeleteYachts from '../../components/admin-ui/DeleteYachts';

it ('renders correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <Router>
        <DeleteYachts />
      </Router>
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
} );