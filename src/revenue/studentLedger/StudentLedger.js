import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { useForm, Form } from "../../customHooks/useForm";
import DatePickerControl from "../../components/controls/DatePickerControl";
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
import { symbolsArr } from "../../helpers/excludeSymbol";
import {
  GET_ACTIVE_STUDENT_ONLY_RESET,
  GET_ALL_STUDENT_LEDGER_RESET,
  GET_LIST_STUDENT_LEDGER_RESET,
  GET_RECEIPT_PRINT_RESET,
  GET_REVERSE_ENTRY_RESET,
  GET_SINGLE_BILL_PRINT_RESET,
  GET_UNIVERSITY_FACULTY_RESET,
  POST_REVERSE_ENTRY_RESET,
  POST_STUDENT_LEDGER_RESET,
} from "./StudentLedgerConstants";
import {
  getAccountNameAction,
  getActiveStudentOnlyAction,
  getAllStudentLedgerAction,
  getListStudentLedgerAction,
  getReceiptPrintAction,
  getReverseEntryAction,
  getSingleBillPrintAction,
  postStudentLedgerAction,
} from "./StudentLedgerActions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import StudentLedgerTableCollapse from "./StudentLedgerTableCollapse";
import StudentLedgerBillPrint from "./StudentLedgerBillPrint";
import StudentLedgerRecipt from "./StudentLedgerRecipt";
import StudentLedgerSideRecipt from "./StudentLedgerSideRecipt";
import StudentLedgerReverseEntryForm from "./StudentLedgerReverseEntryForm";

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

const initialFormValues = {
  IDTransactionDrCr: 0,
  AccountType: "",
  AccountName: "",
  TransactionType: "",
  AccountSubmitCode: 0,
  MatCenter: 1,
  VoucherBillNo: "",
  TransactionDate: "2022-06-07T04:18:21.347Z",
  Dr: 0,
  Cr: 0,
  Narration: "",
  CreateDate: "2022-06-07T04:18:21.347Z",
  UpdateDate: "2022-06-07T04:18:21.347Z",
  UpdateMachineCode: "",
  IDVoucherType: 0,
  IDAccountType: 0,
  StartDate: "2022-06-07T04:18:21.347Z",
  EndDate: "2022-06-07T04:18:21.347Z",
  RegistrationKey: "",
  IDYearFacultyLink: 0,
  Fee: 0,
  Discount: 0,
  PercentageDiscount: 0,
  DiscountAmount: 0,
  NarrationForAmountPaid: "",
  AmountPaid: 0,
  DiscountInTotal: 0,
  Advance: 0,
  PreviousBalance: 0,
  BalanceDue: 0,
  AdvancedPaid: 0,
  StudentName: "",
  AmountPaidIntoList: 0,
  idTable: 0,
  TableName: "",
  Level: 0,
  RollNo: 0,
  IsAccountReceivable: true,
  IDFiscalYear: 0,
  IsActive: true,
  Created_On: "2022-06-07T04:18:21.347Z",
  Updated_On: "2022-06-07T04:18:21.347Z",
};

