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

const VendorTableCollapse = ({ item, updateCollegeHandler }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{item.VendorName}</TableCell>
        <TableCell>{item.VendorSummary}</TableCell>
        <TableCell>{item.ContactMobileNo}</TableCell>
        <TableCell>{item.ContactEmailID}</TableCell>
        <TableCell>{item.IsActive ? "Active" : "InActive"}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => updateCollegeHandler(item.IDVendor)}
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
                      <strong>Vendor Name</strong>: {item.VendorName}
                    </ListItem>
                    <ListItem>
                      <strong>Address</strong>: {item.Address}
                    </ListItem>
                    <ListItem>
                      <strong>Contact Person</strong>: {item.ContactPerson}
                    </ListItem>
                    <ListItem>
                      <strong>Phone Number(office)</strong>:{" "}
                      {item.ContactNumber}
                    </ListItem>
                    <ListItem>
                      <strong>Contact Mobile No.</strong>:{" "}
                      {item.ContactMobileNo}
                    </ListItem>
                    <ListItem>
                      <strong>Email Address</strong>: {item.ContactEmailID}
                    </ListItem>
                    <ListItem>
                      <strong>Office Number</strong>: {item.OfficeNumber}
                    </ListItem>
                    <ListItem>
                      <strong>Office Fax</strong>: {item.OfficeFax}
                    </ListItem>
                    <ListItem>
                      <strong>Vendor Summary</strong>: {item.VendorSummary}
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

export default VendorTableCollapse;
