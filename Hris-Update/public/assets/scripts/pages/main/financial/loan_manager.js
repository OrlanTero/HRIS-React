import {
    addAttr,
    addHtml, append, CreateElement, generateRandomBinary, GetComboValue,
    HideShowComponent, ListenToCombo,
    ListenToForm, ListenToThisCombo, ListenToYearAndPeriodAsOptions,
    MakeID,
    ManageComboBoxes, SetNewComboItems,
    ToggleComponentCl,
    ToggleComponentClass
} from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import {TableListener} from "../../../classes/components/TableListener.js";
import {
    AddRecord, EditRecord, FilterRecords,
    RemoveRecords, RemoveRecordsBatch,
    SearchRecords,
    UpdateRecords,
    PostRequest
} from "../../../modules/app/SystemFunctions.js";
import {
    GetOverAllLoanBalanceOfEmployee,
    SelectEmployee, SelectEmployment,
    SelectLoans,
} from "../../../modules/app/Administrator.js";
import {NewNotification, NotificationType} from "../../../classes/components/NotificationPopup.js";
import AlertPopup, {AlertTypes} from "../../../classes/components/AlertPopup.js";
import MenuBarListener from "../../../classes/components/MenuBarListener.js";

const TARGET = "loan_manager";

const OPTIONS = {
    year: null,
    period: null
};

function UpdateTable(TABLE_HTML) {
    const TABLE_BODY = document.querySelector(".main-table-body");

    addHtml(TABLE_BODY, TABLE_HTML);
    ManageTable();
}

function UpdateData() {
    return UpdateRecords(TARGET).then((HTML) => UpdateTable(HTML));
}

function AddNewLoan() {
    const popup = new Popup("loan_manager/new_loan", null, {
        backgroundDismiss: false,
    });

    popup.Create().then((res) => {
        popup.Show();

        const form = popup.ELEMENT.querySelector("form.form-control");
        const loan_type = form.querySelector(".loan_type");
        const selectemployee = popup.ELEMENT.querySelector(".select-employee");
        const employeeInput = popup.ELEMENT.querySelector("input[name=employee]");
        const paymentType = popup.ELEMENT.querySelector(".payment_type");
        let selectedEmployee;

        ListenToForm(form, function (data) {

            data['loan_type'] = GetComboValue(loan_type).value;
            data['employee_id'] = selectedEmployee.employee_id;
            data['balance'] = data.amount;
            data['payment_type'] = GetComboValue(paymentType).value;
            delete data['employee'];

            AddRecord("loans", {data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully added' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData();
            })
        }, ["target_date", "description"]);

        selectemployee.addEventListener("click", function () {
            SelectEmployee().then((employee) => {
                selectedEmployee = employee;
                employeeInput.value = employee.name;
            });
        })

        ManageComboBoxes();

    });
}

function AddNewPayment() {
    const popup = new Popup("loan_manager/new_payment", null, {
        backgroundDismiss: false,
    });

    popup.Create().then((res) => {
        popup.Show();

        const form = popup.ELEMENT.querySelector("form.form-control");
        const loan_type = form.querySelector(".loan_type");
        const selectemployee = popup.ELEMENT.querySelector(".select-employee");
        const employeeInput = popup.ELEMENT.querySelector("input[name=employee]");
        const selectLoans = popup.ELEMENT.querySelector(".select-loans");
        const loansInput = popup.ELEMENT.querySelector("input[name=loans]");
        const toPay = popup.ELEMENT.querySelector("input[name=to_pay]");
        const balance = popup.ELEMENT.querySelector("input[name=balance]");
        let selectedEmployee;
        let selectedLoans;

        ListenToForm(form, function (data) {
            data['employee_id'] = selectedEmployee.employee_id;
            data['loans'] = selectedLoans.map((l) => l.loan_id).join(',');
            data['loan_types'] = selectedLoans.map((l) => l.loan_type).join(',');
            data['to_pay'] = toPay.value;

            delete data['employee'];

            AddRecord("loan_payments", {data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully added' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData();
            })
        }, ["note"]);

        selectemployee.addEventListener("click", function () {
            SelectEmployee().then((employee) => {
                selectedEmployee = employee;
                employeeInput.value = employee.name;

                GetOverAllLoanBalanceOfEmployee(employee.employee_id).then((res) => {
                    balance.value = res;
                });
            });
        })

        selectLoans.addEventListener("click", function () {
            if (selectedEmployee) {
                SelectLoans(selectedEmployee.employee_id).then((loans) => {
                    console.log(loans)
                    selectedLoans = loans;
                    loansInput.value = loans.map(l => l.description).join(", ");
                    toPay.value = loans.map(l => l.balance).reduce((a,b) => a + b);
                });
            } else {
                alert("Please select Employee!")
            }
        })

        ListenToYearAndPeriodAsOptions(popup.ELEMENT, function (op) {
        })

    });
}

