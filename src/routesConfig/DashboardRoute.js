import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import SupervisorAccountRoundedIcon from "@material-ui/icons/SupervisorAccountRounded";
import BallotRoundedIcon from "@material-ui/icons/BallotRounded";
import DateRangeRoundedIcon from "@material-ui/icons/DateRangeRounded";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import HouseIcon from "@material-ui/icons/House";
export const DashboardRoute = [
  {
    name: "Dashboard",
    route: "/",
    icon: DashboardRoundedIcon,
    exact: false,
  },
  {
    name: "Account Header",
    route: "/account-header",
    icon: AccountBoxRoundedIcon,
    exact: false,
  },
  {
    name: "Account Group",
    route: "/account-group",
    icon: SupervisorAccountRoundedIcon,
    exact: false,
  },

  {
    name: "Account Type",
    route: "/account-type",
    icon: BallotRoundedIcon,
    exact: false,
  },
  {
    name: "Fiscal Year",
    route: "/fiscal-year",
    icon: DateRangeRoundedIcon,
    exact: false,
  },
  {
    name: "Vendor",
    route: "/vendor",
    icon: HouseIcon,
    exact: false,
  },
];
