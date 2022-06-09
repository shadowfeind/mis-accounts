import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const LedgerAccountWiseTableCollapse = ({ item }) => {
  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item + 1}</TableCell>
        <TableCell>{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.AccountName}</TableCell>
        <TableCell>{item.VoucherBillNo}</TableCell>
        <TableCell>{item.AccountType}</TableCell>
        <TableCell>{item.TransactionType}</TableCell>
        <TableCell>{item.Dr?.toFixed(2)}</TableCell>
        <TableCell>{item.Cr?.toFixed(2)}</TableCell>
        <TableCell>{item.Balance?.toFixed(2)}</TableCell>
      </TableRow>
    </>
  );
};

export default LedgerAccountWiseTableCollapse;
