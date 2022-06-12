import { combineReducers } from "redux";
import {
  createHolidayReducer,
  getAllHoliday,
  getSingleHolidayReducer,
  updateSingleHolidayReducer,
} from "./settings/schoolConfiguration/holiday/HolidayReducers";
import { navLinkReducer } from "./routesConfig/Route";
import {
  getAllUploadPhotoReducer,
  uploadPhotoReducer,
} from "./userProfile/uploadPhoto/UploadPhotoReducers";
import {
  getDashboardTopContentReducer,
  getHeaderBannerReducer,
  getHeaderContentReducer,
  getPrincipleSignatureReducer,
} from "./dashboard/DashboardReducers";
import {
  postHrValueReducer,
  putHrValueReducer,
} from "./settings/schoolConfiguration/hrValue/HrValueReducers";
import {
  getAllAccountHeaderReducer,
  getListAccountHeaderReducer,
  getSingleCreateAccountHeaderReducer,
  getSingleEditAccountHeaderReducer,
  postAccountHeaderReducer,
  putAccountHeaderReducer,
} from "./account/accountHeader/AccountHeaderReducers";
import {
  getAllAccountGroupReducer,
  getListAccountGroupReducer,
  getSingleCreateAccountGroupReducer,
  getSingleEditAccountGroupReducer,
  postAccountGroupReducer,
  putAccountGroupReducer,
} from "./account/accountGroup/AccountGroupReducers";
import {
  getAllAccountTypeReducer,
  getListAccountTypeReducer,
  getSingleCreateAccountTypeReducer,
  getSingleEditAccountTypeReducer,
  postAccountTypeReducer,
  putAccountTypeReducer,
} from "./account/accountType/AccountTypeReducers";
import {
  getAllFiscalYearReducer,
  getListFiscalYearReducer,
  getSingleCreateFiscalYearReducer,
  getSingleEditFiscalYearReducer,
  postFiscalYearReducer,
  putFiscalYearReducer,
} from "./account/fiscalYear/FiscalYearReducers";
import {
  getAllVendorReducer,
  getListVendorReducer,
  getSingleCreateVendorReducer,
  getSingleEditVendorReducer,
  postVendorReducer,
  putVendorReducer,
} from "./account/vendor/VendorReducers";
import {
  getAllAdmissionFeeStructureReducer,
  getListAdmissionFeeStructureReducer,
  getSingleCreateAdmissionFeeStructureReducer,
  getSingleEditAdmissionFeeStructureReducer,
  postAdmissionFeeStructureReducer,
  putAdmissionFeeStructureReducer,
} from "./revenue/admissionFeeStructure/AdmissionFeeStructureReducers";
import {
  getAllAdmissionFacultyFeeStructureReducer,
  getListAdmissionFacultyFeeStructureReducer,
  getSingleCreateAdmissionFacultyFeeStructureReducer,
  getSingleEditAdmissionFacultyFeeStructureReducer,
  postAdmissionFacultyFeeStructureReducer,
  putAdmissionFacultyFeeStructureReducer,
} from "./revenue/admissionFacultyFee/AdmissionFacultyFeeReducers";
import {
  getAllExtraFeeStructureReducer,
  getListExtraFeeStructureReducer,
  getSingleCreateExtraFeeStructureReducer,
  getSingleEditExtraFeeStructureReducer,
  postExtraFeeStructureReducer,
  putExtraFeeStructureReducer,
} from "./revenue/extraFeeStructure/ExtraFeeStructureReducers";
import {
  getAllStudentDueReducer,
  getListStudentDueReducer,
  getPrintStudentDueReducer,
} from "./revenue/studentDue/StudentDueReducers";
import {
  getAllMonthlyFeeLinkReducer,
  getListMonthlyFeeLinkReducer,
  getSingleCreateMonthlyFeeLinkReducer,
  getSingleEditMonthlyFeeLinkReducer,
  postMonthlyFeeLinkReducer,
  putMonthlyFeeLinkReducer,
} from "./revenue/monthlyFeeLink/MonthlyFeeLinkReducers";
import {
  getAllActiveStudentForLedgeronlyReducer,
  getAllAdmitStudentReducer,
  getBulkEditAdmitStudentReducer,
  getExtraFeeAdmitStudentReducer,
  postAdmitStudentReducer,
} from "./revenue/admitStudent/AdmitStudentReducers";
import {
  getAllFeeCollectionReducer,
  getListFeeCollectionReducer,
  getPrintFeeCollectionReducer,
} from "./revenue/feeCollection/FeeCollectionReducers";
import {
  getAllOneTimeBillPrintReducer,
  getPrintOneTimeBillPrintReducer,
} from "./revenue/oneTimeBillPrint/OneTimeBillPrintReducers";
import {
  getAccountNameReducer,
  getActiveStudentOnlyReducer,
  getAllStudentLedgerReducer,
  getListStudentLedgerReducer,
  getReceiptPrintReducer,
  getSingleBillPrintReducer,
  getUniversityFacultyReducer,
  postStudentLedgerReducer,
} from "./revenue/studentLedger/StudentLedgerReducers";
import {
  getAllActiveStudentForBillGenerateReducer,
  getAllBillGenerateReducer,
  getBulkEditBillGenerateReducer,
  getExtraFeeBillGenerateReducer,
  postBillGenerateReducer,
} from "./revenue/billGenerate/BillgenerateReducers";
import {
  getAllOneTimeBillReducer,
  getBulkEditOneTimeBillReducer,
  getPreviousBlcReducer,
  postOneTimeBillReducer,
} from "./revenue/oneTimeBill/OneTimeBillReducers";
import {
  getActiveLedgerAccountWiseReducer,
  getAllLedgerAccountWiseReducer,
  getListLedgerAccountWiseReducer,
} from "./revenue/ledgerAccountwise/LedgerAccountWiseReducers";

