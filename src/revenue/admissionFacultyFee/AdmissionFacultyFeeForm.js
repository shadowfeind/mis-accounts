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
  Created_On: "2022-06-03T10:58:36.379Z",
  Updated_On: "2022-06-03T10:58:36.379Z",
  IsActive: true,
  IDHRCompany: 0,
  IsCostCenter: true,
  FeeAmount: 0,
  IsExtraFee: true,
  IsMonthlyFee: true,
  IsAdmissionFee: true,
};

const AdmissionFacultyFeeForm = ({
  feeStructure,
  searchFilterModel,
  setOpenCreatePopup,
}) => {
  const [formCheck, setFormCheck] = useState([]);
  const [activeButton, setActiveButton] = useState(false);
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

  const inputHandler = (subject, value, index) => {
    setFormCheck((prev) => {
      const exists = prev.find(
        (u) => u.IDAccountType === subject.IDAccountType
      );
      if (exists) {
        let newObject = { ...subject, FeeAmount: Number(value) };
        let newArr = [...prev];

        newArr[index] = newObject;
        return newArr;
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
      setActiveButton(true);
      dispatch(
        postAdmissionFacultyFeeStructureAction(formCheck, searchFilterModel)
      );
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
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
                          id={`subject_${s?.IDAccountType}`}
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
            <h3 style={{ color: "red", textAlign: "center" }}>No Data Found</h3>
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
            disabled={activeButton}
            style={{ margin: "10px 0 0 10px" }}
          >
            {activeButton ? "...PROCESSING" : "SUBMIT"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AdmissionFacultyFeeForm;
