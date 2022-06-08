import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Grid,
} from "@material-ui/core";
import SelectControl from "../../components/controls/SelectControl";
import useCustomTable from "../../customHooks/useCustomTable";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import DatePickerControl from "../../components/controls/DatePickerControl";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import DateFnsUtils from "@date-io/date-fns";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingComp from "../../components/LoadingComp";
import {
  GET_ALL_STUDENT_DUE_RESET,
  GET_LIST_STUDENT_DUE_RESET,
  GET_PRINT_STUDENT_DUE_RESET,
} from "./StudentDueConstants";
import {
  getAllSchoolDueAction,
  getListSchoolDueAction,
  getPrintSchoolDueAction,
} from "./StudentDueActions";
import StudentDueTableCollapse from "./StudentDueTableCollapse";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import StudentDuePrint from "./StudentDuePrint";

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
  { id: "SN.", label: "SN." },
  { id: "RegistrationKey", label: "Registration Key" },
  { id: "Name", label: "Name" },
  { id: "RemainingDues", label: "Remaining Dues" },
];

const StudentDue = () => {
  const [fiscalYearDdl, setFiscalYearDdl] = useState([]);
  const [fiscalYear, setFiscalYear] = useState("");
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [errors, setErrors] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { studentDue, error } = useSelector((state) => state.getAllStudentDue);

  const {
    listStudentDue,
    error: listStudentDueError,
    loading,
  } = useSelector((state) => state.getListStudentDue);

  const {
    printStudentDue,
    error: printStudentDueError,
    loading: printStudentDueLoading,
  } = useSelector((state) => state.getPrintStudentDue);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_STUDENT_DUE_RESET });
  }

  if (listStudentDueError) {
    setNotify({
      isOpen: true,
      message: listStudentDueError,
      type: "error",
    });
    dispatch({ type: GET_LIST_STUDENT_DUE_RESET });
  }

  if (printStudentDueError) {
    setNotify({
      isOpen: true,
      message: printStudentDueError,
      type: "error",
    });
    dispatch({ type: GET_PRINT_STUDENT_DUE_RESET });
  }

  useEffect(() => {
    if (studentDue) {
      setFiscalYearDdl(studentDue?.searchFilterModel?.ddlAccountFiscalYear);
      setFiscalYear(
        studentDue?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setDate(studentDue?.searchFilterModel?.StartDate?.slice(0, 10));
      setEndDate(studentDue?.searchFilterModel?.EndDate?.slice(0, 10));
    }
  }, [studentDue]);
  useEffect(() => {
    dispatch({ type: GET_LIST_STUDENT_DUE_RESET });
    dispatch(getAllSchoolDueAction());
  }, []);

  useEffect(() => {
    if (listStudentDue) {
      setTableData(listStudentDue?.studentDueModelLsts);
    }
  }, [listStudentDue]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  const validate = () => {
    let temp = {};
    temp.fiscalYear = !fiscalYear ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

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
  const handleListSearch = () => {
    if (validate()) {
      dispatch(getListSchoolDueAction(fiscalYear, date, endDate));
    }
  };

  const handlePrint = () => {
    if (validate()) {
      setOpenPopup(true);
      dispatch(getPrintSchoolDueAction(date, endDate, fiscalYear));
    }
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
                options={fiscalYearDdl}
                errors={errors.fiscalYear}
              />
            </Grid>
            <Grid item xs={3}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  name="StartDate"
                  label="Start Date"
                  value={date}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    console.log(newDate.toLocaleDateString().slice(0, 10));
                    setDate(newDate.toLocaleDateString().slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
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
                    setEndDate(newDate.toLocaleDateString().slice(0, 10));
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={3}>
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
            label="Search Student Due by Name"
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
            {listStudentDue && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item, index) => (
                    <StudentDueTableCollapse
                      item={item}
                      key={item.$id}
                      index={index}
                    />
                  ))}
                  {listStudentDue?.studentDueModelLsts?.length > 0 ? (
                    <TableRow>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                      ></TableCell>
                      <TableCell style={{ backgroundColor: "lightgrey" }}>
                        <strong>Total</strong>
                      </TableCell>
                      <TableCell style={{ backgroundColor: "lightgrey" }}>
                        {tableDataAfterPagingAndSorting()
                          ?.reduce((acc, curr) => {
                            return acc + curr.RemainingDue;
                          }, 0)
                          ?.toFixed(2)}
                      </TableCell>
                      <TableCell
                        style={{ backgroundColor: "lightgrey" }}
                      ></TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <strong>No Data</strong>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TableContainer>
            )}

            {listStudentDue?.studentDueModelLsts?.length > 0 && (
              <>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
                  // style={{ marginBottom: "-60px" }}
                  onClick={handlePrint}
                >
                  PRINT
                </Button>{" "}
                <TblPagination />{" "}
              </>
            )}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Print Student Dues"
      >
        {printStudentDueLoading ? (
          <LoadingComp />
        ) : (
          <>
            <StudentDuePrint />
          </>
        )}
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default StudentDue;
