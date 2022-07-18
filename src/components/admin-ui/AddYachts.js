import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import './admin-ui.css';

function AddYachts() {
  const { reset } = useForm();
  const [yacht, setYacht] = useState({});

  const notifySuccess = () => toast('Yacht added successfully', {
    position: 'top-center',
    autoClose: 15000,
    pauseOnHover: true,
    draggable: true,
  });

  const notifyError = () => toast.error('Error! check error on the logs.', {
    position: 'top-right',
    autoClose: 15000,
    pauseOnHover: true,
    draggable: true,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setYacht({ ...yacht, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    const img = document.getElementById('image_url');

    data.append('image_url', img.files[0]);
    data.append('name', yacht.name);
    data.append('description', yacht.description);
    data.append('price', yacht.price);

    axios.post('http://127.0.0.1:3001/v1/yachts/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => {
        notifySuccess();
      })
      .catch(() => {
        notifyError();
      });
    reset();
  };

  return (
    <main className="main">
      <div className="effect" />
      <div className="showcase">
        <Form onSubmit={handleSubmit} className="bg-light rounded-3 shadow p-4 bg-body">
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
            <input type="file" id="image_url" name="image_url" placeholder="Select Image" />
          </Form.Group>
          <Button variant="primary" type="submit">
            ADD YACHT
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </main>
  );
}

export default AddYachts;
