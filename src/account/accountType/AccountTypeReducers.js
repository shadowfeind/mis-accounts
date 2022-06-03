import {
  GET_ALL_ACCOUNT_TYPE_FAIL,
  GET_ALL_ACCOUNT_TYPE_REQUEST,
  GET_ALL_ACCOUNT_TYPE_RESET,
  GET_ALL_ACCOUNT_TYPE_SUCCESS,
  GET_LIST_ACCOUNT_TYPE_FAIL,
  GET_LIST_ACCOUNT_TYPE_REQUEST,
  GET_LIST_ACCOUNT_TYPE_RESET,
  GET_LIST_ACCOUNT_TYPE_SUCCESS,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_FAIL,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_REQUEST,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_RESET,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_SUCCESS,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_FAIL,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_REQUEST,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_RESET,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_SUCCESS,
  POST_ACCOUNT_TYPE_FAIL,
  POST_ACCOUNT_TYPE_REQUEST,
  POST_ACCOUNT_TYPE_RESET,
  POST_ACCOUNT_TYPE_SUCCESS,
  PUT_ACCOUNT_TYPE_FAIL,
  PUT_ACCOUNT_TYPE_REQUEST,
  PUT_ACCOUNT_TYPE_RESET,
  PUT_ACCOUNT_TYPE_SUCCESS,
} from "./AccountTypeConstants";

export const getAllAccountTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACCOUNT_TYPE_REQUEST:
      return { loading: true };
    case GET_ALL_ACCOUNT_TYPE_SUCCESS:
      return { loading: false, accountType: action.payload };
    case GET_ALL_ACCOUNT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACCOUNT_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListAccountTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_ACCOUNT_TYPE_REQUEST:
      return { loading: true };
    case GET_LIST_ACCOUNT_TYPE_SUCCESS:
      return { loading: false, listAccountType: action.payload };
    case GET_LIST_ACCOUNT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ACCOUNT_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateAccountTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_SUCCESS:
      return { loading: false, singleCreateAccountType: action.payload };
    case GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditAccountTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_SUCCESS:
      return { loading: false, singleEditAccountType: action.payload };
    case GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const postAccountTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ACCOUNT_TYPE_REQUEST:
      return { loading: true };
    case POST_ACCOUNT_TYPE_SUCCESS:
      return { loading: false, success: true };
    case POST_ACCOUNT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case POST_ACCOUNT_TYPE_RESET:
      return {};
    default:
      return state;
  }
};

export const putAccountTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_ACCOUNT_TYPE_REQUEST:
      return { loading: true };
    case PUT_ACCOUNT_TYPE_SUCCESS:
      return { loading: false, success: true };
    case PUT_ACCOUNT_TYPE_FAIL:
      return { loading: false, error: action.payload };
    case PUT_ACCOUNT_TYPE_RESET:
      return {};
    default:
      return state;
  }
};
