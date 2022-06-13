import { axiosInstance, tokenConfig } from "../../constants";

import {
  GET_ACCOUNT_NAME_FAIL,
  GET_ACCOUNT_NAME_REQUEST,
  GET_ACCOUNT_NAME_SUCCESS,
  GET_ACTIVE_STUDENT_ONLY_FAIL,
  GET_ACTIVE_STUDENT_ONLY_REQUEST,
  GET_ACTIVE_STUDENT_ONLY_SUCCESS,
  GET_ALL_STUDENT_LEDGER_FAIL,
  GET_ALL_STUDENT_LEDGER_REQUEST,
  GET_ALL_STUDENT_LEDGER_SUCCESS,
  GET_LIST_STUDENT_LEDGER_FAIL,
  GET_LIST_STUDENT_LEDGER_REQUEST,
  GET_LIST_STUDENT_LEDGER_SUCCESS,
  GET_RECEIPT_PRINT_FAIL,
  GET_RECEIPT_PRINT_REQUEST,
  GET_RECEIPT_PRINT_SUCCESS,
  GET_REVERSE_ENTRY_FAIL,
  GET_REVERSE_ENTRY_REQUEST,
  GET_REVERSE_ENTRY_SUCCESS,
  GET_SINGLE_BILL_PRINT_FAIL,
  GET_SINGLE_BILL_PRINT_REQUEST,
  GET_SINGLE_BILL_PRINT_SUCCESS,
  GET_UNIVERSITY_FACULTY_FAIL,
  GET_UNIVERSITY_FACULTY_REQUEST,
  GET_UNIVERSITY_FACULTY_SUCCESS,
  POST_REVERSE_ENTRY_FAIL,
  POST_REVERSE_ENTRY_REQUEST,
  POST_REVERSE_ENTRY_SUCCESS,
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
  (
    studentLedgerModels,
    amount,
    discount,
    advanced,
    narration,
    searchFilterModels
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_STUDENT_LEDGER_REQUEST });
      // let amount;
      // let discount;
      // let advanced;
      // let narration;

      const dbModel = {
        ...studentLedgerModels,
        AmountPaid: amount,
        DiscountInTotal: discount,
        Advance: advanced,
        NarrationForAmountPaid: narration,
        MatCenter: 1,
      };

      const search = {
        ...searchFilterModels,
        studentLedgerModel: {
          ...searchFilterModels.studentLedgerModel,
          MatCenter: 1,
        },
      };
      const jsonData = JSON.stringify({
        studentLedgerModel: dbModel,
        searchFilterModel: search,
      });

      console.log(jsonData);
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

export const getActiveStudentOnlyAction =
  (year, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENT_ONLY_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentLedger/GetActiveStudentsForLedgerOnly_Json?idAcademicYear=${year}&idFacultyProgramLink=6&level=${classId}&idShift=0`,
        tokenConfig()
      );

      dispatch({ type: GET_ACTIVE_STUDENT_ONLY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENT_ONLY_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getUniversityFacultyAction = (year) => async (dispatch) => {
  try {
    dispatch({ type: GET_UNIVERSITY_FACULTY_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentLedger/GetUniversityProgramFaculty_Json?idAcademicYear=${year}`,
      tokenConfig()
    );

    dispatch({ type: GET_UNIVERSITY_FACULTY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_UNIVERSITY_FACULTY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getAccountNameAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACCOUNT_NAME_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentLedger/GetAccountNameJsonList`,
      tokenConfig()
    );

    dispatch({ type: GET_ACCOUNT_NAME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNT_NAME_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getSingleBillPrintAction =
  (code, classId, acaYear, regKey, fiscalYear, month) => async (dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_BILL_PRINT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentLedger/GetSingleBillPrint?accountSubmitCode=${code}&idClass=${classId}&idAcademicYear=${acaYear}&registrationKey=${regKey}&idFiscalYear=${fiscalYear}&idMonth=${month}&company=2&searchKey=1`,
        tokenConfig()
      );

      dispatch({ type: GET_SINGLE_BILL_PRINT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_BILL_PRINT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getReceiptPrintAction =
  (code, regKey, startDate, endDate, ipValue, dateTime) => async (dispatch) => {
    try {
      dispatch({ type: GET_RECEIPT_PRINT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentLedger/GetReceiptPrint?idSubmitCode=${code}&registrationKey=${regKey}&startDate=${startDate}&endDate=${endDate}&ipvalue=${ipValue}&lessThanReceiptDateAndTime=${dateTime}&searchKey=1`,
        tokenConfig()
      );

      dispatch({ type: GET_RECEIPT_PRINT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_RECEIPT_PRINT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getReverseEntryAction =
  (DrCr, code, classId, year, regKey, fiscalYear, startDate, endDate, month) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_REVERSE_ENTRY_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentLedger/GetReverseEntry?idTransactionDrCr=${DrCr}&accountSubmitCode=${code}&idClass=${classId}&idAcademicYear=${year}&registrationKey=${regKey}&idFiscalYear=${fiscalYear}&startDate=${startDate}&endDate=${endDate}&idMonth=${month}&company=2`,
        tokenConfig()
      );

      dispatch({ type: GET_REVERSE_ENTRY_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_REVERSE_ENTRY_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postReverseEntryAction = (account) => async (dispatch) => {
  try {
    dispatch({ type: POST_REVERSE_ENTRY_REQUEST });

    const jsonData = JSON.stringify({
      ledgerAccountWiseModelLst: account,
    });

    const { data } = await axiosInstance.post(
      `/api/StudentLedger/PostReverseEntry`,
      jsonData,
      tokenConfig()
    );

    dispatch({ type: POST_REVERSE_ENTRY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_REVERSE_ENTRY_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
