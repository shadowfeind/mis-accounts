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
  GET_ACTIVE_STUDENT_ONLY_REQUEST,
  GET_ACTIVE_STUDENT_ONLY_SUCCESS,
  GET_ACTIVE_STUDENT_ONLY_FAIL,
  GET_ACTIVE_STUDENT_ONLY_RESET,
  GET_UNIVERSITY_FACULTY_REQUEST,
  GET_UNIVERSITY_FACULTY_SUCCESS,
  GET_UNIVERSITY_FACULTY_FAIL,
  GET_UNIVERSITY_FACULTY_RESET,
  GET_ACCOUNT_NAME_REQUEST,
  GET_ACCOUNT_NAME_SUCCESS,
  GET_ACCOUNT_NAME_FAIL,
  GET_ACCOUNT_NAME_RESET,
  GET_SINGLE_BILL_PRINT_REQUEST,
  GET_SINGLE_BILL_PRINT_SUCCESS,
  GET_SINGLE_BILL_PRINT_FAIL,
  GET_SINGLE_BILL_PRINT_RESET,
  GET_RECEIPT_PRINT_REQUEST,
  GET_RECEIPT_PRINT_SUCCESS,
  GET_RECEIPT_PRINT_FAIL,
  GET_RECEIPT_PRINT_RESET,
  GET_REVERSE_ENTRY_REQUEST,
  GET_REVERSE_ENTRY_SUCCESS,
  GET_REVERSE_ENTRY_FAIL,
  GET_REVERSE_ENTRY_RESET,
  POST_REVERSE_ENTRY_REQUEST,
  POST_REVERSE_ENTRY_SUCCESS,
  POST_REVERSE_ENTRY_FAIL,
  POST_REVERSE_ENTRY_RESET,
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

export const getActiveStudentOnlyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_STUDENT_ONLY_REQUEST:
      return { loading: true };
    case GET_ACTIVE_STUDENT_ONLY_SUCCESS:
      return { loading: false, activeStudentOnly: action.payload };
    case GET_ACTIVE_STUDENT_ONLY_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACTIVE_STUDENT_ONLY_RESET:
      return {};
    default:
      return state;
  }
};

export const getUniversityFacultyReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_UNIVERSITY_FACULTY_REQUEST:
      return { loading: true };
    case GET_UNIVERSITY_FACULTY_SUCCESS:
      return { loading: false, universityFaculty: action.payload };
    case GET_UNIVERSITY_FACULTY_FAIL:
      return { loading: false, error: action.payload };
    case GET_UNIVERSITY_FACULTY_RESET:
      return {};
    default:
      return state;
  }
};

export const getAccountNameReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACCOUNT_NAME_REQUEST:
      return { loading: true };
    case GET_ACCOUNT_NAME_SUCCESS:
      return { loading: false, accountName: action.payload };
    case GET_ACCOUNT_NAME_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACCOUNT_NAME_RESET:
      return {};
    default:
      return state;
  }
};

export const getReceiptPrintReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RECEIPT_PRINT_REQUEST:
      return { loading: true };
    case GET_RECEIPT_PRINT_SUCCESS:
      return { loading: false, receiptPrint: action.payload };
    case GET_RECEIPT_PRINT_FAIL:
      return { loading: false, error: action.payload };
    case GET_RECEIPT_PRINT_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleBillPrintReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_BILL_PRINT_REQUEST:
      return { loading: true };
    case GET_SINGLE_BILL_PRINT_SUCCESS:
      return { loading: false, singleBillPrint: action.payload };
    case GET_SINGLE_BILL_PRINT_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_BILL_PRINT_RESET:
      return {};
    default:
      return state;
  }
};

export const getReverseEntryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_REVERSE_ENTRY_REQUEST:
      return { loading: true };
    case GET_REVERSE_ENTRY_SUCCESS:
      return { loading: false, reverseEntryPrint: action.payload };
    case GET_REVERSE_ENTRY_FAIL:
      return { loading: false, error: action.payload };
    case GET_REVERSE_ENTRY_RESET:
      return {};
    default:
      return state;
  }
};

export const postReverseEntryReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_REVERSE_ENTRY_REQUEST:
      return { loading: true };
    case POST_REVERSE_ENTRY_SUCCESS:
      return { loading: false, success: true };
    case POST_REVERSE_ENTRY_FAIL:
      return { loading: false, error: action.payload };
    case POST_REVERSE_ENTRY_RESET:
      return {};
    default:
      return state;
  }
};
