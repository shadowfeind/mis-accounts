import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  Grid,
  TextField,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import SelectControl from "../../components/controls/SelectControl";
import useCustomTable from "../../customHooks/useCustomTable";
import {
  getActiveLedgerAccountWiseAction,
  getAllLedgerAccountWiseAction,
  getListLedgerAccountWiseAction,
} from "./LedgerAccountWiseActions";
import InputControl from "../../components/controls/InputControl";
import { Search } from "@material-ui/icons";
import DatePickerControl from "../../components/controls/DatePickerControl";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/Popup";
import DateFnsUtils from "@date-io/date-fns";
import Notification from "../../components/Notification";
import CustomContainer from "../../components/CustomContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_ACTIVE_LEDGER_ACCOUNT_WISE_RESET,
  GET_ALL_LEDGER_ACCOUNT_WISE_RESET,
  GET_LIST_LEDGER_ACCOUNT_WISE_RESET,
} from "./LedgerAccountWiseConstants";
import LoadingComp from "../../components/LoadingComp";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import LedgerAccountWiseTableCollapse from "./LedgerAccountWiseTableCollapse";
import { axiosInstance, tokenConfig } from "../../constants";
import { useReactToPrint } from "react-to-print";

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
  { id: "S.No.", label: "S.No." },
  { id: "RegistrationKey", label: "Student Name" },
  { id: "AccountType", label: "Account Form" },
  { id: "IDAccountType", label: "Account Name" },
  { id: "VoucherBillNo", label: "Bill No." },
  { id: "TransactionType", label: "Dr/Cr" },
  { id: "TransactionDate", label: "TransactionDate" },
  { id: "Narration", label: "Narration" },
  { id: "Dr", label: "Dr(Rs)" },
  { id: "Cr", label: "Cr(Rs)" },
  { id: "Balance", label: "Balance" },
];

const LedgerAccountWise = () => {
  const [fiscalYearDdl, setFiscalYearDdl] = useState([]);
  const [fiscalYear, setFiscalYear] = useState("");
  const [searchAccount, setSearchAccount] = useState("");
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [errors, setErrors] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");

  //this code will be deleted soon
  const [accountType, setAccountType] = useState([]);
  //this code will be deleted soon

  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();
  const { ledgerAccountWise, error } = useSelector(
    (state) => state.getAllLedgerAccountWise
  );

  const {
    listLedgerAccountWise,
    error: listLedgerAccountWiseError,
    loading,
  } = useSelector((state) => state.getListLedgerAccountWise);

  const { activeLedgerAccountWise, error: activeLedgerAccountWiseError } =
    useSelector((state) => state.getActiveLedgerAccountWise);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_LEDGER_ACCOUNT_WISE_RESET });
  }

  if (listLedgerAccountWiseError) {
    setNotify({
      isOpen: true,
      message: listLedgerAccountWiseError,
      type: "error",
    });
    dispatch({ type: GET_LIST_LEDGER_ACCOUNT_WISE_RESET });
  }

  if (activeLedgerAccountWiseError) {
    setNotify({
      isOpen: true,
      message: activeLedgerAccountWiseError,
      type: "error",
    });
    dispatch({ type: GET_ACTIVE_LEDGER_ACCOUNT_WISE_RESET });
  }

  useEffect(() => {
    if (ledgerAccountWise) {
      setFiscalYearDdl(
        ledgerAccountWise?.searchFilterModel?.ddlAccountFiscalYear
      );
      setFiscalYear(
        ledgerAccountWise?.searchFilterModel?.ddlAccountFiscalYear[0]?.Key
      );
      setDate(
        ledgerAccountWise?.ledgerAccountWiseModel?.StartDate?.slice(0, 10)
      );
      setEndDate(
        ledgerAccountWise?.ledgerAccountWiseModel?.EndDate?.slice(0, 10)
      );
    }
  }, [ledgerAccountWise]);
  useEffect(() => {
    dispatch({ type: GET_LIST_LEDGER_ACCOUNT_WISE_RESET });
    dispatch(getAllLedgerAccountWiseAction());
  }, []);

  useEffect(() => {
    if (listLedgerAccountWise?.ledgerAccountWiseModelLstsWithoutFiscalYear) {
      setTableData(
        listLedgerAccountWise?.ledgerAccountWiseModelLstsWithoutFiscalYear
      );
    }
    //this code will be deleted soon
    if (
      listLedgerAccountWise?.ledgerAccountWiseModelLstsWithoutFiscalYear
        ?.length > 1
    ) {
      const fetchData = async () => {
        try {
          const { data } = await axiosInstance.get(
            `/api/LedgerAccountWise/GetAccountTypeJsonList?searchkey=0`,
            tokenConfig()
          );
          setAccountType(data);
        } catch (error) {
          console.log(error);
          setAccountType("");
        }
      };

      fetchData();
    }
    //this code will be deleted soon
  }, [listLedgerAccountWise?.ledgerAccountWiseModelLstsWithoutFiscalYear]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  const validate = () => {
    let temp = {};
    temp.fiscalYear = !fiscalYear ? "This feild is required" : "";
    temp.searchAccount = !searchAccount ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const test = [];

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  // const handleSearch = (e) => {
  //   setFilterFn({
  //     fn: (item) => {
  //       if (e.target.value === "") {
  //         return item;
  //       } else {
  //         return item.filter((x) =>
  //           x.AccountName.toLowerCase().includes(e.target.value?.toLowerCase())
  //         );
  //       }
  //     },
  //   });
  // };

  const handleChange = (e) => {
    if (e.length >= 2) {
      setCurrentSearchQuery(e);
      dispatch(getActiveLedgerAccountWiseAction(e));
    }
  };

  const handleOptionChange = (newInputValue, reason) => {
    if (reason == "clear") {
      setSearchAccount("");
    } else {
      setSearchAccount(newInputValue.val);
    }
  };

  const handleListSearch = () => {
    if (validate()) {
      dispatch(
        getListLedgerAccountWiseAction(searchAccount, date, endDate, fiscalYear)
      );
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
              <Autocomplete
                options={
                  activeLedgerAccountWise ? activeLedgerAccountWise : test
                }
                getOptionLabel={(option) => option.label}
                style={{ width: 300 }}
                onChange={(event, newInputValue, reason) =>
                  handleOptionChange(newInputValue, reason)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Account Name"
                    onChange={(e) => handleChange(e.target.value)}
                    variant="outlined"
                    helperText={errors.searchAccount}
                    error={errors.searchAccount && true}
                  />
                )}
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
        {/* <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Ledger Account Wise by Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar> */}
        {loading ? (
          <LoadingComp />
        ) : (
          <div ref={componentRef}>
            {listLedgerAccountWise && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting()?.map((item, i) => (
                    <LedgerAccountWiseTableCollapse
                      item={item}
                      key={item.$id}
                      accountType={accountType}
                      i={i}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}
          </div>
        )}
        {listLedgerAccountWise && (
          <Button
            onClick={printPdf}
            className="print-button-hide"
            variant="contained"
            color="primary"
          >
            PRINT
          </Button>
        )}
      </CustomContainer>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default LedgerAccountWise;
