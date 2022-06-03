import {
  GET_ALL_EXTRA_FEE_STRUCTURE_FAIL,
  GET_ALL_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_ALL_EXTRA_FEE_STRUCTURE_RESET,
  GET_ALL_EXTRA_FEE_STRUCTURE_SUCCESS,
  GET_LIST_EXTRA_FEE_STRUCTURE_FAIL,
  GET_LIST_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_LIST_EXTRA_FEE_STRUCTURE_RESET,
  GET_LIST_EXTRA_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_SUCCESS,
  POST_EXTRA_FEE_STRUCTURE_FAIL,
  POST_EXTRA_FEE_STRUCTURE_REQUEST,
  POST_EXTRA_FEE_STRUCTURE_RESET,
  POST_EXTRA_FEE_STRUCTURE_SUCCESS,
  PUT_EXTRA_FEE_STRUCTURE_FAIL,
  PUT_EXTRA_FEE_STRUCTURE_REQUEST,
  PUT_EXTRA_FEE_STRUCTURE_RESET,
  PUT_EXTRA_FEE_STRUCTURE_SUCCESS,
} from "./ExtraFeeStructureConstants";

export const getAllExtraFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_EXTRA_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_ALL_EXTRA_FEE_STRUCTURE_SUCCESS:
      return { loading: false, extraFeeStructure: action.payload };
    case GET_ALL_EXTRA_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_EXTRA_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListExtraFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_EXTRA_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_LIST_EXTRA_FEE_STRUCTURE_SUCCESS:
      return { loading: false, listExtraFeeStructure: action.payload };
    case GET_LIST_EXTRA_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_EXTRA_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleCreateExtraFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_SUCCESS:
      return {
        loading: false,
        singleCreateExtraFeeStructure: action.payload,
      };
    case GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const getSingleEditExtraFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_SUCCESS:
      return {
        loading: false,
        singleEditExtraFeeStructure: action.payload,
      };
    case GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const postExtraFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_EXTRA_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case POST_EXTRA_FEE_STRUCTURE_SUCCESS:
      return { loading: false, success: true };
    case POST_EXTRA_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case POST_EXTRA_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};

export const putExtraFeeStructureReducer = (state = {}, action) => {
  switch (action.type) {
    case PUT_EXTRA_FEE_STRUCTURE_REQUEST:
      return { loading: true };
    case PUT_EXTRA_FEE_STRUCTURE_SUCCESS:
      return { loading: false, success: true };
    case PUT_EXTRA_FEE_STRUCTURE_FAIL:
      return { loading: false, error: action.payload };
    case PUT_EXTRA_FEE_STRUCTURE_RESET:
      return {};
    default:
      return state;
  }
};
