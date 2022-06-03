import {
  GET_ALL_MONTHLY_FEE_LINK_FAIL,
  GET_ALL_MONTHLY_FEE_LINK_REQUEST,
  GET_ALL_MONTHLY_FEE_LINK_RESET,
  GET_ALL_MONTHLY_FEE_LINK_SUCCESS,
  GET_LIST_MONTHLY_FEE_LINK_FAIL,
  GET_LIST_MONTHLY_FEE_LINK_REQUEST,
  GET_LIST_MONTHLY_FEE_LINK_RESET,
  GET_LIST_MONTHLY_FEE_LINK_SUCCESS,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_FAIL,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_REQUEST,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_RESET,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_SUCCESS,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_FAIL,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_REQUEST,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_RESET,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_SUCCESS,
  POST_MONTHLY_FEE_LINK_FAIL,
  POST_MONTHLY_FEE_LINK_REQUEST,
  POST_MONTHLY_FEE_LINK_RESET,
  POST_MONTHLY_FEE_LINK_SUCCESS,
  PUT_MONTHLY_FEE_LINK_FAIL,
  PUT_MONTHLY_FEE_LINK_REQUEST,
  PUT_MONTHLY_FEE_LINK_RESET,
  PUT_MONTHLY_FEE_LINK_SUCCESS,
} from "./MonthlyFeeLinkConstants";

export const getAllMonthlyFeeLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_MONTHLY_FEE_LINK_REQUEST:
      return { loading: true };
    case GET_ALL_MONTHLY_FEE_LINK_SUCCESS:
      return { loading: false, monthlyFeeLink: action.payload };
    case GET_ALL_MONTHLY_FEE_LINK_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_MONTHLY_FEE_LINK_RESET:
      return {};
    default:
      return state;
  }
};

export const getListMonthlyFeeLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_MONTHLY_FEE_LINK_REQUEST:
      return { loading: true };
    case GET_LIST_MONTHLY_FEE_LINK_SUCCESS:
      return { loading: false, listMonthlyFeeLink: action.payload };
    case GET_LIST_MONTHLY_FEE_LINK_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_MONTHLY_FEE_LINK_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateMonthlyFeeLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_SUCCESS:
      return {
        loading: false,
        singleCreateMonthlyFeeLink: action.payload,
      };
    case GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditMonthlyFeeLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_SUCCESS:
      return {
        loading: false,
        singleEditMonthlyFeeLink: action.payload,
      };
    case GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_RESET:
      return {};
    default:
      return state;
  }
};

export const postMonthlyFeeLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_MONTHLY_FEE_LINK_REQUEST:
      return { loading: true };
    case POST_MONTHLY_FEE_LINK_SUCCESS:
      return { loading: false, success: true };
    case POST_MONTHLY_FEE_LINK_FAIL:
      return { loading: false, error: action.payload };
    case POST_MONTHLY_FEE_LINK_RESET:
      return {};
    default:
      return state;
  }
};

export const putMonthlyFeeLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_MONTHLY_FEE_LINK_REQUEST:
      return { loading: true };
    case PUT_MONTHLY_FEE_LINK_SUCCESS:
      return { loading: false, success: true };
    case PUT_MONTHLY_FEE_LINK_FAIL:
      return { loading: false, error: action.payload };
    case PUT_MONTHLY_FEE_LINK_RESET:
      return {};
    default:
      return state;
  }
};
