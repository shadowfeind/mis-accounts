import React, { useEffect } from "react";
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
import { getExtraFeeBillGenerateAction } from "../BillgenerateActions";
import { symbolsArr } from "../../../helpers/excludeSymbol";

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

const ExtraFeeStructure = ({
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
  // const [currentFee, setCurrentFee] = useState(dummyData);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { extraFeeBillGenerate, index } = useSelector(
    (state) => state.getExtraFeeBillGenerate
  );

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

  const test = [];
  const handleExtraChange = (e, i) => {
    if (e.length > 2) {
      dispatch(getExtraFeeBillGenerateAction(e, i));
    }
  };
  const handleOptionChange = (inputObj, index, event, reason) => {
    // console.log("reason", reason);

    if (reason == "clear") {
      let newObject = {
        AccountName: "",
        FeeAmount: 0,
        IDAccountType: 0,
        Discount: "",
        PercentageDiscount: "",
        DiscountAmount: "",
        Narration: "",
        fee: "",
        Dr: "",
        Cr: "",
        RegistrationKey: "",
        IDYearFacultyLink: "",
        VoucherBillNo: "",
        IDAcademicYear: "",
        Level: "",
        IDFiscalYear: "",
        IDMonth: "",
        TransactionDate: "",
        IsAccountReceivable: false,
        IsActive: true,
        Created_On: "",
        Updated_On: "",
        MatCenter: 1,
        checked: false,
        active: false,
      };

      setCurrentFee((prev) => {
        const newArr = [...prev];
        newArr[index] = newObject;
        return newArr;
      });
    } else {
      let newObject = {
        AccountName: inputObj.label,
        FeeAmount: inputObj.amount,
        IDAccountType: inputObj.val,
        Discount: null,
        PercentageDiscount: null,
        DiscountAmount: null,
        Narration: null,
        fee: inputObj.amount,
        Dr: inputObj.amount,
        Cr: inputObj.amount,
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
        active: true,
      };
      setCurrentFee((prev) => {
        const newArr = [...prev];
        newArr[index] = newObject;
        return newArr;
      });
    }
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
                          extraFeeBillGenerate ? extraFeeBillGenerate : test
                        }
                        getOptionLabel={(option) => option.label}
                        style={{ width: 400 }}
                        onChange={(event, newInputValue, reason) =>
                          handleOptionChange(newInputValue, i, event, reason)
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
                        disabled={s.active ? false : true}
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
                  {currentFee
                    ?.filter((x) => x.active === true)
                    ?.reduce((acc, item) => {
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
