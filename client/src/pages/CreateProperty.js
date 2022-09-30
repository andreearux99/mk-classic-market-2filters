import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createProperty } from '../actions/property';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { PROPERTY_CREATE_RESET } from '../constants/propertyActionTypes';
import toast from 'react-hot-toast';

const createToastSuccess = () =>
  toast.success('Property successfully created!');
const createToastFail = () =>
  toast.error('Sorry! Property unsuccessfully created!');

export default function CreateProperty() {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({
    propertyName: '',
    mainCategory: '',
    propertyCategory: '',
    furnished: '',
    price: '',
    year: '',
    rooms: '',
    usefulSurface: '',
    image: '',
    description: '',
  });

  const dispatch = useDispatch();

  const createdProperty = useSelector((state) => state.createdProperty);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    properties,
  } = createdProperty;

  const clear = () => {
    setPropertyData({
      propertyName: '',
      mainCategory: '',
      propertyCategory: '',
      furnished: '',
      price: '',
      year: '',
      rooms: '',
      usefulSurface: '',
      image: '',
      description: '',
    });
  };

  function handleChange(e) {
    setPropertyData({
      ...propertyData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (properties) {
      setPropertyData(properties);
    }
    if (successCreate) {
      dispatch({ type: PROPERTY_CREATE_RESET });
      navigate('/');
      createToastSuccess();
    }
    if (errorCreate) {
      createToastFail();
    }
  }, [properties, successCreate, errorCreate]);

  const handleSubmit = async (e) => {
    dispatch(createProperty(propertyData));
    e.preventDefault();
    clear();
  };

  return (
    <div className="form-container">
      <Helmet>
        <title>Create Property</title>
      </Helmet>

      <h1 className="title">Create Property</h1>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {successCreate && (
        <SuccessBox variant="success">Successfully created!</SuccessBox>
      )}
      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="mb-3" controlid="propertyName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="propertyName"
            value={propertyData.propertyName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="mainCategory">
          <Form.Label>Main Category</Form.Label>
          <Form.Control
            name="mainCategory"
            value={propertyData.mainCategory}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="propertyCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="propertyCategory"
            value={propertyData.propertyCategory}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="furnished">
          <Form.Label>Furnished</Form.Label>
          <Form.Control
            name="furnished"
            value={propertyData.furnished}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={propertyData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            name="year"
            value={propertyData.year}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="rooms">
          <Form.Label>Rooms</Form.Label>
          <Form.Control
            name="rooms"
            value={propertyData.rooms}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="usefulSurface">
          <Form.Label>Useful Surface</Form.Label>
          <Form.Control
            name="usefulSurface"
            value={propertyData.usefulSurface}
            onChange={handleChange}
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlid="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="image"
            value={propertyData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={propertyData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button size="large" color="secondary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
}
