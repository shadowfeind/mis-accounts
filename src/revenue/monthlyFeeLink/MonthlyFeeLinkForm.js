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
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { postMonthlyFeeLinkAction } from "./MonthlyFeeLinkActions";

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

const initialFormValues = {
  IDAdmissionFacultyFeeStructure: 0,
  IDAdmissionFeeStructure: 0,
  IDYearFacultyLink: 0,
  FeeAmount: 0,
  IDHRCompany: 0,
  IdAccountGroup: 0,
  AccountName: "",
  IDAcademicYear: 0,
  Level: 0,
  IDAccountType: 0,
  IsActive: true,
  Created_On: "2022-06-03T04:41:16.636Z",
  Updated_On: "2022-06-03T04:41:16.636Z",
};

const MonthlyFeeLinkForm = ({
  setOpenCreatePopup,
  feeStructure,
  accountName,
}) => {
  const [checked, setChecked] = useState(false);
  const [month, setMonths] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = () => {
    let temp = { ...errors };

    temp.month = month?.length === 0 ? "Please Select Atleast One Option" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setMonths([...feeStructure]);
    } else {
      setMonths([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setMonths((prev) => {
        let newCheckList = prev.filter(
          (x) => x.IDAccountType !== obj.IDAccountType
        );
        return [...newCheckList];
      });
    } else {
      setMonths((prev) => [...prev, obj]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(postMonthlyFeeLinkAction(values, month));
    }
  };

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            {errors.month && (
              <span style={{ color: "red" }}>{errors.month}</span>
            )}
            <TableRow>
              <StyledTableCell>Header </StyledTableCell>

              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell style={{ textAlign: "right" }}>
                <label>All</label>
                <Checkbox
                  checked={checked}
                  onChange={(e) => handleAllChecked(e.target.checked)}
                  color="primary"
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountName &&
              accountName
                ?.sort((a, b) => a.RollNo - b.RollNo)
                ?.map((s) => (
                  <StyledTableRow key={s.AccountName}>
                    <StyledTableCell component="th" scope="row">
                      {s.AccountName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <TextField
                        defaultValue={s.FeeAmount}
                        type="number"
                        onWheelCapture={(e) => {
                          e.target.blur();
                        }}
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "center" },
                          },
                        }}
                        variant="outlined"
                        onChange={(e) => inputHandler(s, e.target.value)}
                        inputProps={{ tabIndex: "1" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      style={{ textAlign: "right" }}
                    >
                      <Checkbox
                        checked={
                          month.filter(
                            (x) => x.IDAccountType === s.IDAccountType
                          ).length > 0
                            ? true
                            : false
                        }
                        color="primary"
                        onChange={(e) => handleChecked(e.target.checked, s)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {accountName?.length <= 0 && (
        <div>
          <h3 style={{ color: "red", textAlign: "center" }}>No Data</h3>
        </div>
      )}
      {errors.submit && (
        <div
          style={{
            textAlign: "center",
            color: "red",
            fontSize: "12px",
            paddingTop: "8px",
          }}
        >
          {errors.submit}
        </div>
      )}
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
          onClick={() => setOpenCreatePopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
          onClick={handleSubmit}
        >
          SUBMIT
        </Button>
      </div>
    </>
  );
};

export default MonthlyFeeLinkForm;
