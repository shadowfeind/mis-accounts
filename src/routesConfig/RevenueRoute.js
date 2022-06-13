import DescriptionIcon from "@material-ui/icons/Description";
import BurstModeRoundedIcon from "@material-ui/icons/BurstModeRounded";
import ReceiptRoundedIcon from "@material-ui/icons/ReceiptRounded";
import LibraryBooksRoundedIcon from "@material-ui/icons/LibraryBooksRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import LocalAtmRoundedIcon from "@material-ui/icons/LocalAtmRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import SportsKabaddiRoundedIcon from "@material-ui/icons/SportsKabaddiRounded";
import ImportContactsRoundedIcon from "@material-ui/icons/ImportContactsRounded";
import TodayRoundedIcon from "@material-ui/icons/TodayRounded";

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
    icon: PersonAddRoundedIcon,
    exact: false,
  },
  {
    name: "Extra Fee Structure",
    route: "/extra-fee-structure",
    icon: SportsKabaddiRoundedIcon,
    exact: false,
  },
  {
    name: "Monthly Fee Link",
    route: "/monthly-fee",
    icon: TodayRoundedIcon,
    exact: false,
  },
  {
    name: "Admit Student",
    route: "/admit-student",
    icon: GroupAddRoundedIcon,
    exact: false,
  },
  {
    name: "Bill Generate",
    route: "/bill-generate",
    icon: DescriptionRoundedIcon,
    exact: false,
  },
  {
    name: "One Time Bill",
    route: "/one-time-bill",
    icon: ReceiptRoundedIcon,
    exact: false,
  },
  {
    name: "Student Due",
    route: "/student-due",
    icon: LocalAtmRoundedIcon,
    exact: false,
  },

  {
    name: "Fee Collection",
    route: "/fee-collection",
    icon: LibraryBooksRoundedIcon,
    exact: false,
  },
  {
    name: "One Time Bill Print",
    route: "/one-time-bill-print",
    icon: PrintRoundedIcon,
    exact: false,
  },

  {
    name: "Student Ledger",
    route: "/student-ledger",
    icon: ImportContactsRoundedIcon,
    exact: false,
  },
  {
    name: "Ledger Account Wise",
    route: "/ledger-account-wise",
    icon: BurstModeRoundedIcon,
    exact: false,
  },
];
