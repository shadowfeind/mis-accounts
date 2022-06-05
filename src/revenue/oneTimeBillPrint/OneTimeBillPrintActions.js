import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ONE_TIME_BILL_PRINT_FAIL,
  GET_ALL_ONE_TIME_BILL_PRINT_REQUEST,
  GET_ALL_ONE_TIME_BILL_PRINT_SUCCESS,
  GET_PRINT_ONE_TIME_BILL_PRINT_FAIL,
  GET_PRINT_ONE_TIME_BILL_PRINT_REQUEST,
  GET_PRINT_ONE_TIME_BILL_PRINT_SUCCESS,
} from "./OneTimeBillPrintConstants";

export const getAllOneTimeBillPrintAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ONE_TIME_BILL_PRINT_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/OneTimeBillPrint/GetAllOneTimeBillPrint`,
      tokenConfig()
    );

    dispatch({
      type: GET_ALL_ONE_TIME_BILL_PRINT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_ONE_TIME_BILL_PRINT_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getPrintOneTimeBillPrintAction =
  (year, classId, feeStructure, fiscalYear, id) => async (dispatch) => {
    try {
      dispatch({ type: GET_PRINT_ONE_TIME_BILL_PRINT_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/OneTimeBillPrint/GetPrintBulk?idAcademicYear=${year}&idClass=${classId}&idAdmissionFeeStructure=${feeStructure}&idFiscalYear=${fiscalYear}&idStudent=${id}`,
        tokenConfig()
      );

      dispatch({
        type: GET_PRINT_ONE_TIME_BILL_PRINT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PRINT_ONE_TIME_BILL_PRINT_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
