import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const FeeCollectionTableCollapse = ({ item }) => {
  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.RollNo}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.ClassName}</TableCell>
        <TableCell>{item.RegistrationKey}</TableCell>
        <TableCell>{item.AcademicYear}</TableCell>
        <TableCell>{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{item.Dr?.toFixed(2)}</TableCell>
      </TableRow>
    </>
  );
};

export default FeeCollectionTableCollapse;
