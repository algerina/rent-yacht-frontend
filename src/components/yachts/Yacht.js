import React, { useEffect } from "react";
import "./yacht.css";
import Button from "react-bootstrap/Button";
import logo from "../../assets/Yacht club logo vintage anchor sea logotype opaque.svg";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import fetchYachts, {
  fetchSingleYacht,
} from "../../redux/actions/yachtActions";

const Yacht = () => {
  const dispatch = useDispatch();
  const yacht = useSelector((state) => state.yacht);
  const { yachts } = yacht;

  const handleClick = (event) => {
    const { id } = event.target;
    dispatch(fetchSingleYacht(id));
  };

  useEffect(() => {
    dispatch(fetchYachts());
  }, []);

  const url =
    "https://images.pexels.com/photos/427726/pexels-photo-427726.jpeg";

  return (
    <Carousel className="yachtMargin">
      <h2 className="header">Yachts for charter</h2>
      <p>Your great escape tailored by WHISHYACHT</p>
      {yachts.map((yat) => (
        <Carousel.Item interval={2000} key={yat.id} className="main maincaro">
          <img className="yachtimg" src={url} alt="Slide one" />
          <Carousel.Caption className="caption">
            <h2 className=" text-secondary">Name: {yat.name}</h2>
            <h3 className="carde text-secondary">
              Description: {yat.description}
            </h3>
            <span className="icons text-secondary">
              <AiFillTwitterCircle />
              <AiOutlineInstagram />
              <BsFacebook />
            </span>
            <button
              className="btn"
              variant="success"
              type="button"
              size="lg"
              onClick={handleClick}
            >
              <Link
                to={"/reserve/" + yat.id}
                className="reserve app"
                id={yat.id}
              >
                {" "}
                View
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Yacht;
