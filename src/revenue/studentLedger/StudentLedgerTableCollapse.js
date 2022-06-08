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
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentLedgerTableCollapse = ({ item }) => {
  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.IDTransactionDrCr}</TableCell>
        <TableCell>{item.VoucherBillNo}</TableCell>
        <TableCell>{item.LevelClass}</TableCell>
        <TableCell width="50%">{item.AccountType}</TableCell>
        <TableCell>{item.IDMonth}</TableCell>
        <TableCell>{item.IDAccountType}</TableCell>
        <TableCell>{item.IDAccountType}</TableCell>
        <TableCell width="30%">{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.Narration}</TableCell>
        <TableCell>{item.Dr}</TableCell>
        <TableCell>{item.Cr}</TableCell>
        <TableCell>{item.Balance}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={() =>
            //   updateCollegeHandler(item.IDAdmissionFacultyFeeStructure)
            // }
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default StudentLedgerTableCollapse;
