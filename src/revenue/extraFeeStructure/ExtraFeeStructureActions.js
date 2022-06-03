import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_EXTRA_FEE_STRUCTURE_FAIL,
  GET_ALL_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_ALL_EXTRA_FEE_STRUCTURE_SUCCESS,
  GET_LIST_EXTRA_FEE_STRUCTURE_FAIL,
  GET_LIST_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_LIST_EXTRA_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_SUCCESS,
  POST_EXTRA_FEE_STRUCTURE_FAIL,
  POST_EXTRA_FEE_STRUCTURE_REQUEST,
  POST_EXTRA_FEE_STRUCTURE_SUCCESS,
  PUT_EXTRA_FEE_STRUCTURE_FAIL,
  PUT_EXTRA_FEE_STRUCTURE_REQUEST,
  PUT_EXTRA_FEE_STRUCTURE_SUCCESS,
} from "./ExtraFeeStructureConstants";

export const getAllExtraFeeStructureAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_EXTRA_FEE_STRUCTURE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountExtraFeeStructure/GetAllAccountExtraFeeStructure`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_EXTRA_FEE_STRUCTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_EXTRA_FEE_STRUCTURE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListExtraFeeStructureAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_EXTRA_FEE_STRUCTURE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountExtraFeeStructure/GetListAccountExtraFeeStructure`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_EXTRA_FEE_STRUCTURE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_EXTRA_FEE_STRUCTURE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateExtraFeeStructureAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountExtraFeeStructure/GetSingleToCreateAccountExtraFeeStructure`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleEditExtraFeeStructureAction =
  (id) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountExtraFeeStructure/GetSingleToEditAccountExtraFeeStructure/${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postExtraFeeStructureAction =
  (extraFeeStructure) => async (dispatch) => {
    try {
      dispatch({ type: POST_EXTRA_FEE_STRUCTURE_REQUEST });

      const jsonData = JSON.stringify({
        extraFeeStructureModel: extraFeeStructure,
      });

      console.log(jsonData);
      const { data } = await axiosInstance.post(
        `/api/AccountExtraFeeStructure/PostAccountExtraFeeStructure`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_EXTRA_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_EXTRA_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const putExtraFeeStructureAction =
  (extraFeeStructure) => async (dispatch) => {
    try {
      dispatch({ type: PUT_EXTRA_FEE_STRUCTURE_REQUEST });

      const jsonData = JSON.stringify({
        extraFeeStructureModel: extraFeeStructure,
      });

      const { data } = await axiosInstance.put(
        `/api/AccountExtraFeeStructure/PutAccountExtraFeeStructure`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: PUT_EXTRA_FEE_STRUCTURE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PUT_EXTRA_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
