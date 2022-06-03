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
import "./studentDueTable.css";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const StudentDueTableCollapse = ({ item }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.RegistrationKey}</TableCell>
        <TableCell>{item.FullName}</TableCell>
        <TableCell>{item.RemainingDue}</TableCell>
        <TableCell>{item.IsActive}</TableCell>
        {/* <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={() => updateCollegeHandler(item.IDAccountType)}
          >
            PRINT
          </Button>
        </TableCell> */}
      </TableRow>
    </>
  );
};

export default StudentDueTableCollapse;
