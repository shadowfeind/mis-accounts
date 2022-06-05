import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import SideMenu from "./components/SideMenu";
import {
  createTheme,
  CssBaseline,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";

import { HashRouter as Router, Route, Switch } from "react-router-dom";

const AdmitStudent = lazy(() => import("./revenue/admitStudent/AdmitStudent"));

const AutoSearch = lazy(() => import("./userProfile/autoSearch/AutoSearch"));
const PageNotFound = lazy(() => import("./pageNotFound/PageNotFound"));

const Dashboard = lazy(() => import("./dashboard/Dashboard"));

const UserProfile = lazy(() => import("./userProfile/UserProfile"));

//Account:
//Account Header:

const AccountHeader = lazy(() =>
  import("./account/accountHeader/AccountHeader")
);

//Account Group:
const AccountGroup = lazy(() => import("./account/accountGroup/AccountGroup"));

//Account Type:
const AccountType = lazy(() => import("./account/accountType/AccountType"));

//Fiscall Year::
const FiscalYear = lazy(() => import("./account/fiscalYear/FiscalYear"));

//Vendor:
const Vendor = lazy(() => import("./account/vendor/Vendor"));

//Revenue:
const Revenue = lazy(() =>
  import("./revenue/admissionFeeStructure/AdmissionFeeStruture")
);

//Admission Faculty Fee:
const AdmissionFacultyFee = lazy(() =>
  import("./revenue/admissionFacultyFee/AdmissionFacultyFee")
);

//Extra  Fee:
const ExtraFee = lazy(() =>
  import("./revenue/extraFeeStructure/ExtraFeeStructure")
);

//Student Due:
const StudentDue = lazy(() => import("./revenue/studentDue/StudentDue"));
// Monthly Fee:
const MonthlyFee = lazy(() =>
  import("./revenue/monthlyFeeLink/MonthlyFeeLink")
);

// Fee Collection:
const FeeCollection = lazy(() =>
  import("./revenue/feeCollection/FeeCollection")
);

// One Time Bill Print:
const OneTimeBillPrint = lazy(() =>
  import("./revenue/oneTimeBillPrint/OneTimeBillPrint")
);

const theme = createTheme({
  palette: {
    background: {
      default: "#eaeff5",
    },
  },

  MuiButtonRoot: {
    minWidth: "10px",
    fontSize: "12px",
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "15%",
    width: "100%",
  },
});

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Header />
        <SideMenu />
        <div className={classes.appMain}>
          {/* Examination route start */}
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route path={"/auto-search"} component={AutoSearch} />

              <Route path={"/user-profile"} component={UserProfile} />

              {/*Accounting Routes */}
              <Route path={"/account-header"} component={AccountHeader} />

              <Route path={"/account-group"} component={AccountGroup} />

              <Route path={"/account-type"} component={AccountType} />
              <Route path={"/fiscal-year"} component={FiscalYear} />
              <Route path={"/vendor"} component={Vendor} />

              {/*Accounting Routes Ends */}

              {/* Revenue Routes */}
              <Route path={"/revenue"} component={Revenue} />
              <Route path={"/admit-student"} component={AdmitStudent} />
              <Route
                path={"/admission-faculty-fee"}
                component={AdmissionFacultyFee}
              />
              <Route path={"/extra-fee-structure"} component={ExtraFee} />
              <Route path={"/student-due"} component={StudentDue} />
              <Route path={"/monthly-fee"} component={MonthlyFee} />
              <Route path={"/fee-collection"} component={FeeCollection} />
              <Route
                path={"/one-time-bill-print"}
                component={OneTimeBillPrint}
              />
              {/* Revenue Routes Ends */}

              <Route exact path={"/"} component={Dashboard} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </Suspense>
        </div>
        <CssBaseline />
      </ThemeProvider>
    </Router>
  );
};

export default App;
