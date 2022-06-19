import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, makeStyles } from "@material-ui/core";
import Notification from "../../components/Notification";
import inWords from "../../helpers/numToWords";
import { API_URL } from "../../constants";
import { useReactToPrint } from "react-to-print";

import { getHeaderBannerAction } from "../../dashboard/DashboardActions";

const useStyles = makeStyles((theme) => ({
  studentLedgerPrint: {
    margin: "10px",
    border: "1px solid #000",
    padding: "10px 10px 10px 30px",
    borderRadius: "6px",
    fontSize: "12px",
  },
  withthanks: {
    paddingTop: " 55px",
    width: "100%",
    lineHeight: "0.3",
  },
  BottomContainer: {
    width: "100%",
  },
  button: {
    position: "absolute",
    right: "10px",
  },
}));

const StudentLedgerSideRecipt = ({
  printReceipt,
  date,
  ddlClass,
  idClass,
  setOpenReciptPopup,
  regKey,
  prevBal,
  amountPaid,
  recieptNo,
  balDue,
  discount,
  advancedPaid,
  acaYears,
}) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();
  const { headerBanners, error: headerBannersError } = useSelector(
    (state) => state.getHeaderBanner
  );

  const classID = ddlClass?.filter((x) => x.Key == idClass);

  if (headerBannersError) {
    dispatch({ type: GET_HEADER_BANNER_RESET });
    setNotify({
      isOpen: true,
      message: headerBannersError,
      type: "error",
    });
  }

  const componentRef = useRef();
  const printPdf = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (!headerBanners) {
      dispatch(getHeaderBannerAction());
    }
  }, [headerBanners, dispatch]);

  return (
    <>
      <div ref={componentRef}>
        <div className={classes.studentLedgerPrint}>
          <Grid container>
            <Grid item xs={3}>
              <h4>
                BillDate: <br />
                {date?.StartDate?.slice(0, 10)}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <img src={`${API_URL}${headerBanners}`} width="100%" />
            </Grid>
            <Grid item xs={3}>
              <h3>Reciept No. {recieptNo}</h3>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "40px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={10}>
              <b>Received with thanks from: </b> {printReceipt?.StudentName}
            </Grid>

            <Grid item xs={4}>
              <b>Academic Batch</b> {acaYears}
            </Grid>
            <Grid item xs={3}>
              <b>Class</b> {classID?.length > 0 && classID[0]?.Value}
            </Grid>
            <Grid item xs={2}>
              <b>Reg No. </b>
              {regKey}
            </Grid>
            <Grid item xs={2}>
              <b>Roll No:</b> {printReceipt?.RollNo}
            </Grid>

            <Grid item xs={3}>
              <b>a sum of Rs.</b>{" "}
              {Number(amountPaid) + Number(discount) + Number(advancedPaid)}
            </Grid>
            <Grid item xs={8}>
              <b>In words Rs. </b>
              {inWords(
                (
                  Number(amountPaid) +
                  Number(discount) +
                  Number(advancedPaid)
                )?.toFixed(0)
              )}{" "}
            </Grid>

            <Grid item xs={4}>
              <b>Previous Balance :Rs.</b> {prevBal}
            </Grid>
            {amountPaid > 0 && (
              <Grid item xs={3}>
                <b>Amount Paid :Rs.</b> {amountPaid}
              </Grid>
            )}
            {discount > 0 && (
              <Grid item xs={3}>
                <b>Discount:Rs.</b> {discount}
              </Grid>
            )}
            {advancedPaid > 0 && (
              <Grid item xs={3}>
                <b>Advanced Paid:Rs.</b> {advancedPaid}
              </Grid>
            )}

            <Grid item xs={3}>
              <b>Balance Due:Rs. </b>
              {prevBal - amountPaid - discount - advancedPaid}
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "50px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <h5>School Stamp</h5>
            </Grid>

            <Grid item xs={5}>
              <h5>Accountant</h5>
            </Grid>
          </Grid>
        </div>
        <div className={classes.studentLedgerPrint}>
          <Grid container>
            <Grid item xs={3}>
              <h4>
                BillDate: <br />
                {date?.StartDate?.slice(0, 10)}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <img src={`${API_URL}${headerBanners}`} width="100%" />
            </Grid>
            <Grid item xs={3}>
              <h3>Reciept No. {recieptNo}</h3>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "40px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={10}>
              <b>Received with thanks from: </b> {printReceipt?.StudentName}
            </Grid>

            <Grid item xs={4}>
              <b>Academic Batch</b> {acaYears}
            </Grid>
            <Grid item xs={3}>
              <b>Class</b> {classID?.length > 0 && classID[0]?.Value}
            </Grid>
            <Grid item xs={2}>
              <b>Reg No. </b>
              {regKey}
            </Grid>
            <Grid item xs={2}>
              <b>Roll No:</b> {printReceipt?.RollNo}
            </Grid>

            <Grid item xs={3}>
              <b>a sum of Rs.</b>{" "}
              {Number(amountPaid) + Number(discount) + Number(advancedPaid)}
            </Grid>
            <Grid item xs={8}>
              <b>In words Rs. </b>
              {inWords(
                (
                  Number(amountPaid) +
                  Number(discount) +
                  Number(advancedPaid)
                )?.toFixed(0)
              )}
            </Grid>

            <Grid item xs={4}>
              <b>Previous Balance :Rs.</b> {prevBal}
            </Grid>
            {amountPaid > 0 && (
              <Grid item xs={3}>
                <b>Amount Paid :Rs.</b> {amountPaid}
              </Grid>
            )}
            {discount > 0 && (
              <Grid item xs={3}>
                <b>Discount:Rs.</b> {discount}
              </Grid>
            )}
            {advancedPaid > 0 && (
              <Grid item xs={3}>
                <b>Advanced Paid:Rs.</b> {advancedPaid}
              </Grid>
            )}

            <Grid item xs={3}>
              <b>Balance Due:Rs. </b>
              {prevBal - amountPaid - discount - advancedPaid}
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "50px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
              <h5>School Stamp</h5>
            </Grid>

            <Grid item xs={5}>
              <h5>Accountant</h5>
            </Grid>
          </Grid>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          onClick={() => setOpenReciptPopup(false)}
          className="print-button-hide"
          variant="contained"
          color="primary"
          style={{ marginRight: "16px" }}
        >
          CANCEL
        </Button>
        <Button
          onClick={printPdf}
          className="print-button-hide"
          variant="contained"
          color="primary"
        >
          PRINT
        </Button>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default StudentLedgerSideRecipt;
