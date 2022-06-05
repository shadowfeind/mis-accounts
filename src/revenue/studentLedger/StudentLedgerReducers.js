import {
  GET_ALL_STUDENT_LEDGER_FAIL,
  GET_ALL_STUDENT_LEDGER_REQUEST,
  GET_ALL_STUDENT_LEDGER_RESET,
  GET_ALL_STUDENT_LEDGER_SUCCESS,
  GET_LIST_STUDENT_LEDGER_FAIL,
  GET_LIST_STUDENT_LEDGER_REQUEST,
  GET_LIST_STUDENT_LEDGER_RESET,
  GET_LIST_STUDENT_LEDGER_SUCCESS,
  POST_STUDENT_LEDGER_FAIL,
  POST_STUDENT_LEDGER_REQUEST,
  POST_STUDENT_LEDGER_RESET,
  POST_STUDENT_LEDGER_SUCCESS,
} from "./StudentLedgerConstants";

export const getAllStudentLedgerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STUDENT_LEDGER_REQUEST:
      return { loading: true };
    case GET_ALL_STUDENT_LEDGER_SUCCESS:
      return { loading: false, studentLedger: action.payload };
    case GET_ALL_STUDENT_LEDGER_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDENT_LEDGER_RESET:
      return {};
    default:
      return state;
  }
};

export const getListStudentLedgerReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_STUDENT_LEDGER_REQUEST:
      return { loading: true };
    case GET_LIST_STUDENT_LEDGER_SUCCESS:
      return { loading: false, listStudentLedger: action.payload };
    case GET_LIST_STUDENT_LEDGER_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_STUDENT_LEDGER_RESET:
      return {};
    default:
      return state;
  }
};

export const postStudentLedgerReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_STUDENT_LEDGER_REQUEST:
      return { loading: true };
    case POST_STUDENT_LEDGER_SUCCESS:
      return { loading: false, success: true };
    case POST_STUDENT_LEDGER_FAIL:
      return { loading: false, error: action.payload };
    case POST_STUDENT_LEDGER_RESET:
      return {};
    default:
      return state;
  }
};
