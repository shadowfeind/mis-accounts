import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import SelectControl from "../../components/controls/SelectControl";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingComp from "../../components/LoadingComp";
import {
  GET_ALL_STUDENT_LEDGER_RESET,
  GET_LIST_STUDENT_LEDGER_RESET,
} from "./StudentLedgerConstants";
import { getListStudentLedgerAction } from "./StudentLedgerActions";

const useStyles = makeStyles((theme) => ({
  searchInput: {
    width: "75%",
    fontSize: "12px",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const tableHeader = [
  { id: "idDrCr", label: "idDrCr" },
  { id: "Voucher/BillNoClass", label: "Voucher/BillNo Class" },
  { id: "AccountForm", label: "AccountForm" },
  { id: "BillMonth", label: "Bill Month" },
  { id: "AccountName", label: "Account Name" },
  { id: "IDAccountType", label: "IDAccountType" },
  { id: "TransactionDate", label: "Transaction Date" },
  { id: "TransactionType", label: "Transaction Type" },
  { id: "Narration", label: "Narration" },
  { id: "Dr(Rs)", label: "Dr(Rs)" },
  { id: "Cr(Rs)", label: "Cr(Rs)" },
  { id: "Balance", label: "Balance" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const StudentLedger = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [ddlFiscalYear, setDdlFiscalYear] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [student, setStudent] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [fiscalYear, setFiscalYear] = useState("");
  const [errors, setErrors] = useState({});
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const test = [{ Key: "", Value: "" }];
  const dispatch = useDispatch();

  const { studentLedger, error } = useSelector(
    (state) => state.getAllStudentLedger
  );
  const { listStudentLedger, error: listStudentLedgerError } = useSelector(
    (state) => state.getListStudentLedger
  );
  const { success: postStudentLedgerSuccess, error: postStudentLedgerError } =
    useSelector((state) => state.postStudentLedger);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDENT_LEDGER_RESET });
  }

  if (listStudentLedgerError) {
    setNotify({
      isOpen: true,
      message: listStudentLedgerError,
      type: "error",
    });
    dispatch({ type: GET_LIST_STUDENT_LEDGER_RESET });
  }

  if (postStudentLedgerSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Submitted",
      type: "success",
    });
    dispatch({ type: POST_STUDENT_LEDGER_RESET });
    dispatch(getListStudentLedgerAction(fiscalYear, idReg, startDate, endDate));
  }
  if (postStudentLedgerError) {
    setNotify({
      isOpen: true,
      message: postStudentLedgerError,
      type: "error",
    });
    dispatch({ type: POST_STUDENT_LEDGER_RESET });
  }
};
