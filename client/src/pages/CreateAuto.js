import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAuto } from '../actions/auto';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { AUTO_CREATE_RESET } from '../constants/autoActionTypes';
import toast from 'react-hot-toast';

const createToastSuccess = () =>
  toast.success('Translation successfully created!');
const createToastFail = () =>
  toast.error('Sorry! Translation unsuccessfully created!');

export default function CreateAutos() {
  const navigate = useNavigate();
  const [autoData, setAutoData] = useState({
    autoName: '',
    mainCategory: '',
    autoCategory: '',
    model: '',
    price: '',
    year: '',
    km: '',
    carosery: '',
    fuel: '',
    engine: '',
    horsePower: '',
    steeringWheel: '',
    image: '',
    description: '',
    color: '',
    status: '',
  });

  const dispatch = useDispatch();

  const createdAuto = useSelector((state) => state.createdAuto);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    autos,
  } = createdAuto;

  const clear = () => {
    setAutoData({
      autoName: '',
      mainCategory: '',
      autoCategory: '',
      model: '',
      price: '',
      year: '',
      km: '',
      carosery: '',
      fuel: '',
      engine: '',
      horsePower: '',
      steeringWheel: '',
      image: '',
      description: '',
      color: '',
      status: '',
    });
  };

  function handleChange(e) {
    setAutoData({
      ...autoData,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (autos) {
      setAutoData(autos);
    }
    if (successCreate) {
      dispatch({ type: AUTO_CREATE_RESET });
      navigate('/');
      createToastSuccess();
    }
    if (errorCreate) {
      createToastFail();
    }
  }, [autos, successCreate, errorCreate]);

  const handleSubmit = async (e) => {
    dispatch(createAuto(autoData));
    e.preventDefault();
    clear();
  };

  return (
    <div className="form-container">
      <Helmet>
        <title>Create Auto</title>
      </Helmet>

      <h1 className="title">Create Auto</h1>
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {successCreate && (
        <SuccessBox variant="success">Successfully created!</SuccessBox>
      )}
      <Form onSubmit={handleSubmit} className="form-container">
        <Form.Group className="mb-3" controlid="autoName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="autoName"
            value={autoData.autoName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="mainCategory">
          <Form.Label>Main Category</Form.Label>
          <Form.Control
            name="mainCategory"
            value={autoData.mainCategory}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="autoCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="autoCategory"
            value={autoData.autoCategory}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="model">
          <Form.Label>Model</Form.Label>
          <Form.Control
            name="model"
            value={autoData.model}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            name="price"
            value={autoData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            name="year"
            value={autoData.year}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="km">
          <Form.Label>km</Form.Label>
          <Form.Control
            name="km"
            value={autoData.km}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="carosery">
          <Form.Label>Carosery</Form.Label>
          <Form.Control
            name="carosery"
            value={autoData.carosery}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="fuel">
          <Form.Label>fuel</Form.Label>
          <Form.Control
            name="fuel"
            value={autoData.fuel}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="engine">
          <Form.Label>engine</Form.Label>
          <Form.Control
            name="engine"
            value={autoData.engine}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="horsePower">
          <Form.Label>HorsePower</Form.Label>
          <Form.Control
            name="horsePower"
            value={autoData.horsePower}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="steeringWheel">
          <Form.Label>steeringWheel</Form.Label>
          <Form.Control
            name="steeringWheel"
            value={autoData.steeringWheel}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="image"
            value={autoData.image}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            value={autoData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="colour">
          <Form.Label>Colour</Form.Label>
          <Form.Control
            name="colour"
            value={autoData.colour}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlid="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            name="status"
            value={autoData.status}
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
