import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import InputControl from "../../components/controls/InputControl";
import { useForm, Form } from "../../customHooks/useForm";
import { useDispatch } from "react-redux";
import DatePickerControl from "../../components/controls/DatePickerControl";
import CheckBoxControl from "../../components/controls/CheckBoxControl";
import { postVendorAction, putVendorAction } from "./VendorActions";
import { symbolsArrPhone } from "../../helpers/excludeSymbol";

const initialFormValues = {
  IDVendor: 0,
  VendorName: "",
  Address: "",
  ContactPerson: "",
  ContactNumber: "",
  ContactMobileNo: "",
  ContactEmailID: "",
  OfficeNumber: "",
  OfficeFax: "",
  VendorSummary: "",
  IDHRCompany: 0,
  IsActive: true,
  Created_On: "2022-05-23T04:59:52.081Z",
  Updated_On: "2022-05-23T04:59:52.081Z",
};

const VendorForm = ({ createAccount, editAccount, setOpenPopup }) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(false);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    temp.VendorName = !fieldValues.VendorName
      ? "This feild is required"
      : !fieldValues.VendorName.trim()
      ? "This feild is required"
      : "";

    temp.VendorSummary = !fieldValues.VendorSummary
      ? "This feild is required"
      : !fieldValues.VendorSummary.trim()
      ? "This feild is required"
      : "";

    temp.Address = !fieldValues.Address
      ? "This feild is required"
      : !fieldValues.Address.trim()
      ? "This feild is required"
      : "";

    temp.ContactPerson = !fieldValues.ContactPerson
      ? "This feild is required"
      : "";
    temp.ContactNumber = !fieldValues.ContactNumber
      ? "This feild is required"
      : fieldValues.ContactNumber && fieldValues.ContactNumber?.length > 10
      ? "Must be less or equal to 10"
      : fieldValues.ContactNumber && fieldValues.ContactNumber?.length < 7
      ? "Must be greater or equal to 7"
      : "";
    temp.ContactMobileNo = !fieldValues.ContactMobileNo
      ? "This feild is required"
      : fieldValues.ContactMobileNo && fieldValues.ContactMobileNo?.length > 10
      ? "Must be less or equal to 10"
      : fieldValues.ContactMobileNo && fieldValues.ContactMobileNo?.length < 7
      ? "Must be greater or equal to 7"
      : "";

    temp.ContactEmailID = !fieldValues.ContactEmailID
      ? "This field is required"
      : !fieldValues.ContactEmailID.trim()
      ? "This field is required"
      : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
          fieldValues.ContactEmailID
        )
      ? ""
      : "Email is not valid";

    temp.OfficeNumber =
      fieldValues.OfficeNumber === null
        ? ""
        : fieldValues.OfficeNumber && fieldValues.OfficeNumber?.length > 10
        ? "Must be less or equal to 10"
        : fieldValues.OfficeNumber && fieldValues.OfficeNumber?.length < 7
        ? "Must be greater or equal to 7"
        : "";

    temp.OfficeFax =
      fieldValues.OfficeFax === null
        ? ""
        : fieldValues.OfficeFax && fieldValues.OfficeFax?.length > 10
        ? "Must be less or equal to 10"
        : fieldValues.OfficeFax && fieldValues.OfficeFax?.length < 7
        ? "Must be greater or equal to 7"
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
      if (values.IDVendor === 0) {
        dispatch(postVendorAction(values));
      } else {
        dispatch(putVendorAction(values));
      }
    }
  };

  useEffect(() => {
    if (createAccount) {
      setValues({ ...createAccount?.vendorModel });
    }
  }, [createAccount]);

  useEffect(() => {
    if (editAccount) {
      setValues({ ...editAccount?.vendorModel });
    }
  }, [editAccount]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container style={{ fontSize: "12px" }}>
        <Grid item xs={12}>
          <InputControl
            name="VendorName"
            label="Vendor Name*"
            value={values.VendorName}
            onChange={handleInputChange}
            errors={errors.VendorName}
          />
          <InputControl
            name="VendorSummary"
            label="Vendor Summary*"
            value={values.VendorSummary}
            onFocus={(e) => {
              e.target.select();
            }}
            onChange={handleInputChange}
            errors={errors.VendorSummary}
          />
          <InputControl
            name="Address"
            label="Address*"
            value={values.Address}
            onChange={handleInputChange}
            errors={errors.Address}
          />
          <InputControl
            name="ContactPerson"
            label="Contact Person*"
            value={values.ContactPerson}
            onChange={handleInputChange}
            errors={errors.ContactPerson}
          />
          <InputControl
            name="ContactNumber"
            label="Phone Number(office)*"
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            type="number"
            value={values.ContactNumber}
            onChange={handleInputChange}
            errors={errors.ContactNumber}
          />
          <InputControl
            name="ContactMobileNo"
            label="Contact MobileNo.*"
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            type="number"
            value={values.ContactMobileNo}
            onChange={handleInputChange}
            errors={errors.ContactMobileNo}
          />
          <InputControl
            name="ContactEmailID"
            label="Email Address*"
            value={values.ContactEmailID}
            onChange={handleInputChange}
            errors={errors.ContactEmailID}
          />
          <InputControl
            name="OfficeNumber"
            label="Office Number"
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            type="number"
            value={values.OfficeNumber}
            onChange={handleInputChange}
            errors={errors.OfficeNumber}
          />
          <InputControl
            name="OfficeFax"
            label="Office Fax"
            value={values.OfficeFax}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            onKeyDown={(e) =>
              symbolsArrPhone.includes(e.key) && e.preventDefault()
            }
            type="number"
            onChange={handleInputChange}
            errors={errors.OfficeFax}
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

export default VendorForm;
