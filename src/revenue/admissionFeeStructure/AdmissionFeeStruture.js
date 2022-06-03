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
  GET_ALL_ADMISSION_FEE_STRUCTURE_RESET,
  GET_LIST_ADMISSION_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_RESET,
  POST_ADMISSION_FEE_STRUCTURE_RESET,
  PUT_ADMISSION_FEE_STRUCTURE_RESET,
} from "./AdmissionFeeStructureConstants";
import {
  getAllAdmissionFeeStructureAction,
  getListAdmissionFeeStructureAction,
  getSingleCreateAdmissionFeeStructureAction,
  getSingleEditAdmissionFeeStructureAction,
} from "./AdmissionFeeStructureActions";
import AdmissionFeeStructureForm from "./AdmissionFeeStructureForm";
import AdmissionFeeStructureTableCollapse from "./AdmissionFeeStructureTableCollapse";

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
  { id: "AccountName", label: "Admission Fee Name" },
  { id: "FeeAmount", label: "Fee Amount" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AdmissionFeeStructure = () => {
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

  const { admissionFeeStructure, error } = useSelector(
    (state) => state.getAllAdmissionFeeStructure
  );

  const {
    listAdmissionFeeStructure,
    error: listAdmissionFeeStructureError,
    loading,
  } = useSelector((state) => state.getListAdmissionFeeStructure);

  const {
    singleCreateAdmissionFeeStructure,
    error: singleCreateAdmissionFeeStructureError,
  } = useSelector((state) => state.getSingleCreateAdmissionFeeStructure);

  const {
    singleEditAdmissionFeeStructure,
    error: singleEditAdmissionFeeStructureError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditAdmissionFeeStructure);

  const {
    success: postAdmissionFeeStructureSuccess,
    error: postAdmissionFeeStructureError,
  } = useSelector((state) => state.postAdmissionFeeStructure);

  const {
    success: putAdmissionFeeStructureSuccess,
    error: putAdmissionFeeStructureError,
  } = useSelector((state) => state.putAdmissionFeeStructure);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (listAdmissionFeeStructureError) {
    setNotify({
      isOpen: true,
      message: listAdmissionFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (singleCreateAdmissionFeeStructureError) {
    setNotify({
      isOpen: true,
      message: singleCreateAdmissionFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (singleEditAdmissionFeeStructureError) {
    setNotify({
      isOpen: true,
      message: singleEditAdmissionFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (postAdmissionFeeStructureSuccess) {
    dispatch(getAllAdmissionFeeStructureAction());
    dispatch(getListAdmissionFeeStructureAction());
    setNotify({
      isOpen: true,
      message: "Admission Free Structure Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (postAdmissionFeeStructureError) {
    setNotify({
      isOpen: true,
      message: postAdmissionFeeStructureError,
      type: "error",
    });
    dispatch({ type: POST_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (putAdmissionFeeStructureSuccess) {
    dispatch(getAllAdmissionFeeStructureAction());
    dispatch(getListAdmissionFeeStructureAction());
    setNotify({
      isOpen: true,
      message: "Admission Fee Structure Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_ADMISSION_FEE_STRUCTURE_RESET });
  }

  if (putAdmissionFeeStructureError) {
    setNotify({
      isOpen: true,
      message: putAdmissionFeeStructureError,
      type: "error",
    });
    dispatch({ type: PUT_ADMISSION_FEE_STRUCTURE_RESET });
  }

  useEffect(() => {
    dispatch(getAllAdmissionFeeStructureAction());
  }, []);

  useEffect(() => {
    if (admissionFeeStructure) {
      setTableData(admissionFeeStructure?.admissionFeeStructureModelLst);
    }
  }, [admissionFeeStructure]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    if (listAdmissionFeeStructure) {
      setTableData(listAdmissionFeeStructure?.admissionFeeStructureModelLst);
    }
  }, [listAdmissionFeeStructure]);

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
    dispatch({ type: GET_SINGLE_TO_CREATE_ADMISSION_FEE_STRUCTURE_RESET });
    dispatch(getSingleEditAdmissionFeeStructureAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_TO_EDIT_ADMISSION_FEE_STRUCTURE_RESET });
    dispatch(getSingleCreateAdmissionFeeStructureAction());
    setOpenPopup(true);
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Admission Fee Structure By Admission Fee Name"
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
                  <AdmissionFeeStructureTableCollapse
                    item={item}
                    key={item.$id}
                    updateCollegeHandler={updateCollegeHandler}
                    setOpenPopup={setOpenPopup}
                    idAccount={
                      singleCreateAdmissionFeeStructure &&
                      singleCreateAdmissionFeeStructure?.ddlAccountGroup
                    }
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
        title="Admission Fee Structure Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AdmissionFeeStructureForm
              createAccount={
                singleCreateAdmissionFeeStructure &&
                singleCreateAdmissionFeeStructure
              }
              editAccount={
                singleEditAdmissionFeeStructure &&
                singleEditAdmissionFeeStructure
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

export default AdmissionFeeStructure;
