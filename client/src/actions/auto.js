import {
  AUTO_LIST_SUCCESS,
  AUTO_LIST_REQUEST,
  AUTO_LIST_FAIL,
  AUTO_CREATE_SUCCESS,
  AUTO_CREATE_REQUEST,
  AUTO_CREATE_FAIL,
  AUTO_DELETE_REQUEST,
  AUTO_DELETE_SUCCESS,
  AUTO_DELETE_FAIL,
  AUTO_UPDATE_SUCCESS,
  AUTO_UPDATE_REQUEST,
  AUTO_UPDATE_FAIL,
  AUTO_DETAILS_REQUEST,
  AUTO_DETAILS_SUCCESS,
  AUTO_DETAILS_FAIL,
  AUTO_OFFICE_LIST_REQUEST,
  AUTO_OFFICE_LIST_SUCCESS,
  AUTO_OFFICE_LIST_FAIL,
} from '../constants/autoActionTypes';
import Axios from 'axios';

export const getAutos = ({
  autoName = '',
  mainCategory = '',
  autoCategory = '',
  model = '',
  carosery = '',
  fuel = '',
  steeringWheel = '',
  image = '',
  description = '',
  colour = '',
  status = '',
  minYear = 0,
  maxYear = 0,
  minKm = 0,
  maxKm = 0,
  minEngine = 0,
  maxEngine = 0,
  minHorsePower = 0,
  maxHorsePower = 0,
  minPrice = 0,
  maxPrice = 0,
}) => async (dispatch) => {
  dispatch({ type: AUTO_LIST_REQUEST });
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/autos?autoName=${autoName}&mainCategory=${mainCategory}&autoCategory=${autoCategory}&model=${model}&carosery=${carosery}&fuel=${fuel}&steeringWheel=${steeringWheel}&colour=${colour}&status=${status}&minPrice=${minPrice}&maxPrice=${maxPrice}&minYear=${minYear}&maxYear=${maxYear}&minKm=${minKm}&maxKm=${maxKm}&minEngine=${minEngine}&maxEngine=${maxEngine}&minHorsePower=${minHorsePower}&maxHorsePower=${maxHorsePower}`

      );
    dispatch({ type: AUTO_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTO_LIST_FAIL, payload: error.message });
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: AUTO_OFFICE_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(
      'http://localhost:5000/autos/categories'
    );
    dispatch({ type: AUTO_OFFICE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTO_OFFICE_LIST_FAIL, payload: error.message });
  }
};

export const detailsAuto = (autoId) => async (dispatch) => {
  dispatch({ type: AUTO_DETAILS_REQUEST, payload: autoId });
  try {
    const { data } = await Axios.get(
      `http://localhost:5000/autos/${autoId}`
    );
    dispatch({ type: AUTO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AUTO_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createAuto = (newAuto) => async (dispatch) => {
  dispatch({ type: AUTO_CREATE_REQUEST });
  try {
    const { data } = await Axios.post(
      'http://localhost:5000/autos',
      newAuto
    );
    dispatch({ type: AUTO_CREATE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: AUTO_CREATE_FAIL, payload: message });
  }
};

export const updateAuto = (auto) => async (dispatch) => {
  dispatch({ type: AUTO_UPDATE_REQUEST, payload: auto });
  try {
    const { data } = await Axios.put(
      `http://localhost:5000/autos/${auto._id}`,
      auto
    );
    dispatch({ type: AUTO_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: AUTO_UPDATE_FAIL, error: error });
  }
};

export const deleteAuto = (id) => async (dispatch) => {
  dispatch({ type: AUTO_DELETE_REQUEST });
  try {
    await Axios.delete(`http://localhost:5000/autos/${id}`);

    dispatch({ type: AUTO_DELETE_SUCCESS });
  } catch (error) {
    dispatch({ type: AUTO_DELETE_FAIL });
  }
};
