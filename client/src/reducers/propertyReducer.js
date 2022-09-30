import {
    PROPERTY_LIST_SUCCESS,
    PROPERTY_LIST_FAIL,
    PROPERTY_LIST_REQUEST,
    PROPERTY_CREATE_SUCCESS,
    PROPERTY_CREATE_FAIL,
    PROPERTY_CREATE_REQUEST,
    PROPERTY_DELETE_REQUEST,
    PROPERTY_DELETE_SUCCESS,
    PROPERTY_DELETE_FAIL,
    PROPERTY_UPDATE_REQUEST,
    PROPERTY_UPDATE_SUCCESS,
    PROPERTY_UPDATE_FAIL,
    PROPERTY_UPDATE_RESET,
    PROPERTY_DETAILS_SUCCESS,
    PROPERTY_DETAILS_REQUEST,
    PROPERTY_DETAILS_FAIL,
    PROPERTY_CREATE_RESET,
    PROPERTY_OFFICE_LIST_REQUEST,
    PROPERTY_OFFICE_LIST_SUCCESS,
    PROPERTY_OFFICE_LIST_FAIL,
  } from '../constants/propertyActionTypes';
  
  export const propertyListReducer = (
    state = { loading: true, properties: [] },
    action
  ) => {
    switch (action.type) {
      case PROPERTY_LIST_REQUEST:
        return { loading: true };
      case PROPERTY_LIST_SUCCESS:
        return {
          loading: false,
          properties: action.payload.properties,
          count: action.payload.count,
        };
      case PROPERTY_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const propertyCategoryListReducer = (
    state = { loading: true, categories: [] },
    action
  ) => {
    switch (action.type) {
      case PROPERTY_OFFICE_LIST_REQUEST:
        return { loading: true };
      case PROPERTY_OFFICE_LIST_SUCCESS:
        return { loading: false, categories: action.payload };
      case PROPERTY_OFFICE_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const propertyDetailsReducer = (
    state = { loading: true },
    action
  ) => {
    switch (action.type) {
      case PROPERTY_DETAILS_REQUEST:
        return { loading: true };
      case PROPERTY_DETAILS_SUCCESS:
        return { loading: false, property: action.payload };
      case PROPERTY_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const propertyCreateReducer = (
    state = { success: false },
    action
  ) => {
    switch (action.type) {
      case PROPERTY_CREATE_REQUEST:
        return { loading: true };
      case PROPERTY_CREATE_SUCCESS:
        return { loading: false, success: true, property: action.payload };
      case PROPERTY_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PROPERTY_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const propertyUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PROPERTY_UPDATE_REQUEST:
        return { loading: true };
      case PROPERTY_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PROPERTY_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PROPERTY_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };
  
  export const propertyDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PROPERTY_DELETE_REQUEST:
        return { loading: true };
      case PROPERTY_DELETE_SUCCESS:
        return { loading: false, success: true };
      case PROPERTY_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  