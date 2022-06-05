import { axiosInstance, tokenConfig } from "../../constants";

import {
  GET_ALL_STUDENT_LEDGER_FAIL,
  GET_ALL_STUDENT_LEDGER_REQUEST,
  GET_ALL_STUDENT_LEDGER_SUCCESS,
  GET_LIST_STUDENT_LEDGER_FAIL,
  GET_LIST_STUDENT_LEDGER_REQUEST,
  GET_LIST_STUDENT_LEDGER_SUCCESS,
  POST_STUDENT_LEDGER_FAIL,
  POST_STUDENT_LEDGER_REQUEST,
  POST_STUDENT_LEDGER_SUCCESS,
} from "./StudentLedgerConstants";

export const getAllStudentLedgerAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDENT_LEDGER_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentLedger/GEtAllStudentLedger`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_STUDENT_LEDGER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDENT_LEDGER_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListStudentLedgerAction =
  (fiscalYear, idReg, startDate, endDate) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_STUDENT_LEDGER_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentLedger/GetListStudentLedger?idFiscalYear=${fiscalYear}&idAdmissionRegistration=${idReg}&startDate=${startDate}&endDate=${endDate}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_STUDENT_LEDGER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_STUDENT_LEDGER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postStudentLedgerAction =
  (studentLedgerModel, searchFilterModel) => async (dispatch) => {
    try {
      dispatch({ type: POST_STUDENT_LEDGER_REQUEST });

      const jsonData = JSON.stringify({
        studentLedgerModel,
        searchFilterModel,
      });

      const { data } = await axiosInstance.post(
        `/api/StudentLedger/PostStudentLedger`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_STUDENT_LEDGER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_STUDENT_LEDGER_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
