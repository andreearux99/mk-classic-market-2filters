import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import SuccessBox from '../components/SuccessBox';
import { AUTO_UPDATE_RESET } from '../constants/autoActionTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsAuto, updateAuto } from '../actions/auto';
import toast from 'react-hot-toast';

const editToastFail = () =>
  toast.error('Sorry! Translation unsuccessfully edited!');
const editToastSuccess = () =>
  toast.success('Translation successfully edited!');

const EditTranslation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: autoId } = params;
  const [autoName, setAutoName] = useState('');
  const [autoCategory, setAutoCategory] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [year, setYear] = useState('');
  const [km, setKm] = useState('');
  const [carosery, setCarosery] = useState('');
  const [fuel, setFuel] = useState('');
  const [engine, setEngine] = useState('');
  const [horsePower, setHorsePower] = useState('');
  const [steeringWheel, setSteeringWheel] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [colour, setColour] = useState('');
  const [status, setStatus] = useState('');

  const detailedAuto = useSelector((state) => state.detailedAuto);
  const { auto } = detailedAuto;

  const updatedAuto = useSelector((state) => state.updatedAuto);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = updatedAuto;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      navigate('/');
      editToastSuccess();
    }
    if (errorUpdate) {
      editToastFail();
    }
    if (!auto || auto._id !== autoId || successUpdate) {
      dispatch({ type: AUTO_UPDATE_RESET });
      dispatch(detailsAuto(autoId));
    } else {
      setAutoName(auto.autoName);
      setAutoCategory(auto.autoCategory);
      setModel(auto.model);
      setPrice(auto.price);
      setYear(auto.year);
      setKm(auto.km);
      setCarosery(auto.carosery);
      setFuel(auto.fuel);
      setEngine(auto.engine);
      setHorsePower(auto.horsePower);
      setSteeringWheel(auto.steeringWheel);
      setImage(auto.image);
      setDescription(auto.description);
      setColour(auto.colour);
      setStatus(auto.status);
    }
  }, [
    auto,
    dispatch,
    autoId,
    successUpdate,
    navigate,
    errorUpdate,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateAuto({
        _id: autoId,
        autoName,
        autoCategory,
        model,
        price,
        year,
        km,
        carosery,
        fuel,
        engine,
        horsePower,
        steeringWheel,
        image,
        description,
        colour,
        status,
      })
    );
  };

  return (
    <div className="form-container">
      <div>
        <Helmet>
          <title>Update Auto</title>
        </Helmet>
        <h1 className="title">Update Auto</h1>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {successUpdate && (
          <SuccessBox variant="success">
            Successfully auto updated!
          </SuccessBox>
        )}
        <Form onSubmit={handleSubmit} className="form-container">
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              length="20"
              name="name"
              value={autoName}
              onChange={(e) => setAutoName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="autoCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="autoCategory"
              value={autoCategory}
              onChange={(e) => setAutoCategory(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlid="model">
            <Form.Label>Model</Form.Label>
            <Form.Control
              name="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
          <Form.Group className="mb-3" controlId="km">
            <Form.Label>Km</Form.Label>
            <Form.Control
              name="km"
              value={km}
              onChange={(e) => setKm(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="carosery">
            <Form.Label>Carosery</Form.Label>
            <Form.Control
              name="carosery"
              value={carosery}
              onChange={(e) => setCarosery(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="fuel">
            <Form.Label>Fuel</Form.Label>
            <Form.Control
              name="fuel"
              value={fuel}
              onChange={(e) => setFuel(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="engine">
            <Form.Label>Engine</Form.Label>
            <Form.Control
              name="engine"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="horsePower">
            <Form.Label>Horse Power</Form.Label>
            <Form.Control
              name="horsePower"
              value={horsePower}
              onChange={(e) => setHorsePower(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="steeringWheel">
            <Form.Label>Steering Wheel</Form.Label>
            <Form.Control
              name="steeringWheel"
              value={steeringWheel}
              onChange={(e) => setSteeringWheel(e.target.value)}
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
          <Form.Group className="mb-3" controlId="colour">
            <Form.Label>Colour</Form.Label>
            <Form.Control
              name="colour"
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
