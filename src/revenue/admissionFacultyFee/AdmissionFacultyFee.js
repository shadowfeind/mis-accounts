import React, { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  makeStyles,
  TableBody,
  Toolbar,
  Grid,
} from "@material-ui/core";
import useCustomTable from "../../customHooks/useCustomTable";
import SelectControl from "../../components/controls/SelectControl";
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
  GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  POST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
  PUT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
} from "./AdmissionFacultyFeeConstants";
import {
  getAllAdmissionFacultyFeeStructureAction,
  getListAdmissionFacultyFeeStructureAction,
  getSingleCreateAdmissionFacultyFeeStructureAction,
  getSingleEditAdmissionFacultyFeeStructureAction,
} from "./AdmissionFacultyFeeActions";
import AdmissionFacultyFeeStructureTableCollapse from "./AdmissionFacultyFeeTableCollapse";
import AdmissionFacultyFeeStructureEditForm from "./AdmissionFacultyFeeEditForm";
import AdmissionFacultyFeeForm from "./AdmissionFacultyFeeForm";

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
  { id: "AccountName", label: "Header" },
  { id: "FeeAmount", label: "Fee Amount" },
  { id: "actions", label: "Actions", disableSorting: true },
];

const AdmissionFacultyFee = () => {
  const [ddlClass, setDdlClass] = useState([]);
  const [academicYearDdl, setAcademicYearDdl] = useState([]);
  const [classId, setClassId] = useState("");
  const [acaYear, setAcaYear] = useState("");
  const [errors, setErrors] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [openCreatePopup, setOpenCreatePopup] = useState(false);

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

  const {
    TableContainer,
    TblHead,
    TblPagination,
    tableDataAfterPagingAndSorting,
  } = useCustomTable(tableData, tableHeader, filterFn);

  const classes = useStyles();
  const test = [{ Key: "", Value: "" }];
  const dispatch = useDispatch();

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

  const { admissionFacultyFeeStructure, error } = useSelector(
    (state) => state.getAllAdmissionFacultyFeeStructure
  );

  const {
    listAdmissionFacultyFeeStructure,
    error: listAdmissionFacultyFeeStructureError,
    loading,
  } = useSelector((state) => state.getListAdmissionFacultyFeeStructure);

  const {
    singleCreateAdmissionFacultyFeeStructure,
    error: singleCreateAdmissionFacultyFeeStructureError,
  } = useSelector((state) => state.getSingleCreateAdmissionFacultyFeeStructure);

  const {
    singleEditAdmissionFacultyFeeStructure,
    error: singleEditAdmissionFacultyFeeStructureError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditAdmissionFacultyFeeStructure);

  const {
    success: postAdmissionFacultyFeeStructureSuccess,
    error: postAdmissionFacultyFeeStructureError,
  } = useSelector((state) => state.postAdmissionFacultyFeeStructure);

  const {
    success: putAdmissionFacultyFeeStructureSuccess,
    error: putAdmissionFacultyFeeStructureError,
  } = useSelector((state) => state.putAdmissionFacultyFeeStructure);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
  }

  if (listAdmissionFacultyFeeStructureError) {
    setNotify({
      isOpen: true,
      message: listAdmissionFacultyFeeStructureError,
      type: "error",
    });
    dispatch({ type: GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
  }

  if (singleCreateAdmissionFacultyFeeStructureError) {
    setNotify({
      isOpen: true,
      message: singleCreateAdmissionFacultyFeeStructureError,
      type: "error",
    });
    dispatch({
      type: GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
    });
  }

  if (singleEditAdmissionFacultyFeeStructureError) {
    setNotify({
      isOpen: true,
      message: singleEditAdmissionFacultyFeeStructureError,
      type: "error",
    });
    dispatch({
      type: GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
    });
  }

  if (postAdmissionFacultyFeeStructureSuccess) {
    dispatch(getListAdmissionFacultyFeeStructureAction(acaYear, classId));
    setNotify({
      isOpen: true,
      message: "Admission Faculty Free Structure Created Succesfully",
      type: "success",
    });
    setOpenCreatePopup(false);
    dispatch({ type: POST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
  }

  if (postAdmissionFacultyFeeStructureError) {
    setNotify({
      isOpen: true,
      message: postAdmissionFacultyFeeStructureError,
      type: "error",
    });
    dispatch({ type: POST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
  }

  if (putAdmissionFacultyFeeStructureSuccess) {
    dispatch(getListAdmissionFacultyFeeStructureAction(acaYear, classId));
    setNotify({
      isOpen: true,
      message: "Admission Faculty Fee Structure Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
  }

  if (putAdmissionFacultyFeeStructureError) {
    setNotify({
      isOpen: true,
      message: putAdmissionFacultyFeeStructureError,
      type: "error",
    });
    dispatch({ type: PUT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
  }

  useEffect(() => {
    dispatch({ type: GET_LIST_ADMISSION_FACULTY_FEE_STRUCTURE_RESET });
    dispatch(getAllAdmissionFacultyFeeStructureAction());
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    if (admissionFacultyFeeStructure) {
      setAcademicYearDdl(
        admissionFacultyFeeStructure?.searchFilterModel?.ddlAcademicYear
      );
      setAcaYear(
        admissionFacultyFeeStructure?.searchFilterModel.ddlAcademicYear[0]?.Key
      );
      setDdlClass(admissionFacultyFeeStructure?.searchFilterModel?.ddlClass);
      setClassId(
        admissionFacultyFeeStructure?.searchFilterModel.ddlClass[0]?.Key
      );
    }
  }, [admissionFacultyFeeStructure]);

  useEffect(() => {
    if (listAdmissionFacultyFeeStructure) {
      setTableData(listAdmissionFacultyFeeStructure?.dbModelLst);
    }
  }, [listAdmissionFacultyFeeStructure]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleCreate = () => {
    if (validate()) {
      dispatch(
        getSingleCreateAdmissionFacultyFeeStructureAction(acaYear, classId)
      );
      setOpenCreatePopup(true);
      dispatch({
        type: GET_SINGLE_TO_EDIT_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
      });
    }
  };

  const updateCollegeHandler = (id) => {
    dispatch({
      type: GET_SINGLE_TO_CREATE_ADMISSION_FACULTY_FEE_STRUCTURE_RESET,
    });
    dispatch(
      getSingleEditAdmissionFacultyFeeStructureAction(id, acaYear, classId)
    );
    setOpenPopup(true);
  };

  const handleListSearch = () => {
    if (validate()) {
      dispatch(getListAdmissionFacultyFeeStructureAction(acaYear, classId));
    }
  };

  return (
    <>
      <CustomContainer>
        <Toolbar>
          <Grid container style={{ fontSize: "12px" }}>
            <Grid item xs={3}>
              <SelectControl
                name="Academic Year"
                label="Academic Year"
                value={acaYear}
                onChange={(e) => setAcaYear(e.target.value)}
                options={academicYearDdl}
                errors={errors.acaYear}
              />
            </Grid>
            <Grid item xs={3}>
              <SelectControl
                name="Classes"
                label="Classes"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                options={ddlClass}
                errors={errors.classId}
              />
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

              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ margin: "10px 0 0 10px" }}
                onClick={handleCreate}
              >
                CREATE
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
        <div style={{ height: "15px" }}></div>
        <Toolbar>
          <InputControl
            className={classes.searchInput}
            label="Search Admission Faculty Fee Structure Link By Header"
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
            {listAdmissionFacultyFeeStructure && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <AdmissionFacultyFeeStructureTableCollapse
                      item={item}
                      key={item.$id}
                      setOpenPopup={setOpenPopup}
                      updateCollegeHandler={updateCollegeHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {listAdmissionFacultyFeeStructure && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
        title="Admission Faculty Fee Structure Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AdmissionFacultyFeeForm
              feeStructure={
                singleCreateAdmissionFacultyFeeStructure &&
                singleCreateAdmissionFacultyFeeStructure?.ddlFeeStructure
              }
              setOpenCreatePopup={setOpenCreatePopup}
              searchFilterModel={
                singleCreateAdmissionFacultyFeeStructure &&
                singleCreateAdmissionFacultyFeeStructure?.searchFilterModel
              }
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Admission Faculty Fee Structure Edit Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <AdmissionFacultyFeeStructureEditForm
              editAccount={
                singleEditAdmissionFacultyFeeStructure &&
                singleEditAdmissionFacultyFeeStructure
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

export default AdmissionFacultyFee;
