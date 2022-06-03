import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ACCOUNT_TYPE_FAIL,
  GET_ALL_ACCOUNT_TYPE_REQUEST,
  GET_ALL_ACCOUNT_TYPE_SUCCESS,
  GET_LIST_ACCOUNT_TYPE_FAIL,
  GET_LIST_ACCOUNT_TYPE_REQUEST,
  GET_LIST_ACCOUNT_TYPE_SUCCESS,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_FAIL,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_REQUEST,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_SUCCESS,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_FAIL,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_REQUEST,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_SUCCESS,
  POST_ACCOUNT_TYPE_FAIL,
  POST_ACCOUNT_TYPE_REQUEST,
  POST_ACCOUNT_TYPE_SUCCESS,
  PUT_ACCOUNT_TYPE_FAIL,
  PUT_ACCOUNT_TYPE_REQUEST,
  PUT_ACCOUNT_TYPE_SUCCESS,
} from "./AccountTypeConstants";

export const getAllAccountTypeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACCOUNT_TYPE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountType/GetAllAccountType`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACCOUNT_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACCOUNT_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAccountTypeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ACCOUNT_TYPE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountType/GetListAccountType`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_ACCOUNT_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ACCOUNT_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateAccountTypeAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountType/GetSingleToCreateAccountType`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditAccountTypeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountType/GetSingleToEditAccountType/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postAccountTypeAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACCOUNT_TYPE_REQUEST });

    const jsonData = JSON.stringify({ accountTypeModel: account });

    const { data } = await axiosInstance.post(
      `/api/AccountType/PostAccountType`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: POST_ACCOUNT_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_ACCOUNT_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putAccountTypeAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: PUT_ACCOUNT_TYPE_REQUEST });

    const jsonData = JSON.stringify({ accountTypeModel: account });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log(jsonData);
    const { data } = await axiosInstance.put(
      `${API_URL}/api/AccountType/PustAccountType`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: PUT_ACCOUNT_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PUT_ACCOUNT_TYPE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
