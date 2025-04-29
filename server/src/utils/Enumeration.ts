// Enumeration.ts - TypeScript equivalent of PHP enums

export enum UserAuthenticationTypes {
  NO_AUTHENTICATION = "NO_AUTHENTICATION",
  USERNAME_PASSWORD = "USERNAME_PASSWORD",
  PIN_AUTHENTICATION = "PIN_AUTHENTICATION",
  EMAIL_AUTHENTICATION = "EMAIL_AUTHENTICATION"
}

export enum PostedTypes {
  POSTED = 1,
  NOT_POSTED = 2
}

export enum CancelledTypes {
  CANCELLED = 1,
  NOT_CANCELLED = 2
}

export enum PaidTypes {
  PAID = 1,
  NOT_PAID = 2
}

export enum ActiveTypes {
  ACTIVE = 1,
  NOT_ACTIVE = 2
}

export enum FinishedTypes {
  FINISHED = 1,
  NOT_FINISHED = 2
}

export enum VatType {
  AMMUNITION = "AMMUNITION",
  EQUIPMENT = "EQUIPMENT",
  FOODANDMEALS = "FOOD & MEALS",
  FUELANDGASOLINE = "FUEL & GASOLINE",
  LIGHTANDELECTRICITY = "LIGHT & ELECTRICITY",
  MISCELLANEOUSVAT = "MISCELLANEOUS VAT",
  OTHER = "OTHER",
  RENTAL = "RENTAL",
  REPAIRANDMAINTENANCE = "REPAIR & MAINTENANCE",
  SALARIESANDWAGESINSPECTORS = "SALARIES & WAGES / INSPECTORS",
  SUPPLIES = "SUPPLIES",
  TELECOMMUNICATION = "TELECOMMUNICATION",
  NONE = "NONE"
}

export enum NonVatType {
  BACKGROUNDINVESTIGATION = "BACKGROUND INVESTIGATION",
  BACKWAGES = "BACKWAGES",
  BANKTRANSFERBANK = "BANK TRANSFER - BANK",
  BANKTRANSFERGUARDS = "BANK TRANSFER - GUARDS",
  CASHADVANCEGUARDS = "CASH ADVANCE GUARDS",
  CASHADVANCEMANAGEMENT = "CASH ADVANCE MANAGEMENT",
  CASHBOND = "CASH BOND",
  CASHBONDDOLECASE = "CASH BOND - DOLE CASE",
  CERTIFICATION = "CERTIFICATION",
  DOLEEXPENSES = "DOLE EXPENSES",
  FINANCIALASSISTANCE = "FINANCIAL ASSISTANCE - DOLE",
  FOODNONVAT = "FOOD NON VAT",
  FRINGEBENEFITS = "FRINGE BENEFITS",
  FUNDTRANSFER = "FUND TRANSFER",
  INSURANCE = "INSURANCE",
  INSURANCEREINBURSEMENT = "INSURANCE REINBURSEMENT",
  NONE = "NONE"
}

export enum PaymentType {
  CASH = "CASH",
  CHEQUE = "CHEQUE",
  BANKTRANSFER = "BANK TRANSFER"
}

export enum BasicUnitType {
  BOTTLES = "BOTTLES",
  BOX = "BOX",
  PACKS = "PACKS",
  PAIRS = "PAIRS",
  PCS = "PCS"
}

export enum GenderType {
  MALE = "Male",
  FEMALE = "Female"
}

export enum CivilStatusTypes {
  SINGLE = "Single",
  MARRIED = "Married",
  WIDOWED = "Widowed"
}

export enum DepartmentTypes {
  FIELD = "Field",
  OFFICE = "Office"
}

export enum EmploymentStatus {
  CONTRACTUAL = "Contractual",
  PROBATIONARY = "Probationary",
  REGULAR = "Regular",
  RESIGNED = "Resigned"
}

export enum EmploymentTypes {
  FIELD = "Field",
  STAFF = "Staff"
}

export enum NationalOrLocalTypes {
  NATIONAL = "National Holiday",
  LOCAL = "Local Holiday"
}

export enum EmploymentPositionTypes {
  ADMINISTRATOR = "Administrator",
  CASHIER = "Cashier",
  GENERAL_SERVICES = "General Services",
  HEAD_GUARD = "Head Guard",
  IT_CONSULTANT = "IT Consultant",
  PAYROLL_OFFICER = "Payroll Officer",
  SECURITY_GUARD = "Security Guard"
}

export enum RegionTypes {
  REGION1 = "REGION1",
  REGION2 = "REGION2",
  REGION3 = "REGION3",
  REGION4 = "REGION4",
  REGION5 = "REGION5",
  REGION6 = "REGION6",
  REGION7 = "REGION7",
  REGION8 = "REGION8"
}

export enum RestDayTypes {
  MONDAY = "Monday",
  TUESDAY = "Tuesday",
  WEDNESDAY = "Wednesday",
  THURSDAY = "Thursday",
  FRIDAY = "Friday",
  SATURDAY = "Saturday",
  SUNDAY = "Sunday",
  NO_REST_DAY = "No Rest Day"
}

