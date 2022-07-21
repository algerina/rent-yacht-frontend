import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button } from 'react-bootstrap';
import { fetchYachts, deleteSingleYacht } from '../../redux/actions/yachtActions';
import './admin-ui.css';

const DeleteYachts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const { yachts } = useSelector((state) => state.yacht);
  const [yachtsList, setYachtsList] = useState(yachts);
  if (currentUser.role !== 'admin') {
    navigate('/');
  }
  useEffect(() => {
    if (yachts.length === 0) {
      dispatch(fetchYachts());
    }
    setYachtsList(yachts);
  }, [yachts]);
  const handleDeleteYacht = (id) => {
    dispatch(deleteSingleYacht(id));
    const update = yachtsList.filter((yacht) => yacht.id !== id);
    setYachtsList(update);
  };
  const yachtRow = (yachts) => yachts.map((yacht) => (
    <tr key={yacht.id}>
      <td className="fs125 d-flex justify-content-between px-5">
        {yacht.name}
        <Button type="button" variant="info" className="deleteYacht__button" onClick={() => handleDeleteYacht(yacht.id)}>
          Delete
        </Button>
      </td>
    </tr>
  ));
  return (
    <main className="main">
      <div className="deleteYachts__header">
        <h1>Delete Yachts</h1>
        <p>This are all our yachts</p>
        <hr />
      </div>
      <div className="effect" />
      <Container className="align-items-center justify-content-center z1">
        <Table
          striped
          borderless
          hover
          responsive
          className="align-items-center my-5 mx-auto w-80 shadow p-3 bg-body rounded"
        >
          <thead>
            <tr>
              <th className="fs125 my-2">Yachts</th>
            </tr>
          </thead>
          <tbody>{yachtRow(yachtsList)}</tbody>
        </Table>
      </Container>
    </main>
  );
};
export default DeleteYachts;
