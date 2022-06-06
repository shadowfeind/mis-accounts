import React from "react";
import { TableRow, TableCell } from "@material-ui/core";

const StudentDueTableCollapse = ({ item, index }) => {
  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{item.RegistrationKey}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.RemainingDue?.toFixed(2)}</TableCell>
      </TableRow>
    </>
  );
};

export default StudentDueTableCollapse;
