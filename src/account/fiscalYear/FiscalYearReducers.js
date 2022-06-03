import {
  GET_ALL_FISCAL_YEAR_FAIL,
  GET_ALL_FISCAL_YEAR_REQUEST,
  GET_ALL_FISCAL_YEAR_RESET,
  GET_ALL_FISCAL_YEAR_SUCCESS,
  GET_LIST_FISCAL_YEAR_FAIL,
  GET_LIST_FISCAL_YEAR_REQUEST,
  GET_LIST_FISCAL_YEAR_RESET,
  GET_LIST_FISCAL_YEAR_SUCCESS,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_FAIL,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_REQUEST,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_RESET,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_SUCCESS,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_FAIL,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_REQUEST,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_RESET,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_SUCCESS,
  POST_FISCAL_YEAR_FAIL,
  POST_FISCAL_YEAR_REQUEST,
  POST_FISCAL_YEAR_RESET,
  POST_FISCAL_YEAR_SUCCESS,
  PUT_FISCAL_YEAR_FAIL,
  PUT_FISCAL_YEAR_REQUEST,
  PUT_FISCAL_YEAR_RESET,
  PUT_FISCAL_YEAR_SUCCESS,
} from "./FiscalYearContants";

export const getAllFiscalYearReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_FISCAL_YEAR_REQUEST:
      return { loading: true };
    case GET_ALL_FISCAL_YEAR_SUCCESS:
      return { loading: false, fiscalYear: action.payload };
    case GET_ALL_FISCAL_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_FISCAL_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getListFiscalYearReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_FISCAL_YEAR_REQUEST:
      return { loading: true };
    case GET_LIST_FISCAL_YEAR_SUCCESS:
      return { loading: false, listFiscalYear: action.payload };
    case GET_LIST_FISCAL_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_FISCAL_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateFiscalYearReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_FISCAL_YEAR_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_FISCAL_YEAR_SUCCESS:
      return { loading: false, singleCreateFiscalYear: action.payload };
    case GET_SINGLE_TO_CREATE_FISCAL_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_FISCAL_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditFiscalYearReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_FISCAL_YEAR_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_FISCAL_YEAR_SUCCESS:
      return { loading: false, singleEditFiscalYear: action.payload };
    case GET_SINGLE_TO_EDIT_FISCAL_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_FISCAL_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const postFiscalYearReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_FISCAL_YEAR_REQUEST:
      return { loading: true };
    case POST_FISCAL_YEAR_SUCCESS:
      return { loading: false, success: true };
    case POST_FISCAL_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case POST_FISCAL_YEAR_RESET:
      return {};
    default:
      return state;
  }
};

export const putFiscalYearReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_FISCAL_YEAR_REQUEST:
      return { loading: true };
    case PUT_FISCAL_YEAR_SUCCESS:
      return { loading: false, success: true };
    case PUT_FISCAL_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case PUT_FISCAL_YEAR_RESET:
      return {};
    default:
      return state;
  }
};
