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
      }
    })
    
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
  <div>
  <img className="single-yacht" src={yacht.image_url} alt="single-yacht" />
  </div>
<Card style={{ width: '18rem' }}>
      <Card.Header>{yacht.name}</Card.Header>
      <ListGroup variant="flush">
        <ListGroup.Item><span>Description:</span>{yacht.description}</ListGroup.Item>
        <ListGroup.Item>${yacht.price}</ListGroup.Item>
      </ListGroup>
    </Card>
    <button variant="success" type="button" size="lg">
              <Link to={`/reserve/${yacht.id}`} className="reserve" id={yacht.id}>
                {' '}
                Reserve
              </Link>
              </button>
</div>
    );
  }
  return (<h1>Page not found!</h1>);
};

export default Yachtshow;
