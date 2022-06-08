import { axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_FAIL,
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_REQUEST,
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_SUCCESS,
  GET_ALL_BILL_GENERATE_FAIL,
  GET_ALL_BILL_GENERATE_REQUEST,
  GET_ALL_BILL_GENERATE_SUCCESS,
  GET_BULK_EDIT_BILL_GENERATE_FAIL,
  GET_BULK_EDIT_BILL_GENERATE_REQUEST,
  GET_BULK_EDIT_BILL_GENERATE_SUCCESS,
  GET_EXTRA_FEE_BILL_GENERATE_REQUEST,
  GET_EXTRA_FEE_BILL_GENERATE_RESET,
  GET_EXTRA_FEE_BILL_GENERATE_SUCCESS,
  POST_BILL_GENERATE_FAIL,
  POST_BILL_GENERATE_REQUEST,
  POST_BILL_GENERATE_SUCCESS,
} from "./BillgenerateConstants";

export const getAllBillGenerateAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_BILL_GENERATE_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/BillGenerate/GetAllAdmitStudent`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_BILL_GENERATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_BILL_GENERATE_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getActiveStudentForBillGenerateAction =
  (year, faculty, level, shift) => async (dispatch) => {
    try {
      dispatch({ type: GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/BillGenerate/GetActiveStudentsForLedgerOnly_Json?idAcademicYear=${year}&idFacultyProgramLink=${faculty}&level=${level}&idShift=${shift}`,
        tokenConfig()
      );

      dispatch({
        type: GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getBulkEditBillGenerateAction =
  (fiscalYear, year, level, student, month) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/BillGenerate/GetBulkEdit?idFiscalYear=${fiscalYear}&idAcademicYear=${year}&level=${level}&idAdmissionRegistration=${student}&idMonth=${month}`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EDIT_BILL_GENERATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EDIT_BILL_GENERATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getExtraFeeBillGenerateAction =
  (query, index) => async (dispatch) => {
    try {
      dispatch({ type: GET_EXTRA_FEE_BILL_GENERATE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/BillGenerate/GetExtraFeeJsonList?searchkey=${query}`,
        tokenConfig()
      );

      dispatch({
        type: GET_EXTRA_FEE_BILL_GENERATE_SUCCESS,
        payload: data,
        index,
      });
    } catch (error) {
      dispatch({
        type: GET_EXTRA_FEE_BILL_GENERATE_RESET,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postBillGenerateAction =
  (monthly, extra, dbModel, searchFilterModel, narration) =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_BILL_GENERATE_REQUEST });

      const newMonthly = monthly?.filter((x) => x.active === true);

      const newExtra = extra?.filter((x) => x.active === true);

      const total =
        monthly
          ?.filter((x) => x.active === true)
          ?.reduce((acc, item) => {
            return acc + Number(item.Cr);
          }, 0) +
        extra
          ?.filter((x) => x.active === true)
          ?.reduce((acc, item) => {
            return acc + Number(item.Cr);
          }, 0);

      const newDbModel = {
        ...dbModel,
        AmountPaid: total,
        NarrationForAmountPaid: narration,
      };

      const jsonData = JSON.stringify({
        dbModel: newDbModel,
        searchFilterModel,
        monthlyFeeStructureLstForBill: newMonthly,
        extraFeeStructureLstForBill: newExtra,
      });
      // debugger;
      // console.log(jsonData);

      const { data } = await axiosInstance.post(
        `/api/BillGenerate/PostBillGenerate`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_BILL_GENERATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_BILL_GENERATE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
