import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../../components/Notification";
import { API_URL } from "../../constants";
import { getHeaderBannerAction } from "../../dashboard/DashboardActions";
import { GET_HEADER_BANNER_RESET } from "../../dashboard/DashboardConstants";
import { Button, Grid } from "@material-ui/core";
import { useReactToPrint } from "react-to-print";
import "../admitStudent/AdmitStudentPrint.css";
import inWords from "../../helpers/numToWords";

const StudentLedgerBillPrint = ({
  ddlNpMonth,
  ddlAcaYear,
  acaYear,
  classId,
  classDdl,
  date,
  dbModel,
  monthId,
  monthlyFee,
  prevBal,
  regKey,
  currentMonth,
  setOpenPrintPopup,
}) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  const { headerBanners, error: headerBannersError } = useSelector(
    (state) => state.getHeaderBanner
  );

  if (headerBannersError) {
    dispatch({ type: GET_HEADER_BANNER_RESET });
    setNotify({
      isOpen: true,
      message: headerBannersError,
      type: "error",
    });
  }

  const year = ddlAcaYear?.filter((x) => x.Key === acaYear);
  const level = classDdl?.filter((x) => x.Key === classId);
  const month = ddlNpMonth?.filter((x) => x.Key === monthId);

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
      <div className="student-print-container" ref={componentRef}>
        <Grid container>
          <Grid item xs={3}>
            <h6>
              BillDate: <br />
              {date?.slice(0, 10)}
            </h6>
            {/* <h6>Bill No: </h6> */}
          </Grid>
          <Grid item xs={6}>
            <img src={`${API_URL}${headerBanners}`} width="90%" />
          </Grid>
          <Grid item xs={3}>
            <h6>Batch: {year && year[0]?.Value}</h6>
            <h6>Bill Month: {month && month[0]?.Value}</h6>
          </Grid>
        </Grid>

        <div className="student-admit-name-container">
          <h6>
            Student Name: <strong>{dbModel?.StudentName}</strong>
          </h6>
          <Grid container>
            <Grid item xs={3}>
              <h6>Class: {level && level[0]?.Value} </h6>
            </Grid>
            <Grid item xs={3}>
              <h6>Reg No: {regKey}</h6>
            </Grid>
            <Grid item xs={3}>
              <h6> Roll No: {dbModel?.RollNo}</h6>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
        <div className="student-admit-table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: "10%", textAlign: "center" }}>SN.</th>
                <th style={{ width: "65%" }}>Fee Heading</th>
                <th style={{ width: "35%", textAlign: "center" }}>
                  Amount(Rs)
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyFee
                ?.filter((x) => x.IDMonth == currentMonth)
                ?.map((s, i) => (
                  <tr key={s.AccountSubmitCode}>
                    <td>{i + 1}</td>
                    <td>{s.AccountName}</td>
                    <td>{Number(s.Total)?.toFixed(2)}</td>
                  </tr>
                ))}

              <tr>
                <td></td>
                <td>Previous Balance</td>
                <td>{prevBal}</td>
              </tr>
              <tr>
                <td></td>
                <td>Total</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="student-admit-bottom-container">
          <h6>
            In words: <strong></strong>
          </h6>
          <div className="student-admit-bottom-container-signature">
            <Grid container>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <h6>School Stamp</h6>
              </Grid>
              <Grid item xs={4}>
                <h6>Accountant</h6>
              </Grid>
            </Grid>
          </div>
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
          onClick={() => setOpenPrintPopup(false)}
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

export default StudentLedgerBillPrint;
