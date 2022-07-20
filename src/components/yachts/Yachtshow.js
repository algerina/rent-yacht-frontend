import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './yacht.css';
import { Link, useParams } from 'react-router-dom';
import wheel from '../../assets/colorWheel.JPG';

const Yachtshow = () => {
  const params = useParams();

  const id = params.yacht_id;
  const [yacht, setYacht] = useState({});

  useEffect(() => {
    const request = axios.create({
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    });

    request
      .get(`http://localhost:3001/v1/yachts/${id}`)
      .then((response) => {
        const yacht = response.data;
        setYacht(yacht);
      });
  }, []);

  if (yacht) {
    return (
      <div style={{ margin: '50px', display: 'flex', justifyContent: 'flex-end' }}>
        <div className="e-card e-card-horizontal">
          <img className="showtimg" src={yacht.image_url} alt="Slide one" style={{ height: '180px' }} />
          <div className="e-card-stacked">
            <div className="e-card-header">{yacht.name}</div>
            <div className="e-card-header-caption">
              Description:
              {yacht.description}
            </div>
            <div className="e-card-header-title">
              Price:
              $
              {yacht.price}
            </div>
            <img src={wheel} alt="colors" className="wheel" />
            <button className="btn cardbutton" variant="success" type="button" size="lg">
              <Link to={`/reserve/${yacht.id}`} className="reserve" id={yacht.id}>
                {' '}
                Reserve
              </Link>
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (<h1>Page not found!</h1>);
};

export default Yachtshow;
