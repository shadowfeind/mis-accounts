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
import {
  GET_ACTIVE_STUDENT_ONLY_RESET,
  GET_ALL_STUDENT_LEDGER_RESET,
  GET_LIST_STUDENT_LEDGER_RESET,
  GET_UNIVERSITY_FACULTY_RESET,
  POST_STUDENT_LEDGER_RESET,
} from "./StudentLedgerConstants";
import {
  getActiveStudentOnlyAction,
  getAllStudentLedgerAction,
  getListStudentLedgerAction,
  postStudentLedgerAction,
} from "./StudentLedgerActions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import StudentLedgerTableCollapse from "./StudentLedgerTableCollapse";

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
  { id: "idDrCr", label: "idDrCr" },
  { id: "Voucher/BillNo", label: "Voucher/BillNo" },
  { id: "Class", label: "Class" },
  { id: "AccountForm", label: "Account Form" },
  { id: "BillMonth", label: "Month" },
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
  const [fiscalYear, setFiscalYear] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [discount, setDiscount] = useState("");
  const [advanced, setAdvanced] = useState("");
  const [naration, setNaration] = useState("");
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

  const {
    listStudentLedger,
    loading,
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

  if (postStudentLedgerSuccess) {
    setNotify({
      isOpen: true,
      message: "Successfully Submitted",
      type: "success",
    });
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
      setAmountPaid(listStudentLedger?.studentLedgerModel?.AmountPaid);
      setDiscount(listStudentLedger?.studentLedgerModel?.DiscountInTotal);
      setAdvanced(listStudentLedger?.studentLedgerModel?.Advance);
      setNaration(
        listStudentLedger?.studentLedgerModel?.NarrationForAmountPaid
      );
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
  };

  const symbolsArr = ["e", "E", "+", "-", "ArrowUp", "ArrowDown"];

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
                onChange={(e) => setAcaYear(e.target.value)}
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
                onChange={(e) => setStudent(e.target.value)}
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
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <StudentLedgerTableCollapse item={item} key={item.$id} />
                  ))}
                </TableBody>
              </TableContainer>
            )}
            {listStudentLedger && (
              <Grid container style={{ fontSize: "12px" }}>
                <Grid item xs={3}>
                  <InputControl
                    disabled
                    label="Amount Paid"
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
                    label="Discount in Total"
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
                    onChange={(e) => setAmountPaid(e.target.value)}
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
                    onChange={(e) => setDiscount(e.target.value)}
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
            {listStudentLedger && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default StudentLedger;
