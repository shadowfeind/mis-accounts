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

const StudentLedgerTableCollapse = ({
  item,
  ddlClass,
  ddlNpMonth,
  accountName,
  handlePrint,
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
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => handlePrint(item.IDAdmissionRegistration)}
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
