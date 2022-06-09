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
import Notification from "../../components/Notification";
import { getPrintFeeCollectionAction } from "./FeeCollectionActions";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import LoadingComp from "../../components/LoadingComp";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  GET_ALL_FEE_COLLECTION_RESET,
  GET_LIST_FEE_COLLECTION_RESET,
  GET_PRINT_FEE_COLLECTION_RESET,
} from "./FeeCollectionConstants";
import {
  getAllFeeCollectionAction,
  getListFeeCollectionAction,
} from "./FeeCollectionActions";
import FeeCollectionTableCollapse from "./FeeCollectionTableCollapse";
import FeeCollectionPrint from "./FeeCollectionPrint";

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
  { id: "RollNo", label: "RollNo." },
  { id: "Name", label: "Name" },
  { id: "Class", label: "Class" },
  { id: "RegistrationKey", label: "Registration Key" },
  { id: "AcademicYear", label: "Academic Year" },
  { id: "TransactionDate", label: "Transaction Date" },
  { id: "Collection", label: "Collection" },
];

const FeeCollection = () => {
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

  const classes = useStyles();

  const dispatch = useDispatch();
  const { feeCollection, error } = useSelector(
    (state) => state.getAllFeeCollection
  );

  const {
    listFeeCollection,
    error: listFeeCollectionError,
    loading,
  } = useSelector((state) => state.getListFeeCollection);

  const {
    printFeeCollection,
    error: printFeeCollectionError,
    loading: printFeeCollectionLoading,
  } = useSelector((state) => state.getPrintFeeCollection);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_FEE_COLLECTION_RESET });
  }

  if (listFeeCollectionError) {
    setNotify({
      isOpen: true,
      message: listFeeCollectionError,
      type: "error",
    });
    dispatch({ type: GET_LIST_FEE_COLLECTION_RESET });
  }

  if (printFeeCollectionError) {
    setNotify({
      isOpen: true,
      message: printFeeCollectionError,
      type: "error",
    });
    dispatch({ type: GET_PRINT_FEE_COLLECTION_RESET });
  }

  useEffect(() => {
    if (feeCollection) {
      setFiscalYearDdl(feeCollection?.searchFilterModel?.ddlAccountFiscalYear);
      setFiscalYear(
        feeCollection?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setDate(feeCollection?.searchFilterModel?.StartDate?.slice(0, 10));
      setEndDate(feeCollection?.searchFilterModel?.EndDate?.slice(0, 10));
    }
  }, [feeCollection]);
  useEffect(() => {
    dispatch({ type: GET_LIST_FEE_COLLECTION_RESET });
    dispatch(getAllFeeCollectionAction());
  }, []);

  useEffect(() => {
    if (listFeeCollection) {
      setTableData(listFeeCollection?.feeCollectionLst);
    }
  }, [listFeeCollection]);

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
      dispatch(getListFeeCollectionAction(fiscalYear, date, endDate));
    }
  };

  const handlePrint = () => {
    if (validate()) {
      setOpenPopup(true);
      dispatch(getPrintFeeCollectionAction(date, endDate, fiscalYear));
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
            label="Search Fee Collection by Name"
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
            {listFeeCollection && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item) => (
                    <FeeCollectionTableCollapse item={item} key={item.$id} />
                  ))}

                  {listFeeCollection?.feeCollectionLst?.length > 0 ? (
                    <TableRow style={{ backgroundColor: "lightgrey" }}>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right">
                        <strong>Total:</strong>
                      </TableCell>
                      <TableCell>
                        {" "}
                        {tableDataAfterPagingAndSorting()
                          ?.reduce((acc, curr) => {
                            return acc + curr.Dr;
                          }, 0)
                          ?.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell align="right">
                        <strong>No Data Found</strong>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </TableContainer>
            )}

            {listFeeCollection?.feeCollectionLst?.length > 0 && (
              <>
                {" "}
                <Button
                  variant="contained"
                  color="primary"
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
        title="Print Fee Collection"
      >
        {printFeeCollectionLoading ? (
          <LoadingComp />
        ) : (
          <>
            <FeeCollectionPrint
              printFee={
                printFeeCollection && printFeeCollection?.feeCollectionLst
              }
              date={
                printFeeCollection && printFeeCollection?.feeCollectionModel
              }
              iDFiscalYear={listFeeCollection?.searchFilterModel?.IDFiscalYear}
              fiscalYearDdl={
                listFeeCollection?.searchFilterModel?.ddlAccountFiscalYear
              }
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default FeeCollection;
