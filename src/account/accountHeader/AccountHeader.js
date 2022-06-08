import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
} from "@material-ui/core";
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
  GET_ALL_ACCOUNT_HEADER_RESET,
  GET_LIST_ACCOUNT_HEADER_RESET,
  GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_RESET,
  GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_RESET,
  POST_ACCOUNT_HEADER_RESET,
  PUT_ACCOUNT_HEADER_RESET,
} from "./AccountHeaderConstants";
import {
  getAllAccountHeaderAction,
  getListAccountHeaderAction,
  getSingleCreateAccountHeaderAction,
  getSingleEditAccountHeaderAction,
} from "./AccountHeaderActions";
import AccountHeaderTableCollapse from "./AccountHeaderTableCollapse";
import AccountHeaderForm from "./AccountHeaderForm";

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
  { id: "AccountHeaderName", label: "Account HeaderName" },
  { id: "AccountHeadDesc", label: "Account Description" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AccountHeader = () => {
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
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

  const { accountHeader, error } = useSelector(
    (state) => state.getAllAccountHeader
  );

  const {
    listAccountHeader,
    error: listAccountHeaderError,
    loading,
  } = useSelector((state) => state.getListAccountHeader);

  const { singleCreateAccountHeader, error: singleCreateAccountHeaderError } =
    useSelector((state) => state.getSingleCreateAccountHeader);

  const {
    singleEditAccountHeader,
    error: singleEditAccountHeaderError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditAccountHeader);

  const { success: postAccountHeaderSuccess, error: postAccountHeaderError } =
    useSelector((state) => state.postAccountHeader);

  const { success: putAccountHeaderSuccess, error: putAccountHeaderError } =
    useSelector((state) => state.putAccountHeader);
  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACCOUNT_HEADER_RESET });
  }

  if (listAccountHeaderError) {
    setNotify({
      isOpen: true,
      message: listAccountHeaderError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ACCOUNT_HEADER_RESET });
  }

  if (singleCreateAccountHeaderError) {
    setNotify({
      isOpen: true,
      message: singleCreateAccountHeaderError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_ACCOUNT_HEADER_RESET });
  }

  if (singleEditAccountHeaderError) {
    setNotify({
      isOpen: true,
      message: singleEditAccountHeaderError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_RESET });
  }

  if (postAccountHeaderSuccess) {
    dispatch(getListAccountHeaderAction());
    setNotify({
      isOpen: true,
      message: "Account Header Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_ACCOUNT_HEADER_RESET });
  }

  if (postAccountHeaderError) {
    setNotify({
      isOpen: true,
      message: postAccountHeaderError,
      type: "error",
    });
    dispatch({ type: POST_ACCOUNT_HEADER_RESET });
  }

  if (putAccountHeaderSuccess) {
    dispatch(getListAccountHeaderAction());
    setNotify({
      isOpen: true,
      message: "Account Header Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_ACCOUNT_HEADER_RESET });
  }

  if (putAccountHeaderError) {
    setNotify({
      isOpen: true,
      message: putAccountHeaderError,
      type: "error",
    });
    dispatch({ type: PUT_ACCOUNT_HEADER_RESET });
  }

  useEffect(() => {
    dispatch(getListAccountHeaderAction());
  }, []);

  useEffect(() => {
    if (accountHeader) {
      setTableData(accountHeader?.accountHeaderModelLst);
    }
  }, [accountHeader]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, []);

  useEffect(() => {
    if (listAccountHeader) {
      setTableData(listAccountHeader.accountHeaderModelLst);
    }
  }, [listAccountHeader]);

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
            x.AccountHeaderName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const updateCollegeHandler = (id) => {
    dispatch(getSingleEditAccountHeaderAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch(getSingleCreateAccountHeaderAction());
    dispatch({ type: GET_SINGLE_TO_EDIT_ACCOUNT_HEADER_RESET });
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Account Header By Account Header Name"
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
                {tableDataAfterPagingAndSorting().map((item) => (
                  <AccountHeaderTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    setOpenPopup={setOpenPopup}
                    setOpenDeletePopup={setOpenDeletePopup}
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
        title="Account Header Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AccountHeaderForm
              createAccount={
                singleCreateAccountHeader &&
                singleCreateAccountHeader.accountHeaderModel
              }
              editAccount={
                singleEditAccountHeader &&
                singleEditAccountHeader.accountHeaderModel
              }
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

export default AccountHeader;
