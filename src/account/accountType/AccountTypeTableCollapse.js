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
import DeleteIcon from "@material-ui/icons/Delete";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles({
  button: {
    marginRight: "1px",
    padding: "5px",
    minWidth: "10px",
    fontSize: "12px",
  },
});

const AccountTypeTableCollapse = ({ item, updateCollegeHandler }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.AccountName}</TableCell>
        <TableCell>{item.AccountGroupName}</TableCell>
        <TableCell>{item.IsCostCenter ? "True" : "False"}</TableCell>
        <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDAccountType)}
          >
            <EditIcon style={{ fontSize: 12 }} />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            // onClick={() => deleteCollegeHandler(item.IDHRCompany)}
          >
            <DeleteIcon style={{ fontSize: 12 }} />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AccountTypeTableCollapse;
