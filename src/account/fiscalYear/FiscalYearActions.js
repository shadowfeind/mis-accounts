import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_FISCAL_YEAR_FAIL,
  GET_ALL_FISCAL_YEAR_REQUEST,
  GET_ALL_FISCAL_YEAR_SUCCESS,
  GET_LIST_FISCAL_YEAR_FAIL,
  GET_LIST_FISCAL_YEAR_REQUEST,
  GET_LIST_FISCAL_YEAR_SUCCESS,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_FAIL,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_REQUEST,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_SUCCESS,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_FAIL,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_REQUEST,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_SUCCESS,
  POST_FISCAL_YEAR_FAIL,
  POST_FISCAL_YEAR_REQUEST,
  POST_FISCAL_YEAR_SUCCESS,
  PUT_FISCAL_YEAR_FAIL,
  PUT_FISCAL_YEAR_REQUEST,
  PUT_FISCAL_YEAR_SUCCESS,
} from "./FiscalYearContants";

export const getAllFiscalYearAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FISCAL_YEAR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/FiscalYear/GetAllFiscalYear`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_FISCAL_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FISCAL_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListFiscalYearAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_FISCAL_YEAR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/FiscalYear/GetListFiscalYear`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_FISCAL_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_FISCAL_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateFiscalYearAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_FISCAL_YEAR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/FiscalYear/GetSingleToCreateFiscalYear`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_CREATE_FISCAL_YEAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_FISCAL_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditFiscalYearAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_FISCAL_YEAR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/FiscalYear/GetSingleToEditFiscalYear/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_FISCAL_YEAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_FISCAL_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postFiscalYearAction = (fiscal) => async (dispatch) => {
  try {
    dispatch({ type: POST_FISCAL_YEAR_REQUEST });

    const jsonData = JSON.stringify({ fiscalYearModel: fiscal });

    const { data } = await axiosInstance.post(
      `/api/FiscalYear/PostFiscalYear`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: POST_FISCAL_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_FISCAL_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putFiscalYearAction = (fiscal) => async (dispatch) => {
  try {
    dispatch({ type: PUT_FISCAL_YEAR_REQUEST });

    const jsonData = JSON.stringify({ fiscalYearModel: fiscal });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log(jsonData);
    const { data } = await axiosInstance.put(
      `${API_URL}/api/FiscalYear/PutFiscalYear`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: PUT_FISCAL_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PUT_FISCAL_YEAR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
