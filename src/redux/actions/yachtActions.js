import axios from 'axios';
import { FETCH_YACHTS_SUCCESS, FETCH_SINGLE_YACHT_SUCCESS } from './index';

const baseURL = 'https://wishyacht-api.herokuapp.com';

const fetchYachtsSuccess = (yachts) => ({
  type: FETCH_YACHTS_SUCCESS,
  payload: yachts,
});

const fetchYachts = () => (dispatch) => {
  const request = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });
  request.get(`${baseURL}/v1/yachts`).then((response) => {
    const yachts = response.data.map((yacht) => yacht.attributes);
    dispatch(fetchYachtsSuccess(yachts));
  });
};

const fetchSingleYachtSuccess = (yacht) => ({
  type: FETCH_SINGLE_YACHT_SUCCESS,
  payload: yacht,
});

export const fetchSingleYacht = (id) => (dispatch) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token'),
  };
  axios.get(`${baseURL}/v1/yachts/${id}`, header).then((response) => {
    const yacht = response.data;
    dispatch(fetchSingleYachtSuccess(yacht));
  });
};
export default fetchYachts;
