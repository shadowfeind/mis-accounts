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
  GET_ALL_ACCOUNT_TYPE_RESET,
  GET_LIST_ACCOUNT_TYPE_RESET,
  GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_RESET,
  GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_RESET,
  POST_ACCOUNT_TYPE_RESET,
  PUT_ACCOUNT_TYPE_RESET,
} from "./AccountTypeConstants";
import {
  getAllAccountTypeAction,
  getListAccountTypeAction,
  getSingleCreateAccountTypeAction,
  getSingleEditAccountTypeAction,
} from "./AccountTypeActions";
import AccountTypeForm from "./AccountTypeForm";
import AccountTypeTableCollapse from "./AccountTypeTableCollapse";

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
  { id: "AccountName", label: "Account Type Name" },
  { id: "AccountGroupName", label: "Account Group Name" },
  { id: "IsCostCenter", label: "IsCostCenter" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AccountType = () => {
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

  const { accountType, error } = useSelector(
    (state) => state.getAllAccountType
  );

  const {
    listAccountType,
    error: listAccountTypeError,
    loading,
  } = useSelector((state) => state.getListAccountType);

  const { singleCreateAccountType, error: singleCreateAccountTypeError } =
    useSelector((state) => state.getSingleCreateAccountType);

  const {
    singleEditAccountType,
    error: singleEditAccountTypeError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditAccountType);

  const { success: postAccountTypeSuccess, error: postAccountTypeError } =
    useSelector((state) => state.postAccountType);

  const { success: putAccountTypeSuccess, error: putAccountTypeError } =
    useSelector((state) => state.putAccountType);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACCOUNT_TYPE_RESET });
  }

  if (listAccountTypeError) {
    setNotify({
      isOpen: true,
      message: listAccountTypeError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ACCOUNT_TYPE_RESET });
  }

  if (singleCreateAccountTypeError) {
    setNotify({
      isOpen: true,
      message: singleCreateAccountTypeError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_RESET });
  }

  if (singleEditAccountTypeError) {
    setNotify({
      isOpen: true,
      message: singleEditAccountTypeError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_RESET });
  }

  if (postAccountTypeSuccess) {
    dispatch(getListAccountTypeAction());
    setNotify({
      isOpen: true,
      message: "Account Type Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_ACCOUNT_TYPE_RESET });
  }

  if (postAccountTypeError) {
    setNotify({
      isOpen: true,
      message: postAccountTypeError,
      type: "error",
    });
    dispatch({ type: POST_ACCOUNT_TYPE_RESET });
  }

  if (putAccountTypeSuccess) {
    dispatch(getListAccountTypeAction());
    setNotify({
      isOpen: true,
      message: "Account Type Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_ACCOUNT_TYPE_RESET });
  }

  if (putAccountTypeError) {
    setNotify({
      isOpen: true,
      message: putAccountTypeError,
      type: "error",
    });
    dispatch({ type: PUT_ACCOUNT_TYPE_RESET });
  }

  useEffect(() => {
    dispatch(getAllAccountTypeAction());
  }, []);

  useEffect(() => {
    if (accountType) {
      setTableData(accountType.accountTypeModelLst);
    }
  }, [accountType]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, []);

  useEffect(() => {
    if (listAccountType) {
      setTableData(listAccountType.accountTypeModelLst);
    }
  }, [listAccountType]);

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
            x.AccountName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const updateCollegeHandler = (id) => {
    dispatch({ type: GET_SINGLE_TO_CREATE_ACCOUNT_TYPE_RESET });
    dispatch(getSingleEditAccountTypeAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_TO_EDIT_ACCOUNT_TYPE_RESET });
    dispatch(getSingleCreateAccountTypeAction());
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Account Type By Account Type Name"
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
                  <AccountTypeTableCollapse
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
        title="Account Type Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AccountTypeForm
              createAccount={singleCreateAccountType && singleCreateAccountType}
              editAccount={singleEditAccountType && singleEditAccountType}
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

export default AccountType;
