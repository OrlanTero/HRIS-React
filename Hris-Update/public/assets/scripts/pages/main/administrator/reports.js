import MenuBarListener from "../../../classes/components/MenuBarListener.js";
import { TableListener } from "../../../classes/components/TableListener.js";
import {
  Ajax,
  GetComboValue,
  HideShowComponent,
  ListenToCombo,
  ListenToYearAndPeriodAsOptions,
  ManageComboBoxes,
  SetNewComboItems,
} from "../../../modules/component/Tool.js";
import { SidePicker } from "../../../classes/components/SidePicker.js";
import PDFManager from "../../../classes/components/PDFManager.js";
import {
  GetReports,
  SelectClient,
  SelectEmployee,
} from "../../../modules/app/Administrator.js";
import {
  NewNotification,
  NotificationType,
} from "../../../classes/components/NotificationPopup.js";

const REPORT_TYPES = {
  PAYSLIP_PER_CLIENT_INDIVIDUALLY: 99,
  PAYSLIP_PER_CLIENT: 100,
  ACCOUNT_CREDITED: 101,
  LOAN_PAYMENTS: 102,
  MORTUARY: 103,
  PAYSLIP_AZ: 104,
  TOTAL_BANK: 105,
  PAYROLL: 106,
  PETTY_CASH_EXPENSES: 107,
};

