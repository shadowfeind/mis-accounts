import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ACCOUNT_HEADER_FAIL,
  GET_ALL_ACCOUNT_HEADER_REQUEST,
  GET_ALL_ACCOUNT_HEADER_SUCCESS,
  GET_LIST_ACCOUNT_HEADER_FAIL,
  GET_LIST_ACCOUNT_HEADER_REQUEST,
  GET_LIST_ACCOUNT_HEADER_SUCCESS,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_FAIL,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_REQUEST,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_SUCCESS,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_FAIL,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_REQUEST,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_SUCCESS,
  POST_ACCOUNT_HEADER_FAIL,
  POST_ACCOUNT_HEADER_REQUEST,
  POST_ACCOUNT_HEADER_SUCCESS,
  PUT_ACCOUNT_HEADER_FAIL,
  PUT_ACCOUNT_HEADER_REQUEST,
  PUT_ACCOUNT_HEADER_SUCCESS,
} from "./AccountHeaderConstants";

export const getAllAccountHeaderAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACCOUNT_HEADER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountHeader/GetAllAccountHeader`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACCOUNT_HEADER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACCOUNT_HEADER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAccountHeaderAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ACCOUNT_HEADER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountHeader/GetListAccountHeader`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_ACCOUNT_HEADER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ACCOUNT_HEADER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateAccountHeaderAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountHeader/GetSingleToCreateAccountHeader`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditAccountHeaderAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountHeader/GetSingleToEditAccountHeader/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postAccountHeaderAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACCOUNT_HEADER_REQUEST });

    const jsonData = JSON.stringify({ accountHeaderModel: account });

    const { data } = await axiosInstance.post(
      `/api/AccountHeader/PostAccountHeader`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: POST_ACCOUNT_HEADER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_ACCOUNT_HEADER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putAccountHeaderAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: PUT_ACCOUNT_HEADER_REQUEST });

    const jsonData = JSON.stringify({ accountHeaderModel: account });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log(jsonData);
    const { data } = await axiosInstance.put(
      `${API_URL}/api/AccountHeader/PutAccountHeader`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: PUT_ACCOUNT_HEADER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PUT_ACCOUNT_HEADER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
