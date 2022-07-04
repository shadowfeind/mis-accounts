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
    margin: "10px 10px 30px 10px",
    border: "1px solid #000",
    padding: "30px",
    borderRadius: "6px",
    fontSize: "12px",
    "& h4": {
      margin: "0 0 8px 0",
      fontSize: "14px",
      fontWeight: "normal",
    },
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

const StudentLedgerRecipt = ({
  printReceipt,
  date,
  ddlClass,
  idClass,
  setOpenPopup,
  ddlAcademicYear,
  idYear,
  regKey,
  prevBal,
  amountPaid,
  recieptNo,
  balDue,
  discount,
  advancedPaid,
  newIdForReceipt,
  acaYear,
  academicYearDdl,
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

  const year = academicYearDdl?.filter((x) => x.Key === acaYear);
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

  console.log(newIdForReceipt);

  return (
    <>
      <div ref={componentRef}>
        <div className={classes.studentLedgerPrint}>
          <Grid container>
            <Grid item xs={3}>
              <h3>
                Receipt Date: <br />
                {date?.StartDate?.slice(0, 10)}
              </h3>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <img src={`${API_URL}${headerBanners}`} width="100%" />
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              <h3>Reciept No. {newIdForReceipt && newIdForReceipt}</h3>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "40px",
            }}
          >
            <Grid item xs={12}>
              <h4>
                <b>Received with thanks from:</b> {printReceipt?.StudentName}
              </h4>
            </Grid>

            <Grid item xs={4}>
              <h4>
                <b>Academic Batch:</b> {year?.length > 0 && year[0]?.Value}
              </h4>
            </Grid>
            <Grid item xs={4}>
              <h4>
                <b>Class:</b> {classID?.length > 0 && classID[0]?.Value}
              </h4>
            </Grid>
            <Grid item xs={4}>
              <h4>
                <b>Reg No:</b>
                {regKey}
              </h4>
            </Grid>
            <Grid item xs={4}>
              <h4>
                <b>Roll No:</b> {printReceipt?.RollNo}
              </h4>
            </Grid>

            <Grid item xs={4}>
              <h4>
                <b>a sum of Rs.</b> {Number(amountPaid)?.toFixed(2)}
              </h4>
            </Grid>
            <Grid item xs={12}>
              <h4>
                <b>In words Rs.</b>
                {inWords(Number(amountPaid)?.toFixed(0))}{" "}
              </h4>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "16px",
            }}
          >
            <Grid item xs={3}>
              <h4>
                <b>Previous Balance: Rs.</b> {Number(prevBal)?.toFixed(2)}
              </h4>
            </Grid>
            {amountPaid > 0 && (
              <Grid item xs={3}>
                <h4>
                  <b>Amount Paid :Rs.</b> {Number(amountPaid)?.toFixed(2)}
                </h4>
              </Grid>
            )}
            {discount > 0 && (
              <Grid item xs={3}>
                <h4>
                  <b>Discount: Rs.</b> {Number(discount)?.toFixed(2)}
                </h4>
              </Grid>
            )}
            {advancedPaid > 0 && (
              <Grid item xs={3}>
                <h4>
                  <b>Advanced Paid: Rs.</b> {Number(advancedPaid)?.toFixed(2)}
                </h4>
              </Grid>
            )}
            <Grid item xs={3}>
              <h4>
                <b>Balance Due: Rs.</b>
                {(balDue - amountPaid - discount - advancedPaid)?.toFixed(2)}
              </h4>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "80px",
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
              <h3>
                Receipt Date: <br />
                {date?.StartDate?.slice(0, 10)}
              </h3>
            </Grid>
            <Grid item xs={6} style={{ textAlign: "center" }}>
              <img src={`${API_URL}${headerBanners}`} width="100%" />
            </Grid>
            <Grid item xs={3} style={{ textAlign: "right" }}>
              <h3>Reciept No. {newIdForReceipt && newIdForReceipt}</h3>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "40px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={12}>
              <h4>
                <b>Received with thanks from:</b> {printReceipt?.StudentName}
              </h4>
            </Grid>

            <Grid item xs={4}>
              <h4>
                <b>Academic Batch:</b> {year?.length > 0 && year[0]?.Value}
              </h4>
            </Grid>
            <Grid item xs={4}>
              <h4>
                <b>Class:</b> {classID?.length > 0 && classID[0]?.Value}
              </h4>
            </Grid>
            <Grid item xs={4}>
              <h4>
                <b>Reg No:</b>
                {regKey}
              </h4>
            </Grid>
            <Grid item xs={4}>
              <h4>
                <b>Roll No:</b> {printReceipt?.RollNo}
              </h4>
            </Grid>

            <Grid item xs={4}>
              <h4>
                <b>a sum of Rs.</b> {Number(amountPaid)?.toFixed(2)}
              </h4>
            </Grid>
            <Grid item xs={12}>
              <h4>
                <b>In words Rs.</b>
                {inWords(Number(amountPaid)?.toFixed(0))}
              </h4>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3}>
              <h4>
                <b>Previous Balance: Rs.</b> {Number(prevBal)?.toFixed(2)}
              </h4>
            </Grid>
            {amountPaid > 0 && (
              <Grid item xs={3}>
                <h4>
                  <b>Amount Paid: Rs.</b> {Number(amountPaid)?.toFixed(2)}
                </h4>
              </Grid>
            )}
            {discount > 0 && (
              <Grid item xs={3}>
                <h4>
                  <b>Discount: Rs.</b> {Number(discount)?.toFixed(2)}
                </h4>
              </Grid>
            )}
            {advancedPaid > 0 && (
              <Grid item xs={3}>
                <h4>
                  <b>Advanced Paid:Rs.</b> {Number(advancedPaid)?.toFixed(2)}
                </h4>
              </Grid>
            )}

            <Grid item xs={3}>
              <h4>
                <b>Balance Due: Rs.</b>
                {(balDue - amountPaid - discount - advancedPaid)?.toFixed(2)}
              </h4>
            </Grid>
          </Grid>

          <Grid
            container
            style={{
              marginTop: "80px",
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
          onClick={() => setOpenPopup(false)}
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

export default StudentLedgerRecipt;
