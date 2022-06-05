import {
  GET_ALL_ONE_TIME_BILL_PRINT_FAIL,
  GET_ALL_ONE_TIME_BILL_PRINT_REQUEST,
  GET_ALL_ONE_TIME_BILL_PRINT_RESET,
  GET_ALL_ONE_TIME_BILL_PRINT_SUCCESS,
  GET_PRINT_ONE_TIME_BILL_PRINT_FAIL,
  GET_PRINT_ONE_TIME_BILL_PRINT_REQUEST,
  GET_PRINT_ONE_TIME_BILL_PRINT_RESET,
  GET_PRINT_ONE_TIME_BILL_PRINT_SUCCESS,
} from "./OneTimeBillPrintConstants";

export const getAllOneTimeBillPrintReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ONE_TIME_BILL_PRINT_REQUEST:
      return { loading: true };
    case GET_ALL_ONE_TIME_BILL_PRINT_SUCCESS:
      return { loading: false, oneTimeBillPrint: action.payload };
    case GET_ALL_ONE_TIME_BILL_PRINT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ONE_TIME_BILL_PRINT_RESET:
      return {};
    default:
      return state;
  }
};

export const getPrintOneTimeBillPrintReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRINT_ONE_TIME_BILL_PRINT_REQUEST:
      return { loading: true };
    case GET_PRINT_ONE_TIME_BILL_PRINT_SUCCESS:
      return { loading: false, printOneTimeBill: action.payload };
    case GET_PRINT_ONE_TIME_BILL_PRINT_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRINT_ONE_TIME_BILL_PRINT_RESET:
      return {};
    default:
      return state;
  }
};
