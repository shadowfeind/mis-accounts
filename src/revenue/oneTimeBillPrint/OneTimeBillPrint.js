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
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import ConfirmDialog from "../../components/ConfirmDialog";
import LoadingComp from "../../components/LoadingComp";
import {
  GET_ALL_ONE_TIME_BILL_PRINT_RESET,
  GET_PRINT_ONE_TIME_BILL_PRINT_RESET,
} from "./OneTimeBillPrintConstants";
import {
  getAllOneTimeBillPrintAction,
  getPrintOneTimeBillPrintAction,
} from "./OneTimeBillPrintActions";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import OneTimeBillPrintModal from "./OneTimeBillPrintModal";
import { getActiveStudentForBillGenerateAction } from "../billGenerate/BillgenerateActions";
import { GET_ACTIVE_STUDENT_ONLY_RESET } from "../studentLedger/StudentLedgerConstants";
import { getActiveStudentOnlyAction } from "../studentLedger/StudentLedgerActions";

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

const OneTimeBillPrint = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [shift, setShift] = useState(0);
  const [ddlFiscalYear, setDdlFiscalYear] = useState([]);
  const [ddlStudent, setDdlStudent] = useState([]);
  const [student, setStudent] = useState("");
  const [npMonthDdl, setNpMonthDdl] = useState([]);
  const [npMonth, setNpMonth] = useState("");
  const [fiscalYear, setFiscalYear] = useState("");
  const [transactionDate, setTransactionDate] = useState();
  const [faculty, setFaculty] = useState("");
  const [idFeeStructure, setIdFeeStructure] = useState("");
  const [errors, setErrors] = useState({});
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const test = [{ Key: "", Value: "" }];
  const dispatch = useDispatch();

  const { oneTimeBillPrint, error } = useSelector(
    (state) => state.getAllOneTimeBillPrint
  );

  const { activeStudentOnly, error: activeStudentOnlyError } = useSelector(
    (state) => state.getActiveStudentOnly
  );

  const { printOneTimeBill, error: printOneTimeBillError } = useSelector(
    (state) => state.getPrintOneTimeBillPrint
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ONE_TIME_BILL_PRINT_RESET });
  }

  if (printOneTimeBillError) {
    setNotify({
      isOpen: true,
      message: printOneTimeBillError,
      type: "error",
    });
    dispatch({ type: GET_PRINT_ONE_TIME_BILL_PRINT_RESET });
  }

  if (activeStudentOnlyError) {
    setNotify({
      isOpen: true,
      message: activeStudentOnlyError,
      type: "error",
    });
    dispatch({ type: GET_ACTIVE_STUDENT_ONLY_RESET });
  }

  // const handleYearChange = (value) => {
  //   dispatch(
  //     getActiveStudentForBillGenerateAction(value, faculty, classId, shift)
  //   );
  //   setAcaYear(value);
  // };
  // const handleClassChange = (value) => {
  //   dispatch(
  //     getActiveStudentForBillGenerateAction(acaYear, faculty, value, shift)
  //   );
  //   setClassId(value);
  // };

  useEffect(() => {
    dispatch(getAllOneTimeBillPrintAction());
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    if (oneTimeBillPrint) {
      setDdlFiscalYear(
        oneTimeBillPrint?.searchFilterModel?.ddlAccountFiscalYear
      );
      setFiscalYear(
        oneTimeBillPrint?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setAcademicYearDdl(oneTimeBillPrint?.searchFilterModel?.ddlAcademicYear);
      setAcaYear(oneTimeBillPrint?.searchFilterModel.ddlAcademicYear[0]?.Key);
      setDdlClass(oneTimeBillPrint?.searchFilterModel?.ddlClass);
      setClassId(oneTimeBillPrint?.searchFilterModel.ddlClass[0]?.Key);

      setNpMonthDdl(oneTimeBillPrint?.searchFilterModel?.ddlnpMonth);
      setNpMonth(oneTimeBillPrint?.searchFilterModel.npMonth);
      setFaculty(
        oneTimeBillPrint?.searchFilterModel?.ddlFacultyProgramLink[0]?.Key
      );
      setIdFeeStructure(
        oneTimeBillPrint?.searchFilterModel.idAdmissionFeeStructure
      );
      setTransactionDate(oneTimeBillPrint?.Datetime?.slice(0, 10));

      dispatch(
        getActiveStudentOnlyAction(
          oneTimeBillPrint?.searchFilterModel.ddlAcademicYear[0]?.Key,
          oneTimeBillPrint?.searchFilterModel.ddlClass[0]?.Key
        )
      );
    }
  }, [oneTimeBillPrint]);

  const validate = () => {
    let temp = {};

    temp.fiscalYear = !fiscalYear ? "This field is required" : "";
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    // temp.student = !student ? "This feild is required" : "";
    temp.npMonth = !npMonth ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleListPrint = () => {
    if (validate()) {
      dispatch(
        getPrintOneTimeBillPrintAction(
          acaYear,
          classId,
          npMonth,
          fiscalYear,
          student
        )
      );
      setOpenPopup(true);
    }
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if ((value, classId)) {
      dispatch(getActiveStudentOnlyAction(value, classId));
    }
    setStudent("");
    setDdlStudent([]);
  };

  const handleClassChange = (value) => {
    setClassId(value);
    if ((acaYear, value)) {
      dispatch(getActiveStudentOnlyAction(acaYear, value));
    }
    setStudent("");
    setDdlStudent([]);
  };

  useEffect(() => {
    if (activeStudentOnly) {
      setDdlStudent(activeStudentOnly);
      setStudent(activeStudentOnly[activeStudentOnly?.length - 1]?.Key);
    }
  }, [activeStudentOnly]);
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
                onChange={(e) => handleClassChange(e.target.value)}
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
                errors={errors.student}
              />
            </Grid>
            <Grid item xs={3}>
              <div style={{ height: "15px" }}></div>

              <SelectControl
                name="npMonth"
                label="Nepali Month"
                value={npMonth}
                onChange={(e) => setNpMonth(e.target.value)}
                options={npMonthDdl}
                errors={errors.npMonth}
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
                  name="date"
                  label="Date"
                  value={transactionDate}
                  onChange={(e) => {
                    const newDate = new Date(e);
                    console.log(newDate.toLocaleDateString().slice(0, 10));
                    setTransactionDate(
                      newDate.toLocaleDateString().slice(0, 10)
                    );
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
                onClick={handleListPrint}
              >
                PRINT
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="One Time Bill Print"
      >
        <OneTimeBillPrintModal
          printOneTimeBill={printOneTimeBill}
          date={transactionDate}
          classDdl={ddlClass}
          classId={classId}
          ddlAcaYear={academicYearDdl}
          acaYear={acaYear}
          monthDdl={npMonthDdl}
          monthId={npMonth}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
    </>
  );
};

export default OneTimeBillPrint;
