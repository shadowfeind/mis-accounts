import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TextField,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch, useSelector } from "react-redux";
import { dummyData } from "./Dummy";
import { Autocomplete } from "@material-ui/lab";
import { getExtraFeeAdmitStudentAction } from "../AdmitStudentActions";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
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
    minWidth: 700,
  },
});

const ExtraFeeStructure = ({ currentFee, setCurrentFee }) => {
  // const [currentFee, setCurrentFee] = useState(dummyData);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { extraFeeStudentAdmit, index } = useSelector(
    (state) => state.getExtraFeeAdmitStudent
  );

  const handleChange = (index, fee, value, name) => {
    let newObject;
    if (name === "Discount") {
      newObject = { ...fee, [name]: value, Cr: fee.FeeAmount - value };
    } else {
      newObject = { ...fee, [name]: value };
    }
    setCurrentFee((prev) => {
      const newArr = [...prev];
      newArr[index] = newObject;
      return newArr;
    });
  };

  const handleCheck = (index, fee, e) => {
    let newObject;
    if (e.target.checked) {
      if (!fee.Discount) {
        alert("Please enter discount");
        return;
      } else {
        newObject = {
          ...fee,
          DiscountAmount: fee.FeeAmount * (fee.Discount / 100),
          PercentageDiscount: fee.Discount,
          Cr: fee.FeeAmount - fee.FeeAmount * (fee.Discount / 100),
          checked: true,
        };
      }
    } else {
      newObject = {
        ...fee,
        Cr: fee.FeeAmount - fee.Discount,
        DiscountAmount: "",
        PercentageDiscount: "",
        checked: false,
      };
    }
    setCurrentFee((prev) => {
      const newArr = [...prev];
      newArr[index] = newObject;
      return newArr;
    });
  };

  const handleActive = (index, fee, e) => {
    let newObject;
    if (e.target.checked) {
      newObject = {
        ...fee,
        active: true,
      };
    } else {
      newObject = {
        ...fee,
        active: false,
      };
    }

    setCurrentFee((prev) => {
      const newArr = [...prev];
      newArr[index] = newObject;
      return newArr;
    });
  };

  const symbolsArr = ["e", "E", "+", "-", "ArrowUp", "ArrowDown"];
  const test = [];
  const handleExtraChange = (e, i) => {
    if (e.length > 2) {
      dispatch(getExtraFeeAdmitStudentAction(e, i));
    }
  };
  const handleOptionChange = (inputObj, index) => {
    let newObject = {
      AccountName: inputObj.label,
      Cr: inputObj.amount,
      Discount: null,
      DiscountAmount: null,
      FeeAmount: inputObj.amount,
      IDAccountType: inputObj.val,
      Narration: null,
      PercentageDiscount: null,
      checked: false,
    };

    setCurrentFee((prev) => {
      const newArr = [...prev];
      newArr[index] = newObject;
      return newArr;
    });
  };

  useEffect(() => {
    setCurrentFee(dummyData);
  }, [dummyData]);

  return (
    <>
      {currentFee && (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell width="3%">SN.</StyledTableCell>
                <StyledTableCell width="22%">Fee Heading</StyledTableCell>
                <StyledTableCell width="10%">Fee</StyledTableCell>
                <StyledTableCell width="10%">Discount</StyledTableCell>
                <StyledTableCell width="10%">%</StyledTableCell>
                <StyledTableCell width="10%">Discount Amount</StyledTableCell>
                <StyledTableCell width="10%">Amount</StyledTableCell>
                <StyledTableCell width="25%">Narration</StyledTableCell>
                <StyledTableCell width="3%"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentFee?.map((s, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{i + 1}</StyledTableCell>
                    <StyledTableCell>
                      <Autocomplete
                        options={
                          extraFeeStudentAdmit ? extraFeeStudentAdmit : test
                        }
                        getOptionLabel={(option) => option.label}
                        style={{ width: 400 }}
                        onChange={(event, newInputValue) =>
                          handleOptionChange(newInputValue, i)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Eg: extra fee"
                            onChange={(e) =>
                              handleExtraChange(e.target.value, i)
                            }
                            variant="outlined"
                          />
                        )}
                      />
                    </StyledTableCell>
                    <StyledTableCell>{s.FeeAmount}</StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <TextField
                        value={s.Discount}
                        variant="outlined"
                        name="Discount"
                        type="number"
                        onWheelCapture={(e) => {
                          e.target.blur();
                        }}
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                        onChange={(e) =>
                          handleChange(i, s, e.target.value, e.target.name)
                        }
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Checkbox
                        checked={s.checked}
                        color="primary"
                        onChange={(e) => handleCheck(i, s, e)}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <TextField
                        disabled
                        value={s.DiscountAmount}
                        variant="outlined"
                        name="DiscountAmount"
                      />
                    </StyledTableCell>
                    <StyledTableCell>{s.Cr}</StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      <TextField
                        value={s.Narration}
                        variant="outlined"
                        name="Narration"
                        onChange={(e) =>
                          handleChange(i, s, e.target.value, e.target.name)
                        }
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              <StyledTableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  <strong>Total</strong>
                </StyledTableCell>
                <StyledTableCell>
                  {currentFee?.reduce((acc, item) => {
                    return acc + Number(item.FeeAmount);
                  }, 0)}
                </StyledTableCell>
                <StyledTableCell>
                  {currentFee?.reduce((acc, item) => {
                    return acc + Number(item.Discount);
                  }, 0)}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell>
                  {currentFee?.reduce((acc, item) => {
                    return acc + Number(item.DiscountAmount);
                  }, 0)}
                </StyledTableCell>
                <StyledTableCell>
                  {currentFee?.reduce((acc, item) => {
                    return acc + Number(item.Cr);
                  }, 0)}
                </StyledTableCell>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <button onClick={() => console.log(currentFee)}>Test</button> */}
    </>
  );
};

export default ExtraFeeStructure;
