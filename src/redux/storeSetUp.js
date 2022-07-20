import {
  combineReducers, createStore, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import yachtReducer from './reducers/yachtReducer';
import reservationsReducer from './reducers/reservations';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  yacht: yachtReducer,
  reservations: reservationsReducer,
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