function ManageSidebars() {
  const payrollSidebar = document.querySelector(".payroll-sidebar");
  const expensesSidebar = document.querySelector(".expenses-sidebar");
  const adminSidebar = document.querySelector(".admin-sidebar");

  const sidebar = new SidePicker(payrollSidebar);
  const EXsidebar = new SidePicker(expensesSidebar);
  const ADsidebar = new SidePicker(adminSidebar);

  const pdfManager = new PDFManager();

  sidebar.listens();
  EXsidebar.listens();
  ADsidebar.listens();

  const pay_slip_per_client_year_period = document.querySelector(
    ".pay_slip_per_client_year_period"
  );
  const accounts_credited_year_payroll = document.querySelector(
    ".accounts_credited_year_payroll"
  );
  const loan_payments_year_payroll = document.querySelector(
    ".loan_payments_year_payroll"
  );
  const mortuary_control_year_payroll = document.querySelector(
    ".mortuary_control_year_payroll"
  );
  const pay_slip_a_z_year_payroll = document.querySelector(
    ".pay_slip_a_z_year_payroll"
  );
  const total_bank_year_period = document.querySelector(
    ".total_bank_year_period"
  );
  const payroll_year_period = document.querySelector(".payroll_year_period");
  const expenses_petty_cash_period = document.querySelector(
    ".petty_cash_expenses_period"
  );
  const payslip_table = document.querySelector(".main-table-requests");

  let loan_options,
    petty_cash_options,
    total_bank_options,
    az_options,
    mortuary_options,
    account_credited_options;
  let selectedEmployee = null;
  let selectedAll = false;
  let selectedClient = null;
  let accounts_credited_data = null;

  function handlePaySlipPerClient({ year, period }) {
    GetReports(REPORT_TYPES.PAYSLIP_PER_CLIENT, { year, period }).then(
      (res) => {
        payslip_table.innerHTML = res;
        const container = document.querySelector(".per-client-container");
        const listener = new TableListener(container);
        listener.addListeners({
          none: {
            remove: ["delete-request", "view-request"],
            view: ["add-request"],
          },
          select: {
            view: ["delete-request", "view-request"],
          },
          selects: {
            view: ["delete-request"],
            remove: ["view-request"],
          },
        });
        listener.init();
        listener.listen(() => {
          pdfManager.callback = function () {};
          listener.addButtonListener([
            {
              name: "view-request",
              action: (id) => {
                GetReports(REPORT_TYPES.PAYSLIP_PER_CLIENT_INDIVIDUALLY, {
                  year,
                  period,
                  client: id,
                }).then((res) => {
                  pdfManager.preview(
                    REPORT_TYPES.PAYSLIP_PER_CLIENT_INDIVIDUALLY,
                    res,
                    function () {
                      return SavePayslips(
                        REPORT_TYPES.PAYSLIP_PER_CLIENT_INDIVIDUALLY,
                        res
                      );
                    }
                  );
                });
              },
              single: true,
            },
          ]);
        });
      }
    );
  }

  ListenToYearAndPeriodAsOptions(
    pay_slip_per_client_year_period,
    handlePaySlipPerClient
  );
  ListenToYearAndPeriodAsOptions(
    expenses_petty_cash_period,
    (options) => (petty_cash_options = options)
  );
  ListenToYearAndPeriodAsOptions(
    accounts_credited_year_payroll,
    ({ year, period }) => {
      account_credited_options = { year, period };

      GetReports(REPORT_TYPES.ACCOUNT_CREDITED, { year, period }).then(
        (data) => {
          accounts_credited_data = data;

          const bankSelect =
            accounts_credited_year_payroll.querySelector(".bank");

          const banks = [{ value: "all", text: "All" }];

          for (const [key, value] of Object.entries(data)) {
            banks.push({
              value: key,
              text: value[0].bank,
            });
          }

          SetNewComboItems(bankSelect, banks);
        }
      );
    }
  );
  ListenToYearAndPeriodAsOptions(
    loan_payments_year_payroll,
    (options) => {
      loan_options = options;
      GetReports(REPORT_TYPES.LOAN_PAYMENTS, options).then(console.log);
    },
    ["type"]
  );
  ListenToYearAndPeriodAsOptions(
    total_bank_year_period,
    ({ year, period }) => (total_bank_options = { year, period })
  );
  ListenToYearAndPeriodAsOptions(payroll_year_period, ({ year, period }) => {
    GetReports(REPORT_TYPES.PAYROLL, { year, period }).then((data) => {
      console.log(data);
    });
  });
  ListenToYearAndPeriodAsOptions(
    pay_slip_a_z_year_payroll,
    (op) => (az_options = op)
  );
  ListenToYearAndPeriodAsOptions(
    mortuary_control_year_payroll,
    (op) => (mortuary_options = op)
  );

  const by = pay_slip_a_z_year_payroll.querySelector(".by");
  const bySelect = pay_slip_a_z_year_payroll.querySelector(".by_select");

  const selectEmployee =
    pay_slip_a_z_year_payroll.querySelector(".select-employee");
  const selectEmployeeInput = pay_slip_a_z_year_payroll.querySelector(
    "input[name=by_employee]"
  );

  ListenToCombo(by, (_, text) => {
    HideShowComponent(bySelect, text == "Employee", false);
    selectedAll = text == "All";
  });

  selectEmployee.addEventListener("click", () => {
    SelectEmployee().then((employee) => {
      selectEmployeeInput.value = employee.name;
      selectedEmployee = employee;
    });
  });

  const printPayslipAZ = payrollSidebar
    .querySelector("[data-content=pay_slip_a_z]")
    .querySelector(".printBtn");
  const printMortuary = payrollSidebar
    .querySelector("[data-content=mortuary_control]")
    .querySelector(".printBtn");
  const printLoanPayments = payrollSidebar
    .querySelector("[data-content=loan_payments]")
    .querySelector(".printBtn");
  const printTotalBank = payrollSidebar
    .querySelector("[data-content=total_bank]")
    .querySelector(".printBtn");

  const printExpensePetty = expensesSidebar
    .querySelector("[data-content=pettycash]")
    .querySelector(".printBtn");

  const printAccountCredited = payrollSidebar
    .querySelector("[data-content=accounts_credited]")
    .querySelector(".printBtn");

  printAccountCredited.addEventListener("click", () => {
    const bankSelect = accounts_credited_year_payroll.querySelector(".bank");

    const bank = GetComboValue(bankSelect);

    console.log(accounts_credited_data, bank);

    pdfManager.preview(
      REPORT_TYPES.ACCOUNT_CREDITED,
      JSON.stringify({
        options: { ...account_credited_options, bank: bank.value },
        data: accounts_credited_data,
      })
    );
  });

  printPayslipAZ.addEventListener("click", () => {
    az_options.employee_id = selectedEmployee
      ? selectedEmployee.employee_id
      : "all";
    GetReports(REPORT_TYPES.PAYSLIP_AZ, az_options).then((res) => {
      pdfManager.preview(REPORT_TYPES.PAYSLIP_AZ, res, () =>
        SavePayslips(REPORT_TYPES.PAYSLIP_AZ, res)
      );
    });
  });

  printMortuary.addEventListener("click", () => {
    GetReports(REPORT_TYPES.MORTUARY, mortuary_options).then((res) => {
      pdfManager.preview(REPORT_TYPES.MORTUARY, res);
    });
  });

  printLoanPayments.addEventListener("click", () => {
    GetReports(REPORT_TYPES.LOAN_PAYMENTS, loan_options).then((res) => {
      pdfManager.preview(REPORT_TYPES.LOAN_PAYMENTS, res);
    });
  });

  printTotalBank.addEventListener("click", () => {
    const data = {
      ...total_bank_options,
    };
    GetReports(REPORT_TYPES.TOTAL_BANK, JSON.stringify(data)).then((res) => {
      pdfManager.preview(
        REPORT_TYPES.TOTAL_BANK,
        JSON.stringify({
          options: { ...total_bank_options },
          data: res,
        })
      );
    });
  });

  printExpensePetty.addEventListener("click", () => {
    GetReports(
      REPORT_TYPES.PETTY_CASH_EXPENSES,
      expenses_petty_cash_period
    ).then((res) => {
      pdfManager.preview(REPORT_TYPES.PETTY_CASH_EXPENSES, res);
    });
  });

  ManageComboBoxes();
}

function SavePayslips(type, payslips) {
  return new Promise((resolve) => {
    Ajax({
      url: "/api/post/SavePayslips",
      type: "POST",
      data: {
        type,
        data: JSON.stringify(payslips),
      },
      success: (res) => {
        try {
          const response = JSON.parse(res);
          const responses = response.body.responses;
          const error = responses.filter((r) => r.code !== 200).length;
          const success = responses.filter((r) => r.code == 200).length;
          const message = `${success} Success and ${error} Error ${
            error > 0 ? "(Already collected Payslip)" : ""
          }`;
          NewNotification(
            {
              title: response.code === 200 ? "Success" : "Failed",
              message: message,
            },
            7000,
            response.code === 200
              ? NotificationType.SUCCESS
              : NotificationType.ERROR
          );
          resolve(response);
        } catch (e) {
          resolve(null);
        }
      },
    });
  });
}

function Init() {
  const menubar = document.querySelector(".menu-bar-reports");
  const MENUBARLISTENER = new MenuBarListener(menubar);
  MENUBARLISTENER.makeActive(0);
  ManageSidebars();
}

document.addEventListener("DOMContentLoaded", Init);
