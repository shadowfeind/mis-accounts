import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid } from "@material-ui/core";
import Notification from "../../components/Notification";
import { API_URL } from "../../constants";
import { useReactToPrint } from "react-to-print";
import "./FeeCollectionPrint.css";
import { getHeaderBannerAction } from "../../dashboard/DashboardActions";

const FeeCollectionPrint = ({
  printFee,
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
            </Grid>
            <Grid item xs={6}>
              <img src={`${API_URL}${headerBanners}`} width="90%" />
            </Grid>
            <Grid item xs={3}>
              <h4>Fee Collection</h4>
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
                  <th style={{ width: "15%", textAlign: "left" }}>
                    Academic Year
                  </th>
                  <th style={{ width: "15%", textAlign: "left" }}>
                    Collection(Rs)
                  </th>
                </tr>
              </thead>
              <tbody>
                {printFee?.map((s, i) => (
                  <tr key={s.IDAccountType}>
                    <td>{s.RollNo}</td>
                    <td>{s.FullName}</td>
                    <td>{s.ClassName}</td>
                    <td>{s.RegistrationKey}</td>
                    <td>{s.AcademicYear}</td>
                    <td>{Number(s.Dr)?.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td>Total</td>
                  <td></td>
                  <td></td>

                  <td></td>
                  <td>
                    {printFee
                      ?.reduce((acc, item) => {
                        return acc + Number(item.Dr);
                      }, 0)
                      ?.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="fee-collection-bottom-container">
            <div className="fee-collection-bottom-container-signature">
              {" "}
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={5}>
                  <h4>School Stamp</h4>
                </Grid>
                <Grid item xs={5}>
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

export default FeeCollectionPrint;
