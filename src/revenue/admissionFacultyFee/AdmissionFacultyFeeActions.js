import { API_URL, axiosInstance, tokenConfig } from "../../constants";
import {
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
} from "./AdmissionFacultyFeeConstants";

export const getAllAdmissionFacultyFeeStructureAction =
  () => async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountAdmissionFacultyFeeStructureLink/GetAllAccountAdmissionFacultyFeeStructureLink`,
        tokenConfig()
      );

      dispatch({
        type: GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getListAdmissionFacultyFeeStructureAction =
  (year, classId) => async (dispatch) => {
    try {
      dispatch({ type: GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST });

      const { data } = await axiosInstance.get(
        `/api/AccountAdmissionFacultyFeeStructureLink/GetListAccountAdmissionFacultyFeeStructureLink?idAcademicYear=${year}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleCreateAdmissionFacultyFeeStructureAction =
  (year, classId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
      });

      const { data } = await axiosInstance.get(
        `/api/AccountAdmissionFacultyFeeStructureLink/GetSingleToCreateAccountAdmissionFacultyFeeStructureLink?idAcademicYear=${year}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const getSingleEditAdmissionFacultyFeeStructureAction =
  (id, year, classId) => async (dispatch) => {
    try {
      dispatch({
        type: GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST,
      });

      const { data } = await axiosInstance.get(
        `/api/AccountAdmissionFacultyFeeStructureLink/GetSingleToEditAccountAdmissionFacultyFeeStructureLink/${id}?idAcademicYear=${year}&level=${classId}`,
        tokenConfig()
      );

      dispatch({
        type: GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const postAdmissionFacultyFeeStructureAction =
  (admissionFacultyFeeStructure, checked) => async (dispatch) => {
    try {
      dispatch({ type: POST_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: admissionFacultyFeeStructure,
        checked,
      });
      console.log(jsonData);
      const { data } = await axiosInstance.post(
        `/api/AccountAdmissionFacultyFeeStructureLink/PostAccountAdmissionFacultyFreeStructureLink`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: POST_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };

export const putAdmissionFacultyFeeStructureAction =
  (admissionFacultyFeeStructure) => async (dispatch) => {
    try {
      dispatch({ type: PUT_ADMISSION_FACULTY_FEE_STRUCTURE_REQUEST });

      const jsonData = JSON.stringify({
        dbModel: admissionFacultyFeeStructure,
      });

      const { data } = await axiosInstance.put(
        `/api/AccountAdmissionFacultyFeeStructureLink/PutAccountAdmissionFacultyFreeStructureLink`,
        jsonData,
        tokenConfig()
      );

      dispatch({
        type: PUT_ADMISSION_FACULTY_FEE_STRUCTURE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PUT_ADMISSION_FACULTY_FEE_STRUCTURE_FAIL,
        payload: error?.response?.data?.Message
          ? error?.response?.data?.Message
          : error?.message,
      });
    }
  };
