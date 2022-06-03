import {
  GET_ALL_FEE_COLLECTION_FAIL,
  GET_ALL_FEE_COLLECTION_REQUEST,
  GET_ALL_FEE_COLLECTION_RESET,
  GET_ALL_FEE_COLLECTION_SUCCESS,
  GET_LIST_FEE_COLLECTION_FAIL,
  GET_LIST_FEE_COLLECTION_REQUEST,
  GET_LIST_FEE_COLLECTION_RESET,
  GET_LIST_FEE_COLLECTION_SUCCESS,
  GET_PRINT_FEE_COLLECTION_FAIL,
  GET_PRINT_FEE_COLLECTION_REQUEST,
  GET_PRINT_FEE_COLLECTION_RESET,
  GET_PRINT_FEE_COLLECTION_SUCCESS,
} from "./FeeCollectionConstants";

export const getAllFeeCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_FEE_COLLECTION_REQUEST:
      return { loading: true };
    case GET_ALL_FEE_COLLECTION_SUCCESS:
      return { loading: false, feeCollection: action.payload };
    case GET_ALL_FEE_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_FEE_COLLECTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getListFeeCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_FEE_COLLECTION_REQUEST:
      return { loading: true };
    case GET_LIST_FEE_COLLECTION_SUCCESS:
      return { loading: false, listFeeCollection: action.payload };
    case GET_LIST_FEE_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_FEE_COLLECTION_RESET:
      return {};
    default:
      return state;
  }
};

export const getPrintFeeCollectionReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRINT_FEE_COLLECTION_REQUEST:
      return { loading: true };
    case GET_PRINT_FEE_COLLECTION_SUCCESS:
      return { loading: false, printFeeCollection: action.payload };
    case GET_PRINT_FEE_COLLECTION_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRINT_FEE_COLLECTION_RESET:
      return {};
    default:
      return state;
  }
};
