import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import SelectControl from "../../components/controls/SelectControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import {
  postAccountTypeAction,
  putAccountTypeAction,
} from "./AccountTypeActions";

const initialFormValues = {
  IDAccountType: 0,
  IdAccountGroup: 0,
  AccountName: "",
  AccountNameDesc: "",
  Created_On: "2022-05-20T04:25:31.423Z",
  Updated_On: "2022-05-20T04:25:31.423Z",
  IsActive: true,
  IDHRCompany: 0,
  IsCostCenter: true,
  AccountGroupName: "",
  FeeAmount: 0,
  IsExtraFee: true,
  IsMonthlyFee: true,
  IsAdmissionFee: true,
};

const AccountTypeForm = ({ createAccount, editAccount, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.IdAccountGroup = !fieldValues.IdAccountGroup
      ? "This field is required"
      : "";

    temp.AccountName = !fieldValues.AccountName
      ? "This field is required"
      : fieldValues.AccountName?.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.AccountName.trim()
      ? "This field is required"
      : "";

    temp.AccountNameDesc = !fieldValues.AccountNameDesc
      ? "This field is required"
      : !fieldValues.AccountNameDesc?.trim()
      ? "This field is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (values.IDAccountType === 0) {
        dispatch(postAccountTypeAction(values));
      } else {
        dispatch(putAccountTypeAction(values));
      }
    }
  };

  const test = [{ Key: "", Value: "" }];

  useEffect(() => {
    if (createAccount) {
      setValues({ ...createAccount.accountTypeModel });
    }
  }, [createAccount]);

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount.accountTypeModel });
    }
  }, [editAccount]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="IdAccountGroup"
            label="Account GroupName"
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
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AccountName}
          />

          <CheckBoxControl
            name="IsActive"
            label="IsActive"
            value={values.IsActive}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.IsActive}
          />
          <div></div>
        </Grid>
        <Grid item xs={6}>
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

          <SelectControl
            name="IsCostCenter"
            label="IsCostCenter"
            value={values.IsCostCenter}
            options={
              createAccount
                ? createAccount?.ddlCostCenter
                : editAccount
                ? editAccount?.ddlCostCenter
                : test
            }
            onChange={handleInputChange}
            errors={errors.IsCostCenter}
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

export default AccountTypeForm;