function SetupPaymentOption(data) {
    return new Promise((resolve, reject) => {
        const popup = new Popup("loan_manager/setup_payment_option", null, {
            backgroundDismiss: false,
        });
    
        popup.Create().then(() => {
            popup.Show();

            const form = popup.ELEMENT.querySelector("form.form-control");
            const principal = popup.ELEMENT.querySelector("input[name=principal]");
            const payableBy = popup.ELEMENT.querySelector(".payable_by");
            const interestRate = popup.ELEMENT.querySelector(".interest_rate");
            const backBtn = popup.ELEMENT.querySelector(".back-button");
            const paymentStatement = popup.ELEMENT.querySelector(".payment-statement-preview .preview-content");
            const interestValue = popup.ELEMENT.querySelector("input[name=interest_value]");
            let statements = [];
            principal.value = data.amount;

            function getOrdinalSuffix(number) {
                const j = number % 10,
                      k = number % 100;
                if (j == 1 && k != 11) {
                    return "st";
                }
                if (j == 2 && k != 12) {
                    return "nd";
                }
                if (j == 3 && k != 13) {
                    return "rd";
                }
                return "th";
            }

            const generatePaymentStatement = (principal, payableBy, interestRate) => {
                paymentStatement.innerHTML = "";

                const currentDate = new Date();
                let startDate = new Date(currentDate);
                
                // Adjust to the next 1-15 or 16-30 period
                if (currentDate.getDate() <= 15) {
                    startDate.setDate(16);
                } else {
                    startDate.setMonth(startDate.getMonth() + 1);
                    startDate.setDate(1);
                }

                // Ensure all inputs are valid numbers
                const principalAmount = parseFloat(principal) || 0;
                const payableByNum = parseInt(payableBy) || 1;
                const interestRateNum = parseFloat(interestRate) || 0;

                statements = new Array(payableByNum).fill(0).map((_, i) => {
                    const interest = principalAmount * (interestRateNum / 100);
                    const total = principalAmount + interest;
                    const installment = total / payableByNum;

                    const paymentDate = new Date(startDate);
                    paymentDate.setDate(paymentDate.getDate() + i * 15);

                    const statementStartDate = new Date(paymentDate);
                    const statementEndDate = new Date(paymentDate);

                    if (paymentDate.getDate() <= 15) {
                        statementStartDate.setDate(1);
                        statementEndDate.setDate(15);
                    } else {
                        statementStartDate.setDate(16);
                        statementEndDate.setMonth(statementEndDate.getMonth() + 1, 0); // Last day of the month
                    }

                    const element = CreateElement({
                        el: "DIV",
                        className: "payment-statement",
                        childs: [
                            CreateElement({
                                el: "DIV",
                                className: "statement-head",
                                html: `${i + 1}${getOrdinalSuffix(i + 1)} Payment`
                            }),
                            CreateElement({
                                el: "DIV",
                                className: "statement-body",
                                childs: [
                                    CreateElement({
                                        el: "P",
                                        html: isNaN(installment) ? "Invalid input" : installment.toFixed(2)
                                    }),
                                    CreateElement({
                                        el: "SPAN",
                                        html: `Payment Date: ${paymentDate.toLocaleDateString()}`
                                    }),
                                    CreateElement({
                                        el: "BR",
                                    }),
                                    CreateElement({
                                        el: "SPAN",
                                        html: `Period: ${statementStartDate.toLocaleDateString()} - ${statementEndDate.toLocaleDateString()}`
                                    })
                                ]
                            })
                        ]
                    });

                    append(paymentStatement, element);

                    return {
                        start_date: statementStartDate.toISOString().split('T')[0],
                        end_date: statementEndDate.toISOString().split('T')[0],
                        amount: installment.toFixed(2),
                        num: i + 1,
                        label: `${i + 1}${getOrdinalSuffix(i + 1)} Payment`
                    };
                });
            }

            ListenToCombo(payableBy, function (a) {
                generatePaymentStatement(principal.value, a, GetComboValue(interestRate).value);
            });

            ListenToCombo(interestRate, function (a) {
                generatePaymentStatement(principal.value, GetComboValue(payableBy).value, a);

                interestValue.value = (principal.value * (a / 100)).toFixed(2);
            });

            backBtn.addEventListener("click", function () {
                popup.Hide();

                reject(popup);
            });

            ListenToForm(form, function (data) {
                data['principal'] = principal.value;
                data['payable_by'] = GetComboValue(payableBy).value;
                data['interest_rate'] = GetComboValue(interestRate).value;

                delete data['interest_value'];

                popup.Remove();

                resolve({data, statements});
            });

            ManageComboBoxes();
        });

    });
}

