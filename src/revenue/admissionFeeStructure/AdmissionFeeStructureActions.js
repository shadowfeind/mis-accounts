import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ADMISSION_FEE_STRUCTURE_FAIL,
  GET_ALL_ADMISSION_FEE_STRUCTURE_REQUEST,
  GET_ALL_ADMISSION_FEE_STRUCTURE_SUCCESS,
  GET_LIST_ADMISSION_FEE_STRUCTURE_FAIL,
  GET_LIST_ADMISSION_FEE_STRUCTURE_REQUEST,
  GET_LIST_ADMISSION_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_SUCCESS,
  POST_ADMISSION_FEE_STRUCTURE_FAIL,
  POST_ADMISSION_FEE_STRUCTURE_REQUEST,
  POST_ADMISSION_FEE_STRUCTURE_SUCCESS,
  PUT_ADMISSION_FEE_STRUCTURE_FAIL,
  PUT_ADMISSION_FEE_STRUCTURE_REQUEST,
  PUT_ADMISSION_FEE_STRUCTURE_SUCCESS,
} from "./AdmissionFeeStructureConstants";

export const getAllAdmissionFeeStructureAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ADMISSION_FEE_STRUCTURE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountAdmissionFeeStructure/GetAllAccountAdmissionFeeStructure`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ADMISSION_FEE_STRUCTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ADMISSION_FEE_STRUCTURE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAdmissionFeeStructureAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ADMISSION_FEE_STRUCTURE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountAdmissionFeeStructure/GetListAccountAdmissionFeeStructure`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_ADMISSION_FEE_STRUCTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ADMISSION_FEE_STRUCTURE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateAdmissionFeeStructureAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountAdmissionFeeStructure/GetSingleToCreateAccountAdmissionFeeStructure`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleEditAdmissionFeeStructureAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountAdmissionFeeStructure/GetSingleToEditAccountAdmissionFeeStructure/${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postAdmissionFeeStructureAction =
  (admissionFeeStructure) => async (dispatch) => {
    try {
      dispatch({ type: POST_ADMISSION_FEE_STRUCTURE_REQUEST });

      const jsonData = JSON.stringify({
        admissionFeeStructureModel: admissionFeeStructure,
      });

      const { data } = await axiosInstance.post(
        `/api/AccountAdmissionFeeStructure/PostAccountAdmissionFeeStructure`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_ADMISSION_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_ADMISSION_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const putAdmissionFeeStructureAction =
  (admissionFeeStructure) => async (dispatch) => {
    try {
      dispatch({ type: PUT_ADMISSION_FEE_STRUCTURE_REQUEST });

      const jsonData = JSON.stringify({
        admissionFeeStructureModel: admissionFeeStructure,
      });

      const { data } = await axiosInstance.put(
        `/api/AccountAdmissionFeeStructure/PutAccountAdmissionFeeStructure`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: PUT_ADMISSION_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PUT_ADMISSION_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
