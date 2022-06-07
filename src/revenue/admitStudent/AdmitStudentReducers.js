import {
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_FAIL,
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_REQUEST,
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_RESET,
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_SUCCESS,
  GET_ALL_ADMIT_STUDENT_FAIL,
  GET_ALL_ADMIT_STUDENT_REQUEST,
  GET_ALL_ADMIT_STUDENT_RESET,
  GET_ALL_ADMIT_STUDENT_SUCCESS,
  GET_BULK_EDIT_ADMIT_STUDENT_FAIL,
  GET_BULK_EDIT_ADMIT_STUDENT_REQUEST,
  GET_BULK_EDIT_ADMIT_STUDENT_RESET,
  GET_BULK_EDIT_ADMIT_STUDENT_SUCCESS,
  GET_EXTRA_FEE_ADMIT_STUDENT_FAIL,
  GET_EXTRA_FEE_ADMIT_STUDENT_REQUEST,
  GET_EXTRA_FEE_ADMIT_STUDENT_RESET,
  GET_EXTRA_FEE_ADMIT_STUDENT_SUCCESS,
  POST_ADMIT_STUDENT_FAIL,
  POST_ADMIT_STUDENT_REQUEST,
  POST_ADMIT_STUDENT_RESET,
  POST_ADMIT_STUDENT_SUCCESS,
} from "./AdmitStudentConstants";

export const getAllAdmitStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_ADMIT_STUDENT_REQUEST:
      return { loading: true };
    case GET_ALL_ADMIT_STUDENT_SUCCESS:
      return { loading: false, admitStudent: action.payload };
    case GET_ALL_ADMIT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ADMIT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getAllActiveStudentForLedgeronlyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_STUDENT_FOR_LEDGERONLY_REQUEST:
      return { loading: true };
    case GET_ACTIVE_STUDENT_FOR_LEDGERONLY_SUCCESS:
      return { loading: false, activeStudentForLedgeronly: action.payload };
    case GET_ACTIVE_STUDENT_FOR_LEDGERONLY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACTIVE_STUDENT_FOR_LEDGERONLY_RESET:
      return {};
    default:
      return state;
  }
};

export const getBulkEditAdmitStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BULK_EDIT_ADMIT_STUDENT_REQUEST:
      return { loading: true };
    case GET_BULK_EDIT_ADMIT_STUDENT_SUCCESS:
      return { loading: false, blukEditAdmitStudent: action.payload };
    case GET_BULK_EDIT_ADMIT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_BULK_EDIT_ADMIT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const getExtraFeeAdmitStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EXTRA_FEE_ADMIT_STUDENT_REQUEST:
      return { loading: true };
    case GET_EXTRA_FEE_ADMIT_STUDENT_SUCCESS:
      return {
        loading: false,
        extraFeeStudentAdmit: action.payload,
        index: action.index,
      };
    case GET_EXTRA_FEE_ADMIT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXTRA_FEE_ADMIT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};

export const postAdmitStudentReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ADMIT_STUDENT_REQUEST:
      return { loading: true };
    case POST_ADMIT_STUDENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_ADMIT_STUDENT_FAIL:
      return { loading: false, error: action.payload };
    case POST_ADMIT_STUDENT_RESET:
      return {};
    default:
      return state;
  }
};
