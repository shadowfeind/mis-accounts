import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Toolbar, Grid, TextField } from "@material-ui/core";
import SelectControl from "../../components/controls/SelectControl";
import InputControl from "../../components/controls/InputControl";
import CustomContainer from "../../components/CustomContainer";
import Notification from "../../components/Notification";
import LoadingComp from "../../components/LoadingComp";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Popup from "../../components/Popup";
import {
  GET_ALL_ONE_TIME_BILL_RESET,
  GET_BULK_EDIT_ONE_TIME_BILL_RESET,
  POST_ONE_TIME_BILL_RESET,
} from "./OneTimeBillConstants";
import {
  getAllOneTimeBillAction,
  getBulkEditOneTimeBillAction,
  postOneTimeBillAction,
} from "./OneTimeBillActions";
import MonthlyFeeStructure from "./monthlyFeeStructure/MonthlyFeeStructure";
import ExtraFeeStructure from "./extraFeeStructure/ExtraFeeStructure";
import StudentList from "./studentList/StudentList";
import OneTimeBillPrint from "./OneTimeBillPrint";

const OneTimeBill = () => {
  const [ddlAcaYear, setDdlAcaYear] = useState([]);
  const [acaYear, setAcaYear] = useState("");
  const [fiscalYearDdl, setFiscalYearDdl] = useState([]);
  const [fiscalYear, setFiscalYear] = useState("");
  const [classDdl, setClassDdl] = useState([]);
  const [classId, setClassId] = useState("");
  const [monthDdl, setMonthDdl] = useState([]);
  const [monthId, setMonthId] = useState("");
  const [studentDdl, setStudentDdl] = useState([]);
  const [faculty, setFaculty] = useState("");
  const [shift, setShift] = useState(0);
  const [errors, setErrors] = useState({});
  const [postErrors, setPostErrors] = useState({});
  const [transactionDate, setTransactionDate] = useState();
  const [voucher, setVoucher] = useState("");
  const [monthlyFee, setMonthlyFee] = useState([]);
  const [extraFee, setExtraFee] = useState([]);
  const [studentSelected, setStudentSelected] = useState([]);
  const [dbModelContainer, setDbModelContainer] = useState({});
  const [narration, setNarration] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);

  const { ontTimeBill, error: ontTimeBillError } = useSelector(
    (state) => state.getAllOneTimeBill
  );

  const {
    blukEditOneTimeBill,
    error: blukEditOneTimeBillError,
    loading: blukEditOneTimeBillLoading,
  } = useSelector((state) => state.getBulkEditOneTimeBill);

  const {
    error: postOneTimeBillError,
    loading: postOneTimeBillLoading,
    success: postOneTimeBillSuccess,
  } = useSelector((state) => state.postOneTimeBill);

  if (ontTimeBillError) {
    setNotify({
      isOpen: true,
      message: ontTimeBillError,
      type: "error",
    });
    dispatch({ type: GET_ALL_ONE_TIME_BILL_RESET });
  }

  if (blukEditOneTimeBillError) {
    setNotify({
      isOpen: true,
      message: blukEditOneTimeBillError,
      type: "error",
    });
    dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_RESET });
  }

  if (postOneTimeBillError) {
    setNotify({
      isOpen: true,
      message: postOneTimeBillError,
      type: "error",
    });
    dispatch({ type: POST_ONE_TIME_BILL_RESET });
  }

  if (postOneTimeBillSuccess) {
    setOpenPopup(true);
    dispatch({ type: POST_ONE_TIME_BILL_RESET });
    dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_RESET });
  }

  useEffect(() => {
    if (ontTimeBill) {
      setFiscalYearDdl(ontTimeBill?.searchFilterModel?.ddlAccountFiscalYear);
      setFiscalYear(
        ontTimeBill?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setDdlAcaYear(ontTimeBill?.searchFilterModel?.ddlAcademicYear);
      setAcaYear(ontTimeBill?.searchFilterModel?.ddlAcademicYear[0]?.Key);
      setClassDdl(ontTimeBill?.searchFilterModel?.ddlClass);
      setClassId(ontTimeBill?.searchFilterModel?.ddlClass[0]?.Key);
      setMonthDdl(ontTimeBill?.searchFilterModel?.ddlnpMonth);
      setMonthId(ontTimeBill?.searchFilterModel?.npMonth);
      setFaculty(ontTimeBill?.searchFilterModel?.ddlFacultyProgramLink[0]?.Key);
    }
  }, [ontTimeBill]);

  useEffect(() => {
    dispatch(getAllOneTimeBillAction());
    dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_RESET });
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    if (blukEditOneTimeBill) {
      setTransactionDate(
        blukEditOneTimeBill?.dbModel?.TransactionDate?.slice(0, 10)
      );
      setStudentDdl(
        blukEditOneTimeBill?.dbModelLstForAdmissionRegistrationForOneTime
      );
      setStudentSelected(
        blukEditOneTimeBill?.dbModelLstForAdmissionRegistrationForOneTime
      );
      setVoucher(blukEditOneTimeBill?.dbModel?.VoucherBillNo);
    }
  }, [blukEditOneTimeBill]);

  useEffect(() => {
    if (blukEditOneTimeBill?.dbModel) {
      setDbModelContainer({ ...blukEditOneTimeBill.dbModel });
    }
  }, [blukEditOneTimeBill?.dbModel]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.fiscalYear = !fiscalYear ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";
    temp.monthId = !monthId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const postValidate = () => {
    let temp = {};
    temp.student =
      studentDdl.length < 1 ? "Can not submit without students" : "";
    setPostErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleYearChange = (value) => {
    setAcaYear(value);
    if (blukEditOneTimeBill) {
      dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_RESET });
    }
  };
  const handleClassChange = (value) => {
    setClassId(value);
    if (blukEditOneTimeBill) {
      dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_RESET });
    }
  };
  const handleMonthChange = (value) => {
    setMonthId(value);
    if (blukEditOneTimeBill) {
      dispatch({ type: GET_BULK_EDIT_ONE_TIME_BILL_RESET });
    }
  };

  const handleListSearch = () => {
    setPostErrors({});
    if (validate()) {
      setExtraFee([]);
      dispatch(
        getBulkEditOneTimeBillAction(fiscalYear, acaYear, classId, monthId)
      );
    }
  };

  const handleSubmit = () => {
    if (postValidate()) {
      dispatch(
        postOneTimeBillAction(
          monthlyFee,
          extraFee,
          studentDdl,
          blukEditOneTimeBill.dbModel,
          blukEditOneTimeBill.searchFilterModel,
          narration
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
                name="NepaliMonth"
                label="Nepali Month"
                value={monthId}
                onChange={(e) => handleMonthChange(e.target.value)}
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

        {blukEditOneTimeBillLoading ? (
          <LoadingComp />
        ) : (
          blukEditOneTimeBill && (
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
              <h3>Student List</h3>
              {postErrors?.student && (
                <h5 style={{ color: "red", textAlign: "center" }}>
                  {postErrors?.student}
                </h5>
              )}
              <StudentList
                student={studentDdl}
                studentSelected={studentSelected}
                setStudentSelected={setStudentSelected}
              />
              <h3>Monthly Fee</h3>
              <MonthlyFeeStructure
                admissionFee={
                  blukEditOneTimeBill?.monthlyFeeStructureLstOneTime
                }
                regKey={blukEditOneTimeBill?.searchFilterModel?.RegistrationKey}
                idFacLink={blukEditOneTimeBill?.dbModel?.IDYearFacultyLink}
                voucherBill={blukEditOneTimeBill?.dbModel?.VoucherBillNo}
                idAcaYear={
                  blukEditOneTimeBill?.searchFilterModel?.idAcademicYear
                }
                level={blukEditOneTimeBill?.searchFilterModel?.level}
                fiscalYear={blukEditOneTimeBill?.dbModel?.IDFiscalYear}
                month={blukEditOneTimeBill?.searchFilterModel?.IDMonth}
                date={transactionDate}
                currentFee={monthlyFee}
                setCurrentFee={setMonthlyFee}
              />
              <h3>Extra Fee</h3>
              <ExtraFeeStructure
                regKey={blukEditOneTimeBill?.searchFilterModel?.RegistrationKey}
                idFacLink={blukEditOneTimeBill?.dbModel?.IDYearFacultyLink}
                voucherBill={blukEditOneTimeBill?.dbModel?.VoucherBillNo}
                idAcaYear={
                  blukEditOneTimeBill?.searchFilterModel?.idAcademicYear
                }
                level={blukEditOneTimeBill?.searchFilterModel?.level}
                fiscalYear={blukEditOneTimeBill?.dbModel?.IDFiscalYear}
                month={blukEditOneTimeBill?.searchFilterModel?.IDMonth}
                date={transactionDate}
                currentFee={extraFee}
                setCurrentFee={setExtraFee}
              />
              <div style={{ height: "10px" }}></div>
              <div>
                <TextField
                  value={(
                    monthlyFee
                      ?.filter((x) => x.active === true)
                      ?.reduce((acc, item) => {
                        return acc + Number(item.Cr);
                      }, 0) +
                    extraFee
                      ?.filter((x) => x.active === true)
                      ?.reduce((acc, item) => {
                        return acc + Number(item.Cr);
                      }, 0)
                  )?.toFixed(2)}
                  disabled
                  variant="outlined"
                  name="Total"
                  label="Grand Total"
                />
                <TextField
                  value={narration}
                  onChange={(e) => setNarration(e.target.value)}
                  variant="outlined"
                  name="Narration"
                  label="Narration"
                  style={{ marginLeft: "12px", width: "50%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  style={{ margin: "10px 0 0 10px" }}
                  onClick={handleSubmit}
                  disabled={postOneTimeBillLoading}
                >
                  {postOneTimeBillLoading ? "...PROCESSING" : "SUBMIT"}
                </Button>
              </div>
            </div>
          )
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Print Ont Time Bill"
      >
        <OneTimeBillPrint
          date={transactionDate}
          dbModel={dbModelContainer}
          classDdl={classDdl}
          classId={classId}
          ddlAcaYear={ddlAcaYear}
          acaYear={acaYear}
          monthDdl={monthDdl}
          monthId={monthId}
          voucher={voucher}
          monthlyFee={monthlyFee}
          extraFee={extraFee}
          studentDdl={studentSelected}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default OneTimeBill;
