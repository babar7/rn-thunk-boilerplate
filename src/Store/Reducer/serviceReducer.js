import * as types from "../Types";
import _ from "lodash";
const initialState = {
  isFetching: false,
  failure: false,
  errMessage: "",
  data: [],
  meta: {},
};
export default (type) => {
  return (state = initialState, action) => {
    switch (action.type) {
      case type.REQUEST:
        return {
          ...state,
          isFetching: true,
          data: action.emptyDataOnRequest ? [] : state.data,
        };
      case type.SUCCESS:
        return {
          ...state,
          failure: false,
          isFetching: false,
          errorMessage: "",
          data: action.isConcat ? [...state.data, ...action.data] : action.data,
          meta: action.meta,
        };
      case type.FAILURE:
        return {
          ...state,
          data: state.data,
          failure: true,
          isFetching: false,
          errorMessage: action.errorMessage,
        };
      case type.CANCEL:
        return { ...state, ...initialState };
      case type.UPDATE:
        return updateOperation(state, action, type.UPDATE);
      case type.DELETE:
        return deleteOperation(state, action);
      case types.LOGOUT:
        return { ...state, ...initialState };
      default:
        return state;
    }
  };
};
const updateOperation = (state, action, type) => {
  isArray = Array.isArray(state.data);
  switch (type) {
    default:
      if (action.key && action.path) {
        return {};
      } else {
        if (isArray) {
          return {
            ...state,
            data: [...state.data, action.data],
          };
        } else {
          return {
            ...state,
            data: { ...state.data, ...action.data },
          };
        }
      }
  }
};
const deleteOperation = (state, action) => {
  isArray = Array.isArray(state.data);
  if (action.key && action.where) {
    if (isArray) {
      const newData = [...state.data];
      const index = state.data.findIndex(
        (item) => item[action.key] === action.where
      );
      newData.splice(index, 1);
      return {
        ...state,
        data: newData,
      };
    } else {
      return state;
    }
  } else {
    return state;
  }
};
