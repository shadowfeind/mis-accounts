import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_VENDOR_FAIL,
  GET_ALL_VENDOR_REQUEST,
  GET_ALL_VENDOR_SUCCESS,
  GET_LIST_VENDOR_FAIL,
  GET_LIST_VENDOR_REQUEST,
  GET_LIST_VENDOR_SUCCESS,
  GET_SINGLE_TO_CREATE_VENDOR_FAIL,
  GET_SINGLE_TO_CREATE_VENDOR_REQUEST,
  GET_SINGLE_TO_CREATE_VENDOR_SUCCESS,
  GET_SINGLE_TO_EDIT_VENDOR_FAIL,
  GET_SINGLE_TO_EDIT_VENDOR_REQUEST,
  GET_SINGLE_TO_EDIT_VENDOR_SUCCESS,
  POST_VENDOR_FAIL,
  POST_VENDOR_REQUEST,
  POST_VENDOR_SUCCESS,
  PUT_VENDOR_FAIL,
  PUT_VENDOR_REQUEST,
  PUT_VENDOR_SUCCESS,
} from "./VendorConstants";

export const getAllVendorAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_VENDOR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Vendor/GetAllVendor`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_VENDOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_VENDOR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListVendorAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_VENDOR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Vendor/GetListVendor`,
      tokenConfig()
    );

    dispatch({ type: GET_LIST_VENDOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_LIST_VENDOR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleCreateVendorAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_CREATE_VENDOR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Vendor/GetSingleToCreateVendor`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_CREATE_VENDOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_CREATE_VENDOR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleEditVendorAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TO_EDIT_VENDOR_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/Vendor/GetSingleToEditVendor/${id}`,
      tokenConfig()
    );

    dispatch({
      type: GET_SINGLE_TO_EDIT_VENDOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TO_EDIT_VENDOR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const postVendorAction = (vendor) => async (dispatch) => {
  try {
    dispatch({ type: POST_VENDOR_REQUEST });

    const jsonData = JSON.stringify({ vendorModel: vendor });

    const { data } = await axiosInstance.post(
      `/api/Vendor/PostVendor`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: POST_VENDOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_VENDOR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const putVendorAction = (vendor) => async (dispatch) => {
  try {
    dispatch({ type: PUT_VENDOR_REQUEST });

    const jsonData = JSON.stringify({ vendorModel: vendor });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    console.log(jsonData);
    const { data } = await axiosInstance.put(
      `${API_URL}/api/Vendor/PutVendor`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: PUT_VENDOR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PUT_VENDOR_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
