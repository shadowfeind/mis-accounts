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
  Grid,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import Paper from "@material-ui/core/Paper";
import { postAdmissionFacultyFeeStructureAction } from "./AdmissionFacultyFeeActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#253053",
    color: theme.palette.common.white,
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
    minWidth: 200,
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
  Created_On: "2022-06-02T04:58:02.890Z",
  Updated_On: "2022-06-02T04:58:02.890Z",
};

const AdmissionFacultyFeeForm = ({
  feeStructure,
  accountName,
  setOpenCreatePopup,
}) => {
  const [checked, setChecked] = useState(false);
  const [selectedStructure, setSelectedStructure] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const validate = () => {
    let temp = { ...errors };

    temp.selectedStructure =
      selectedStructure?.length === 0 ? "Please Select Atleast One Option" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setSelectedStructure([...feeStructure]);
    } else {
      setSelectedStructure([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setSelectedStructure((prev) => {
        let newCheckList = prev.filter(
          (x) => x.IDAccountType !== obj.IDAccountType
        );
        return [...newCheckList];
      });
    } else {
      setSelectedStructure((prev) => [...prev, obj]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(
        postAdmissionFacultyFeeStructureAction(
          values,
          selectedStructure,
          feeStructure
        )
      );
    }
  };

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            {errors.selectedStructure && (
              <span style={{ color: "red" }}>{errors.selectedStructure}</span>
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
                          selectedStructure.filter(
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

export default AdmissionFacultyFeeForm;
