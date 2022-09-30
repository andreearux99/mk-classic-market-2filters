import {
  AUTO_LIST_SUCCESS,
  AUTO_LIST_FAIL,
  AUTO_LIST_REQUEST,
  AUTO_CREATE_SUCCESS,
  AUTO_CREATE_FAIL,
  AUTO_CREATE_REQUEST,
  AUTO_DELETE_REQUEST,
  AUTO_DELETE_SUCCESS,
  AUTO_DELETE_FAIL,
  AUTO_UPDATE_REQUEST,
  AUTO_UPDATE_SUCCESS,
  AUTO_UPDATE_FAIL,
  AUTO_UPDATE_RESET,
  AUTO_DETAILS_SUCCESS,
  AUTO_DETAILS_REQUEST,
  AUTO_DETAILS_FAIL,
  AUTO_CREATE_RESET,
  AUTO_OFFICE_LIST_REQUEST,
  AUTO_OFFICE_LIST_SUCCESS,
  AUTO_OFFICE_LIST_FAIL,
} from '../constants/autoActionTypes';

export const autoListReducer = (
  state = { loading: true, autos: [] },
  action
) => {
  switch (action.type) {
    case AUTO_LIST_REQUEST:
      return { loading: true };
    case AUTO_LIST_SUCCESS:
      return {
        loading: false,
        autos: action.payload.autos,
        count: action.payload.count,
      };
    case AUTO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const autoCategoryListReducer = (
  state = { loading: true, categories: [] },
  action
) => {
  switch (action.type) {
    case AUTO_OFFICE_LIST_REQUEST:
      return { loading: true };
    case AUTO_OFFICE_LIST_SUCCESS:
      return { loading: false, categories: action.payload };
    case AUTO_OFFICE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const autoDetailsReducer = (
  state = { loading: true },
  action
) => {
  switch (action.type) {
    case AUTO_DETAILS_REQUEST:
      return { loading: true };
    case AUTO_DETAILS_SUCCESS:
      return { loading: false, auto: action.payload };
    case AUTO_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const autoCreateReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case AUTO_CREATE_REQUEST:
      return { loading: true };
    case AUTO_CREATE_SUCCESS:
      return { loading: false, success: true, auto: action.payload };
    case AUTO_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case AUTO_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const autoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTO_UPDATE_REQUEST:
      return { loading: true };
    case AUTO_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case AUTO_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case AUTO_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const autoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTO_DELETE_REQUEST:
      return { loading: true };
    case AUTO_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AUTO_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
