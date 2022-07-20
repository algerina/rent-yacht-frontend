import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './yachtshow.css';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

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
      <div className="yacht-card">
        <div className="img-wrap">
          <img className="single-yacht" src={yacht.image_url} alt="single-yacht" />
        </div>
        <div className="card-button">
          <Card className="text-box" style={{ width: '15rem' }}>
            <Card.Header><span className="name">{yacht.name}</span></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <span>Description: </span>
                {yacht.description}
              </ListGroup.Item>
              <ListGroup.Item>
                {' '}
                <span>Price: </span>
                {' '}
                $
                {yacht.price}
              </ListGroup.Item>
            </ListGroup>
          </Card>
          <Button className="show-button" type="button" style={{ width: '15rem' }}>
            <Link to={`/reserve/${yacht.id}`} className="reserve" id={yacht.id}>
              {' '}
              Reserve
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  return (<h1>Page not found!</h1>);
};

export default Yachtshow;
