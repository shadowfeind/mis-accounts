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

const AdmissionFacultyFeeStructureTableCollapse = ({
  item,
  updateCollegeHandler,
}) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.AccountName}</TableCell>
        <TableCell>{item.FeeAmount}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() =>
              updateCollegeHandler(item.IDAdmissionFacultyFeeStructure)
            }
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
          <Button
            variant="contained"
            onClick={() => setOpen(!open)}
            className={classes.button}
          >
            {" "}
            {open ? (
              <KeyboardArrowUpIcon style={{ fontSize: 12 }} />
            ) : (
              <KeyboardArrowDownIcon style={{ fontSize: 12 }} />
            )}
          </Button>
        </TableCell>
      </TableRow>
      <TableRow key={item.$id * 0.001}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="p" gutterBottom component="div">
                <h3>Details:</h3>
              </Typography>
              <Grid container>
                <Grid item md={6}>
                  <List key={item.$id * 0.002}>
                    <ListItem>
                      <strong>Account Name</strong>: {item.AccountName}
                    </ListItem>
                    <ListItem>
                      <strong>Fee Amount</strong>: {item.FeeAmount}
                    </ListItem>
                    <ListItem>
                      <strong>IsActive</strong>:{" "}
                      {item.IsActive ? "Active" : "InActive"}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default AdmissionFacultyFeeStructureTableCollapse;
