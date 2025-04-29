// AppResources.ts - TypeScript equivalent of PHP resources

// Table header definitions and their corresponding data keys
// These will be used to generate table displays in the frontend

export const EMPLOYEES_TABLE_HEADER_TEXT = ["No", "Emp No", "Name", "Gender", "Address", "Tel", "Mobile", "Email"];
export const EMPLOYEES_TABLE_BODY_KEY = [
  "no",
  "employee_no",
  {
    primary: "employee_id",
    controller: "EmployeeControl",
    value: "name"
  },
  "gender",
  "address",
  "telephone",
  "mobile",
  "email"
];

export const EMPLOYMENT_TABLE_HEADER_TEXT = ["No", "Date From", "Date To", "Employee", "Position", "Department", "Type", "Status", "Active"];
export const EMPLOYMENT_TABLE_BODY_KEY = [
  "no",
  "date_hired",
  "date_end",
  {
    primary: "employee_id",
    controller: "EmployeeControl",
    value: "name"
  },
  "position",
  "department",
  "e_type",
  "status",
  {
    enum: "ActiveTypes",
    value: "active"
  }
];

export const TOTAL_BANK_HEADER_TEXT = ["No", "Bank", "Amount"];
export const TOTAL_BANK_BODY_KEY = ["no", "bank", "amount"];

export const ACCOUNT_CREDITED_HEADER_TEXT = ["No", "Employee", "Bank Account", "Amount"];
export const ACCOUNT_CREDITED_BODY_KEY = ["no", "employee", "bank_account_number", "amount"];

export const MORTUARY_TABLE_HEADER_TEXT = ["No", "Date Created", "Period", "Year"];
export const MORTUARY_TABLE_BODY_KEY = ["no", "date_created", "period", "year"];

export const CLIENT_TABLE_HEADER_TEXT = ["No", "Name", "Branch", "Date Created"];
export const CLIENT_TABLE_BODY_KEY = ["no", "name", "branch", "date_created"];

export const BANKS_TABLE_HEADER_TEXT = ["No", "Name", "Branch", "Date Created"];
export const BANKS_TABLE_BODY_KEY = ["no", "name", "branch", "date_created"];

export const DEPLOYMENT_TABLE_HEADER_TEXT = ["No", "Date From", "Date To", "Employee"];
export const DEPLOYMENT_TABLE_BODY_KEY = [
  "no",
  "date_from",
  "date_to",
  {
    primary: "employment_id",
    controller: "EmploymentControl",
    value: ["employee", "name"]
  }
];

export const ADJUSTMENTS_TABLE_HEADER_TEXT = ["No", "Date", "Employee", "Posted", "Paid", "Amount"];
export const ADJUSTMENTS_TABLE_BODY_KEY = [
  "adjustment_id",
  "date_created",
  {
    primary: "employee_id",
    controller: "EmployeeControl",
    value: "name"
  },
  {
    enum: "PostedTypes",
    value: "posted"
  },
  {
    enum: "PaidTypes",
    value: "paid"
  },
  "amount"
];

export const BENEFICIARIES_TABLE_HEADER_TEXT = ["No", "Employee", "Type", "Name"];
export const BENEFICIARIES_TABLE_BODY_KEY = [
  "no",
  {
    primary: "employee_id",
    controller: "EmployeeControl",
    value: "name"
  },
  "type",
  "name"
];

export const EMPLOYMENT_ACCOUNT_TABLE_HEADER_TEXT = ["No", "Client", "Branch", "Basic Pay"];
export const EMPLOYMENT_ACCOUNT_TABLE_BODY_KEY = [];

export const NO_TYPE_TABLE_HEADER_TEXT = ["No", "Type"];
export const NO_TYPE_TABLE_BODY_KEY = ["no", "type"];

export const SERVICES_DEDUCTION_TABLE_HEADER_TEXT = ["No", "From", "To", "MSC", "ER", "EE"];
export const SERVICES_DEDUCTION_TABLE_BODY_KEY = ["no", "price_from", "price_to", "msc", "er", "ee"];

export const HOLIDAYS_TABLE_HEADER_TEXT = ["No", "Date", "Holiday", "Type"];
export const HOLIDAYS_TABLE_BODY_KEY = ["no", "holiday_date", "holiday", "national_local"];

export const PER_CLIENT_TABLE_HEADER_TEXT = ["No", "Period", "Year", "Client", "Branch", "Total"];
export const PER_CLIENT_TABLE_BODY_KEY = ["no", "period", "year", "client", "branch", "total"];

export const NETPAYS_TABLE_HEADER_TEXT = ["No", "Client", "Branch", "Amount"];
export const NETPAYS_TABLE_BODY_KEY = ["no", "client", "branch", "amount"];

export const LOAN_ITEM_TABLE_HEADER_TEXT = ["No", "Employee", "Description", "Amount", "Balance", "Type", "Status", "Date"];
export const LOAN_ITEM_TABLE_BODY_KEY = [
  "no",
  {
    primary: "employee_id",
    controller: "EmployeeControl",
    value: "name"
  },
  "description",
  "amount",
  "balance",
  {
    primary: "loan_type",
    controller: "SystemTypeControl",
    value: "type"
  },
  "status",
  "date_created"
];

export const LOAN_PAYMENT_TABLE_HEADER_TEXT = ["No", "Employee", "To Pay", "Pay", "Note", "Date"];
export const LOAN_PAYMENT_TABLE_BODY_KEY = [
  "No",
  {
    primary: "employee_id",
    controller: "EmployeeControl",
    value: "name"
  },
  "to_pay",
  "amount",
  "note",
  "date_created"
];

