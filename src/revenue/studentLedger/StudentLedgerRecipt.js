import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import Notification from "../../components/Notification";
import inWords from "../../helpers/numToWords";
import { API_URL } from "../../constants";
import { useReactToPrint } from "react-to-print";
import "../feeCollection/FeeCollectionPrint.css";
import { getHeaderBannerAction } from "../../dashboard/DashboardActions";

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
  word,
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
      <div className="fee-collection-container" ref={componentRef}>
        <div className="fee-collection">
          <Grid container>
            <Grid item xs={3}>
              <h4>
                BillDate: &nbsp;
                {date?.StartDate?.slice(0, 10)} to {date?.EndDate?.slice(0, 10)}
              </h4>
              <h4>
                Academic Year:&nbsp;
                {year?.length > 0 && year[0]?.Value}
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

          <div className="student-admit-table-container">
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
                      In words:{" "}
                      <strong>
                        {inWords(
                          word?.reduce((acc) => {
                            return acc + amountPaid;
                          }, 0)
                        )}
                      </strong>
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
          </div>
          <div className="fee-collection-bottom-container">
            <div className="fee-collection-bottom-container-signature">
              {" "}
              <Grid container>
                <Grid item xs={4}></Grid>
                <Grid item xs={4}>
                  <h4>School Stamp</h4>
                </Grid>
                <Grid item xs={4}>
                  <h4>Accountant</h4>
                </Grid>
              </Grid>
            </div>
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

export default StudentLedgerRecipt;
