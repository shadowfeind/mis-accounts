import React, { useEffect, useState } from "react";
import { Grid, Button, makeStyles, Card } from "@material-ui/core";
import Popup from "../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../components/Notification";
import ConfirmDialog from "../components/ConfirmDialog";
import Holiday from "../settings/schoolConfiguration/holiday/Holiday";
import DashboardHeader from "./DashboardHeader";
import DashboardLeaveApprove from "./DashboardLeaveApprove";
import DashboardNoticeBoard from "./DashboardNoticeBoard";
import DashboardLeaveRequest from "./DashboardLeaveRequest";
import {
  getDashboardTopContentAction,
  getListLeaveRequestAction,
  getSingleCreateLeaveRequestAction,
  getSingleEditLeaveRequestAction,
} from "./DashboardActions";
import {
  DELETE_LEAVE_REQUESTS_RESET,
  DOWNLOAD_DOC_LEAVE_REQUESTS_RESET,
  GET_DASHBOARD_TOP_CONTENT_RESET,
  GET_SINGLE_TO_CREATE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_DELETE_LEAVE_REQUESTS_RESET,
  GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET,
  POST_LEAVE_REQUESTS_RESET,
  PUT_LEAVE_REQUESTS_RESET,
} from "./DashboardConstants";
import LeaveRequestForm from "./LeaveRequestForm";
import LeaveRequestDeleteForm from "./LeaveRequestDeleteForm";

const useStyles = makeStyles((theme) => ({
  dashboardContainer: {
    padding: "30px",
  },
  button: {
    float: "right",
    display: "inline-block",
    padding: "5px 10px",
    margin: "0",
    color: "#253053",
    border: "2px solid #253053",
    borderRadius: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  cardStyle: {
    margin: "10px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "5px 5px 5px #d4d4d4",
  },
  leaveHeading: {
    display: "inline-block",
    padding: "5px 10px",
    margin: "0",
    border: "2px solid #253053",
    borderRadius: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
}));

const Dashboard = () => {
  const [leave, setLeave] = useState("approve");
  const classes = useStyles();
  const [openPopUp, setOpenPopUp] = useState(false);
  const dispatch = useDispatch();
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
  const [filterFn, setFilterFn] = useState({
    fn: (item) => {
      return item;
    },
  });

  

  const { dashboardTopContent, error: dashboardTopContentError } = useSelector(
    (state) => state.getDashboardTopContent
  );

 
  if (dashboardTopContentError) {
    setNotify({
      isOpen: true,
      message: dashboardTopContentError,
      type: "error",
    });
    dispatch({ type: GET_DASHBOARD_TOP_CONTENT_RESET });
  }
 
  

  useEffect(() => {
    dispatch({ type: "GET_LINK", payload: "/" });
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDashboardTopContentAction());
  }, []);

  const handleCreate = () => {
    dispatch(getSingleCreateLeaveRequestAction());
    setOpenPopUp(true);
    dispatch({ type: GET_SINGLE_TO_EDIT_LEAVE_REQUESTS_RESET });
  };

  return (
    <>
      <div className={classes.dashboardContainer}>
        <DashboardHeader
          dashboardTopContent={dashboardTopContent && dashboardTopContent}
        />
        
          <Grid item xs={6}>
            <Holiday />
        </Grid>
      </div>
    </>
  );
};

export default Dashboard;
