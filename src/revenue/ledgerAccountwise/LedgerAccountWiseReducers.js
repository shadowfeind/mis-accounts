import {
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_FAIL,
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_REQUEST,
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_RESET,
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_SUCCESS,
  GET_ALL_LEDGER_ACCOUNT_WISE_FAIL,
  GET_ALL_LEDGER_ACCOUNT_WISE_REQUEST,
  GET_ALL_LEDGER_ACCOUNT_WISE_RESET,
  GET_ALL_LEDGER_ACCOUNT_WISE_SUCCESS,
  GET_LIST_LEDGER_ACCOUNT_WISE_FAIL,
  GET_LIST_LEDGER_ACCOUNT_WISE_REQUEST,
  GET_LIST_LEDGER_ACCOUNT_WISE_RESET,
  GET_LIST_LEDGER_ACCOUNT_WISE_SUCCESS,
} from "./LedgerAccountWiseConstants";

export const getAllLedgerAccountWiseReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_LEDGER_ACCOUNT_WISE_REQUEST:
      return { loading: true };
    case GET_ALL_LEDGER_ACCOUNT_WISE_SUCCESS:
      return { loading: false, ledgerAccountWise: action.payload };
    case GET_ALL_LEDGER_ACCOUNT_WISE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_LEDGER_ACCOUNT_WISE_RESET:
      return {};
    default:
      return state;
  }
};

export const getListLedgerAccountWiseReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_LIST_LEDGER_ACCOUNT_WISE_REQUEST:
      return { loading: true };
    case GET_LIST_LEDGER_ACCOUNT_WISE_SUCCESS:
      return { loading: false, listLedgerAccountWise: action.payload };
    case GET_LIST_LEDGER_ACCOUNT_WISE_FAIL:
      return { loading: false, error: action.payload };
    case GET_LIST_LEDGER_ACCOUNT_WISE_RESET:
      return {};
    default:
      return state;
  }
};

export const getActiveLedgerAccountWiseReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ACTIVE_LEDGER_ACCOUNT_WISE_REQUEST:
      return { loading: true };
    case GET_ACTIVE_LEDGER_ACCOUNT_WISE_SUCCESS:
      return { loading: false, activeLedgerAccountWise: action.payload };
    case GET_ACTIVE_LEDGER_ACCOUNT_WISE_FAIL:
      return { loading: false, error: action.payload };
    case GET_ACTIVE_LEDGER_ACCOUNT_WISE_RESET:
      return {};
    default:
      return state;
  }
};
