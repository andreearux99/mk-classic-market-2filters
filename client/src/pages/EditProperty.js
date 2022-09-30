import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { PROPERTY_UPDATE_RESET } from '../constants/propertyActionTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsProperty, updateProperty } from '../actions/property';
import toast from 'react-hot-toast';

const editToastFail = () =>
  toast.error('Sorry! Translation unsuccessfully edited!');
const editToastSuccess = () =>
  toast.success('Translation successfully edited!');

const EditTranslation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: propertyId } = params;
  const [propertyName, setPropertyName] = useState('');
  const [propertyCategory, setPropertyCategory] = useState('');
  const [furnished, setFurnished] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [rooms, setRooms] = useState('');
  const [usefulSurface, setUsefulSurface] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  

  const detailedProperty = useSelector((state) => state.detailedProperty);
  const { property } = detailedProperty;

  const updatedProperty = useSelector((state) => state.updatedProperty);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updatedProperty;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      navigate('/');
      editToastSuccess();
    }
    if (errorUpdate) {
      editToastFail();
    }
    if (!property || property._id !== propertyId || successUpdate) {
      dispatch({ type: PROPERTY_UPDATE_RESET });
      dispatch(detailsProperty(propertyId));
    } else {
      setPropertyName(property.propertyName);
      setPropertyCategory(property.propertyCategory);
      setFurnished(property.furnished);
      setPrice(property.price);
      setYear(property.year);
      setRooms(property.rooms);
      setUsefulSurface(property.usefulSurface);
      setImage(property.image);
      setDescription(property.description);
    }
  }, [
    property,
    dispatch,
    propertyId,
    successUpdate,
    navigate,
    errorUpdate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProperty({
        _id: propertyId,
        propertyName,
        propertyCategory,
        furnished,
        price,
        year,
        rooms,
        usefulSurface,
        image,
        description,
      })
    );
  };

  return (
    <div className="form-container">
      <div>
        <Helmet>
          <title>Update Property</title>
        </Helmet>
        <h1 className="title">Update Property</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {successUpdate && (
          <SuccessBox variant="success">
            Successfully Property updated!
          </SuccessBox>
        )}
        <Form onSubmit={handleSubmit} className="form-container">
          <Form.Group className="mb-3" controlId="propertyName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              length="20"
              name="propertyName"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="propertyCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="propertyCategory"
              value={propertyCategory}
              onChange={(e) => setPropertyCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlid="furnished">
            <Form.Label>Furnished</Form.Label>
            <Form.Control
              name="furnished"
              value={furnished}
              onChange={(e) => setFurnished(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              name="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rooms">
            <Form.Label>Rooms</Form.Label>
            <Form.Control
              name="rooms"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="usefulSurface">
            <Form.Label>Useful Surface</Form.Label>
            <Form.Control
              name="usefulSurface"
              value={usefulSurface}
              onChange={(e) => setUsefulSurface(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          
          <Button size="large" color="secondary" type="submit">
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditTranslation;
