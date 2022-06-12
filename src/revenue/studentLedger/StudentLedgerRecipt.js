import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, makeStyles } from "@material-ui/core";
import Notification from "../../components/Notification";
import inWords from "../../helpers/numToWords";
import { API_URL } from "../../constants";
import { useReactToPrint } from "react-to-print";

import { getHeaderBannerAction } from "../../dashboard/DashboardActions";

const useStyles = makeStyles((theme) => ({
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
  fiscalYearDdl,
  iDFiscalYear,
  setOpenPopup,
  ddlAcademicYear,
  idYear,
  regKey,
  prevBal,
  amountPaid,
  balDue,
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

  const year = ddlAcademicYear?.filter((x) => x.Key == idYear);
  const classID = ddlClass?.filter((x) => x.Key == idClass);
  const fiscalYear = fiscalYearDdl?.filter((x) => x.Key == iDFiscalYear);

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
        <div className="fee-collection">
          <Grid
            container
            style={{
              fontSize: "14px",
            }}
          >
            <Grid item xs={3}>
              <h4>
                BillDate: &nbsp;
                {date?.StartDate?.slice(0, 10)}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <img src={`${API_URL}${headerBanners}`} width="100%" />
            </Grid>
            <Grid item xs={3}>
              <h4>Student Ledger Reciept</h4>

              <h4>
                Fiscal Year: &nbsp;
                {fiscalYear?.length > 0 && fiscalYear[0]?.Value}
              </h4>
            </Grid>
          </Grid>
          {/* <div>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%", textAlign: "left" }}>RollNo.</th>
                  <th style={{ width: "30%", textAlign: "left" }}>
                    Student Name
                  </th>
                  <th style={{ width: "15%", textAlign: "left" }}>Class</th>
                  <th style={{ width: "10%", textAlign: "left" }}>Reg No.</th>
                  <th style={{ width: "15%", textAlign: "left" }}></th>
                  <th style={{ width: "15%", textAlign: "left" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{printReceipt?.RollNo}</td>
                  <td>{printReceipt?.StudentName}</td>
                  <td>{classID?.length > 0 && classID[0]?.Value}</td>
                  <td>{regKey}</td>
                  <td>
                    <h4>a sum of Rs.&nbsp;{amountPaid} </h4>
                  </td>
                  <td>
                    <h6>
                      In words: <strong>{inWords(amountPaid)}</strong>
                    </h6>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>Previous Balance: &nbsp;{prevBal}</td>
                  <td>Amount Paid:</td>
                  <td>{amountPaid}</td>

                  <td>Balance Due:</td>
                  <td>{balDue}</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <Grid
            container
            style={{
              marginTop: "40px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <b>Received with thanks from: </b> {printReceipt?.StudentName}
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <b>Academic Batch</b> {year?.length > 0 && year[0]?.Value}
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

            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <b>a sum of Rs.</b> {amountPaid}
            </Grid>
            <Grid item xs={8}>
              <b>In words Rs. </b>
              {inWords(amountPaid)}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <b>Previous Balance :</b> {prevBal}
            </Grid>
            <Grid item xs={3}>
              <b>Amount Paid :</b> {amountPaid}
            </Grid>
            <Grid item xs={3}>
              <b>Balance Due: </b>
              {balDue}
            </Grid>
            <Grid item xs={1}></Grid>
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
              <h4>School Stamp</h4>
            </Grid>

            <Grid item xs={5}>
              <h4>Accountant</h4>
            </Grid>
          </Grid>
          <hr
            style={{
              margin: "40px 0",
            }}
          ></hr>
          <Grid
            container
            style={{
              fontSize: "14px",
            }}
          >
            <Grid item xs={3}>
              <h4>
                BillDate: &nbsp;
                {date?.StartDate?.slice(0, 10)}
              </h4>
            </Grid>
            <Grid item xs={6}>
              <img src={`${API_URL}${headerBanners}`} width="100%" />
            </Grid>
            <Grid item xs={3}>
              <h4>Student Ledger Reciept</h4>

              <h4>
                Fiscal Year: &nbsp;
                {fiscalYear?.length > 0 && fiscalYear[0]?.Value}
              </h4>
            </Grid>
          </Grid>
          {/* <div>
            <table>
              <thead>
                <tr>
                  <th style={{ width: "5%", textAlign: "left" }}>RollNo.</th>
                  <th style={{ width: "30%", textAlign: "left" }}>
                    Student Name
                  </th>
                  <th style={{ width: "15%", textAlign: "left" }}>Class</th>
                  <th style={{ width: "10%", textAlign: "left" }}>Reg No.</th>
                  <th style={{ width: "15%", textAlign: "left" }}></th>
                  <th style={{ width: "15%", textAlign: "left" }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{printReceipt?.RollNo}</td>
                  <td>{printReceipt?.StudentName}</td>
                  <td>{classID?.length > 0 && classID[0]?.Value}</td>
                  <td>{regKey}</td>
                  <td>
                    <h4>a sum of Rs.&nbsp;{amountPaid} </h4>
                  </td>
                  <td>
                    <h6>
                      In words: <strong>{inWords(amountPaid)}</strong>
                    </h6>
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>Previous Balance: &nbsp;{prevBal}</td>
                  <td>Amount Paid:</td>
                  <td>{amountPaid}</td>

                  <td>Balance Due:</td>
                  <td>{balDue}</td>
                </tr>
              </tbody>
            </table>
          </div> */}
          <Grid
            container
            style={{
              marginTop: "40px",
              fontSize: "20px",
            }}
          >
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <b>Received with thanks from: </b> {printReceipt?.StudentName}
            </Grid>
            <Grid item xs={1}></Grid>

            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <b>Academic Batch</b> {year?.length > 0 && year[0]?.Value}
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

            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
              <b>a sum of Rs.</b> {amountPaid}
            </Grid>
            <Grid item xs={8}>
              <b>In words Rs. </b>
              {inWords(amountPaid)}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={4}>
              <b>Previous Balance :</b> {prevBal}
            </Grid>
            <Grid item xs={3}>
              <b>Amount Paid :</b> {amountPaid}
            </Grid>
            <Grid item xs={3}>
              <b>Balance Due: </b>
              {balDue}
            </Grid>
            <Grid item xs={1}></Grid>
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
              <h4>School Stamp</h4>
            </Grid>

            <Grid item xs={5}>
              <h4>Accountant</h4>
            </Grid>
          </Grid>
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
        </div>
      </div>
    </>
  );
};

export default StudentLedgerRecipt;
