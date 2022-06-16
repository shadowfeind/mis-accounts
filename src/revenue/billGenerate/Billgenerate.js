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
  GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_RESET,
  GET_ALL_BILL_GENERATE_RESET,
  GET_BULK_EDIT_BILL_GENERATE_RESET,
  POST_BILL_GENERATE_RESET,
} from "./BillgenerateConstants";
import {
  getActiveStudentForBillGenerateAction,
  getAllBillGenerateAction,
  getBulkEditBillGenerateAction,
  postBillGenerateAction,
} from "./BillgenerateActions";
import MonthlyFeeStructure from "./monthlyFeeStructure/MonthlyFeeStructure";
import BillgeneratePrint from "./BillgeneratePrint";
import ExtraFeeStructure from "./extraFeeStructure/ExtraFeeStructure";

const Billgenerate = () => {
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
  const [feeStructure, setFeeStructure] = useState([]);
  const [monthlyFee, setMonthlyFee] = useState([]);
  const [extraFee, setExtraFee] = useState([]);
  const [dbModelContainer, setDbModelContainer] = useState({});
  const [narration, setNarration] = useState("");
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const [openPopup, setOpenPopup] = useState(false);

  const { billGenerate, error: billGenerateError } = useSelector(
    (state) => state.getAllBillGenerate
  );
  const {
    activeStudentForBillGenerate,
    error: activeStudentForBillGenerateError,
  } = useSelector((state) => state.getAllActiveStudentForBillGenerate);

  const {
    blukEditBillGenerate,
    error: blukEditBillGenerateError,
    loading: blukEditBillGenerateLoading,
  } = useSelector((state) => state.getBulkEditBillGenerate);

  const {
    error: postBillGenerateError,
    loading: postBillGenerateLoading,
    success: postBillGenerateSuccess,
  } = useSelector((state) => state.postBillGenerate);

  if (billGenerateError) {
    setNotify({
      isOpen: true,
      message: billGenerateError,
      type: "error",
    });
    dispatch({ type: GET_ALL_BILL_GENERATE_RESET });
  }
  if (postBillGenerateError) {
    setNotify({
      isOpen: true,
      message: postBillGenerateError,
      type: "error",
    });
    dispatch({ type: POST_BILL_GENERATE_RESET });
  }
  if (postBillGenerateSuccess) {
    setOpenPopup(true);
    dispatch({ type: POST_BILL_GENERATE_RESET });
    dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
  }
  if (activeStudentForBillGenerateError) {
    setNotify({
      isOpen: true,
      message: activeStudentForBillGenerateError,
      type: "error",
    });
    dispatch({ type: GET_ACTIVE_STUDENT_FOR_BILL_GENERATE_RESET });
  }
  if (blukEditBillGenerateError) {
    setNotify({
      isOpen: true,
      message: blukEditBillGenerateError,
      type: "error",
    });
    dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
  }
  const handleYearChange = (value) => {
    dispatch(
      getActiveStudentForBillGenerateAction(value, faculty, classId, shift)
    );
    setAcaYear(value);
    if (blukEditBillGenerate) {
      dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
    }
  };
  const handleClassChange = (value) => {
    dispatch(
      getActiveStudentForBillGenerateAction(acaYear, faculty, value, shift)
    );
    setClassId(value);
    if (blukEditBillGenerate) {
      dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
    }
  };
  const handleStudentChange = (value) => {
    setStudentId(value);
    if (blukEditBillGenerate) {
      dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
    }
  };
  const handleMonthChange = (value) => {
    setMonthId(value);
    if (blukEditBillGenerate) {
      dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
    }
  };
  useEffect(() => {
    if (billGenerate) {
      setFiscalYearDdl(billGenerate?.searchFilterModel?.ddlAccountFiscalYear);
      setFiscalYear(
        billGenerate?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setDdlAcaYear(billGenerate?.searchFilterModel?.ddlAcademicYear);
      setAcaYear(billGenerate?.searchFilterModel?.ddlAcademicYear[0]?.Key);
      setClassDdl(billGenerate?.searchFilterModel?.ddlClass);
      setClassId(billGenerate?.searchFilterModel?.ddlClass[0]?.Key);
      setMonthDdl(billGenerate?.searchFilterModel?.ddlnpMonth);
      setMonthId(billGenerate?.searchFilterModel?.npMonth);
      setFaculty(
        billGenerate?.searchFilterModel?.ddlFacultyProgramLink[0]?.Key
      );
      dispatch(
        getActiveStudentForBillGenerateAction(
          billGenerate?.searchFilterModel?.ddlAcademicYear[0]?.Key,
          billGenerate?.searchFilterModel?.ddlFacultyProgramLink[0]?.Key,
          billGenerate?.searchFilterModel?.ddlClass[0]?.Key,
          shift
        )
      );
    }
  }, [billGenerate]);

  useEffect(() => {
    if (activeStudentForBillGenerate) {
      setStudentDdl(activeStudentForBillGenerate);
      setStudentId(activeStudentForBillGenerate[0]?.Key);
    }
  }, [activeStudentForBillGenerate]);

  useEffect(() => {
    if (blukEditBillGenerate) {
      setTransactionDate(
        blukEditBillGenerate?.dbModel?.TransactionDate?.slice(0, 10)
      );
      setVoucher(blukEditBillGenerate?.dbModel?.VoucherBillNo);
    }
  }, [blukEditBillGenerate]);

  useEffect(() => {
    dispatch(getAllBillGenerateAction());
    dispatch({ type: GET_BULK_EDIT_BILL_GENERATE_RESET });
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
        getBulkEditBillGenerateAction(
          fiscalYear,
          acaYear,
          classId,
          studentId,
          monthId
        )
      );
    }
  };

  const handleSubmit = () => {
    dispatch(
      postBillGenerateAction(
        monthlyFee,
        extraFee,
        blukEditBillGenerate.dbModel,
        blukEditBillGenerate.searchFilterModel,
        narration
      )
    );
  };

  useEffect(() => {
    if (blukEditBillGenerate?.dbModel) {
      setDbModelContainer({ ...blukEditBillGenerate.dbModel });
    }
  }, [blukEditBillGenerate?.dbModel]);

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
                onChange={(e) => handleStudentChange(e.target.value)}
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

        {blukEditBillGenerateLoading ? (
          <LoadingComp />
        ) : (
          blukEditBillGenerate && (
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

              <h3>Monthly Fee</h3>
              <MonthlyFeeStructure
                admissionFee={blukEditBillGenerate?.monthlyFeeStructureLst}
                regKey={
                  blukEditBillGenerate?.searchFilterModel?.RegistrationKey
                }
                idFacLink={blukEditBillGenerate?.dbModel?.IDYearFacultyLink}
                voucherBill={blukEditBillGenerate?.dbModel?.VoucherBillNo}
                idAcaYear={
                  blukEditBillGenerate?.searchFilterModel?.idAcademicYear
                }
                level={blukEditBillGenerate?.searchFilterModel?.level}
                fiscalYear={blukEditBillGenerate?.dbModel?.IDFiscalYear}
                month={blukEditBillGenerate?.searchFilterModel?.IDMonth}
                date={transactionDate}
                currentFee={monthlyFee}
                setCurrentFee={setMonthlyFee}
              />
              <h3>Extra Fee</h3>
              <ExtraFeeStructure
                regKey={
                  blukEditBillGenerate?.searchFilterModel?.RegistrationKey
                }
                idFacLink={blukEditBillGenerate?.dbModel?.IDYearFacultyLink}
                voucherBill={blukEditBillGenerate?.dbModel?.VoucherBillNo}
                idAcaYear={
                  blukEditBillGenerate?.searchFilterModel?.idAcademicYear
                }
                level={blukEditBillGenerate?.searchFilterModel?.level}
                fiscalYear={blukEditBillGenerate?.dbModel?.IDFiscalYear}
                month={blukEditBillGenerate?.searchFilterModel?.IDMonth}
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
                  style={{ width: "50%", marginLeft: "15px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={postBillGenerateLoading}
                  style={{ margin: "10px 0 0 10px" }}
                  onClick={handleSubmit}
                >
                  {postBillGenerateLoading ? "...PROCESSING" : "SUBMIT"}
                </Button>
              </div>
            </div>
          )
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Print Student Bill"
      >
        <BillgeneratePrint
          date={transactionDate}
          dbModel={dbModelContainer}
          classDdl={classDdl}
          classId={classId}
          ddlAcaYear={ddlAcaYear}
          acaYear={acaYear}
          monthDdl={monthDdl}
          monthId={monthId}
          voucher={voucher}
          //   feeStructure={feeStructure}
          monthlyFee={monthlyFee}
          extraFee={extraFee}
          setOpenPopup={setOpenPopup}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Billgenerate;
