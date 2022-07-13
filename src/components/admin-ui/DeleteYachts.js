import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const DeleteYachts = () => {
  const [yachts, setYachts] = useState([]);

  useEffect(() => {
    // Get Yachts from API
    axios.get('http://localhost:3001/v1/yachts.json')
      .then((response) => {
        setYachts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [yachts.length]);
  // Delete Yachts from API

  const handleDeleteYacht = (id) => (event) => {
    event.preventDefault();

    axios.delete(`http://localhost:3001/v1/yachts/${id}`)
      .then((response) => {
        console.log(response);
        const included = [...yachts].filter((yacht) => yacht.id !== id);
        setYachts(included);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const yachtList = yachts.map((yacht) => (
    <tr key={yacht.name}>
      <td>{yacht.name}</td>
      <td>
        <Button
          type="button"
          variant="secondary"
          onClick={handleDeleteYacht(yacht.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <Container className="missions-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Yacht Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {yachtList}
        </tbody>
      </Table>
    </Container>
  );
};

export default DeleteYachts;
