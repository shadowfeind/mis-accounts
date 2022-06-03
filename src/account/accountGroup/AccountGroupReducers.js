import {
  GET_ALL_ACCOUNT_GROUP_FAIL,
  GET_ALL_ACCOUNT_GROUP_REQUEST,
  GET_ALL_ACCOUNT_GROUP_RESET,
  GET_ALL_ACCOUNT_GROUP_SUCCESS,
  GET_LIST_ACCOUNT_GROUP_FAIL,
  GET_LIST_ACCOUNT_GROUP_REQUEST,
  GET_LIST_ACCOUNT_GROUP_RESET,
  GET_LIST_ACCOUNT_GROUP_SUCCESS,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_FAIL,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_REQUEST,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_RESET,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_SUCCESS,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_FAIL,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_REQUEST,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_RESET,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_SUCCESS,
  POST_ACCOUNT_GROUP_FAIL,
  POST_ACCOUNT_GROUP_REQUEST,
  POST_ACCOUNT_GROUP_RESET,
  POST_ACCOUNT_GROUP_SUCCESS,
  PUT_ACCOUNT_GROUP_FAIL,
  PUT_ACCOUNT_GROUP_REQUEST,
  PUT_ACCOUNT_GROUP_RESET,
  PUT_ACCOUNT_GROUP_SUCCESS,
} from "./AccountGroupConstants";

export const getAllAccountGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACCOUNT_GROUP_REQUEST:
      return { loading: true };
    case GET_ALL_ACCOUNT_GROUP_SUCCESS:
      return { loading: false, accountGroup: action.payload };
    case GET_ALL_ACCOUNT_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACCOUNT_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const getListAccountGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ACCOUNT_GROUP_REQUEST:
      return { loading: true };
    case GET_LIST_ACCOUNT_GROUP_SUCCESS:
      return { loading: false, listAccountGroup: action.payload };
    case GET_LIST_ACCOUNT_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ACCOUNT_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateAccountGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_CREATE_ACCOUNT_GROUP_REQUEST:
      return { loading: true };
    case GET_SINGLE_CREATE_ACCOUNT_GROUP_SUCCESS:
      return { loading: false, singleCreateAccountGroup: action.payload };
    case GET_SINGLE_CREATE_ACCOUNT_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_CREATE_ACCOUNT_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditAccountGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_EDIT_ACCOUNT_GROUP_REQUEST:
      return { loading: true };
    case GET_SINGLE_EDIT_ACCOUNT_GROUP_SUCCESS:
      return { loading: false, singleEditAccountGroup: action.payload };
    case GET_SINGLE_EDIT_ACCOUNT_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_EDIT_ACCOUNT_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const postAccountGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ACCOUNT_GROUP_REQUEST:
      return { loading: true };
    case POST_ACCOUNT_GROUP_SUCCESS:
      return { loading: false, success: true };
    case POST_ACCOUNT_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case POST_ACCOUNT_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const putAccountGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_ACCOUNT_GROUP_REQUEST:
      return { loading: true };
    case PUT_ACCOUNT_GROUP_SUCCESS:
      return { loading: false, success: true };
    case PUT_ACCOUNT_GROUP_FAIL:
      return { loading: false, error: action.payload };
    case PUT_ACCOUNT_GROUP_RESET:
      return {};
    default:
      return state;
  }
};