function AddNewAdvanceLoan() {
    const popup = new Popup("loan_manager/new_advance_loan", null, {
        backgroundDismiss: false,
    });

    popup.Create().then((res) => {
        popup.Show();

        const form = popup.ELEMENT.querySelector("form.form-control");
        const loan_type = form.querySelector(".loan_type");
        const selectemployee = popup.ELEMENT.querySelector(".select-employee");
        const paymentType = popup.ELEMENT.querySelector(".payment_type");
        const employeeInput = popup.ELEMENT.querySelector("input[name=employee]");
        let selectedEmployee;

        const check = ListenToForm(form, function (data) {

            data['loan_type'] = GetComboValue(loan_type).value;
            data['employee_id'] = selectedEmployee.employee_id;
            data['balance'] = data.amount;
            data['payment_type'] = GetComboValue(paymentType).value;
            data['advance'] = 1;

            delete data['employee'];

            SetupPaymentOption(data).then((res) => {
                AddRecord("loan_advance", {data: JSON.stringify({...data, ...res.data}), statements: JSON.stringify(res.statements)}).then((res) => {
                    console.log(res);
                    NewNotification({
                        title: res.code === 200 ? 'Success' : 'Failed',
                        message: res.code === 200 ? 'Successfully added' : 'Task Failed to perform!'
                    }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                    popup.Remove();

                    UpdateData();
                })
            }).catch((p) => {

                check(true);
            });

  
        }, ["target_date", "description"]);

        selectemployee.addEventListener("click", function () {
            SelectEmployee().then((employee) => {
                selectedEmployee = employee;
                employeeInput.value = employee.name;
            });
        })

        ManageComboBoxes();

    });
}

function AddRequest() {
    const popup = new Popup("loan_manager/show_manager", null, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const loanBtn = pop.ELEMENT.querySelector(".new-loan-btn");
        const paymentBtn = pop.ELEMENT.querySelector(".new-payment-btn");
        const forwardBtn = pop.ELEMENT.querySelector(".forward-balance");
        const menubar = popup.ELEMENT.querySelector(".menu-bar-loan-manager");
        const selectEmployeeone = pop.ELEMENT.querySelector(".select-employee-one");
        const employeeInputone = pop.ELEMENT.querySelector("input[name=employee_id]");
        const selectEmployeetwo = pop.ELEMENT.querySelector(".select-employee-two");
        const employeeInputtwo = pop.ELEMENT.querySelector("input[name=employee_id_two]");
        const total_loan = pop.ELEMENT.querySelector("input[name=total_loan]");
        const total_payment = pop.ELEMENT.querySelector("input[name=total_payment]");
        const MENUBARLISTENER = new MenuBarListener(menubar);

        let selectedEployee, selectedEployee1;

        const mainLoanTable = pop.ELEMENT.querySelector(".main-loan-table");
        const mainPaymentTable = pop.ELEMENT.querySelector(".main-payment-table");

        const newAdvanceLoanBtn = pop.ELEMENT.querySelector(".new-advance-loan-btn");
        const searchAdvanceLoanBtn = pop.ELEMENT.querySelector(".search-advance-btn");

        const searchAdvanceLoanParent = pop.ELEMENT.querySelector(".search-advanceloan");
        const menuBarParent = pop.ELEMENT.querySelector(".menu-tab-control-parent");

        const manageSearchAdvanceLoan = () => {
            const start_date = pop.ELEMENT.querySelector("input[name=start_date]");
            const end_date = pop.ELEMENT.querySelector("input[name=end_date]");
            const search_employee = pop.ELEMENT.querySelector("input[name=search]");
            const resultContainer = pop.ELEMENT.querySelector(".main-result-container");
            const selectEmployee = pop.ELEMENT.querySelector(".search_employee");
            const searchEmployeeInput = pop.ELEMENT.querySelector("input[name=search_employee]");
            const advanceCheckbox = pop.ELEMENT.querySelector("input[name=advance]");
            const totalLoan = pop.ELEMENT.querySelector("input[name=all_total_loan]");
            const totalBalance = pop.ELEMENT.querySelector("input[name=all_total_balance]");

            let selectedEmployee;

            const computeTotal = () => {
                const cards = pop.ELEMENT.querySelectorAll(".advance-loan-card");
                let total_loan = 0;
                let tttotal_balance = 0;

                cards.forEach((card) => {
                    const amount = card.querySelector("span[data-amount=true]");
                    const balance = card.querySelector("span[data-balance=true]");

                    total_loan += parseFloat(amount.textContent.replace("₱", "").replace(/,/g, ''));
                    tttotal_balance += parseFloat(balance.textContent.replace("₱", "").replace(/,/g, ''));

                })

                totalLoan.value = total_loan;
                totalBalance.value = tttotal_balance;
            }

            const doRealSearch = (data) => {

                PostRequest("SearchAdvanceLoan", {data: JSON.stringify(data)}).then((res) => {
                    resultContainer.innerHTML = res;

                    computeTotal();
                })
            }

            const search = () => {
                const data = {
                    start_date: start_date.value || undefined,
                    end_date: end_date.value || undefined,
                    search: search_employee.value || undefined,
                    employee_id: selectedEmployee ? selectedEmployee.employee_id : undefined,
                    advance: advanceCheckbox.checked ? undefined : 1
                };

                const filteredData = Object.fromEntries(
                    Object.entries(data).filter(([_, value]) => value !== undefined)
                );

                doRealSearch(filteredData);
            }

            [start_date, end_date, search_employee].forEach((input) => {
                input.addEventListener("input", function () {
                    search();
                })
            })

            selectEmployee.addEventListener("click", function () {
                SelectEmployee().then((employee) => {
                    selectedEmployee = employee;
                    searchEmployeeInput.value = employee.name;
                    
                    search();
                })
            })

            advanceCheckbox.addEventListener("change", function () {
                search();
            })

            computeTotal();
        }

        const addListenerToTable = (TABLE) => {
            const TABLE_LISTENER = new TableListener(TABLE);

            TABLE_LISTENER.init();

            TABLE_LISTENER.disableSelections();

            TABLE_LISTENER.listen(() => {
                
            })
        }

        const updateLoanTable = (TABLE_HTML)=> {
            const TABLE_BODY = document.querySelector(".main-loan-table");

            addHtml(TABLE_BODY, TABLE_HTML);
            ManageTable();
        }

        const updatePaymentsTable = (TABLE_HTML)=> {
            const TABLE_BODY = document.querySelector(".main-payment-table");

            addHtml(TABLE_BODY, TABLE_HTML);
            ManageTable();
        }

        MENUBARLISTENER.makeActive(0);

        addListenerToTable(mainLoanTable);
        addListenerToTable(mainPaymentTable);

        loanBtn.addEventListener("click", function () {
            AddNewLoan();
        });

        paymentBtn.addEventListener("click", function () {
            AddNewPayment();
        });

        forwardBtn.addEventListener("click", function () {

        });

        newAdvanceLoanBtn.addEventListener("click", function () {
            AddNewAdvanceLoan();
        });

        searchAdvanceLoanBtn.addEventListener("click", function () {
            ToggleComponentCl(searchAdvanceLoanBtn, "active");
            ToggleComponentCl(searchAdvanceLoanParent, "hidden-component");
            ToggleComponentCl(menuBarParent, "hidden-component");
        });

        selectEmployeeone.addEventListener("click", function() {
            SelectEmployee().then((employee) => {

                selectedEployee = employee;
                employeeInputone.value = employee.name;

                FilterRecords("loan_manager_loans", {id: employee.employee_id}).then((res) => {
                    const response = JSON.parse(res);

                    total_loan.value = response.total;

                    updateLoanTable(response.table);
                })
            })
        });

        selectEmployeetwo.addEventListener("click", function() {
            SelectEmployee().then((employee) => {
                selectedEployee1 = employee;
                employeeInputtwo.value = employee.name;

                FilterRecords("loan_manager_payments", {id: employee.employee_id}).then((res) => {
                    const response = JSON.parse(res);

                    total_payment.value = response.total;

                    updatePaymentsTable(response.table);
                })
            })
        });

        manageSearchAdvanceLoan();
        ManageComboBoxes();
    }))
}


function ManageTable() {
    const TABLE = document.querySelector(".main-table-container.table-component");

    if (!TABLE) return;

    const TABLE_LISTENER = new TableListener(TABLE);

    TABLE_LISTENER.addListeners({
        none: {
            remove: ["delete-request", "view-request"],
            view: ["add-request"],
        },
        select: {
            view: ["delete-request", "view-request"],
        },
        selects: {
            view: ["delete-request"],
            remove: ["view-request"]
        },
    });

    TABLE_LISTENER.init();

    TABLE_LISTENER.disableSelections();

    TABLE_LISTENER.listen(() => {
        TABLE_LISTENER.addButtonListener([
            {
                name: "add-request",
                action: AddRequest,
                single: true
            }
        ]);
    });
}

function Search(toSearch, filter) {
    SearchRecords(TARGET, toSearch, filter).then((HTML) => UpdateTable(HTML));
}

function ManageSearchEngine() {
    const searchEngine = document.querySelector(".search-engine input[name=search-records]");

    searchEngine.addEventListener("input", () => {
        Search(searchEngine.value)
    })
}


function Init() {
    ManageSearchEngine();
    ManageTable();
}

document.addEventListener("DOMContentLoaded", Init);