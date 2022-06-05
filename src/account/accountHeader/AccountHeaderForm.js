import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import {
  postAccountHeaderAction,
  putAccountHeaderAction,
} from "./AccountHeaderActions";

const initialFormValues = {
  IdAccountHeader: 0,
  AccountHeaderName: "",
  AccountHeadDesc: "",
  IDHRCompany: 0,
  ddlIsActive: [
    {
      Key: {},
      Value: {},
    },
  ],
  IsActive: true,
  Created_On: "2022-05-19T04:36:03.927Z",
  Updated_On: "2022-05-19T04:36:03.927Z",
};

const AccountHeaderForm = ({ createAccount, editAccount, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };

    temp.AccountHeaderName = !fieldValues.AccountHeaderName
      ? "This feild is required"
      : fieldValues.AccountHeaderName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.AccountHeaderName.trim()
      ? "This feild is required"
      : "";

    temp.AccountHeadDesc = !fieldValues.AccountHeadDesc
      ? "This feild is required"
      : !fieldValues.AccountHeadDesc.trim()
      ? "This feild is required"
      : "";

    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, handleInputChange, errors, setErrors } =
    useForm(initialFormValues);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setActiveButton(true);
      if (values.IdAccountHeader === 0) {
        dispatch(postAccountHeaderAction(values));
      } else {
        dispatch(putAccountHeaderAction(values));
      }
    }
  };

  useEffect(() => {
    if (createAccount) {
      setValues({ ...createAccount });
    }
  }, [createAccount]);

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount });
    }
  }, [editAccount]);
  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="AccountHeaderName"
            label="Account Header Name*"
            value={values.AccountHeaderName}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AccountHeaderName}
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
            name="AccountHeadDesc"
            label="Account Head Description*"
            value={values.AccountHeadDesc}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.AccountHeadDesc}
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
          disabled={activeButton}
          style={{ margin: "10px 0 0 10px" }}
        >
          {activeButton ? "...PROCESSING" : "SUBMIT"}
        </Button>
      </div>
    </Form>
  );
};

export default AccountHeaderForm;
