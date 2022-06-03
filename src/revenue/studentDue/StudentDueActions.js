import { axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_STUDENT_DUE_FAIL,
  GET_ALL_STUDENT_DUE_REQUEST,
  GET_ALL_STUDENT_DUE_SUCCESS,
  GET_LIST_STUDENT_DUE_FAIL,
  GET_LIST_STUDENT_DUE_REQUEST,
  GET_LIST_STUDENT_DUE_SUCCESS,
  GET_PRINT_STUDENT_DUE_FAIL,
  GET_PRINT_STUDENT_DUE_REQUEST,
  GET_PRINT_STUDENT_DUE_SUCCESS,
} from "./StudentDueConstants";

export const getAllSchoolDueAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_STUDENT_DUE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/StudentDue/GetAllStudentDue`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_STUDENT_DUE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_STUDENT_DUE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getListSchoolDueAction =
  (year, startDate, endDate) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_STUDENT_DUE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentDue/GetListStudentDue?idFiscalyear=${year}&startDate=${startDate}&endDate=${endDate}`,
        tokenConfig()
      );

      dispatch({ type: GET_LIST_STUDENT_DUE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LIST_STUDENT_DUE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getPrintSchoolDueAction =
  (startDate, endDate, year) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRINT_STUDENT_DUE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/StudentDue/GetPrintStudentDue?startDate=${startDate}&endDate=${endDate}&idFiscalYear=${year}`,
        tokenConfig()
      );

      dispatch({ type: GET_PRINT_STUDENT_DUE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_PRINT_STUDENT_DUE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
