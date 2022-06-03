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
  GET_ALL_EXTRA_FEE_STRUCTURE_RESET,
  GET_LIST_EXTRA_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_RESET,
  POST_EXTRA_FEE_STRUCTURE_RESET,
  PUT_EXTRA_FEE_STRUCTURE_RESET,
} from "./ExtraFeeStructureConstants";
import {
  getAllExtraFeeStructureAction,
  getListExtraFeeStructureAction,
  getSingleCreateExtraFeeStructureAction,
  getSingleEditExtraFeeStructureAction,
} from "./ExtraFeeStructureActions";
import ExtraFeeStructureForm from "./ExtraFeeStructureForm";
import ExtraFeeStructureTableCollapse from "./ExtraFeeStructureTableCollapse";

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
  { id: "FeeHeader", label: "Extra Fee Name" },
  { id: "FeeAmount", label: "Fee Amount" },
  { id: "IsActive", label: "IsActive" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const ExtraFeeStructure = () => {
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

  const { extraFeeStructure, error } = useSelector(
    (state) => state.getAllExtraFeeStructure
  );

  const {
    listExtraFeeStructure,
    error: listExtraFeeStructureError,
    loading,
  } = useSelector((state) => state.getListExtraFeeStructure);

  const {
    singleCreateExtraFeeStructure,
    error: singleCreateExtraFeeStructureError,
  } = useSelector((state) => state.getSingleCreateExtraFeeStructure);

  const {
    singleEditExtraFeeStructure,
    error: singleEditExtraFeeStructureError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditExtraFeeStructure);

  const {
    success: postExtraFeeStructureSuccess,
    error: postExtraFeeStructureError,
  } = useSelector((state) => state.postExtraFeeStructure);

  const {
    success: putExtraFeeStructureSuccess,
    error: putExtraFeeStructureError,
  } = useSelector((state) => state.putExtraFeeStructure);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (listExtraFeeStructureError) {
    setNotify({
      isOpen: true,
      message: listExtraFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_LIST_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (singleCreateExtraFeeStructureError) {
    setNotify({
      isOpen: true,
      message: singleCreateExtraFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (singleEditExtraFeeStructureError) {
    setNotify({
      isOpen: true,
      message: singleEditExtraFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (postExtraFeeStructureSuccess) {
    dispatch(getAllExtraFeeStructureAction());
    dispatch(getListExtraFeeStructureAction());
    setNotify({
      isOpen: true,
      message: "Extra Free Structure Created Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: POST_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (postExtraFeeStructureError) {
    setNotify({
      isOpen: true,
      message: postExtraFeeStructureError,
      type: "error",
    });
    dispatch({ type: POST_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (putExtraFeeStructureSuccess) {
    dispatch(getAllExtraFeeStructureAction());
    dispatch(getListExtraFeeStructureAction());
    setNotify({
      isOpen: true,
      message: "Extra Fee Structure Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_EXTRA_FEE_STRUCTURE_RESET });
  }

  if (putExtraFeeStructureError) {
    setNotify({
      isOpen: true,
      message: putExtraFeeStructureError,
      type: "error",
    });
    dispatch({ type: PUT_EXTRA_FEE_STRUCTURE_RESET });
  }

  useEffect(() => {
    dispatch(getAllExtraFeeStructureAction());
  }, []);

  useEffect(() => {
    if (extraFeeStructure) {
      setTableData(extraFeeStructure?.extraFeeStructureModelLst);
    }
  }, [extraFeeStructure]);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    if (listExtraFeeStructure) {
      setTableData(listExtraFeeStructure?.extraFeeStructureModelLst);
    }
  }, [listExtraFeeStructure]);

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
    dispatch({ type: GET_SINGLE_TO_CREATE_EXTRA_FEE_STRUCTURE_RESET });
    dispatch(getSingleEditExtraFeeStructureAction(id));
    setOpenPopup(true);
  };

  const addHandler = () => {
    dispatch({ type: GET_SINGLE_TO_EDIT_EXTRA_FEE_STRUCTURE_RESET });
    dispatch(getSingleCreateExtraFeeStructureAction());
    setOpenPopup(true);
  };
  return (
    <>
      <CustomContainer>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Extra Fee Structure By Extra Fee Name"
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
                  <ExtraFeeStructureTableCollapse
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
        title="Extra Fee Structure Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <ExtraFeeStructureForm
              createAccount={
                singleCreateExtraFeeStructure && singleCreateExtraFeeStructure
              }
              editAccount={
                singleEditExtraFeeStructure && singleEditExtraFeeStructure
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

export default ExtraFeeStructure;
