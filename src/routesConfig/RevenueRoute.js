import DescriptionIcon from "@material-ui/icons/Description";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import SchoolIcon from "@material-ui/icons/School";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import CastForEducationRoundedIcon from "@material-ui/icons/CastForEducationRounded";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import EventNoteIcon from "@material-ui/icons/EventNote";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
export const RevenueRoute = [
  {
    name: "Admission Fee Structure",
    route: "/revenue",
    icon: HomeWorkRoundedIcon,
    exact: true,
  },
  {
    name: "Admission Faculty Fee Structure Link",
    route: "/admission-faculty-fee",
    icon: PeopleAltIcon,
    exact: false,
  },
  {
    name: "Extra Fee Structure",
    route: "/extra-fee-structure",
    icon: SchoolIcon,
    exact: false,
  },
  {
    name: "Student Due",
    route: "/student-due",
    icon: LibraryBooksIcon,
    exact: false,
  },
  {
    name: "Admit Student",
    route: "/admit-student",
    icon: PermContactCalendarIcon,
    exact: false,
  },
  // {
  //   name: "Access Control",
  //   route: "/access-control",
  //   icon: SettingsRemoteIcon,
  //   exact: false,
  // },
  // {
  //   name: "Class Routine",
  //   route: "/class-schedule",
  //   icon: EventNoteIcon,
  //   exact: false,
  // },
  // { name: "Notice", route: "/notice", icon: PostAdd, exact: false },

  // {
  //   name: "Old Questions",
  //   route: "/old-questions",
  //   icon: MenuBookIcon,
  //   exact: false,
  // },
  // {
  //   name: "Syllabus",
  //   route: "/syllabus",
  //   icon: DescriptionIcon,
  //   exact: false,
  // },
];
