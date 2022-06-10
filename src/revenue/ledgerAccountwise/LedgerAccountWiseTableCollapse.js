import React, { useEffect, useState } from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { axiosInstance, tokenConfig } from "../../constants";

const LedgerAccountWiseTableCollapse = ({ item, i }) => {
  const [studentName, setStudentName] = useState("");
  useEffect(() => {
    if (i !== 0) {
      const fetchData = async () => {
        try {
          const { data } = await axiosInstance.get(
            `/api/LedgerAccountWise/GetStudentName?registrationKey=${item.RegistrationKey}`,
            tokenConfig()
          );
          setStudentName(data.FullName);
        } catch (error) {
          console.log(error);
          setStudentName("");
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      <TableRow key={item.$id}>
        <TableCell>{i + 1}</TableCell>
        <TableCell>{item.TransactionDate?.slice(0, 10)}</TableCell>
        <TableCell>{studentName}</TableCell>
        <TableCell>
          {/* {item.IDAccountType &&
            apiCallerForLedger(
              `/api/LedgerAccountWise/GetAccountTypeJsonList?searchkey=${item.IDAccountType}`
            )} */}
        </TableCell>
        <TableCell>{item.VoucherBillNo}</TableCell>
        <TableCell>{item.AccountType}</TableCell>
        <TableCell>{item.TransactionType}</TableCell>
        <TableCell>{item.Dr?.toFixed(2)}</TableCell>
        <TableCell>{item.Cr?.toFixed(2)}</TableCell>
        <TableCell>
          {item.Balance && Math.abs(item.Balance)?.toFixed(2)}
        </TableCell>
      </TableRow>
    </>
  );
};

export default LedgerAccountWiseTableCollapse;
