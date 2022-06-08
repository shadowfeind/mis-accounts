import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import getPrintSchoolDueAction from "./StudentDueActions";

const StudentDuePrint = ({ startDate, endDate, idFiscalYear }) => {
  // const dispatch = useDispatch();
  // const { printStudentDue } = useSelector((state) => state.getPrintStudentDue);

  // useEffect(() => {
  //   if (!printStudentDue) {
  //     dispatch(getPrintSchoolDueAction(startDate, endDate, idFiscalYear));
  //   }
  // }, [printStudentDue]);
  return <div>StudentDuePrint</div>;
};

export default StudentDuePrint;
