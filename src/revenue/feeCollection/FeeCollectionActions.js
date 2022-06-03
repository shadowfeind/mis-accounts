import { axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_FEE_COLLECTION_FAIL,
  GET_ALL_FEE_COLLECTION_REQUEST,
  GET_ALL_FEE_COLLECTION_SUCCESS,
  GET_LIST_FEE_COLLECTION_FAIL,
  GET_LIST_FEE_COLLECTION_REQUEST,
  GET_LIST_FEE_COLLECTION_SUCCESS,
  GET_PRINT_FEE_COLLECTION_FAIL,
  GET_PRINT_FEE_COLLECTION_REQUEST,
  GET_PRINT_FEE_COLLECTION_SUCCESS,
} from "./FeeCollectionConstants";

export const getAllFeeCollectionAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_FEE_COLLECTION_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/FeeCollection/GetAllFeeCollection`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_FEE_COLLECTION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_FEE_COLLECTION_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListFeeCollectionAction =
  (year, startDate, endDate) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_FEE_COLLECTION_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/FeeCollection/GetListFeeCollection?idFiscalyear=${year}&startDate=${startDate}&endDate=${endDate}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_FEE_COLLECTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_FEE_COLLECTION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getPrintFeeCollectionAction =
  (startDate, endDate, year) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRINT_FEE_COLLECTION_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/FeeCollection/GetPrintFeeCollection?startDate=${startDate}&endDate=${endDate}&idFiscalYear=${year}`,
        tokenConfig()
      );

      dispatch({ type: GET_PRINT_FEE_COLLECTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PRINT_FEE_COLLECTION_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
