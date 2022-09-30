import {
    PROPERTY_LIST_SUCCESS,
    PROPERTY_LIST_REQUEST,
    PROPERTY_LIST_FAIL,
    PROPERTY_CREATE_SUCCESS,
    PROPERTY_CREATE_REQUEST,
    PROPERTY_CREATE_FAIL,
    PROPERTY_DELETE_REQUEST,
    PROPERTY_DELETE_SUCCESS,
    PROPERTY_DELETE_FAIL,
    PROPERTY_UPDATE_SUCCESS,
    PROPERTY_UPDATE_REQUEST,
    PROPERTY_UPDATE_FAIL,
    PROPERTY_DETAILS_REQUEST,
    PROPERTY_DETAILS_SUCCESS,
    PROPERTY_DETAILS_FAIL,
    PROPERTY_OFFICE_LIST_REQUEST,
    PROPERTY_OFFICE_LIST_SUCCESS,
    PROPERTY_OFFICE_LIST_FAIL,
  } from '../constants/propertyActionTypes';
  import Axios from 'axios';
  
  export const getProperties = ({
    propertyName = '',
    mainCategory = '',
    propertyCategory = '',
    furnished = '',
    rooms = '',
    minYear = 0,
    maxYear = 0,
    minUsefulSurface = 0,
    maxUsefulSurface = 0,
    minPrice = 0,
    maxPrice = 0,
    image = '',
    description = '',
  }) => async (dispatch) => {
    dispatch({ type: PROPERTY_LIST_REQUEST });
    try {
      const { data } = await Axios.get(
        `http://localhost:5000/properties?propertyName=${propertyName}&propertyCategory=${propertyCategory}&furnished=${furnished}&rooms=${rooms}&minPrice=${minPrice}&maxPrice=${maxPrice}&minYear=${minYear}&maxYear=${maxYear}&minUsefulSurface=${minUsefulSurface}&maxUsefulSurface=${maxUsefulSurface}`
      );
      dispatch({ type: PROPERTY_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PROPERTY_LIST_FAIL, payload: error.message });
    }
  };
  
  export const getCategories = () => async (dispatch) => {
    dispatch({
      type: PROPERTY_OFFICE_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        'http://localhost:5000/properties/categories'
      );
      dispatch({ type: PROPERTY_OFFICE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PROPERTY_OFFICE_LIST_FAIL, payload: error.message });
    }
  };
  
  export const detailsProperty = (propertyId) => async (dispatch) => {
    dispatch({ type: PROPERTY_DETAILS_REQUEST, payload: propertyId });
    try {
      const { data } = await Axios.get(
        `http://localhost:5000/properties/${propertyId}`
      );
      dispatch({ type: PROPERTY_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PROPERTY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  export const createProperty = (newProperty) => async (dispatch) => {
    dispatch({ type: PROPERTY_CREATE_REQUEST });
    try {
      const { data } = await Axios.post(
        'http://localhost:5000/properties',
        newProperty
      );
      dispatch({ type: PROPERTY_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PROPERTY_CREATE_FAIL, payload: message });
    }
  };
  
  export const updateProperty = (property) => async (dispatch) => {
    dispatch({ type: PROPERTY_UPDATE_REQUEST, payload: property });
    try {
      const { data } = await Axios.put(
        `http://localhost:5000/properties/${property._id}`,
        property
      );
      dispatch({ type: PROPERTY_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PROPERTY_UPDATE_FAIL, error: error });
    }
  };
  
  export const deleteProperty = (id) => async (dispatch) => {
    dispatch({ type: PROPERTY_DELETE_REQUEST });
    try {
      await Axios.delete(`http://localhost:5000/properties/${id}`);
  
      dispatch({ type: PROPERTY_DELETE_SUCCESS });
    } catch (error) {
      dispatch({ type: PROPERTY_DELETE_FAIL });
    }
  };
  