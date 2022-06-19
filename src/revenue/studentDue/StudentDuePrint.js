import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import Notification from "../../components/Notification";
import { useReactToPrint } from "react-to-print";
import "../admitStudent/AdmitStudentPrint.css";
import { API_URL } from "../../constants";
import { getHeaderBannerAction } from "../../dashboard/DashboardActions";

const StudentDuePrint = ({
  printDue,
  date,
  fiscalYearDdl,
  iDFiscalYear,
  setOpenPopup,
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

  const year = fiscalYearDdl?.filter((x) => x.Key == iDFiscalYear);

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
              {date?.TransactionDate?.slice(0, 10)}
            </h6>
          </Grid>
          <Grid item xs={6}>
            <img src={`${API_URL}${headerBanners}`} width="90%" />
          </Grid>
          <Grid item xs={3}>
            <h6>
              Fiscal Year:
              <br /> {year && year[0]?.Value}{" "}
            </h6>
            <h6>
              <strong>Student Due</strong>
            </h6>
          </Grid>
        </Grid>
        <div className="student-admit-table-container">
          <table>
            <thead>
              <tr>
                <th style={{ width: "30%", textAlign: "center" }}>Reg Key</th>
                <th style={{ width: "65%" }}>Student Name</th>
                <th style={{ width: "35%", textAlign: "center" }}>
                  Remaining Due(Rs)
                </th>
              </tr>
            </thead>
            <tbody>
              {printDue?.map((s, i) => (
                <tr key={s.IDAccountType}>
                  <td>{s.RegistrationKey}</td>
                  <td>{s.FullName}</td>
                  <td>{Number(s.RemainingDue)?.toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>Total</td>
                <td>
                  {printDue
                    ?.reduce((acc, item) => {
                      return acc + Number(item.RemainingDue);
                    }, 0)
                    ?.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="student-admit-bottom-container">
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

export default StudentDuePrint;
