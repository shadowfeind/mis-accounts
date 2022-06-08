import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../components/controls/SelectControl";
import DatePickerControl from "../../components/controls/DatePickerControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import {
  postAdmissionFeeStructureAction,
  putAdmissionFeeStructureAction,
} from "./AdmissionFeeStructureActions";

const initialFormValues = {
  IDAccountType: 0,
  IdAccountGroup: 0,
  AccountName: "",
  AccountNameDesc: "",
  Created_On: "2022-05-24T05:02:10.866Z",
  Updated_On: "2022-05-24T05:02:10.866Z",
  IsActive: true,
  IDHRCompany: 0,
  IsCostCenter: true,
  FeeAmount: "",
  IsExtraFee: true,
  IsMonthlyFee: true,
  IsAdmissionFee: true,
};

const AdmissionFeeStructureForm = ({
  createAccount,
  editAccount,
  setOpenPopup,
}) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(false);

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

    temp.AccountNameDesc = !fieldValues.AccountNameDesc
      ? "This feild is required"
      : !fieldValues.AccountNameDesc.trim()
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
      setActiveButton(true);
      if (values.IDAccountType === 0) {
        dispatch(postAdmissionFeeStructureAction(values));
      } else {
        dispatch(putAdmissionFeeStructureAction(values));
      }
    }
  };

  const test = [{ Key: "", Value: "" }];

  const symbolsArr = ["e", "E", "+", "-", ".", "ArrowUp", "ArrowDown"];

  useEffect(() => {
    if (createAccount) {
      setValues({ ...createAccount?.admissionFeeStructureModel });
    }
  }, [createAccount]);

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount?.admissionFeeStructureModel });
    }
  }, [editAccount]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="IdAccountGroup"
            label="IdAccount Group*"
            value={values.IdAccountGroup}
            options={
              createAccount
                ? createAccount?.ddlAccountGroup
                : editAccount
                ? editAccount?.ddlAccountGroup
                : test
            }
            onChange={handleInputChange}
            errors={errors.IdAccountGroup}
          />

          <InputControl
            name="AccountName"
            label="Account Name*"
            value={values.AccountName}
            onChange={handleInputChange}
            errors={errors.AccountName}
          />
          <InputControl
            name="AccountNameDesc"
            label="Account Name Description*"
            value={values.AccountNameDesc}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AccountNameDesc}
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

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
          />
          <div></div>
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
          disabled={activeButton}
          style={{ margin: "10px 0 0 10px" }}
        >
          {activeButton ? "...PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default AdmissionFeeStructureForm;
