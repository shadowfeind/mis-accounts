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
  GET_ALL_VENDOR_RESET,
  GET_LIST_VENDOR_RESET,
  GET_SINGLE_TO_CREATE_VENDOR_RESET,
  GET_SINGLE_TO_EDIT_VENDOR_RESET,
  POST_VENDOR_RESET,
  PUT_VENDOR_RESET,
} from "./VendorConstants";
import {
  getAllVendorAction,
  getListVendorAction,
  getSingleCreateVendorAction,
  getSingleEditVendorAction,
} from "./VendorActions";
import VendorTableCollapse from "./VendorTableCollapse";
import VendorForm from "./VendorForm";

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
  { id: "VendorName", label: "Vendor Name" },
  { id: "VendorSummary", label: "Vendor Summary" },
  { id: "ContactMobileNo", label: "Contact No." },
  { id: "ContactEmailID", label: "EmailID" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const Vendor = () => {
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

  const { vendor, error } = useSelector((state) => state.getAllVendor);

  const {
    listVendor,
    error: listVendorError,
    loading,
  } = useSelector((state) => state.getListVendor);

  const { singleCreateVendor, error: singleCreateVendorError } = useSelector(
    (state) => state.getSingleCreateVendor
  );

  const {
    singleEditVendor,
    error: singleEditVendorError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditVendor);

  const { success: postVendorSuccess, error: postVendorError } = useSelector(
    (state) => state.postVendor
  );

  const { success: putVendorSuccess, error: putVendorError } = useSelector(
    (state) => state.putVendor
  );

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_VENDOR_RESET });
  }

  if (listVendorError) {
    setNotify({
      isOpen: true,
      message: listVendorError,
      type: "error",
    });
    dispatch({ type: GET_LIST_VENDOR_RESET });
  }

  if (singleCreateVendorError) {
    setNotify({
      isOpen: true,
      message: singleCreateVendorError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_VENDOR_RESET });
  }

  if (singleEditVendorError) {
    setNotify({
      isOpen: true,
      message: singleEditVendorError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_VENDOR_RESET });
  }

  if (postVendorSuccess) {
    dispatch(getAllVendorAction());
    dispatch(getListVendorAction());
    setNotify({
      isOpen: true,
      message: "Vendor Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_VENDOR_RESET });
  }

  if (postVendorError) {
    setNotify({
      isOpen: true,
      message: postVendorError,
      type: "error",
    });
    dispatch({ type: POST_VENDOR_RESET });
  }

  if (putVendorSuccess) {
    dispatch(getAllVendorAction());
    dispatch(getListVendorAction());
    setNotify({
      isOpen: true,
      message: "Vendor Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_VENDOR_RESET });
  }

  if (putVendorError) {
    setNotify({
      isOpen: true,
      message: putVendorError,
      type: "error",
    });
    dispatch({ type: PUT_VENDOR_RESET });
  }
  useEffect(() => {
    dispatch(getAllVendorAction());
  }, []);

  useEffect(() => {
    if (vendor) {
      setTableData(vendor?.vendorModelLst);
    }
  }, [vendor]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, []);

  useEffect(() => {
    if (listVendor) {
      setTableData(listVendor?.vendorModelLst);
    }
  }, [listVendor]);

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
            x.VendorName.toLowerCase().includes(e.target.value?.toLowerCase())
          );
        }
      },
    });
  };

  const updateCollegeHandler = (id) => {
    dispatch({ type: GET_SINGLE_TO_CREATE_VENDOR_RESET });
    dispatch(getSingleEditVendorAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_TO_EDIT_VENDOR_RESET });
    dispatch(getSingleCreateVendorAction());
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Vendor By Vendor Name"
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
                  <VendorTableCollapse
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
            <VendorForm
              createAccount={singleCreateVendor && singleCreateVendor}
              editAccount={singleEditVendor && singleEditVendor}
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

export default Vendor;
