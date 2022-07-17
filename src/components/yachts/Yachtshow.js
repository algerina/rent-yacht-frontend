import React, { useEffect, useState } from "react";
import axios from "axios";
import "./yacht.css";
import wheel from '../../assets/colorWheel.JPG';
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { fetchSingleYacht } from "../../redux/actions/yachtActions";

const Yachtshow = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const id = params.yacht_id;
  const [yacht, setYacht] = useState({});

  useEffect(() => {
    const header = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };
    axios
      .get(`http://localhost:3001/v1/yachts/${id}`, header)
      .then((response) => {
        const yacht = response.data;
        setYacht(yacht);
      });
  }, []);



  const url =
    "https://images.pexels.com/photos/427726/pexels-photo-427726.jpeg";

  if (yacht) {
    return (
      <div style={{ margin: `50px`, display: `flex`, justifyContent: `center` }}>
        <div className="e-card e-card-horizontal">
        <img className="showtimg" src={url} alt="Slide one" style={{ height: `180px` }} />
        <div className="e-card-stacked">
        <div className="e-card-header">{yacht.name}</div>
        <div className="e-card-header-caption">{yacht.description}</div>
        <div className="e-card-header-title">Price: {yacht.price}</div>
        <img  src={wheel} alt="colors" className="wheel" />
        <button className="btn cardbutton e-card" variant="success" type="button" size="lg">
              <Link to={"/reserve/" + yacht.id} className="reserve" id={yacht.id}>
                {" "}
                Reserve
              </Link>
            </button>
            </div> 
        </div> 
      </div>
    );
  }
};


export default Yachtshow;
