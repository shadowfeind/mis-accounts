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
  setOpenPopup,
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
