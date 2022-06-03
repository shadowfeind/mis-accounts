import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActiveStudentForLedgeronlyAction,
  getAllAdmitStudentAction,
  getBulkEditAdmitStudentAction,
} from "./AdmitStudentActions";
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
import InputControl from "../../components/controls/InputControl";
import CustomContainer from "../../components/CustomContainer";
import Notification from "../../components/Notification";
import LoadingComp from "../../components/LoadingComp";
import {
  GET_ACTIVE_STUDENT_FOR_LEDGERONLY_RESET,
  GET_ALL_ADMIT_STUDENT_RESET,
  GET_BULK_EDIT_ADMIT_STUDENT_RESET,
} from "./AdmitStudentConstants";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import FeeStructure from "./feeStructure/FeeStructure";
import MonthlyFeeStructure from "./monthlyFeeStructure/MonthlyFeeStructure";

const AdmitStudent = () => {
  const [ddlAcaYear, setDdlAcaYear] = useState([]);
  const [acaYear, setAcaYear] = useState("");
  const [fiscalYearDdl, setFiscalYearDdl] = useState([]);
  const [fiscalYear, setFiscalYear] = useState("");
  const [classDdl, setClassDdl] = useState([]);
  const [classId, setClassId] = useState("");
  const [monthDdl, setMonthDdl] = useState([]);
  const [monthId, setMonthId] = useState("");
  const [studentDdl, setStudentDdl] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [faculty, setFaculty] = useState("");
  const [shift, setShift] = useState(0);
  const [errors, setErrors] = useState({});
  const [transactionDate, setTransactionDate] = useState();
  const [voucher, setVoucher] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();

  const { admitStudent, error: admitStudentError } = useSelector(
    (state) => state.getAllAdmitStudent
  );
  const { activeStudentForLedgeronly, error: activeStudentForLedgeronlyError } =
    useSelector((state) => state.getAllActiveStudentForLedgeronly);

  const { blukEditAdmitStudent, error: blukEditAdmitStudentError } =
    useSelector((state) => state.getBulkEditAdmitStudent);

  if (admitStudentError) {
    setNotify({
      isOpen: true,
      message: admitStudentError,
      type: "error",
    });
    dispatch({ type: GET_ALL_ADMIT_STUDENT_RESET });
  }
  if (activeStudentForLedgeronlyError) {
    setNotify({
      isOpen: true,
      message: activeStudentForLedgeronlyError,
      type: "error",
    });
    dispatch({ type: GET_ACTIVE_STUDENT_FOR_LEDGERONLY_RESET });
  }
  if (blukEditAdmitStudentError) {
    setNotify({
      isOpen: true,
      message: blukEditAdmitStudentError,
      type: "error",
    });
    dispatch({ type: GET_BULK_EDIT_ADMIT_STUDENT_RESET });
  }
  const handleYearChange = (value) => {
    dispatch(
      getActiveStudentForLedgeronlyAction(value, faculty, classId, shift)
    );
    setAcaYear(value);
  };
  const handleClassChange = (value) => {
    dispatch(
      getActiveStudentForLedgeronlyAction(acaYear, faculty, value, shift)
    );
    setClassId(value);
  };
  useEffect(() => {
    if (admitStudent) {
      setFiscalYearDdl(admitStudent?.searchFilterModel?.ddlAccountFiscalYear);
      setFiscalYear(
        admitStudent?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setDdlAcaYear(admitStudent?.searchFilterModel?.ddlAcademicYear);
      setAcaYear(admitStudent?.searchFilterModel?.ddlAcademicYear[0]?.Key);
      setClassDdl(admitStudent?.searchFilterModel?.ddlClass);
      setClassId(admitStudent?.searchFilterModel?.ddlClass[0]?.Key);
      setMonthDdl(admitStudent?.searchFilterModel?.ddlnpMonth);
      setMonthId(admitStudent?.searchFilterModel?.ddlnpMonth[0]?.Key);
      setFaculty(
        admitStudent?.searchFilterModel?.ddlFacultyProgramLink[0]?.Key
      );
      dispatch(
        getActiveStudentForLedgeronlyAction(
          admitStudent?.searchFilterModel?.ddlAcademicYear[0]?.Key,
          admitStudent?.searchFilterModel?.ddlFacultyProgramLink[0]?.Key,
          admitStudent?.searchFilterModel?.ddlClass[0]?.Key,
          shift
        )
      );
    }
  }, [admitStudent]);

  useEffect(() => {
    if (activeStudentForLedgeronly) {
      setStudentDdl(activeStudentForLedgeronly);
      setStudentId(activeStudentForLedgeronly[0]?.Key);
    }
  }, [activeStudentForLedgeronly]);

  useEffect(() => {
    if (blukEditAdmitStudent) {
      setTransactionDate(
        blukEditAdmitStudent?.dbModel?.TransactionDate?.slice(0, 10)
      );
      setVoucher(blukEditAdmitStudent?.dbModel?.VoucherBillNo);
    }
  }, [blukEditAdmitStudent]);

  useEffect(() => {
    dispatch(getAllAdmitStudentAction());
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.fiscalYear = !fiscalYear ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.studentId = !studentId ? "This feild is required" : "";
    temp.monthId = !monthId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleListSearch = () => {
    if (validate()) {
      dispatch(
        getBulkEditAdmitStudentAction(
          fiscalYear,
          acaYear,
          classId,
          studentId,
          monthId
        )
      );
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container>
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
              <SelectControl
                name="AcademicYear"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => handleYearChange(e.target.value)}
                options={ddlAcaYear}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Class"
                label="Class"
                value={classId}
                onChange={(e) => handleClassChange(e.target.value)}
                options={classDdl}
                errors={errors.classId}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Student"
                label="Student"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                options={studentDdl}
                errors={errors.studentId}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
              <SelectControl
                name="NepaliMonth"
                label="Nepali Month"
                value={monthId}
                onChange={(e) => setMonthId(e.target.value)}
                options={monthDdl}
                errors={errors.monthId}
              />
            </Grid>

            <Grid item xs={3}>
              <div style={{ height: "10px" }}></div>
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
        {blukEditAdmitStudent && (
          <div
            style={{
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "2px solid #f3f3f3",
            }}
          >
            <Toolbar>
              <Grid container>
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      inputVariant="outlined"
                      format="dd-MM-yyyy"
                      name="transaction date"
                      label="Transaction Date"
                      value={transactionDate}
                      onChange={(e) => {
                        const newDate = new Date(e);
                        setTransactionDate(
                          newDate.toLocaleDateString().slice(0, 10)
                        );
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                  <InputControl
                    name="voucher"
                    label="Voucher/Bill No"
                    value={voucher}
                    disabled
                  />
                </Grid>
              </Grid>
            </Toolbar>
            <div style={{ height: "15px" }}></div>
            <h3>Admission Fee</h3>
            <FeeStructure
              admissionFee={blukEditAdmitStudent?.admissionFeeStructureLst}
            />
            <h3>Monthly Fee</h3>
            <MonthlyFeeStructure
              admissionFee={blukEditAdmitStudent?.monthlyFeeStructureLst}
            />
          </div>
        )}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default AdmitStudent;
