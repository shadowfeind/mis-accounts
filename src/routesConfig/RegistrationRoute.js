import DateRangeIcon from '@material-ui/icons/DateRange';
import PortraitIcon from '@material-ui/icons/Portrait';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
export const RegistrationRoute = [
  {
    name: "Counter Configuraion",
    route: "/registration",
    icon: DateRangeIcon,
    exact: false,
  },
  {
    name: "Admission Configuraion",
    route: "/admission-configuration",
    icon: PortraitIcon,
    exact: false,
  },
  {
    name: "Student Registration",
    route: "/student-registration",
    icon: GroupAddIcon,
    exact: false,
  },
];
