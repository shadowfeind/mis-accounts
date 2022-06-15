import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  Button,
  TextField,
} from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { postReverseEntryAction } from "../studentLedger/StudentLedgerActions";
import { symbolsArr } from "../../helpers/excludeSymbol";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: "#fff",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const initialFormValues = [
  {
    IDTransactionDrCr: 0,
    AccountType: "",
    AccountName: "",
    TransactionType: "",
    AccountSubmitCode: 0,
    MatCenter: 0,
    VoucherBillNo: "",
    TransactionDate: "2022-06-13T10:29:16.680Z",
    Dr: 0,
    Cr: 0,
    Narration: "",
    CreateDate: "2022-06-13T10:29:16.680Z",
    UpdateDate: "2022-06-13T10:29:16.680Z",
    UpdateMachineCode: "",
    IDVoucherType: 0,
    IDAccountType: 0,
    StartDate: "2022-06-13T10:29:16.680Z",
    EndDate: "2022-06-13T10:29:16.680Z",
    IDFiscalYear: 0,
    VendorName: "",
    IDVendor: 0,
    Fee: 0,
    Discount: 0,
    PercentageDiscount: 0,
    DiscountAmount: 0,
    IsAccountReceivable: true,
    RegistrationKey: "",
    IDYearFacultyLink: 0,
    IDAcademicYear: 0,
    Level: 0,
    IDMonth: 0,
    IsActive: true,
    Created_On: "2022-06-13T10:29:16.680Z",
    Updated_On: "2022-06-13T10:29:16.680Z",
  },
];

const StudentLedgerReverseEntryForm = ({
  reverseEntry,
  searchFilterModel,
  setOpenReversePopup,
}) => {
  const [active, setActive] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues } = useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    setActive(true);
    dispatch(postReverseEntryAction(values, searchFilterModel));
  };

  useEffect(() => {
    if (reverseEntry) {
      setValues({
        ...reverseEntry[0],
        Narration: `Reverse Entry of ${reverseEntry[0]?.IDTransactionDrCr}`,
      });
    }
  }, [reverseEntry]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SN. </StyledTableCell>
              <StyledTableCell>Dr/Cr </StyledTableCell>
              <StyledTableCell>Account Name </StyledTableCell>
              <StyledTableCell>Dr </StyledTableCell>
              <StyledTableCell>Cr </StyledTableCell>
              <StyledTableCell>Narration</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reverseEntry &&
              reverseEntry
                ?.sort((a, b) => a.RollNo - b.RollNo)
                ?.map((s, i) => (
                  <StyledTableRow key={s.AccountName}>
                    <StyledTableCell component="th" scope="row">
                      {i + 1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.TransactionType}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.AccountName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.Dr}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.Cr}
                    </StyledTableCell>
                    <StyledTableCell>
                      <InputControl
                        name="NarrationForAmountPaid"
                        label="Narration"
                        variant="outlined"
                        value={values.Narration}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
          <TableBody>
            {reverseEntry &&
              reverseEntry
                ?.sort((a, b) => a.RollNo - b.RollNo)
                ?.map((s, i) => (
                  <StyledTableRow
                    key={s.AccountName}
                    style={{ backgroundColor: "lightgrey" }}
                  >
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                    ></StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.Dr}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {s.Cr}
                    </StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
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
          variant="contained"
          color="secondary"
          onClick={() => setOpenReversePopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={active}
          onClick={handleSubmit}
          style={{ margin: "10px 0 0 10px" }}
        >
          {active ? "...PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </>
  );
};

export default StudentLedgerReverseEntryForm;
