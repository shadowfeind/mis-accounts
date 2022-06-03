import {
  GET_ALL_VENDOR_FAIL,
  GET_ALL_VENDOR_REQUEST,
  GET_ALL_VENDOR_RESET,
  GET_ALL_VENDOR_SUCCESS,
  GET_LIST_VENDOR_FAIL,
  GET_LIST_VENDOR_REQUEST,
  GET_LIST_VENDOR_RESET,
  GET_LIST_VENDOR_SUCCESS,
  GET_SINGLE_TO_CREATE_VENDOR_FAIL,
  GET_SINGLE_TO_CREATE_VENDOR_REQUEST,
  GET_SINGLE_TO_CREATE_VENDOR_RESET,
  GET_SINGLE_TO_CREATE_VENDOR_SUCCESS,
  GET_SINGLE_TO_EDIT_VENDOR_FAIL,
  GET_SINGLE_TO_EDIT_VENDOR_REQUEST,
  GET_SINGLE_TO_EDIT_VENDOR_RESET,
  GET_SINGLE_TO_EDIT_VENDOR_SUCCESS,
  POST_VENDOR_FAIL,
  POST_VENDOR_REQUEST,
  POST_VENDOR_RESET,
  POST_VENDOR_SUCCESS,
  PUT_VENDOR_FAIL,
  PUT_VENDOR_REQUEST,
  PUT_VENDOR_RESET,
  PUT_VENDOR_SUCCESS,
} from "./VendorConstants";

export const getAllVendorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_VENDOR_REQUEST:
      return { loading: true };
    case GET_ALL_VENDOR_SUCCESS:
      return { loading: false, vendor: action.payload };
    case GET_ALL_VENDOR_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_VENDOR_RESET:
      return {};
    default:
      return state;
  }
};

export const getListVendorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_VENDOR_REQUEST:
      return { loading: true };
    case GET_LIST_VENDOR_SUCCESS:
      return { loading: false, listVendor: action.payload };
    case GET_LIST_VENDOR_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_VENDOR_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateVendorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_VENDOR_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_VENDOR_SUCCESS:
      return { loading: false, singleCreateVendor: action.payload };
    case GET_SINGLE_TO_CREATE_VENDOR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_VENDOR_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditVendorReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_VENDOR_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_VENDOR_SUCCESS:
      return { loading: false, singleEditVendor: action.payload };
    case GET_SINGLE_TO_EDIT_VENDOR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_VENDOR_RESET:
      return {};
    default:
      return state;
  }
};

export const postVendorReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_VENDOR_REQUEST:
      return { loading: true };
    case POST_VENDOR_SUCCESS:
      return { loading: false, success: true };
    case POST_VENDOR_FAIL:
      return { loading: false, error: action.payload };
    case POST_VENDOR_RESET:
      return {};
    default:
      return state;
  }
};

export const putVendorReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_VENDOR_REQUEST:
      return { loading: true };
    case PUT_VENDOR_SUCCESS:
      return { loading: false, success: true };
    case PUT_VENDOR_FAIL:
      return { loading: false, error: action.payload };
    case PUT_VENDOR_RESET:
      return {};
    default:
      return state;
  }
};
