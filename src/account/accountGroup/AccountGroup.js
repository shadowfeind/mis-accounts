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
  GET_ALL_ACCOUNT_GROUP_RESET,
  GET_LIST_ACCOUNT_GROUP_RESET,
  GET_SINGLE_CREATE_ACCOUNT_GROUP_RESET,
  GET_SINGLE_EDIT_ACCOUNT_GROUP_RESET,
  POST_ACCOUNT_GROUP_RESET,
  PUT_ACCOUNT_GROUP_RESET,
} from "./AccountGroupConstants";
import {
  getAllAccountGroupAction,
  getListAccountGroupAction,
  getSingleCreateAccountGroupAction,
  getSingleEditAccountGroupAction,
} from "./AccountGroupActions";
import AccountGroupTableCollapse from "./AccountGroupTableCollapse";
import AccountGroupForm from "./AccountGroupForm";

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
  { id: "AccountGroupName", label: "Account Group Name" },
  { id: "AccountHeaderName", label: "Account Header" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AccountGroup = () => {
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

  const { accountGroup, error } = useSelector(
    (state) => state.getAllAccountGroup
  );

  const {
    listAccountGroup,
    error: listAccountGroupError,
    loading,
  } = useSelector((state) => state.getListAccountGroup);

  const { singleCreateAccountGroup, error: singleCreateAccountGroupError } =
    useSelector((state) => state.getSingleCreateAccountGroup);

  const {
    singleEditAccountGroup,
    error: singleEditAccountGroupError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditAccountGroup);

  const { success: postAccountGroupSuccess, error: postAccountGroupError } =
    useSelector((state) => state.postAccountGroup);

  const { success: putAccountGroupSuccess, error: putAccountGroupError } =
    useSelector((state) => state.putAccountGroup);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ACCOUNT_GROUP_RESET });
  }

  if (listAccountGroupError) {
    setNotify({
      isOpen: true,
      message: listAccountGroupError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ACCOUNT_GROUP_RESET });
  }

  if (singleCreateAccountGroupError) {
    setNotify({
      isOpen: true,
      message: singleCreateAccountGroupError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_CREATE_ACCOUNT_GROUP_RESET });
  }

  if (singleEditAccountGroupError) {
    setNotify({
      isOpen: true,
      message: singleEditAccountGroupError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_EDIT_ACCOUNT_GROUP_RESET });
  }

  if (postAccountGroupSuccess) {
    dispatch(getListAccountGroupAction());
    setNotify({
      isOpen: true,
      message: "Account Group Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_ACCOUNT_GROUP_RESET });
  }

  if (postAccountGroupError) {
    setNotify({
      isOpen: true,
      message: postAccountGroupError,
      type: "error",
    });
    dispatch({ type: POST_ACCOUNT_GROUP_RESET });
  }

  if (putAccountGroupSuccess) {
    dispatch(getListAccountGroupAction());
    setNotify({
      isOpen: true,
      message: "Account Group Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_ACCOUNT_GROUP_RESET });
  }

  if (putAccountGroupError) {
    setNotify({
      isOpen: true,
      message: putAccountGroupError,
      type: "error",
    });
    dispatch({ type: PUT_ACCOUNT_GROUP_RESET });
  }

  useEffect(() => {
    dispatch(getAllAccountGroupAction());
  }, []);

  useEffect(() => {
    if (accountGroup) {
      setTableData(accountGroup?.accountGroupMdlLst);
    }
  }, [accountGroup]);
  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, []);

  useEffect(() => {
    if (listAccountGroup) {
      setTableData(listAccountGroup?.accountGroupMdlLst);
    }
  }, [listAccountGroup]);

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
            x.AccountGroupName.toLowerCase().includes(
              e.target.value?.toLowerCase()
            )
          );
        }
      },
    });
  };

  const updateCollegeHandler = (id) => {
    dispatch({ type: GET_SINGLE_CREATE_ACCOUNT_GROUP_RESET });
    dispatch(getSingleEditAccountGroupAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_EDIT_ACCOUNT_GROUP_RESET });
    dispatch(getSingleCreateAccountGroupAction());
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Account Group By Account Group Name"
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
                  <AccountGroupTableCollapse
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
        title="Account Group Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AccountGroupForm
              createAccount={
                singleCreateAccountGroup && singleCreateAccountGroup
              }
              editAccount={singleEditAccountGroup && singleEditAccountGroup}
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

export default AccountGroup;
