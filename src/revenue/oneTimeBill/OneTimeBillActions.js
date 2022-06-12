import { axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ONE_TIME_BILL_FAIL,
  GET_ALL_ONE_TIME_BILL_REQUEST,
  GET_ALL_ONE_TIME_BILL_SUCCESS,
  GET_BULK_EDIT_ONE_TIME_BILL_FAIL,
  GET_BULK_EDIT_ONE_TIME_BILL_REQUEST,
  GET_BULK_EDIT_ONE_TIME_BILL_SUCCESS,
  GET_PREVIOUS_BLC_REQUEST,
  GET_PREVIOUS_BLC_RESET,
  GET_PREVIOUS_BLC_SUCCESS,
  POST_ONE_TIME_BILL_FAIL,
  POST_ONE_TIME_BILL_REQUEST,
  POST_ONE_TIME_BILL_SUCCESS,
} from "./OneTimeBillConstants";

export const getAllOneTimeBillAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_ONE_TIME_BILL_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/OneTimeBill/GetOneTimeBillGenerate`,
      tokenConfig()
    );

    dispatch({ type: GET_ALL_ONE_TIME_BILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ALL_ONE_TIME_BILL_FAIL,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};

export const getBulkEditOneTimeBillAction =
  (fiscalYear, year, level, month) => async (dispatch) => {
    try {
      dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/OneTimeBill/GetBulkEditOneTimeBillGenerate?idFiscalYear=${fiscalYear}&idAcademicYear=${year}&idClass=${level}&idMonth=${month}`,
        tokenConfig()
      );

      dispatch({
        type: GET_BULK_EDIT_ONE_TIME_BILL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_BULK_EDIT_ONE_TIME_BILL_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postOneTimeBillAction =
  (monthly, extra, student, dbModel, searchFilterModel, narration) =>
  async (dispatch) => {
    try {
      dispatch({ type: POST_ONE_TIME_BILL_REQUEST });

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
        dbModelLstForAdmissionRegistrationForOneTime: student,
        monthlyFeeStructureLstForBill: newMonthly,
        extraFeeStructureLstForBill: newExtra,
      });

      const { data } = await axiosInstance.post(
        `/api/OneTimeBill/PostBillGenerate`,
        jsonData,
        tokenConfig()
      );

      dispatch({ type: POST_ONE_TIME_BILL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: POST_ONE_TIME_BILL_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getPreviousBlcAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PREVIOUS_BLC_REQUEST });

    const { data } = await axiosInstance.get(
      `/api/OneTimeBillPrint/GetPreviousBalance?idAdmissionRegistration=${id}`,
      tokenConfig()
    );

    dispatch({ type: GET_PREVIOUS_BLC_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_PREVIOUS_BLC_RESET,
      payload: error?.response?.data?.Message
        ? error?.response?.data?.Message
        : error?.message,
    });
  }
};