export enum AttendanceTypes {
  REGULAR = "Regular",
  OT = "OT",
  NIGHT_DIFF = "Night Diff",
  LEGAL_HOLIDAY = "Legal Holiday",
  SPECIAL_HOLIDAY = "Special Holiday",
  REST_DAY = "Rest Day",
  LEGAL_HOLIDAY_OT = "Legal Holiday OT",
  SPECIAL_HOLIDAY_OT = "Special Holiday OT"
}

export enum AttendanceType {
  REGULAR = 1,
  OT = 2,
  NIGHT_DIFF = 3,
  LEGAL_HOLIDAY = 4,
  SPECIAL_HOLIDAY = 5,
  REST_DAY = 6,
  LEGAL_HOLIDAY_OT = 7,
  SPECIAL_HOLIDAY_OT = 8
}

export enum LoanStatusTypes {
  NOT_PAID = 1,
  PARTIAL_PAID = 2,
  PAID = 3
}

export enum ServiceDeductionTypes {
  SSS = "sss",
  PHILHEALTH = "phil"
}

export enum RequisitionStatusType {
  DRAFT = "DRAFT",
  FINALIZED = "FINALIZED"
}

export enum ActivityLogCategories {
  ATTENDANCE = 1,
  ADJUSTMENTS = 2,
  EMPLOYEE_ACCOUNT = 3,
  EMPLOYEES = 4,
  EMPLOYMENT = 5,
  MORTUARY = 6,
  BANKS = 7,
  EMPLOYEE_ASSIGNMENT = 8,
  CLIENTS = 9,
  BILLING = 10,
  HOLIDAYS = 11,
  PAYROLL = 12,
  REQUISITION = 13,
  DISBURSEMENT = 14,
  COLLECTION = 15,
  LOAN_MANAGER = 16,
  DATA_MANAGEMENT = 17,
  PROFILE = 18,
  AUTHENTICATION = 19,
  ATTENDANCE_GROUP = 20,
  BANK_ACCOUNT = 21,
  BENEFICIARY = 22,
  CLIENT_HOLIDAY = 23,
  EMPLOYEE_DEPLOYMENT = 24,
  PETTY_CASH = 25,
  DATA_MAINTENANCE = 26
}

export enum TableNames {
  ATTENDANCE = "attendance",
  ADJUSTMENTS = "adjustments",
  EMPLOYEE_ACCOUNT = "employee_account",
  EMPLOYEES = "employees",
  EMPLOYMENT = "employment",
  MORTUARY = "mortuary",
  BANKS = "banks",
  EMPLOYEE_ASSIGNMENT = "employee_assignment",
  CLIENTS = "clients",
  BILLING = "billing",
  HOLIDAYS = "holidays",
  PAYROLL = "payroll",
  REQUISITION = "requisition",
  DISBURSEMENT = "disbursement",
  COLLECTION = "collection",
  LOAN_MANAGER = "loan_manager",
  DATA_MANAGEMENT = "data_management",
  PROFILE = "profile",
  AUTHENTICATION = "authentication",
  ATTENDANCE_GROUP = "attendance_group",
  BANK_ACCOUNT = "bank_account",
  BENEFICIARY = "beneficiary",
  CLIENT_HOLIDAY = "client_holiday",
  EMPLOYEE_DEPLOYMENT = "deployed_employees",
  PETTY_CASH = "petty_cash",
  ARCHIVES = "archives",
  DATABASE_BACKUPS = "database_backups"
}

export enum ActivityLogActionTypes {
  CREATE = 1,
  DELETE = 2,
  UPDATE = 3,
  INSERT = 4,
  MODIFY = 5,
  PRINTS = 6,
  ARCHIVE = 7
}

export enum ActivityLogStatus {
  SUCCESS = 1,
  FAILED = 2
}

export enum ReportTypes {
  PAYSLIP_PER_CLIENT_INDIVIDUALLY = 99,
  PAYSLIP_PER_CLIENT = 100,
  ACCOUNT_CREDITED = 101,
  LOAN_PAYMENTS = 102,
  MORTUARY = 103,
  PAYSLIP_AZ = 104,
  TOTAL_BANK = 105,
  PAYROLL = 106,
  PETTY_CASH_EXPENSES = 107
}

export enum BeneficiaryTypes {
  BENEFICIARY = "Beneficiary",
  CHARITABLE_ORGANIZATION = "Charitable Organization",
  RESIDUARY_BENEFICIARY = "Residuary Beneficiary",
  SPOUSE = "Spouse",
  CHARITABLE_BENEFICIARIES = "Charitable Beneficiaries",
  TRUSTS = "Trusts",
  CHILDREN = "Children",
  LAST_WILL_AND_TESTAMENT = "Last Will and Testament",
  OTHER_FAMILY_MEMBERS = "Other Family Members"
}

export enum SystemTypeAffects {
  NONE = 0,
  PAYROLL = 1,
  ATTENDANCE = 2,
  PETTYCASH = 3,
  LOAN_MANAGER = 4
}

export enum SystemTypeAffectValue {
  NONE = 0,
  DEDUCT = 1,
  FORBIDDEN = 2,
  ALLOWED = 3,
  RESTRICTED = 4
}

export enum MonthPeriod {
  ONETO15 = 1,
  SIXTEENTO30 = 2
} 