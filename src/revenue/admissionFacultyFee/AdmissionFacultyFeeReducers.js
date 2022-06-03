import {
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
} from "./AdmissionFacultyFeeConstants";

export const getAllAdmissionFacultyFeeStructureReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS:
      return { loading: false, admissionFacultyFeeStructure: action.payload };
    case GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListAdmissionFacultyFeeStructureReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS:
      return {
        loading: false,
        listAdmissionFacultyFeeStructure: action.payload,
      };
    case GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateAdmissionFacultyFeeStructureReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS:
      return {
        loading: false,
        singleCreateAdmissionFacultyFeeStructure: action.payload,
      };
    case GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditAdmissionFacultyFeeStructureReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS:
      return {
        loading: false,
        singleEditAdmissionFacultyFeeStructure: action.payload,
      };
    case GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const postAdmissionFacultyFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case POST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS:
      return { loading: false, success: true };
    case POST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case POST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const putAdmissionFacultyFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case PUT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS:
      return { loading: false, success: true };
    case PUT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case PUT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};
