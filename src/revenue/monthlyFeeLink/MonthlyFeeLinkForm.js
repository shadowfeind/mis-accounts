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
  IDAccountType: 0,
  IdAccountGroup: 0,
  AccountName: "",
  AccountNameDesc: "",
  Address: "",
  TelNo: "",
  MobileNo: "",
  Email: "",
  ContactPerson: "",
  PAN: "",
  Created_On: "2022-06-03T10:05:21.481Z",
  Updated_On: "2022-06-03T10:05:21.481Z",
  IsActive: true,
  IDHRCompany: 0,
  IsCostCenter: true,
  FeeAmount: 0,
  IsExtraFee: true,
  IsMonthlyFee: true,
  IsAdmissionFee: true,
};

const MonthlyFeeLinkForm = ({
  setOpenCreatePopup,
  feeStructure,
  searchFilterModel,
}) => {
  const [formCheck, setFormCheck] = useState([]);
  // const [month, setMonths] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = () => {
    let temp = { ...errors };

    temp.submit =
      formCheck?.length === 0 ? "Please Select Atleast One Option" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleAllChecked = (checked) => {
    if (checked) {
      setFormCheck([...feeStructure]);
    } else {
      setFormCheck([]);
    }
  };

  // useEffect(() => {
  //   if (feeStructure) {
  //     setFormCheck([...feeStructure]);
  //   }
  // }, [feeStructure]);

  const inputHandler = (subject, value) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAccountType === subject.IDAccountType
      );
      if (exists) {
        const newSubject = { ...subject, FeeAmount: Number(value) };
        // console.log(newSubject);
        let newArr = [...prev];
        prev.map((data, index) => {
          newArr[index].FeeAmount = Number(value);
        });
        return [...newArr];
      }
      return [...prev];
    });
  };

  const handleChecked = (subject) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAccountType === subject.IDAccountType
      );
      if (exists) {
        let newArr = prev.filter(
          (u) => u.IDAccountType !== subject.IDAccountType
        );
        return [...newArr];
      }
      let newFeeAmount = Number(
        document?.getElementById(`subject_${subject?.IDAccountType}`)?.value
      );
      const newSubject = { ...subject, FeeAmount: newFeeAmount };
      return [...prev, newSubject];
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(postMonthlyFeeLinkAction(formCheck, searchFilterModel));
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
                  name="checkedB"
                  onChange={(e) => handleAllChecked(e.target.checked)}
                  color="primary"
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feeStructure &&
              feeStructure
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
                          formCheck?.filter(
                            (x) => x.IDAccountType === s.IDAccountType
                          ).length > 0
                            ? true
                            : false
                        }
                        name="checkedB"
                        color="primary"
                        onChange={(e) => handleChecked(s)}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {feeStructure?.length <= 0 && (
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
