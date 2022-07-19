import axios from "axios";

export const FETCH_YACHTS_SUCCESS = "FETCH_YACHTS_SUCCESS";
export const FETCH_SINGLE_YACHT_SUCCESS = "FETCH_SINGLE_YACHT_SUCCESS";

const baseURL = "http://localhost:3001";

const fetchYachtsSuccess = (yachts) => ({
  type: FETCH_YACHTS_SUCCESS,
  payload: yachts,
});

const fetchYachts = () => (dispatch) => {
  const request = axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  request.get(`${baseURL}/v1/yachts`).then((response) => {
    const yachts = response.data;
    console.log(yachts);
    dispatch(fetchYachtsSuccess(yachts));
  });
};

const fetchSingleYachtSuccess = (yacht) => ({
  type: FETCH_SINGLE_YACHT_SUCCESS,
  payload: yacht,
});

export const fetchSingleYacht = (id) => (dispatch) => {
  const header = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  };
  axios.get(`${baseURL}/v1/yachts/${id}`, header).then((response) => {
    const yacht = response.data;
    dispatch(fetchSingleYachtSuccess(yacht));
  });
};
export default fetchYachts;
