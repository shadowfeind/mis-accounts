import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ACCOUNT_GROUP_FAIL,
  GET_ALL_ACCOUNT_GROUP_REQUEST,
  GET_ALL_ACCOUNT_GROUP_SUCCESS,
  GET_LIST_ACCOUNT_GROUP_FAIL,
  GET_LIST_ACCOUNT_GROUP_REQUEST,
  GET_LIST_ACCOUNT_GROUP_SUCCESS,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_FAIL,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_REQUEST,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_SUCCESS,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_FAIL,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_REQUEST,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_SUCCESS,
  POST_ACCOUNT_GROUP_FAIL,
  POST_ACCOUNT_GROUP_REQUEST,
  POST_ACCOUNT_GROUP_SUCCESS,
  PUT_ACCOUNT_GROUP_FAIL,
  PUT_ACCOUNT_GROUP_REQUEST,
  PUT_ACCOUNT_GROUP_SUCCESS,
} from "./AccountGroupConstants";

export const getAllAccountGroupAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ACCOUNT_GROUP_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountGroup/GetAllAccountGroup`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ACCOUNT_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ACCOUNT_GROUP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListAccountGroupAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_ACCOUNT_GROUP_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountGroup/GetListAccountGroup`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_ACCOUNT_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_ACCOUNT_GROUP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateAccountGroupAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CREATE_ACCOUNT_GROUP_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountGroup/GetSingleToCreateAccountGroup`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_CREATE_ACCOUNT_GROUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CREATE_ACCOUNT_GROUP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditAccountGroupAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_EDIT_ACCOUNT_GROUP_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AccountGroup/GetSingleEditAccountGroup/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_EDIT_ACCOUNT_GROUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_EDIT_ACCOUNT_GROUP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postAccountGroupAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: POST_ACCOUNT_GROUP_REQUEST });

    const jsonData = JSON.stringify({ accountGroupModel: account });

    const { data } = await axiosInstance.post(
      `/api/AccountGroup/PostAccountGroup`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: POST_ACCOUNT_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_ACCOUNT_GROUP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putAccountGroupAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: PUT_ACCOUNT_GROUP_REQUEST });

    const jsonData = JSON.stringify({ accountGroupModel: account });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // console.log(jsonData);
    const { data } = await axiosInstance.put(
      `${API_URL}/api/AccountGroup/PutAccountGroup`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: PUT_ACCOUNT_GROUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PUT_ACCOUNT_GROUP_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
