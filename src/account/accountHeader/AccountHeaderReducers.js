import {
  GET_ALL_ACCOUNT_HEADER_FAIL,
  GET_ALL_ACCOUNT_HEADER_REQUEST,
  GET_ALL_ACCOUNT_HEADER_RESET,
  GET_ALL_ACCOUNT_HEADER_SUCCESS,
  GET_LIST_ACCOUNT_HEADER_FAIL,
  GET_LIST_ACCOUNT_HEADER_REQUEST,
  GET_LIST_ACCOUNT_HEADER_RESET,
  GET_LIST_ACCOUNT_HEADER_SUCCESS,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_FAIL,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_REQUEST,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_RESET,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_SUCCESS,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_FAIL,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_REQUEST,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_RESET,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_SUCCESS,
  POST_ACCOUNT_HEADER_FAIL,
  POST_ACCOUNT_HEADER_REQUEST,
  POST_ACCOUNT_HEADER_RESET,
  POST_ACCOUNT_HEADER_SUCCESS,
  PUT_ACCOUNT_HEADER_FAIL,
  PUT_ACCOUNT_HEADER_REQUEST,
  PUT_ACCOUNT_HEADER_RESET,
  PUT_ACCOUNT_HEADER_SUCCESS,
} from "./AccountHeaderConstants";

export const getAllAccountHeaderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ACCOUNT_HEADER_REQUEST:
      return { loading: true };
    case GET_ALL_ACCOUNT_HEADER_SUCCESS:
      return { loading: false, accountHeader: action.payload };
    case GET_ALL_ACCOUNT_HEADER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ACCOUNT_HEADER_RESET:
      return {};
    default:
      return state;
  }
};

export const getListAccountHeaderReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_LIST_ACCOUNT_HEADER_REQUEST:
        return { loading: true };
      case GET_LIST_ACCOUNT_HEADER_SUCCESS:
        return { loading: false, listAccountHeader: action.payload };
      case GET_LIST_ACCOUNT_HEADER_FAIL:
        return { loading: false, error: action.payload };
      case GET_LIST_ACCOUNT_HEADER_RESET:
        return {};
      default:
        return state;
    }
  };
  

  export const getSingleCreateAccountHeaderReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_REQUEST:
        return { loading: true };
      case GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_SUCCESS:
        return { loading: false, singleCreateAccountHeader: action.payload };
      case GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_RESET:
        return {};
      default:
        return state;
    }
  };

  export const getSingleEditAccountHeaderReducer = (state = {}, action) => {
    switch (action.type) {
      case GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_REQUEST:
        return { loading: true };
      case GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_SUCCESS:
        return { loading: false, singleEditAccountHeader: action.payload };
      case GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_FAIL:
        return { loading: false, error: action.payload };
      case GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_RESET:
        return {};
      default:
        return state;
    }
  };

  export const postAccountHeaderReducer = (state = {}, action) => {
    switch (action.type) {
      case POST_ACCOUNT_HEADER_REQUEST:
        return { loading: true };
      case POST_ACCOUNT_HEADER_SUCCESS:
        return { loading: false, success: true};
      case POST_ACCOUNT_HEADER_FAIL:
        return { loading: false, error: action.payload };
      case POST_ACCOUNT_HEADER_RESET:
        return {};
      default:
        return state;
    }
  };


  export const putAccountHeaderReducer = (state = {}, action) => {
    switch (action.type) {
      case PUT_ACCOUNT_HEADER_REQUEST:
        return { loading: true };
      case PUT_ACCOUNT_HEADER_SUCCESS:
        return { loading: false, success: true };
      case PUT_ACCOUNT_HEADER_FAIL:
        return { loading: false, error: action.payload };
      case PUT_ACCOUNT_HEADER_RESET:
        return {};
      default:
        return state;
    }
  };
  
  

  
