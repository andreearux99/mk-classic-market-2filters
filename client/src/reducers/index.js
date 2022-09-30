import { combineReducers } from 'redux';
import * as reducersAuto from './autoReducer';
import * as reducersProperty from './propertyReducer';

export const reducer = combineReducers({
  autosList: reducersAuto.autoListReducer,
  createdAuto: reducersAuto.autoCreateReducer,
  deletedAuto: reducersAuto.autoDeleteReducer,
  updatedAuto: reducersAuto.autoUpdateReducer,
  detailedAuto: reducersAuto.autoDetailsReducer,
  autosCategoryList: reducersAuto.autoCategoryListReducer,

  propertiesList: reducersProperty.propertyListReducer,
  createdProperty: reducersProperty.propertyCreateReducer,
  deletedProperty: reducersProperty.propertyDeleteReducer,
  updatedProperty: reducersProperty.propertyUpdateReducer,
  detailedProperty: reducersProperty.propertyDetailsReducer,
  //propertiesCategoryList: reducers.propertyCategoryListReducer,

});