const tableHeader = [
  { id: "actions", label: "Recipt", disableSorting: true },
  { id: "actions", label: "Reverse Entry", disableSorting: true },
  { id: "idDrCr", label: "idDrCr" },
  { id: "Voucher/BillNo", label: "Voucher/BillNo" },
  { id: "Class", label: "Class" },
  { id: "AccountForm", label: "Account Form" },
  { id: "BillMonth", label: "Month" },
  { id: "AccountName", label: "Account Name" },
  { id: "TransactionDate", label: "Transaction Date" },
  { id: "TransactionType", label: "Transaction Type" },
  { id: "Narration", label: "Narration" },
  { id: "Dr(Rs)", label: "Dr(Rs)" },
  { id: "Cr(Rs)", label: "Cr(Rs)" },
  { id: "Balance", label: "Balance" },
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
  const [amountPaid, setAmountPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [advanced, setAdvanced] = useState(0);
  const [naration, setNaration] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [openReversePopup, setOpenReversePopup] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPrintPopup, setOpenPrintPopup] = useState(false);
  const [openReciptPopup, setOpenReciptPopup] = useState(false);
  const [amountPaidPrint, setAmountPaidPrint] = useState(0);
  const [discountPrint, setDiscountPrint] = useState(0);
  const [advancePaidPrint, setAdvancePaidPrint] = useState(0);
  const [narrationPrint, setNarrationPrint] = useState("");
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
  const [newIdForReceipt, setNewIdForReceipt] = useState("");

  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [regKeyContainer, setRegKeyContainer] = useState("");
  const [regKeyNo, setRegKeyNo] = useState("");
  const [printReceipts, setPrintReceipts] = useState("");
  const [dates, setDates] = useState("");
  const [years, setYears] = useState("");
  const [idYears, setIdYears] = useState("");
  const [prevBals, setPrevBals] = useState("");
  const [balDues, setBalDues] = useState("");

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const test = [{ Key: "", Value: "" }];
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange } = useForm(initialFormValues);

  const { studentLedger, error } = useSelector(
    (state) => state.getAllStudentLedger
  );

  const { activeStudentOnly, error: activeStudentOnlyError } = useSelector(
    (state) => state.getActiveStudentOnly
  );

  const { universityFaculty, error: universityFacultyError } = useSelector(
    (state) => state.getUniversityFaculty
  );

  const { accountName } = useSelector((state) => state.getAccountName);

  const { singleBillPrint, error: singleBillPrintError } = useSelector(
    (state) => state.getSingleBillPrint
  );

  const { receiptPrint, error: receiptPrintError } = useSelector(
    (state) => state.getReceiptPrint
  );

  const { reverseEntryPrint, error: reverseEntryPrintError } = useSelector(
    (state) => state.getReverseEntry
  );

  const { success: postReverseEntrySuccess, error: postReverseEntryError } =
    useSelector((state) => state.postReverseEntry);

  const {
    listStudentLedger,
    loading,
    loading: printReceiptLoading,
    error: listStudentLedgerError,
  } = useSelector((state) => state.getListStudentLedger);
  const {
    success: postStudentLedgerSuccess,
    error: postStudentLedgerError,
    newId,
  } = useSelector((state) => state.postStudentLedger);

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

  if (reverseEntryPrintError) {
    setNotify({
      isOpen: true,
      message: reverseEntryPrintError,
      type: "error",
    });
    dispatch({ type: GET_REVERSE_ENTRY_RESET });
    setOpenReversePopup(false);
  }

  if (postReverseEntryError) {
    setNotify({
      isOpen: true,
      message: postReverseEntryError,
      type: "error",
    });
    dispatch({ type: POST_REVERSE_ENTRY_RESET });
  }

  if (singleBillPrintError) {
    setNotify({
      isOpen: true,
      message: singleBillPrintError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_BILL_PRINT_RESET });
    setOpenPrintPopup(false);
  }

  if (receiptPrintError) {
    setNotify({
      isOpen: true,
      message: receiptPrintError,
      type: "error",
    });
    dispatch({ type: GET_RECEIPT_PRINT_RESET });
    setOpenReciptPopup(false);
  }

  if (postStudentLedgerSuccess) {
    setNewIdForReceipt(newId);
    dispatch({ type: POST_STUDENT_LEDGER_RESET });
    setOpenPopup(true);
    // dispatch(
    //   getListStudentLedgerAction(fiscalYear, student, startDate, endDate)
    // );
    dispatch({ type: GET_LIST_STUDENT_LEDGER_RESET });
    setAmountPaid(0);
    setDiscount(0);
    setAdvanced(0);
    setNaration("");
  }

  if (postReverseEntrySuccess) {
    setNotify({
      isOpen: true,
      message: "Reverse Entry Succesful",
      type: "success",
    });
    dispatch({ type: POST_REVERSE_ENTRY_RESET });
    dispatch(
      getListStudentLedgerAction(fiscalYear, student, startDate, endDate)
    );
    setOpenReversePopup(false);
  }
  if (postStudentLedgerError) {
    setNotify({
      isOpen: true,
      message: postStudentLedgerError,
      type: "error",
    });
    dispatch({ type: POST_STUDENT_LEDGER_RESET });
  }

  if (activeStudentOnlyError) {
    setNotify({
      isOpen: true,
      message: activeStudentOnlyError,
      type: "error",
    });
    dispatch({ type: GET_ACTIVE_STUDENT_ONLY_RESET });
  }

  if (universityFacultyError) {
    setNotify({
      isOpen: true,
      message: universityFacultyError,
      type: "error",
    });
    dispatch({ type: GET_UNIVERSITY_FACULTY_RESET });
  }

  useEffect(() => {
    dispatch(getAllStudentLedgerAction());
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    dispatch({ type: GET_LIST_STUDENT_LEDGER_RESET });
    dispatch(getAccountNameAction());
  }, []);

  useEffect(() => {
    if (studentLedger) {
      setDdlFiscalYear(studentLedger?.ddlAccountFiscalYear);
      setFiscalYear(studentLedger?.ddlAccountFiscalYear[0]?.Key);
      setAcademicYearDdl(studentLedger?.ddlAcademicYear);
      setAcaYear(studentLedger?.ddlAcademicYear[0]?.Key);
      setDdlClass(studentLedger?.ddlClass);
      setClassId(studentLedger?.ddlClass[0]?.Key);
      setStartDate(
        studentLedger?.searchFilterModel?.studentLedgerModel?.StartDate?.slice(
          0,
          10
        )
      );
      setEndDate(
        studentLedger?.searchFilterModel?.studentLedgerModel?.EndDate?.slice(
          0,
          10
        )
      );
      dispatch(
        getActiveStudentOnlyAction(
          studentLedger?.ddlAcademicYear[0]?.Key,
          studentLedger?.ddlClass[0]?.Key
        )
      );
    }
  }, [studentLedger]);

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  useEffect(() => {
    if (activeStudentOnly) {
      setDdlStudent(activeStudentOnly);
      setStudent(activeStudentOnly[0]?.Key);
    }
  }, [activeStudentOnly]);

  // useEffect(() => {
  //   if (listStudentLedger) {
  //     setTableData(listStudentLedger?.studentLedgerModelLstsForStudent);
  //   }
  // }, [listStudentLedger]);

  const handleClassIdChange = (value) => {
    setClassId(value);
    if ((acaYear, value)) {
      dispatch(getActiveStudentOnlyAction(acaYear, value));
    }
    setStudent("");
    setDdlStudent([]);
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if ((value, classId)) {
      dispatch(getActiveStudentOnlyAction(value, classId));
    }
    setStudent("");
    setDdlStudent([]);
  };

  const handleStudent = (value) => {
    setStudent(value);
  };

  useEffect(() => {
    if (activeStudentOnly) {
      setDdlStudent(activeStudentOnly);
      setStudent(activeStudentOnly[0]?.Key);
    }
  }, [activeStudentOnly]);

  const validate = () => {
    let temp = {};

    temp.fiscalYear = !fiscalYear ? "This field is required" : "";
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    // temp.student = !student ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleListSearch = () => {
    if (validate()) {
      dispatch(
        getListStudentLedgerAction(fiscalYear, student, startDate, endDate)
      );
    }
    setAmountPaidPrint(0);
    setDiscountPrint(0);
    setAdvancePaidPrint(0);
    setNarrationPrint("");
    setNewIdForReceipt("");
  };

  const handleRecipt = (submitCode, regKey, dateTime) => {
    dispatch(
      getReceiptPrintAction(
        submitCode,
        regKey,
        startDate,
        endDate,
        listStudentLedger?.studentLedgerModelLstsForStudent[
          listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
        ]?.Balance,
        dateTime
      )
    );
    setOpenReciptPopup(true);
  };

  const handlePrint = (submitCode, classId, acaYear, regKey, month) => {
    dispatch({ type: GET_RECEIPT_PRINT_RESET });
    dispatch(
      getSingleBillPrintAction(
        submitCode,
        classId,
        acaYear,
        regKey,
        fiscalYear,
        month
      )
    );
    setCurrentMonth(month);
    setOpenPrintPopup(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      postStudentLedgerAction(
        listStudentLedger?.studentLedgerModel,
        amountPaid,
        discount,
        advanced,
        naration,
        listStudentLedger?.searchFilterModel
      )
    );
    setRegKeyContainer(
      listStudentLedger?.studentLedgerModelLstsForStudent[
        listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
      ]?.RegistrationKey
    );
    setRegKeyNo(
      listStudentLedger?.studentLedgerModelLstsForStudent[
        listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
      ]?.VoucherBillNo
    );
    setDates(listStudentLedger && listStudentLedger?.studentLedgerModel);
    setPrintReceipts(
      listStudentLedger && listStudentLedger?.studentLedgerModel
    );
    setIdYears(
      listStudentLedger?.studentLedgerModelLstsForStudent[
        listStudentLedger?.studentLedgerModelLstsForStudent?.length + 1
      ]?.IDAcademicYear
    );
    setPrevBals(
      amountPaidPrint > 0 && discountPrint > 0 && advancePaidPrint > 0
        ? listStudentLedger?.studentLedgerModelLstsForStudent[
            listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
          ]?.Balance
        : listStudentLedger?.studentLedgerModelLstsForStudent[
            listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
          ]?.Balance
    );
    setBalDues(
      listStudentLedger?.studentLedgerModelLstsForStudent[
        listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
      ]?.Balance > 0
        ? listStudentLedger?.studentLedgerModelLstsForStudent[
            listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
          ]?.Balance?.toFixed(2)
        : "0"
    );
    setYears(listStudentLedger?.searchFilterModel?.ddlAcademicYear);
  };

  const updateHandler = (DrCr, submitCode, classId, acaYear) => {
    dispatch(
      getReverseEntryAction(
        DrCr,
        submitCode,
        classId,
        acaYear,
        listStudentLedger?.studentLedgerModelLstsForStudent[
          listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
        ]?.RegistrationKey,
        fiscalYear,
        startDate,
        endDate,
        listStudentLedger?.studentLedgerModelLstsForStudent[
          listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
        ]?.IDMonth
      )
    );
    setOpenReversePopup(true);
  };

  const amountPaidHandler = (amountPaid) => {
    setAmountPaid(amountPaid);
    setAmountPaidPrint(amountPaid);
  };

  const discountPrintHandler = (value) => {
    setDiscount(value);
    setDiscountPrint(value);
  };

  const advancePaidPrintHandler = (value) => {
    setAdvanced(value);
    setAdvancePaidPrint(value);
  };
  const narrationPrintHandler = (value) => {
    setNaration(value);
    setNarrationPrint(value);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="FiscalYear"
                label="Fiscal Year"
                value={fiscalYear}
                onChange={(e) => setFiscalYear(e.target.value)}
                options={ddlFiscalYear}
                errors={errors.fiscalYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="AcademicYear"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleYearChange(e.target.value)}
                options={academicYearDdl}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => handleClassIdChange(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
            </Grid>

            <Grid item xs={3}>
              <SelectControl
                name="student"
                label="Student"
                value={student}
                onChange={(e) => handleStudent(e.target.value)}
                options={ddlStudent}
                // errors={errors.student}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "15px" }}></div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="StartDate"
                  label="Start Date"
                  value={startDate}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    console.log(newDate.toLocaleDateString().slice(0, 10));
                    setStartDate(newDate.toLocaleDateString().slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "15px" }}></div>

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="EndDate"
                  label="End Date"
                  value={endDate}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    console.log(newDate.toLocaleDateString().slice(0, 10));
                    setEndDate(newDate.toLocaleDateString().slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "15px" }}></div>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleListSearch}
              >
                SEARCH
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>

        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {listStudentLedger && (
              <TableContainer>
                <TblHead />
                <TableBody>
                  {listStudentLedger?.studentLedgerModelLstsForStudent?.map(
                    (item) => (
                      <StudentLedgerTableCollapse
                        item={item}
                        key={item.$id}
                        ddlClass={
                          listStudentLedger?.searchFilterModel?.ddlClass
                        }
                        ddlNpMonth={
                          listStudentLedger?.searchFilterModel?.ddlnpMonth
                        }
                        buttonReciept={
                          listStudentLedger?.studentLedgerModelLstsForStudent
                            ?.Dr
                        }
                        buttonBill={
                          listStudentLedger?.studentLedgerModelLstsForStudent
                            ?.Cr
                        }
                        accountName={accountName}
                        setOpenPopup={setOpenPopup}
                        setOpenReciptPopup={setOpenReciptPopup}
                        setOpenPrintPopup={setOpenPrintPopup}
                        handlePrint={handlePrint}
                        handleRecipt={handleRecipt}
                        setOpenReversePopup={setOpenReversePopup}
                        updateHandler={updateHandler}
                      />
                    )
                  )}
                </TableBody>
              </TableContainer>
            )}
            {listStudentLedger && (
              <Grid container style={{ fontSize: "12px" }}>
                <Grid item xs={3}>
                  <InputControl
                    disabled
                    label="Previous Balance"
                    value={
                      listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance > 0
                        ? listStudentLedger?.studentLedgerModelLstsForStudent[
                            listStudentLedger?.studentLedgerModelLstsForStudent
                              ?.length - 1
                          ]?.Balance?.toFixed(2)
                        : "0"
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputControl
                    disabled
                    label="Balance Due"
                    value={
                      (listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance > 0
                        ? listStudentLedger?.studentLedgerModelLstsForStudent[
                            listStudentLedger?.studentLedgerModelLstsForStudent
                              ?.length - 1
                          ]?.Balance?.toFixed(2)
                        : "0") -
                      amountPaid -
                      discount -
                      advanced
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputControl
                    disabled
                    label="Advanced"
                    value={
                      listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance <= 0
                        ? listStudentLedger?.studentLedgerModelLstsForStudent[
                            listStudentLedger?.studentLedgerModelLstsForStudent
                              ?.length - 1
                          ]?.Balance?.toFixed(2) * -1
                        : "0"
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputControl
                    disabled
                    label="Transaction Date"
                    width="40%"
                    value={listStudentLedger?.studentLedgerModelLstsForStudent[
                      listStudentLedger?.studentLedgerModelLstsForStudent
                        ?.length - 1
                    ]?.TransactionDate?.slice(0, 10)}
                  />
                </Grid>
              </Grid>
            )}
            <div style={{ height: "25px" }}></div>
            {listStudentLedger && (
              <Grid container style={{ fontSize: "12px" }}>
                <Grid item xs={3}>
                  <InputControl
                    name="AmountPaid"
                    label="Amount Paid"
                    type="number"
                    variant="outlined"
                    value={amountPaid}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                    onWheelCapture={(e) => {
                      e.target.blur();
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onChange={(e) =>
                      e.target.value <=
                      listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance
                        ? amountPaidHandler(e.target.value)
                        : alert(
                            "Please fill Amount less than or equal to Previous Balance "
                          )
                    }
                  />
                </Grid>

                <Grid item xs={3}>
                  <InputControl
                    name="DiscountInTotal"
                    label="Discount In Total"
                    type="number"
                    variant="outlined"
                    value={discount}
                    onWheelCapture={(e) => {
                      e.target.blur();
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onChange={(e) =>
                      e.target.value <=
                      listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance
                        ? discountPrintHandler(e.target.value)
                        : alert(
                            "Please fill Amount less than or equal to Previous Balance "
                          )
                    }
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputControl
                    name="Advance"
                    label="Advanced Paid"
                    type="number"
                    variant="outlined"
                    value={advanced}
                    onWheelCapture={(e) => {
                      e.target.blur();
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    onChange={(e) => advancePaidPrintHandler(e.target.value)}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                  />
                </Grid>
                <Grid item xs={3}>
                  <InputControl
                    name="NarrationForAmountPaid"
                    label="Narration"
                    variant="outlined"
                    value={naration}
                    onChange={(e) => narrationPrintHandler(e.target.value)}
                  />
                </Grid>
                <div style={{ height: "15px" }}></div>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    type="submit"
                    style={{ margin: "10px 0 0 10px" }}
                  >
                    SUBMIT
                  </Button>

                  {/* <Button
                    variant="contained"
                    color="primary"
                    // type="submit"
                    style={{ margin: "10px 0 0 10px" }}
                  >
                    PRINT
                  </Button> */}
                </Grid>
              </Grid>
            )}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPrintPopup}
        setOpenPopup={setOpenPrintPopup}
        title="Print Student Ledger Bill"
      >
        <StudentLedgerBillPrint
          date={
            listStudentLedger &&
            listStudentLedger?.studentLedgerModel?.TransactionDate
          }
          dbModel={listStudentLedger && listStudentLedger?.studentLedgerModel}
          classDdl={ddlClass}
          monthlyFee={singleBillPrint?.dbModelLstForOneTimeBill}
          classId={classId}
          ddlAcaYear={academicYearDdl}
          acaYear={acaYear}
          ddlNpMonth={listStudentLedger?.searchFilterModel?.ddlnpMonth}
          prevBal={
            listStudentLedger?.studentLedgerModelLstsForStudent[
              listStudentLedger?.studentLedgerModelLstsForStudent?.length - 2
            ]?.Balance
          }
          regKey={
            listStudentLedger?.studentLedgerModelLstsForStudent[
              listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
            ]?.RegistrationKey
          }
          monthId={singleBillPrint?.dbModelLstForOneTimeBill?.IDMonth}
          setOpenPrintPopup={setOpenPrintPopup}
          currentMonth={currentMonth}
        />
      </Popup>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Print Student Ledger Reciept"
      >
        <StudentLedgerRecipt
          regKey={regKeyContainer}
          recieptNo={regKeyNo}
          printReceipt={printReceipts}
          date={dates}
          ddlClass={studentLedger?.ddlClass}
          ddlAcademicYear={years}
          idYear={idYears}
          years={receiptPrint?.studentLedgerBill?.AcademicYear}
          idClass={classId}
          setOpenPopup={setOpenPopup}
          prevBal={prevBals}
          amountPaid={amountPaidPrint}
          discount={discountPrint}
          advancedPaid={advancePaidPrint}
          balDue={balDues}
          newIdForReceipt={newIdForReceipt}
          acaYear={acaYear}
          academicYearDdl={academicYearDdl}
        />
      </Popup>
      <Popup
        openPopup={openReciptPopup}
        setOpenPopup={setOpenReciptPopup}
        title="Print Student Ledger Reciept"
      >
        <>
          <StudentLedgerSideRecipt
            regKey={
              listStudentLedger?.studentLedgerModelLstsForStudent[
                listStudentLedger?.studentLedgerModelLstsForStudent?.length - 1
              ]?.RegistrationKey
            }
            recieptNo={receiptPrint?.studentLedgerBill?.VoucherBillNo}
            printReceipt={
              listStudentLedger && listStudentLedger?.studentLedgerModel
            }
            date={listStudentLedger && listStudentLedger?.studentLedgerModel}
            ddlClass={studentLedger?.ddlClass}
            iDFiscalYear={listStudentLedger?.searchFilterModel?.IDFiscalYear}
            fiscalYearDdl={
              listStudentLedger?.searchFilterModel?.ddlAccountFiscalYear
            }
            amountPaid={receiptPrint?.amountPaid}
            discount={receiptPrint?.discount}
            advancedPaid={receiptPrint?.advancedPaid}
            acaYears={receiptPrint?.studentLedgerBill?.AcademicYear}
            idClass={studentLedger?.idClass}
            setOpenReciptPopup={setOpenReciptPopup}
            prevBal={receiptPrint?.previousBalanced}
            balDue={receiptPrint?.balanceDue}
          />
        </>
      </Popup>
      <Popup
        openPopup={openReversePopup}
        setOpenPopup={setOpenReversePopup}
        title="Reverse Entry Form"
      >
        <StudentLedgerReverseEntryForm
          reverseEntry={reverseEntryPrint?.ledgerAccountWiseModelLst}
          setOpenReversePopup={setOpenReversePopup}
          naration={naration}
          setNaration={setNaration}
          searchFilterModel={reverseEntryPrint?.searchFilterModel}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default StudentLedger;