//examination reducers link end
export const reducers = combineReducers({
  //header
  navLink: navLinkReducer,
  getHeaderContent: getHeaderContentReducer,
  getDashboardTopContent: getDashboardTopContentReducer,
  getHeaderBanner: getHeaderBannerReducer,
  getPrincipleSignature: getPrincipleSignatureReducer,
  // //header ends

  //Accounting Starts:
  //Account HeaderReducers :
  getAllAccountHeader: getAllAccountHeaderReducer,
  getListAccountHeader: getListAccountHeaderReducer,
  getSingleCreateAccountHeader: getSingleCreateAccountHeaderReducer,
  getSingleEditAccountHeader: getSingleEditAccountHeaderReducer,
  postAccountHeader: postAccountHeaderReducer,
  putAccountHeader: putAccountHeaderReducer,

  //ACCOUNT GROUP Reducers:
  getAllAccountGroup: getAllAccountGroupReducer,
  getListAccountGroup: getListAccountGroupReducer,
  getSingleCreateAccountGroup: getSingleCreateAccountGroupReducer,
  getSingleEditAccountGroup: getSingleEditAccountGroupReducer,
  postAccountGroup: postAccountGroupReducer,
  putAccountGroup: putAccountGroupReducer,

  //ACCOUNT TYPE REDUCERS:
  getAllAccountType: getAllAccountTypeReducer,
  getListAccountType: getListAccountTypeReducer,
  getSingleCreateAccountType: getSingleCreateAccountTypeReducer,
  getSingleEditAccountType: getSingleEditAccountTypeReducer,
  postAccountType: postAccountTypeReducer,
  putAccountType: putAccountTypeReducer,

  //FISCAL YEAR REDUCERS:
  getAllFiscalYear: getAllFiscalYearReducer,
  getListFiscalYear: getListFiscalYearReducer,
  getSingleCreateFiscalYear: getSingleCreateFiscalYearReducer,
  getSingleEditFiscalYear: getSingleEditFiscalYearReducer,
  postFiscalYear: postFiscalYearReducer,
  putFiscalYear: putFiscalYearReducer,

  //VENDOR REDUCERS:
  getAllVendor: getAllVendorReducer,
  getListVendor: getListVendorReducer,
  getSingleCreateVendor: getSingleCreateVendorReducer,
  getSingleEditVendor: getSingleEditVendorReducer,
  postVendor: postVendorReducer,
  putVendor: putVendorReducer,

  //ADMISSION FEE STRUCTURE REDUCERS:
  getAllAdmissionFeeStructure: getAllAdmissionFeeStructureReducer,
  getListAdmissionFeeStructure: getListAdmissionFeeStructureReducer,
  getSingleCreateAdmissionFeeStructure:
    getSingleCreateAdmissionFeeStructureReducer,
  getSingleEditAdmissionFeeStructure: getSingleEditAdmissionFeeStructureReducer,
  postAdmissionFeeStructure: postAdmissionFeeStructureReducer,
  putAdmissionFeeStructure: putAdmissionFeeStructureReducer,

  //REVENUE ADMIT STUDENT REDUCERS:
  getAllAdmitStudent: getAllAdmitStudentReducer,
  getAllActiveStudentForLedgeronly: getAllActiveStudentForLedgeronlyReducer,
  getBulkEditAdmitStudent: getBulkEditAdmitStudentReducer,
  getExtraFeeAdmitStudent: getExtraFeeAdmitStudentReducer,
  postAdmitStudent: postAdmitStudentReducer,

  //REVENUE BILL GENERATE REDUCERS:
  getAllBillGenerate: getAllBillGenerateReducer,
  getAllActiveStudentForBillGenerate: getAllActiveStudentForBillGenerateReducer,
  getBulkEditBillGenerate: getBulkEditBillGenerateReducer,
  getExtraFeeBillGenerate: getExtraFeeBillGenerateReducer,
  postBillGenerate: postBillGenerateReducer,

  //REVENUE ONE TIME BILL REDUCERS
  getAllOneTimeBill: getAllOneTimeBillReducer,
  getBulkEditOneTimeBill: getBulkEditOneTimeBillReducer,
  postOneTimeBill: postOneTimeBillReducer,
  getPreviousBlc: getPreviousBlcReducer,

  //ADMISSION FACULTY FEE STRUCTURE REDUCERS:
  getAllAdmissionFacultyFeeStructure: getAllAdmissionFacultyFeeStructureReducer,
  getListAdmissionFacultyFeeStructure:
    getListAdmissionFacultyFeeStructureReducer,
  getSingleCreateAdmissionFacultyFeeStructure:
    getSingleCreateAdmissionFacultyFeeStructureReducer,
  getSingleEditAdmissionFacultyFeeStructure:
    getSingleEditAdmissionFacultyFeeStructureReducer,
  postAdmissionFacultyFeeStructure: postAdmissionFacultyFeeStructureReducer,
  putAdmissionFacultyFeeStructure: putAdmissionFacultyFeeStructureReducer,

  //EXTRA FEE STRUCTURE REDUCERS:
  getAllExtraFeeStructure: getAllExtraFeeStructureReducer,
  getListExtraFeeStructure: getListExtraFeeStructureReducer,
  getSingleCreateExtraFeeStructure: getSingleCreateExtraFeeStructureReducer,
  getSingleEditExtraFeeStructure: getSingleEditExtraFeeStructureReducer,
  postExtraFeeStructure: postExtraFeeStructureReducer,
  putExtraFeeStructure: putExtraFeeStructureReducer,

  //STUDENT DUE REDUCERS:
  getAllStudentDue: getAllStudentDueReducer,
  getListStudentDue: getListStudentDueReducer,
  getPrintStudentDue: getPrintStudentDueReducer,

  //MONTHLY FEE LINK REDUCERS:
  getAllMonthlyFeeLink: getAllMonthlyFeeLinkReducer,
  getListMonthlyFeeLink: getListMonthlyFeeLinkReducer,
  getSingleCreateMonthlyFeeLink: getSingleCreateMonthlyFeeLinkReducer,
  getSingleEditMonthlyFeeLink: getSingleEditMonthlyFeeLinkReducer,
  postMonthlyFeeLink: postMonthlyFeeLinkReducer,
  putMonthlyFeeLink: putMonthlyFeeLinkReducer,

  //FEE COLLECTION REDUCERS:
  getAllFeeCollection: getAllFeeCollectionReducer,
  getListFeeCollection: getListFeeCollectionReducer,
  getPrintFeeCollection: getPrintFeeCollectionReducer,

  //ONE TIME BILL PRINT:
  getAllOneTimeBillPrint: getAllOneTimeBillPrintReducer,
  getPrintOneTimeBillPrint: getPrintOneTimeBillPrintReducer,

  //STUDENT LEDGER:
  getAllStudentLedger: getAllStudentLedgerReducer,
  getListStudentLedger: getListStudentLedgerReducer,
  postStudentLedger: postStudentLedgerReducer,
  getActiveStudentOnly: getActiveStudentOnlyReducer,
  getUniversityFaculty: getUniversityFacultyReducer,
  getAccountName: getAccountNameReducer,
  getReceiptPrint: getReceiptPrintReducer,
  getSingleBillPrint: getSingleBillPrintReducer,

  //LEDGER ACCOUNT WISE:
  getAllLedgerAccountWise: getAllLedgerAccountWiseReducer,
  getListLedgerAccountWise: getListLedgerAccountWiseReducer,
  getActiveLedgerAccountWise: getActiveLedgerAccountWiseReducer,

  //HOLIDAY REDUCER
  holiday: getAllHoliday,
  createHoliday: createHolidayReducer,
  getSingleHoliday: getSingleHolidayReducer,
  updateSingleHoliday: updateSingleHolidayReducer,

  //PID uploadPhoto
  uploadPhoto: uploadPhotoReducer,
  getAllUploadPhoto: getAllUploadPhotoReducer,
  postHrValue: postHrValueReducer,
  putHrValue: putHrValueReducer,
});
