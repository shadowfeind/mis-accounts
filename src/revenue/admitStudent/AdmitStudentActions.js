import { axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_FAIL,
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_REQUEST,
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_SUCCESS,
  GET_ALL_ADMIT_STUDENT_FAIL,
  GET_ALL_ADMIT_STUDENT_REQUEST,
  GET_ALL_ADMIT_STUDENT_SUCCESS,
  GET_BULK_EDIT_ADMIT_STUDENT_FAIL,
  GET_BULK_EDIT_ADMIT_STUDENT_REQUEST,
  GET_BULK_EDIT_ADMIT_STUDENT_RESET,
  GET_BULK_EDIT_ADMIT_STUDENT_SUCCESS,
} from "./AdmitStudentConstants";

export const getAllAdmitStudentAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ADMIT_STUDENT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/AdmitStudent/GetAllAdmitStudent`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ADMIT_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ADMIT_STUDENT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getActiveStudentForLedgeronlyAction =
  (year, faculty, level, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENT_FOR_LEDGERONLY_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AdmitStudent/GetActiveStudentsForLedgerOnly_Json?idAcademicYear=${year}&idFacultyProgramLink=${faculty}&level=${level}&idShift=${shift}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ACTIVE_STUDENT_FOR_LEDGERONLY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENT_FOR_LEDGERONLY_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkEditAdmitStudentAction =
  (fiscalYear, year, level, student, month) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EDIT_ADMIT_STUDENT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AdmitStudent/GetBulkEdit?idFiscalYear=${fiscalYear}&idAcademicYear=${year}&level=${level}&idAdmissionRegistration=${student}&idMonth=${month}`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EDIT_ADMIT_STUDENT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EDIT_ADMIT_STUDENT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
