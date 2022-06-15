import React, { useState } from "react";
import {
  Button,
  TableRow,
  TableCell,
  makeStyles,
  Box,
  Typography,
  Grid,
  List,
  ListItem,
} from "@material-ui/core";
import VisibilityRoundedIcon from "@material-ui/icons/VisibilityRounded";
import EditIcon from "@material-ui/icons/Edit";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentLedgerTableCollapse = ({
  item,
  ddlClass,
  ddlNpMonth,
  accountName,
  handlePrint,
  handleRecipt,
  updateHandler,
}) => {
  const classes = useStyles();

  const classNameToShow = ddlClass?.filter((s) => s.Key === item.LevelClass);
  const monthNameToShow = ddlNpMonth?.filter((s) => s.Key === item.IDMonth);
  const accountNameShow = accountName?.filter(
    (s) => s.val === item.IDAccountType
  );

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell style={{ width: "15%" }}>
          {item.Cr !== 0 ? (
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={() =>
                handlePrint(
                  item.AccountSubmitCode,
                  item.LevelClass,
                  item.IDAcademicYear,
                  item.RegistrationKey,
                  item.IDMonth
                )
              }
            >
              <VisibilityRoundedIcon style={{ fontSize: 12 }} />
            </Button>
          ) : (
            " "
          )}{" "}
          {item.Dr !== 0 ? (
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              onClick={() =>
                handleRecipt(
                  item.AccountSubmitCode,
                  item.RegistrationKey,

                  item.TransactionDate?.slice(0, 10)
                )
              }
            >
              <ReceiptRoundedIcon style={{ fontSize: 12 }} />
            </Button>
          ) : (
            " "
          )}
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() =>
              updateHandler(
                item.IDTransactionDrCr,
                item.AccountSubmitCode,
                item.LevelClass,
                item.IDAcademicYear,
                item.IDMonth
              )
            }
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
        <TableCell>{item.IDTransactionDrCr}</TableCell>
        <TableCell>{item.VoucherBillNo}</TableCell>
        <TableCell>
          {classNameToShow?.length > 0 && classNameToShow[0]?.Value}
        </TableCell>
        <TableCell width="50%">{item.AccountType}</TableCell>
        <TableCell>
          {monthNameToShow?.length > 0 && monthNameToShow[0]?.Value}
        </TableCell>
        <TableCell>
          {accountNameShow?.length > 0 && accountNameShow[0]?.label}
        </TableCell>

        <TableCell width="30%">{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.Narration}</TableCell>
        <TableCell>{item.Dr}</TableCell>
        <TableCell>{item.Cr}</TableCell>
        <TableCell>{item.Balance}</TableCell>
      </TableRow>
    </>
  );
};

export default StudentLedgerTableCollapse;
