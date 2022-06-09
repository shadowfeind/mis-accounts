import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import { postFiscalYearAction, putFiscalYearAction } from "./FiscalYearActions";
import { symbolsArr } from "../../helpers/excludeSymbol";

const initialFormValues = {
  IDFiscalYear: 0,
  FiscalYearName: "",
  FiscalYearTaxRate: 0,
  StartDate: "2022-05-23T04:59:49.191Z",
  EndDate: "2022-05-23T04:59:49.191Z",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-05-23T04:59:49.192Z",
  Updated_On: "2022-05-23T04:59:49.192Z",
};

const FiscalYearForm = ({ createAccount, editAccount, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.FiscalYearName = !fieldValues.FiscalYearName
      ? "This feild is required"
      : fieldValues.FiscalYearName.length > 20
      ? "Must be less than 20 characters"
      : !fieldValues.FiscalYearName.trim()
      ? "This feild is required"
      : "";

    temp.FiscalYearTaxRate = !fieldValues.FiscalYearTaxRate
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
      if (values.IDFiscalYear === 0) {
        dispatch(postFiscalYearAction(values));
      } else {
        dispatch(putFiscalYearAction(values));
      }
    }
  };

  useEffect(() => {
    if (createAccount) {
      setValues({ ...createAccount?.fiscalYearModel });
    }
  }, [createAccount]);

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount?.fiscalYearModel });
    }
  }, [editAccount]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={6}>
          <InputControl
            name="FiscalYearName"
            label="FiscalYear Name*"
            value={values.FiscalYearName}
            onChange={handleInputChange}
            errors={errors.FiscalYearName}
          />
          <InputControl
            name="FiscalYearTaxRate"
            label="Tax Rate*"
            value={values.FiscalYearTaxRate}
            onFocus={(e) => {
              e.target.select();
            }}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) => symbolsArr.includes(e.key) && e.preventDefault()}
            type="number"
            onChange={handleInputChange}
            errors={errors.FiscalYearTaxRate}
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
          <DatePickerControl
            name="StartDate"
            label="From Date*"
            value={values.StartDate}
            onChange={handleInputChange}
            errors={errors.StartDate}
          />
          <DatePickerControl
            name="EndDate"
            label="To Date*"
            value={values.EndDate}
            onChange={handleInputChange}
            errors={errors.EndDate}
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

export default FiscalYearForm;
