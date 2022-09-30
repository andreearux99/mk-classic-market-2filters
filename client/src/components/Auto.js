import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAuto } from '../actions/auto';
import toast from 'react-hot-toast';

const deleteToast = () => toast.success('Successfully deleted!');

const Auto = (props) => {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const { auto } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteItem === true) {
      deleteToast();
      dispatch(deleteAuto(auto._id));
      setDeleteItem(false);
    }
  }, [deleteItem]);

  const handleClose = () => {
    setShowDelete(false);
  };

  const deleteHandler = () => {
    setShowDelete(true);
  };

  let classString = 'fas fa-trash deleteButton';

  return (
    <div className="product">
      <strong>Name:</strong> {auto.autoName}
      <br></br>
      <strong>Category:</strong> {auto.autoCategory}
      <br></br>
      <strong>Model:</strong> {auto.model}
      <br></br>
      <strong>Price:</strong> {auto.price}
      <br></br>
      <strong>Year:</strong> {auto.year}
      <br></br>
      <strong>Km:</strong> {auto.km}
      <br></br>
      <strong>Carosery:</strong> {auto.carosery}
      <br></br>
      <strong>Fuel:</strong> {auto.fuel}
      <br></br>
      <strong>Engine:</strong> {auto.engine}
      <br></br>
      <strong>Horse Power:</strong> {auto.horsePower}
      <br></br>
      <strong>Steering Wheel:</strong> {auto.steeringWheel}
      <br></br>
      <strong>Image:</strong> {auto.image}
      <br></br>
      <strong>Description:</strong> {auto.description}
      <br></br>
      <strong>Colour:</strong> {auto.colour}
      <br></br>
      <strong>Status:</strong> {auto.status}
      <br></br>
      <i
        onClick={() => deleteHandler(auto)}
        className={`${classString}`}
      ></i>
      <i
        className="fas fa-pen"
        onClick={() => navigate(`/${auto._id}/editAuto`)}
      ></i>
      <Modal
        show={showDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{auto.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setDeleteItem(true)}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Auto;
