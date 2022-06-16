import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#4f81bd",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const StudentList = ({ student, studentSelected, setStudentSelected }) => {
  const [checked, setChecked] = useState(true);
  const classes = useStyles();

  const handleAllChecked = (checked) => {
    setChecked(checked);
    if (checked) {
      setStudentSelected([...student]);
    } else {
      setStudentSelected([]);
    }
  };

  const handleChecked = (checked, obj) => {
    if (!checked) {
      setStudentSelected((prev) => {
        let newCheckList = prev.filter(
          (x) => x.IDHREmployee !== obj.IDHREmployee
        );
        return [...newCheckList];
      });
    } else {
      setStudentSelected((prev) => [...prev, obj]);
    }
  };

  useEffect(() => {
    if (student) {
      setStudentSelected([...student]);
    }
  }, [student]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell width="8%">Roll No.</StyledTableCell>
              <StyledTableCell width="2%">Reg.</StyledTableCell>
              <StyledTableCell width="30%">Student Name</StyledTableCell>
              <StyledTableCell width="25%">Email</StyledTableCell>
              <StyledTableCell width="20%">Contact No.</StyledTableCell>
              <StyledTableCell width="15%">status</StyledTableCell>
              <StyledTableCell width="3%">
                All{" "}
                <Checkbox
                  checked={checked}
                  color="primary"
                  onChange={(e) => handleAllChecked(e.target.checked)}
                />
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {student?.map((s, i) => {
              return (
                <StyledTableRow key={i}>
                  <StyledTableCell>{s.RollNo}</StyledTableCell>
                  <StyledTableCell>{s.RegistrationKey}</StyledTableCell>
                  <StyledTableCell>{s.StudentName}</StyledTableCell>
                  <StyledTableCell>{s.Email}</StyledTableCell>
                  <StyledTableCell>{s.MobileNo}</StyledTableCell>
                  <StyledTableCell>{s.LevelStatus}</StyledTableCell>
                  <StyledTableCell>
                    {" "}
                    <Checkbox
                      checked={
                        studentSelected.filter(
                          (x) => x.IDHREmployee === s.IDHREmployee
                        ).length > 0
                          ? true
                          : false
                      }
                      color="primary"
                      onChange={(e) => handleChecked(e.target.checked, s)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default StudentList;