export const ATTENDANCE_GROUP_TABLE_HEADER_TEXT = ["No", "Period", "Year", "Client", "Branch", "Active", "Finished", "Date Created"];
export const ATTENDANCE_GROUP_BODY_KEY = [
  "no",
  "period",
  "year",
  {
    primary: "client_id",
    controller: "ClientController",
    value: "name"
  },
  {
    primary: "client_id",
    controller: "ClientController",
    value: "branch"
  },
  {
    enum: "ActiveTypes",
    value: "active"
  },
  {
    enum: "FinishedTypes",
    value: "finished"
  },
  "date_created"
];

export const PAYROLL_TABLE_HEADER_TEXT = [
  "No", "Name", "Days Worked", "Hours Worked", "Rest Day", "BASIC PAY", "NSD", "NSD(BP)", "NHW(SH)", 
  "SH(BP)", "NHW(SHOT)", "SHOT(BP)", "NHW(LH)", "LH(BP)", "NHW(LHOT)", "LHOT(BP)", 
  "Head Guard Allowance", "Rest Day", "Adjustments", "Gross Pay", "SSS", "PHIL", 
  "INSURANCE", "P1", "Death", "Pag-Ibig", "P2", "P3", "Uniform", "Cash Advances", 
  "Loan Statement", "Loan Purpose", "Beneficiaries", "Net Pay"
];
export const PAYROLL_TABLE_BODY_KEY = [
  "no", "name", "ndw", "total_hours", "rest_day", "basic_pay", "nsd", "nsd_basic_pay", 
  "nhw_sh", "sh_basic_pay", "nhw_shot", "shot_basic_pay", "nhw_lh", "lh_basic_pay", 
  "nhw_lhot", "lhot_basic_pay", 
  {
    property: "payslip_rates", 
    target: "head_guard_allowance"
  }, 
  "rest_day", "adjustments", "gross_pay", "sss", "phil", "insurance", "part1", "death", 
  "pagibig", "part2", "others", 
  {
    property: "payslip_rates", 
    target: "uniform"
  }, 
  "cash_advances", "loan_statement", "loan_purpose", "beneficiaries", "netpay"
];

export const REQUISITION_TABLE_HEADER_TEXT = ["No", "Req#", "Date", "Remarks", "Status", "Expenses", "Less", "Amount", "Balance"];
export const REQUISITION_TABLE_BODY_KEY = ["no", "req_id", "req_date", "remarks", "status", "total_expenses", "total_less", "amount", "balance"];

export const REQUISITION_EXPENSES_LESS_TABLE_HEADER_TEXT = ["No", "Particulars", "Type", "Basic Unit", "Qty", "Unit Price", "Amount"];
export const REQUISITION_EXPENSES_LESS_TABLE_BODY_KEY = ["no", "particulars", "type", "basic_unit", "quantity", "unit_price", "amount"];

export const REQUISITION_REPORT_TABLE_HEADER_TEXT = ["No", "Particulars", "Type", "Less", "Amount"];
export const REQUISITION_REPORT_LESS_TABLE_BODY_KEY = ["no", "particulars", "type", "total_less", "amount"];

export const DISBURSEMENT_TABLE_HEADER_TEXT = ["No", "Date", "Voucher #", "Payments", "Paid To", "Posted", "Cancelled", "Amount"];
export const DISBURSEMENT_TABLE_BODY_KEY = [
  "no",
  "date",
  "voucher",
  "payments",
  "paid_to",
  {
    enum: "PostedTypes",
    value: "posted"
  },
  {
    enum: "CancelledTypes",
    value: "cancelled"
  },
  "amount"
];

export const COLLECTION_TABLE_HEADER_TEXT = ["No", "Date", "Receipt #", "Payment", "User", "Posted", "Amount"];
export const COLLECTION_TABLE_BODY_KEY = [
  "no",
  "date",
  "receipt",
  "payment",
  "user",
  {
    enum: "PostedTypes",
    value: "posted"
  },
  "amount"
];

export const PETTYCASH_TABLE_HEADER_TEXT = ["No", "Date", "Requested By", "Remarks", "Posted", "Amount"];
export const PETTYCASH_TABLE_BODY_KEY = [
  "no",
  "date",
  "requested_by",
  "remarks",
  {
    enum: "PostedTypes",
    value: "posted"
  },
  "amount"
];

export const CLIENT_HOLIDAY_TABLE_HEADER_TEXT = ["No", "Date", "Holiday", "Type"];
export const CLIENT_HOLIDAY_TABLE_BODY_KEY = ["no", "date", "holiday", "type"];

export const LOAN_MANAGER_TABLE_HEADER_TEXT = ["No", "Employee", "Date", "Description", "Times", "Status", "Principal", "Previous", "Forward", "Payments", "Received", "Bal"];
export const LOAN_MANAGER_TABLE_BODY_KEY = ["no", "employee", "date", "description", "times", "status", "principal", "previous", "forward", "payments", "recieved", "balance"];

export const LOAN_TABLE_HEADER_TEXT = ["No", "Description", "Amount", "Balance", "Loan Type", "Status", "Date"];
export const LOAN_TABLE_BODY_TEXT = ["no", "description", "amount", "balance", "loan_type", "status", "date_created"];

export const ACTIVITY_LOG_HEADER_TEXT = ["No", "User", "Category", "Action", "Status", "Message", "Related ID"];
export const ACTIVITY_LOG_BODY_KEY = ["no", "user", "category", "action", "status", "message", "related_id"]; 