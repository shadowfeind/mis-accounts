import { axiosInstance, tokenConfig } from "../../constants";

import {
  GET_ACTIVE_STUDENT_ONLY_FAIL,
  GET_ACTIVE_STUDENT_ONLY_REQUEST,
  GET_ACTIVE_STUDENT_ONLY_SUCCESS,
  GET_ALL_STUDENT_LEDGER_FAIL,
  GET_ALL_STUDENT_LEDGER_REQUEST,
  GET_ALL_STUDENT_LEDGER_SUCCESS,
  GET_LIST_STUDENT_LEDGER_FAIL,
  GET_LIST_STUDENT_LEDGER_REQUEST,
  GET_LIST_STUDENT_LEDGER_SUCCESS,
  GET_UNIVERSITY_FACULTY_FAIL,
  GET_UNIVERSITY_FACULTY_REQUEST,
  GET_UNIVERSITY_FACULTY_SUCCESS,
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
