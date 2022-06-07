import {
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_FAIL,
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_REQUEST,
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_RESET,
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_SUCCESS,
  GET_ALL_BILL_GENERATE_FAIL,
  GET_ALL_BILL_GENERATE_REQUEST,
  GET_ALL_BILL_GENERATE_RESET,
  GET_ALL_BILL_GENERATE_SUCCESS,
  GET_BULK_EDIT_BILL_GENERATE_FAIL,
  GET_BULK_EDIT_BILL_GENERATE_REQUEST,
  GET_BULK_EDIT_BILL_GENERATE_RESET,
  GET_BULK_EDIT_BILL_GENERATE_SUCCESS,
  GET_EXTRA_FEE_BILL_GENERATE_FAIL,
  GET_EXTRA_FEE_BILL_GENERATE_REQUEST,
  GET_EXTRA_FEE_BILL_GENERATE_RESET,
  GET_EXTRA_FEE_BILL_GENERATE_SUCCESS,
  POST_BILL_GENERATE_FAIL,
  POST_BILL_GENERATE_REQUEST,
  POST_BILL_GENERATE_RESET,
  POST_BILL_GENERATE_SUCCESS,
} from "./BillgenerateConstants";

export const getAllBillGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_BILL_GENERATE_REQUEST:
      return { loading: true };
    case GET_ALL_BILL_GENERATE_SUCCESS:
      return { loading: false, billGenerate: action.payload };
    case GET_ALL_BILL_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_BILL_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllActiveStudentForBillGenerateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_REQUEST:
      return { loading: true };
    case GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_SUCCESS:
      return { loading: false, activeStudentForBillGenerate: action.payload };
    case GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkEditBillGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_EDIT_BILL_GENERATE_REQUEST:
      return { loading: true };
    case GET_BULK_EDIT_BILL_GENERATE_SUCCESS:
      return { loading: false, blukEditBillGenerate: action.payload };
    case GET_BULK_EDIT_BILL_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_EDIT_BILL_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};

export const getExtraFeeBillGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXTRA_FEE_BILL_GENERATE_REQUEST:
      return { loading: true };
    case GET_EXTRA_FEE_BILL_GENERATE_SUCCESS:
      return {
        loading: false,
        extraFeeBillGenerate: action.payload,
        index: action.index,
      };
    case GET_EXTRA_FEE_BILL_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXTRA_FEE_BILL_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postBillGenerateReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_BILL_GENERATE_REQUEST:
      return { loading: true };
    case POST_BILL_GENERATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_BILL_GENERATE_FAIL:
      return { loading: false, error: action.payload };
    case POST_BILL_GENERATE_RESET:
      return {};
    default:
      return state;
  }
};
