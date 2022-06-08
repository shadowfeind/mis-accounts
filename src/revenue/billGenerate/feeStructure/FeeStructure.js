import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Checkbox,
  TextField,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useDispatch } from "react-redux";

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

const FeeStructure = ({
  admissionFee,
  regKey,
  idFacLink,
  voucherBill,
  idAcaYear,
  level,
  fiscalYear,
  month,
  date,
  currentFee,
  setCurrentFee,
}) => {
  // const [currentFee, setCurrentFee] = useState([]);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (index, fee, value, name, amount) => {
    if (name === "Discount") {
      if (value <= amount) {
        let newObject;

        newObject = { ...fee, [name]: value, Cr: fee.FeeAmount - value };

        setCurrentFee((prev) => {
          const newArr = [...prev];
          newArr[index] = newObject;
          return newArr;
        });
      } else {
        alert(`discount must be equal to or less than ${amount}`);
      }
    } else {
      let newObject;
      newObject = { ...fee, [name]: value };
      setCurrentFee((prev) => {
        const newArr = [...prev];
        newArr[index] = newObject;
        return newArr;
      });
    }
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

  useEffect(() => {
    if (admissionFee) {
      let feeContainer = [];
      admissionFee.forEach((fee) => {
        feeContainer.push({
          ...fee,
          Discount: null,
          PercentageDiscount: null,
          DiscountAmount: null,
          Narration: null,
          fee: fee.FeeAmount,
          Dr: fee.FeeAmount,
          Cr: fee.FeeAmount,
          RegistrationKey: regKey,
          IDYearFacultyLink: idFacLink,
          VoucherBillNo: voucherBill,
          IDAcademicYear: idAcaYear,
          Level: level,
          IDFiscalYear: fiscalYear,
          IDMonth: month,
          TransactionDate: date,
          IsAccountReceivable: false,
          IsActive: true,
          Created_On: date,
          Updated_On: date,
          MatCenter: 1,
          checked: false,
        });
      });
      setCurrentFee([...feeContainer]);
    }
  }, [admissionFee, date]);

  const symbolsArr = ["e", "E", "+", "-", "ArrowUp", "ArrowDown"];

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
              </TableRow>
            </TableHead>
            <TableBody>
              {currentFee?.map((s, i) => {
                return (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{i + 1}</StyledTableCell>
                    <StyledTableCell>{s.AccountName}</StyledTableCell>
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
                          handleChange(
                            i,
                            s,
                            e.target.value,
                            e.target.name,
                            s.FeeAmount
                          )
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

export default FeeStructure;
