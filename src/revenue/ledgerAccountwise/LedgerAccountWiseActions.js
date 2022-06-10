import { axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_FAIL,
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_REQUEST,
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_SUCCESS,
  GET_ALL_LEDGER_ACCOUNT_WISE_FAIL,
  GET_ALL_LEDGER_ACCOUNT_WISE_REQUEST,
  GET_ALL_LEDGER_ACCOUNT_WISE_SUCCESS,
  GET_LIST_LEDGER_ACCOUNT_WISE_FAIL,
  GET_LIST_LEDGER_ACCOUNT_WISE_REQUEST,
  GET_LIST_LEDGER_ACCOUNT_WISE_SUCCESS,
} from "./LedgerAccountWiseConstants";

export const getAllLedgerAccountWiseAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_LEDGER_ACCOUNT_WISE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/LedgerAccountWise/GetAllLedgerAccountWise`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_LEDGER_ACCOUNT_WISE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_LEDGER_ACCOUNT_WISE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListLedgerAccountWiseAction =
  (id, startDate, endDate, year) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_LEDGER_ACCOUNT_WISE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/LedgerAccountWise/GetListLedgerAccountWise/${id}?startDate=${startDate}&endDate=${endDate}&idFiscalYear=${year}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_LEDGER_ACCOUNT_WISE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_LEDGER_ACCOUNT_WISE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getActiveLedgerAccountWiseAction =
  (account) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_LEDGER_ACCOUNT_WISE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/LedgerAccountWise/GetAccountTypeJsonList?searchkey=${account}`,
        tokenConfig()
      );

      dispatch({ type: GET_ACTIVE_LEDGER_ACCOUNT_WISE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_LEDGER_ACCOUNT_WISE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
