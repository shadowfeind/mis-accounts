import {
  GET_ALL_STUDENT_DUE_FAIL,
  GET_ALL_STUDENT_DUE_REQUEST,
  GET_ALL_STUDENT_DUE_RESET,
  GET_ALL_STUDENT_DUE_SUCCESS,
  GET_LIST_STUDENT_DUE_FAIL,
  GET_LIST_STUDENT_DUE_REQUEST,
  GET_LIST_STUDENT_DUE_RESET,
  GET_LIST_STUDENT_DUE_SUCCESS,
  GET_PRINT_STUDENT_DUE_FAIL,
  GET_PRINT_STUDENT_DUE_REQUEST,
  GET_PRINT_STUDENT_DUE_RESET,
  GET_PRINT_STUDENT_DUE_SUCCESS,
} from "./StudentDueConstants";

export const getAllStudentDueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_STUDENT_DUE_REQUEST:
      return { loading: true };
    case GET_ALL_STUDENT_DUE_SUCCESS:
      return { loading: false, studentDue: action.payload };
    case GET_ALL_STUDENT_DUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_STUDENT_DUE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListStudentDueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_STUDENT_DUE_REQUEST:
      return { loading: true };
    case GET_LIST_STUDENT_DUE_SUCCESS:
      return { loading: false, listStudentDue: action.payload };
    case GET_LIST_STUDENT_DUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_STUDENT_DUE_RESET:
      return {};
    default:
      return state;
  }
};

export const getPrintStudentDueReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PRINT_STUDENT_DUE_REQUEST:
      return { loading: true };
    case GET_PRINT_STUDENT_DUE_SUCCESS:
      return { loading: false, printStudentDue: action.payload };
    case GET_PRINT_STUDENT_DUE_FAIL:
      return { loading: false, error: action.payload };
    case GET_PRINT_STUDENT_DUE_RESET:
      return {};
    default:
      return state;
  }
};
