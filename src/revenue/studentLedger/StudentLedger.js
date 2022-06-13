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
  GET_SINGLE_BILL_PRINT_RESET,
  GET_UNIVERSITY_FACULTY_RESET,
  POST_STUDENT_LEDGER_RESET,
} from "./StudentLedgerConstants";
import {
  getAccountNameAction,
  getActiveStudentOnlyAction,
  getAllStudentLedgerAction,
  getListStudentLedgerAction,
  getReceiptPrintAction,
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
  { id: "actions", label: "Actions", disableSorting: true },
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

const StudentLedger = ({ searchFilterModel }) => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [ddlFiscalYear, setDdlFiscalYear] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [student, setStudent] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [month, setMonth] = useState();
  const [fiscalYear, setFiscalYear] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [advanced, setAdvanced] = useState(0);
  const [naration, setNaration] = useState("");
  const [regKey, setRegKey] = useState("");
  const [submitCode, setSubmitCode] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [openPrintPopup, setOpenPrintPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [tableData, setTableData] = useState([]);
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

  const { values, setValues, handleInputChange } = useForm(initialFormValues);

  const handleSearch = (e) => {
    setFilterFn({
      fn: (item) => {
        if (e.target.value === "") {
          return item;
        } else {
          return item.filter((x) =>
            x.FullName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

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

  const {
    listStudentLedger,
    loading,
    loading: printReceiptLoading,
    error: listStudentLedgerError,
  } = useSelector((state) => state.getListStudentLedger);
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

  if (singleBillPrintError) {
    setNotify({
      isOpen: true,
      message: singleBillPrintError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_BILL_PRINT_RESET });
  }

  if (receiptPrintError) {
    setNotify({
      isOpen: true,
      message: receiptPrintError,
      type: "error",
    });
    dispatch({ type: GET_RECEIPT_PRINT_RESET });
  }

  if (postStudentLedgerSuccess) {
    dispatch({ type: POST_STUDENT_LEDGER_RESET });
    dispatch(
      getListStudentLedgerAction(fiscalYear, student, startDate, endDate)
    );
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

  useEffect(() => {
    if (listStudentLedger) {
      setTableData(listStudentLedger?.studentLedgerModelLstsForStudent);
    }
  }, [listStudentLedger]);

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
    setOpenPopup(true);
  };

  const handlePrint = () => {
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
    setOpenPrintPopup(true);
  };

  useEffect(() => {
    if (singleBillPrint) {
      setSubmitCode(
        listStudentLedger?.studentLedgerModelLstsForStudent[
          listStudentLedger?.studentLedgerModelLstsForStudent?.length + 1
        ]?.AccountSubmitCode
      );
    }
    setRegKey(
      singleBillPrint?.dbModelLstForAdmissionRegistrationForOneTime
        ?.RegistrationKey
    );
    setMonth(singleBillPrint?.dbModelLstForOneTimeBill?.IDMonth);
  }, [singleBillPrint]);

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
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Student Ledger by Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            {listStudentLedger && (
              <TableContainer className={classes.table}>
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
                        accountName={accountName}
                        setOpenPrintPopup={setOpenPrintPopup}
                        handlePrint={handlePrint}
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
                          ?.length - 2
                      ]?.Balance > 0
                        ? listStudentLedger?.studentLedgerModelLstsForStudent[
                            listStudentLedger?.studentLedgerModelLstsForStudent
                              ?.length - 2
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
                      discount
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
                    onChange={(e) =>
                      e.target.value <=
                      listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance
                        ? setAmountPaid(e.target.value)
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
                    onChange={(e) =>
                      e.target.value <=
                      listStudentLedger?.studentLedgerModelLstsForStudent[
                        listStudentLedger?.studentLedgerModelLstsForStudent
                          ?.length - 1
                      ]?.Balance
                        ? setDiscount(e.target.value)
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
                    onChange={(e) => setAdvanced(e.target.value)}
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
                    onChange={(e) => setNaration(e.target.value)}
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

                  <Button
                    variant="contained"
                    color="primary"
                    // type="submit"
                    style={{ margin: "10px 0 0 10px" }}
                  >
                    PRINT
                  </Button>
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
          date={listStudentLedger && listStudentLedger?.studentLedgerModel}
          dbModel={singleBillPrint}
          classDdl={ddlClass}
          classId={classId}
          ddlAcaYear={academicYearDdl}
          acaYear={acaYear}
          ddlNpMonth={listStudentLedger?.searchFilterModel?.ddlnpMonth}
          // voucher={singleBillPrint}
          // //   feeStructure={feeStructure}
          // monthlyFee={singleBillPrint}
          // extraFee={extraFee}
          setOpenPrintPopup={setOpenPrintPopup}
        />
      </Popup>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Print Student Ledger Reciept"
      >
        {printReceiptLoading ? (
          <LoadingComp />
        ) : (
          <>
            <StudentLedgerRecipt
              regKey={
                listStudentLedger?.studentLedgerModelLstsForStudent[
                  listStudentLedger?.studentLedgerModelLstsForStudent?.length -
                    1
                ]?.RegistrationKey
              }
              printReceipt={
                listStudentLedger && listStudentLedger?.studentLedgerModel
              }
              date={listStudentLedger && listStudentLedger?.studentLedgerModel}
              ddlClass={studentLedger?.ddlClass}
              iDFiscalYear={listStudentLedger?.searchFilterModel?.IDFiscalYear}
              fiscalYearDdl={
                listStudentLedger?.searchFilterModel?.ddlAccountFiscalYear
              }
              ddlAcademicYear={
                listStudentLedger?.searchFilterModel?.ddlAcademicYear
              }
              idYear={
                listStudentLedger?.studentLedgerModelLstsForStudent[
                  listStudentLedger?.studentLedgerModelLstsForStudent?.length +
                    1
                ]?.IDAcademicYear
              }
              idClass={studentLedger?.idClass}
              setOpenPopup={setOpenPopup}
              prevBal={
                listStudentLedger?.studentLedgerModelLstsForStudent[
                  listStudentLedger?.studentLedgerModelLstsForStudent?.length -
                    2
                ]?.Balance
              }
              amountPaid={amountPaid}
              balDue={
                (listStudentLedger?.studentLedgerModelLstsForStudent[
                  listStudentLedger?.studentLedgerModelLstsForStudent?.length -
                    1
                ]?.Balance > 0
                  ? listStudentLedger?.studentLedgerModelLstsForStudent[
                      listStudentLedger?.studentLedgerModelLstsForStudent
                        ?.length - 1
                    ]?.Balance?.toFixed(2)
                  : "0") -
                amountPaid -
                discount
              }
            />
          </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default StudentLedger;
