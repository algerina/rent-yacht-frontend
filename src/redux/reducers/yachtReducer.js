import {
  FETCH_YACHTS_SUCCESS,
  FETCH_SINGLE_YACHT_SUCCESS,
} from '../actions/yachtActions';

const initialState = {
  yachts: [],
  singleYacht: [],
};

const yachtReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_YACHTS_SUCCESS:
      return {
        yachts: [...action.payload],
      };
    case FETCH_SINGLE_YACHT_SUCCESS:
      return {
        ...state, singleYacht: [action.payload],
      };
    default: return state;
  }
};

export default yachtReducer;