import React, { useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import SelectControl from "../../components/controls/SelectControl";
import { useDispatch } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import {
  postAccountGroupAction,
  putAccountGroupAction,
} from "./AccountGroupActions";

const initialFormValues = {
  IDAccountGroup: 0,
  IdAccountHeader: 0,
  AccountGroupName: "",
  AccountGroupNameDesc: "",
  IDHRCompany: 0,
  AccountHeaderName: "",
  IsActive: true,
  Created_On: "2022-05-20T04:25:31.327Z",
  Updated_On: "2022-05-20T04:25:31.327Z",
};

const AccountGroupForm = ({ createAccount, editAccount, setOpenPopup }) => {
  const dispatch = useDispatch();
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.IdAccountHeader = !fieldValues.IdAccountHeader
      ? "This field is required"
      : "";

    temp.AccountGroupName = !fieldValues.AccountGroupName
      ? "This field is required"
      : fieldValues.AccountGroupName?.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.AccountGroupName.trim()
      ? "This field is required"
      : "";

    temp.AccountGroupNameDesc = !fieldValues.AccountGroupNameDesc
      ? "This field is required"
      : !fieldValues.AccountGroupNameDesc?.trim()
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
      if (values.IDAccountGroup === 0) {
        dispatch(postAccountGroupAction(values));
      } else {
        dispatch(putAccountGroupAction(values));
      }
    }
  };

  const test = [{ Key: "", Value: "" }];

  useEffect(() => {
    if (createAccount) {
      setValues({ ...createAccount.accountGroupModel });
    }
  }, [createAccount]);

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount.accountGroupModel });
    }
  }, [editAccount]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <SelectControl
            name="IdAccountHeader"
            label="Account HeaderName"
            value={values.IdAccountHeader}
            options={
              createAccount
                ? createAccount?.ddlAccountHeader
                : editAccount
                ? editAccount?.ddlAccountHeader
                : test
            }
            onChange={handleInputChange}
            errors={errors.IdAccountHeader}
          />
          <InputControl
            name="AccountGroupName"
            label="Account GroupName*"
            value={values.AccountGroupName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AccountGroupName}
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
            name="AccountGroupNameDesc"
            label="Account GroupName Description*"
            value={values.AccountGroupNameDesc}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AccountGroupNameDesc}
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
export default AccountGroupForm;
