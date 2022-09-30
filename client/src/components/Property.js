import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProperty } from '../actions/property';
import toast from 'react-hot-toast';

const deleteToast = () => toast.success('Successfully deleted!');

export default function Property(props) {
  const [showDelete, setShowDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  const { property } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteItem === true) {
      deleteToast();
      dispatch(deleteProperty(property._id));
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
      <strong>Name:</strong> {property.propertyName}
      <br></br>
      <strong>Category:</strong> {property.propertyCategory}
      <br></br>
      <strong>Furnished:</strong> {property.furnished}
      <br></br>
      <strong>Price:</strong> {property.price}
      <br></br>
      <strong>Year:</strong> {property.year}
      <br></br>
      <strong>Rooms:</strong> {property.rooms}
      <br></br>
      <strong>usefulSurface:</strong> {property.usefulSurface}
      <br></br>
      <strong>Fuel:</strong> {property.fuel}
      <br></br>
      <strong>Image:</strong> {property.image}
      <br></br>
      <strong>Description:</strong> {property.description}
      <br></br>
      
      <i
        onClick={() => deleteHandler(property)}
        className={`${classString}`}
      ></i>
      <i
        className="fas fa-pen"
        onClick={() => navigate(`/${property._id}/editProperty`)}
      ></i>
      <Modal
        show={showDelete}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{property.name}</Modal.Title>
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