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
  GET_ALL_MONTHLY_FEE_LINK_RESET,
  GET_LIST_MONTHLY_FEE_LINK_RESET,
  GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_RESET,
  GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_RESET,
  POST_MONTHLY_FEE_LINK_RESET,
  PUT_MONTHLY_FEE_LINK_RESET,
} from "./MonthlyFeeLinkConstants";
import {
  getAllMonthlyFeeLinkAction,
  getListMonthlyFeeLinkAction,
  getSingleCreateMonthlyFeeLinkAction,
  getSingleEditMonthlyFeeLinkAction,
} from "./MonthlyFeeLinkActions";
import MonthlyFeeLinkTableCollapse from "./MonthlyFeeLinkTableCollapse";
import MonthlyFeeLinkEditForm from "./MonthlyFeeLinkEditForm";
import MonthlyFeeLinkForm from "./MonthlyFeeLinkForm";

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

const MonthlyFeeLink = () => {
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
  const { monthlyFeeLink, error } = useSelector(
    (state) => state.getAllMonthlyFeeLink
  );

  const {
    listMonthlyFeeLink,
    error: listMonthlyFeeLinkError,
    loading,
  } = useSelector((state) => state.getListMonthlyFeeLink);

  const { singleCreateMonthlyFeeLink, error: singleCreateMonthlyFeeLinkError } =
    useSelector((state) => state.getSingleCreateMonthlyFeeLink);

  const {
    singleEditMonthlyFeeLink,
    error: singleEditMonthlyFeeLinkError,
    loading: loadingEdit,
  } = useSelector((state) => state.getSingleEditMonthlyFeeLink);

  const { success: postMonthlyFeeLinkSuccess, error: postMonthlyFeeLinkError } =
    useSelector((state) => state.postMonthlyFeeLink);

  const { success: putMonthlyFeeLinkSuccess, error: putMonthlyFeeLinkError } =
    useSelector((state) => state.putMonthlyFeeLink);

  if (error) {
    setNotify({
      isOpen: true,
      message: error,
      type: "error",
    });
    dispatch({ type: GET_ALL_MONTHLY_FEE_LINK_RESET });
  }

  if (listMonthlyFeeLinkError) {
    setNotify({
      isOpen: true,
      message: listMonthlyFeeLinkError,
      type: "error",
    });
    dispatch({ type: GET_LIST_MONTHLY_FEE_LINK_RESET });
  }

  if (singleCreateMonthlyFeeLinkError) {
    setNotify({
      isOpen: true,
      message: singleCreateMonthlyFeeLinkError,
      type: "error",
    });
    dispatch({
      type: GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_RESET,
    });
  }

  if (singleEditMonthlyFeeLinkError) {
    setNotify({
      isOpen: true,
      message: singleEditMonthlyFeeLinkError,
      type: "error",
    });
    dispatch({
      type: GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_RESET,
    });
  }

  if (postMonthlyFeeLinkSuccess) {
    dispatch(getListMonthlyFeeLinkAction(acaYear, classId));
    setNotify({
      isOpen: true,
      message: "Monthly Fee Created Succesfully",
      type: "success",
    });
    setOpenCreatePopup(false);
    dispatch({ type: POST_MONTHLY_FEE_LINK_RESET });
  }

  if (postMonthlyFeeLinkError) {
    setNotify({
      isOpen: true,
      message: postMonthlyFeeLinkError,
      type: "error",
    });
    dispatch({ type: POST_MONTHLY_FEE_LINK_RESET });
  }

  if (putMonthlyFeeLinkSuccess) {
    dispatch(getListMonthlyFeeLinkAction(acaYear, classId));
    setNotify({
      isOpen: true,
      message: "Monthly Fee Edited Succesfully",
      type: "success",
    });
    setOpenPopup(false);
    dispatch({ type: PUT_MONTHLY_FEE_LINK_RESET });
  }

  if (putMonthlyFeeLinkError) {
    setNotify({
      isOpen: true,
      message: putMonthlyFeeLinkError,
      type: "error",
    });
    dispatch({ type: PUT_MONTHLY_FEE_LINK_RESET });
  }

  useEffect(() => {
    dispatch({ type: GET_LIST_MONTHLY_FEE_LINK_RESET });
    dispatch(getAllMonthlyFeeLinkAction());
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/revenue" });
  }, []);

  useEffect(() => {
    if (monthlyFeeLink) {
      setAcademicYearDdl(monthlyFeeLink?.searchFilterModel?.ddlAcademicYear);
      setAcaYear(monthlyFeeLink?.searchFilterModel.ddlAcademicYear[0]?.Key);
      setDdlClass(monthlyFeeLink?.searchFilterModel?.ddlClass);
      setClassId(monthlyFeeLink?.searchFilterModel.ddlClass[0]?.Key);
    }
  }, [monthlyFeeLink]);

  useEffect(() => {
    if (listMonthlyFeeLink) {
      setTableData(listMonthlyFeeLink?.dbModelLst);
    }
  }, [listMonthlyFeeLink]);

  const validate = () => {
    let temp = {};
    temp.acaYear = !acaYear ? "This feild is required" : "";
    temp.classId = !classId ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleCreate = () => {
    if (validate()) {
      dispatch(getSingleCreateMonthlyFeeLinkAction(acaYear, classId));
      setOpenCreatePopup(true);
      dispatch({
        type: GET_SINGLE_TO_EDIT_MONTHLY_FEE_LINK_RESET,
      });
    }
  };

  const handleListSearch = () => {
    if (validate()) {
      dispatch(getListMonthlyFeeLinkAction(acaYear, classId));
    }
  };

  const updateCollegeHandler = (id) => {
    dispatch({ type: GET_SINGLE_TO_CREATE_MONTHLY_FEE_LINK_RESET });
    dispatch(getSingleEditMonthlyFeeLinkAction(id, acaYear, classId));
    setOpenPopup(true);
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
            label="Search Monthly Fee By Header"
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
            {listMonthlyFeeLink && (
              <TableContainer className={classes.table}>
                <TblHead />

                <TableBody>
                  {tableDataAfterPagingAndSorting().map((item) => (
                    <MonthlyFeeLinkTableCollapse
                      item={item}
                      key={item.$id}
                      setOpenPopup={setOpenPopup}
                      updateCollegeHandler={updateCollegeHandler}
                    />
                  ))}
                </TableBody>
              </TableContainer>
            )}

            {listMonthlyFeeLink && <TblPagination />}
          </>
        )}
      </CustomContainer>
      <Popup
        openPopup={openCreatePopup}
        setOpenPopup={setOpenCreatePopup}
        title="Monthly Fee Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <MonthlyFeeLinkForm
              feeStructure={
                singleCreateMonthlyFeeLink &&
                singleCreateMonthlyFeeLink?.ddlFeeStructure
              }
              searchFilterModel={
                singleCreateMonthlyFeeLink &&
                singleCreateMonthlyFeeLink?.searchFilterModel
              }
              setOpenCreatePopup={setOpenCreatePopup}
            />
          </>
        )}
      </Popup>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Monthly Fee Edit Form"
      >
        {loadingEdit ? (
          <LoadingComp />
        ) : (
          <>
            <MonthlyFeeLinkEditForm
              editForm={singleEditMonthlyFeeLink && singleEditMonthlyFeeLink}
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

export default MonthlyFeeLink;
