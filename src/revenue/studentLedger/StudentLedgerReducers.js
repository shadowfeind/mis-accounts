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
