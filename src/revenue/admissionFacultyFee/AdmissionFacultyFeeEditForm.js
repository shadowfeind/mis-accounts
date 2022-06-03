import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../components/controls/SelectControl";
import DatePickerControl from "../../components/controls/DatePickerControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";

import { putAdmissionFacultyFeeStructureAction } from "./AdmissionFacultyFeeActions";

const initialFormValues = {
  IDAdmissionFacultyFeeStructure: 0,
  IDAdmissionFeeStructure: 0,
  IDYearFacultyLink: 0,
  FeeAmount: "",
  IDHRCompany: 0,
  IdAccountGroup: 0,
  AccountName: "",
  IDAcademicYear: 0,
  Level: 0,
  IDAccountType: 0,
  IsActive: true,
  Created_On: "2022-05-24T07:30:15.524Z",
  Updated_On: "2022-05-24T07:30:15.524Z",
};

const AdmissionFacultyFeeStructureEditForm = ({
  editAccount,
  setOpenPopup,
}) => {
  const dispatch = useDispatch();

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.IdAccountGroup = !fieldValues.IdAccountGroup
      ? "This feild is required"
      : "";

    temp.AccountName = !fieldValues.AccountName
      ? "This feild is required"
      : !fieldValues.AccountName.trim()
      ? "This feild is required"
      : "";

    temp.FeeAmount = !fieldValues.FeeAmount ? "This feild is required" : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      dispatch(putAdmissionFacultyFeeStructureAction(values));
    }
  };

  const test = [{ Key: "", Value: "" }];

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount?.dbModel });
    }
  }, [editAccount]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            disabled
            name="IdAccountGroup"
            label="IdAccount Group*"
            value={values.IdAccountGroup}
            options={editAccount ? editAccount?.ddlAccountGroup : test}
            onChange={null}
            errors={errors.IdAccountGroup}
          />

          <InputControl
            disabled
            name="AccountName"
            label="Account Name*"
            value={values.AccountName}
            onChange={handleInputChange}
            errors={errors.AccountName}
          />

          <InputControl
            name="FeeAmount"
            label="FeeAmount*"
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            type="number"
            value={values.FeeAmount}
            onChange={handleInputChange}
            errors={errors.FeeAmount}
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingTop: "10px",
          marginTop: "10px",
          borderTop: "1px solid #f3f3f3",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenPopup(false)}
          style={{ margin: "10px 0 0 10px" }}
        >
          CANCEL
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ margin: "10px 0 0 10px" }}
        >
          SUBMIT
        </Button>
      </div>
    </Form>
  );
};

export default AdmissionFacultyFeeStructureEditForm;
