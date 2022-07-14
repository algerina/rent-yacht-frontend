import React, { useEffect } from "react";
import "./yacht.css";
import Button from "react-bootstrap/Button";
import logo from "../../assets/Yacht club logo vintage anchor sea logotype opaque.svg";
import { useSelector, useDispatch } from "react-redux";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
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
      {yachts.map((yat) => (
        <Carousel.Item interval={2000} key={yat.id} className="main">
          <img className="yachtimg" src={url} alt="Slide one" />
          <Carousel.Caption className="caption">
            <h3 className="card text-secondary">Name: {yat.name}</h3>
            <h3 className="card text-secondary">Description: {yat.description}</h3>
            <h3 className="card text-secondary">
              Price:
              {" $"}
              {yat.price}
            </h3>
            {/* <h3 className="card"> {yat.image}</h3> */}
            <button className="btn" type="button" onClick={handleClick}>
              <Link to={"/reserve/" + yat.id} className="reserve" id={yat.id}>
                {" "}
                Reserve
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
// const Yacht = () => {

//   const url = "https://images.pexels.com/photos/427726/pexels-photo-427726.jpeg"
//   return ( <div >

//     <div className="yacht">
//     <img src={url} alt="" />
//    </div>
//    <div className="logo"><img src={logo} alt="logo" /></div>
//     <div>
//       <h4>name</h4>
//       <h4>description</h4>
//       <h4>price</h4>
//       <button type="button"
//           variant="primary"
//           >
//             Reserve
//             </button>

//     </div>

//   </div>)
// };

export default Yacht;
