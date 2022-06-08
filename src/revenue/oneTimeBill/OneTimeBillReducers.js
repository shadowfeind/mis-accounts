import {
  GET_ALL_ONE_TIME_BILL_FAIL,
  GET_ALL_ONE_TIME_BILL_REQUEST,
  GET_ALL_ONE_TIME_BILL_RESET,
  GET_ALL_ONE_TIME_BILL_SUCCESS,
  GET_BULK_EDIT_ONE_TIME_BILL_FAIL,
  GET_BULK_EDIT_ONE_TIME_BILL_REQUEST,
  GET_BULK_EDIT_ONE_TIME_BILL_RESET,
  GET_BULK_EDIT_ONE_TIME_BILL_SUCCESS,
  POST_ONE_TIME_BILL_FAIL,
  POST_ONE_TIME_BILL_REQUEST,
  POST_ONE_TIME_BILL_RESET,
  POST_ONE_TIME_BILL_SUCCESS,
} from "./OneTimeBillConstants";

export const getAllOneTimeBillReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ONE_TIME_BILL_REQUEST:
      return { loading: true };
    case GET_ALL_ONE_TIME_BILL_SUCCESS:
      return { loading: false, ontTimeBill: action.payload };
    case GET_ALL_ONE_TIME_BILL_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ONE_TIME_BILL_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkEditOneTimeBillReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_EDIT_ONE_TIME_BILL_REQUEST:
      return { loading: true };
    case GET_BULK_EDIT_ONE_TIME_BILL_SUCCESS:
      return { loading: false, blukEditOneTimeBill: action.payload };
    case GET_BULK_EDIT_ONE_TIME_BILL_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_EDIT_ONE_TIME_BILL_RESET:
      return {};
    default:
      return state;
  }
};

export const postOneTimeBillReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ONE_TIME_BILL_REQUEST:
      return { loading: true };
    case POST_ONE_TIME_BILL_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_ONE_TIME_BILL_FAIL:
      return { loading: false, error: action.payload };
    case POST_ONE_TIME_BILL_RESET:
      return {};
    default:
      return state;
  }
};
