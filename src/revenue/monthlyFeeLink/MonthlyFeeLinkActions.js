import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_MONTHLY_FEE_LINK_FAIL,
  GET_ALL_MONTHLY_FEE_LINK_REQUEST,
  GET_ALL_MONTHLY_FEE_LINK_SUCCESS,
  GET_LIST_MONTHLY_FEE_LINK_FAIL,
  GET_LIST_MONTHLY_FEE_LINK_REQUEST,
  GET_LIST_MONTHLY_FEE_LINK_SUCCESS,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_FAIL,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_REQUEST,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_SUCCESS,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_FAIL,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_REQUEST,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_SUCCESS,
  POST_MONTHLY_FEE_LINK_FAIL,
  POST_MONTHLY_FEE_LINK_REQUEST,
  POST_MONTHLY_FEE_LINK_SUCCESS,
  PUT_MONTHLY_FEE_LINK_FAIL,
  PUT_MONTHLY_FEE_LINK_REQUEST,
  PUT_MONTHLY_FEE_LINK_SUCCESS,
} from "./MonthlyFeeLinkConstants";

export const getAllMonthlyFeeLinkAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_MONTHLY_FEE_LINK_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountMonthlyFeeLink/GetAllAccountMonthlyFeeLink`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_MONTHLY_FEE_LINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_MONTHLY_FEE_LINK_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListMonthlyFeeLinkAction =
  (year, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_MONTHLY_FEE_LINK_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountMonthlyFeeLink/GetListAccountMonthlyFeeLink?idAcademicYear=${year}&level=${classId}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_MONTHLY_FEE_LINK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_MONTHLY_FEE_LINK_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleCreateMonthlyFeeLinkAction =
  (year, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountMonthlyFeeLink/GetSingleToCreateAccountMonthlyFeeLink?idAcademicYear=${year}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleEditMonthlyFeeLinkAction =
  (id, year, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountMonthlyFeeLink/GetSingleToEditAccountMonthlyFeeLink/${id}?idAcademicYear=${year}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postMonthlyFeeLinkAction =
  (ddlFeeStructure, checked) => async (dispatch) => {
    try {
      dispatch({ type: POST_MONTHLY_FEE_LINK_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: ddlFeeStructure,
        checked,
      });

      console.log(jsonData);
      const { data } = await axiosInstance.post(
        `/api/AccountMonthlyFeeLink/PostAccountMonthlyFeeLink`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_MONTHLY_FEE_LINK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_MONTHLY_FEE_LINK_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const putMonthlyFeeLinkAction = (monthlyFeeLink) => async (dispatch) => {
  try {
    dispatch({ type: PUT_MONTHLY_FEE_LINK_REQUEST });

    const jsonData = JSON.stringify({
      dbModel: monthlyFeeLink,
    });

    const { data } = await axiosInstance.put(
      `/api/AccountMonthlyFeeLink/PutAccountMonthlyFeeLink`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: PUT_MONTHLY_FEE_LINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PUT_MONTHLY_FEE_LINK_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
