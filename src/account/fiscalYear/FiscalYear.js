import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
import DatePickerControl from "../../components/controls/DatePickerControl";
import useCustomTable from "../../customHooks/useCustomTable";
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
  GET_ALL_FISCAL_YEAR_RESET,
  GET_LIST_FISCAL_YEAR_RESET,
  GET_SINGLE_TO_CREATE_FISCAL_YEAR_RESET,
  GET_SINGLE_TO_EDIT_FISCAL_YEAR_RESET,
  POST_FISCAL_YEAR_RESET,
  PUT_FISCAL_YEAR_RESET,
} from "./FiscalYearContants";
import {
  getAllFiscalYearAction,
  getListFiscalYearAction,
  getSingleCreateFiscalYearAction,
  getSingleEditFiscalYearAction,
} from "./FiscalYearActions";
import FiscalYearForm from "./FiscalYearForm";
import FiscalYearTableCollapse from "./FiscalYearTableCollapse";

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
  { id: "FiscalYearName", label: "Fiscal Year Name" },
  { id: "FiscalYearTaxRate", label: "FiscalYearTaxRate" },
  { id: "StartDate", label: "StartDate" },
  { id: "EndDate", label: "EndDate" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const FiscalYear = () => {
  const [tableData, setTableData] = useState([]);
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
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const classes = useStyles();

  const dispatch = useDispatch();

  const { fiscalYear, error } = useSelector((state) => state.getAllFiscalYear);

  const {
    listFiscalYear,
    error: listFiscalYearError,
    loading,
  } = useSelector((state) => state.getListFiscalYear);

  const { singleCreateFiscalYear, error: singleCreateFiscalYearError } =
    useSelector((state) => state.getSingleCreateFiscalYear);

  const {
    singleEditFiscalYear,
    error: singleEditFiscalYearError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditFiscalYear);

  const { success: postFiscalYearSuccess, error: postFiscalYearError } =
    useSelector((state) => state.postFiscalYear);

  const { success: putFiscalYearSuccess, error: putFiscalYearError } =
    useSelector((state) => state.putFiscalYear);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_FISCAL_YEAR_RESET });
  }

  if (listFiscalYearError) {
    setNotify({
      isOpen: true,
      message: listFiscalYearError,
      type: "error",
    });
    dispatch({ type: GET_LIST_FISCAL_YEAR_RESET });
  }

  if (singleCreateFiscalYearError) {
    setNotify({
      isOpen: true,
      message: singleCreateFiscalYearError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_FISCAL_YEAR_RESET });
  }

  if (singleEditFiscalYearError) {
    setNotify({
      isOpen: true,
      message: singleEditFiscalYearError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_FISCAL_YEAR_RESET });
  }

  if (postFiscalYearSuccess) {
    dispatch(getAllFiscalYearAction());
    dispatch(getListFiscalYearAction());
    setNotify({
      isOpen: true,
      message: "FiscalYear Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_FISCAL_YEAR_RESET });
  }

  if (postFiscalYearError) {
    setNotify({
      isOpen: true,
      message: postFiscalYearError,
      type: "error",
    });
    dispatch({ type: POST_FISCAL_YEAR_RESET });
  }

  if (putFiscalYearSuccess) {
    dispatch(getAllFiscalYearAction());
    dispatch(getListFiscalYearAction());
    setNotify({
      isOpen: true,
      message: "FiscalYear Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_FISCAL_YEAR_RESET });
  }

  if (putFiscalYearError) {
    setNotify({
      isOpen: true,
      message: putFiscalYearError,
      type: "error",
    });
    dispatch({ type: PUT_FISCAL_YEAR_RESET });
  }
  useEffect(() => {
    dispatch(getAllFiscalYearAction());
  }, []);

  useEffect(() => {
    if (fiscalYear) {
      setTableData(fiscalYear?.fiscalYearModelLst);
    }
  }, [fiscalYear]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, []);

  useEffect(() => {
    if (listFiscalYear) {
      setTableData(listFiscalYear?.fiscalYearModelLst);
    }
  }, [listFiscalYear]);

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
            x.FiscalYearName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const updateCollegeHandler = (id) => {
    dispatch({ type: GET_SINGLE_TO_CREATE_FISCAL_YEAR_RESET });
    dispatch(getSingleEditFiscalYearAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_TO_EDIT_FISCAL_YEAR_RESET });
    dispatch(getSingleCreateFiscalYearAction());
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Fiscal Year By Fiscal Year Name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={addHandler}
          >
            Create{" "}
          </Button>
        </Toolbar>
        {loading ? (
          <LoadingComp />
        ) : (
          <>
            <TableContainer className={classes.table}>
              <TblHead />
              <TableBody>
                {tableDataAfterPagingAndSorting()?.map((item) => (
                  <FiscalYearTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    setOpenPopup={setOpenPopup}
                  />
                ))}
              </TableBody>
            </TableContainer>
            <TblPagination />
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Fiscal Year Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <FiscalYearForm
              createAccount={singleCreateFiscalYear && singleCreateFiscalYear}
              editAccount={singleEditFiscalYear && singleEditFiscalYear}
              setOpenPopup={setOpenPopup}
            />
          </>
        )}
      </Popup>

      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default FiscalYear;
