import React from "react";
import { Grid } from "@material-ui/core";
import "../admitStudent/AdmitStudentPrint.css";
import inWords from "../../helpers/numToWords";
import { API_URL } from "../../constants";

const OneTimeBillPrintDesign = ({
  currentStudentBill,
  year,
  level,
  month,
  date,
  headerBanners,
  voucherBillNo,
  student,
}) => {
  return (
    <div className="student-print-container">
      <Grid container>
        <Grid item xs={3}>
          <h6>
            BillDate: <br />
            {date?.slice(0, 10)}
          </h6>
          <h6>Bill No: {voucherBillNo}</h6>
        </Grid>
        <Grid item xs={6}>
          <img src={`${API_URL}${headerBanners}`} width="100%" />
        </Grid>
        <Grid item xs={3}>
          <h6>Batch: {year && year[0]?.Value}</h6>
          <h6>Bill Month: {month && month[0]?.Value}</h6>
        </Grid>
      </Grid>

      <div className="student-admit-name-container">
        <h6>
          Student Name: <strong>{student?.StudentName}</strong>
        </h6>
        <Grid container>
          <Grid item xs={3}>
            <h6>Class: {level && level[0]?.Value} </h6>
          </Grid>
          <Grid item xs={3}>
            <h6>Reg No: {student?.RegistrationKey}</h6>
          </Grid>
          <Grid item xs={3}>
            <h6> Roll No: {student?.RollNo}</h6>
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
              <th style={{ width: "35%", textAlign: "center" }}>Amount(Rs)</th>
            </tr>
          </thead>
          <tbody>
            {currentStudentBill
              ?.filter((x) => x.Total !== 0)
              ?.map((s, i) => (
                <tr key={s.IDAccountType}>
                  <td>{i + 1}</td>
                  <td>{s.AccountName}</td>
                  <td>{s.Total}</td>
                </tr>
              ))}

            <tr>
              <td></td>
              <td>Previous Balance</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td></td>
              <td>Total</td>
              <td>
                {currentStudentBill
                  ?.reduce((acc, item) => {
                    return acc + item.Total;
                  }, 0)
                  .toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="student-admit-bottom-container">
        <h6>
          In words:{" "}
          <strong>
            {inWords(
              currentStudentBill?.reduce((acc, item) => {
                return acc + item.Total;
              }, 0)
            )}
          </strong>
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
  );
};

export default OneTimeBillPrintDesign;
