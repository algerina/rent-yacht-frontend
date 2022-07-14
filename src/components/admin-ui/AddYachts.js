import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function AddYachts() {
  const [yacht, setYacht] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setYacht({ ...yacht, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const img = document.getElementById('image');

    formData.append('image', img.files[0]);
    formData.append('name', yacht.name);
    formData.append('description', yacht.description);
    formData.append('price', yacht.price);

    axios.post('http://127.0.0.1:3001/v1/yachts/', { formData })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formAddYacht">
        <Form.Label>Yacht Name</Form.Label>
        <Form.Control type="text" htmlFor="name" name="name" placeholder="Enter Yacht Name" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddYacht">
        <Form.Label>Description</Form.Label>
        <Form.Control type="textarea" htmlFor="descripion" name="description" placeholder="Enter Yacht Description" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddYacht">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" htmlFor="price" name="price" placeholder="Enter Yacht Price" onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formAddYacht">
        <Form.Label>Image</Form.Label>
        <Form.Control type="file" id="image" name="image" className="image" placeholder="Image" />
      </Form.Group>
      <Button variant="primary" type="submit">
        ADD YACHT
      </Button>
    </Form>
  );
}

export default AddYachts;
