import {
  FETCH_YACHTS_SUCCESS, FETCH_SINGLE_YACHT_SUCCESS, DELETE_SINGLE_YACHTS_SUCCESS, ADD_YACHT_SUCCESS,
} from '../../constants';

const initialState = {
  yachts: [],
  singleYacht: [],
};
const yachtReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_YACHTS_SUCCESS:
      return {
        yachts: action.payload,
      };
    case FETCH_SINGLE_YACHT_SUCCESS:
      return {
        ...state, singleYacht: [action.payload],
      };
    case DELETE_SINGLE_YACHTS_SUCCESS:
      return {
        yachts: action.payload,
      };
    case ADD_YACHT_SUCCESS:
      return {
        yachts: [...state.yachts, action.payload],
      };
    default: return state;
  }
};
export default yachtReducer;
