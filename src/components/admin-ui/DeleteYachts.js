import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './admin-ui.css';

const DeleteYachts = () => {
  const [yachts, setYachts] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);

  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const request = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  });

  useEffect(() => {
    // Get Yachts from API
    request.get('https://wishyacht-api.herokuapp.com/v1/yachts')
      .then((response) => {
        setYachts(response.data);
      })
      .catch((error) => error);
  }, []);
  // Delete Yachts from API

  const handleDeleteYacht = (id) => (event) => {
    event.preventDefault();

    request.delete(`https://wishyacht-api.herokuapp.com/v1/yachts/${id}`)
      .then(() => {
        const included = [...yachts].filter((yacht) => yacht.attributes.id !== id);
        setYachts(included);
      })
      .catch((error) => error);
  };

  const yachtList = yachts.map((yacht) => (
    <tr key={yacht.attributes.name}>
      <td className="fs125 d-flex justify-content-between px-5">
        {yacht.attributes.name}
        <Button
          type="button"
          variant="info"
          onClick={handleDeleteYacht(yacht.attributes.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <main>
      <div className="effect" />
      <Container className="align-items-center justify-content-center z1">
        <Table striped borderless hover responsive className="align-items-center my-5 mx-auto w-80 shadow p-3 bg-body rounded">
          <thead>
            <tr>
              <th className="fs125 my-2">Yachts</th>
            </tr>
          </thead>
          <tbody>
            {yachtList}
          </tbody>
        </Table>
      </Container>
    </main>
  );
};

export default DeleteYachts;
