import {
    addHtml, ListenToCombo,
    ListenToForm,
    ManageComboBoxes, SetNewComboItems
} from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import {TableListener} from "../../../classes/components/TableListener.js";
import {
    AddRecord, EditRecord,
   RemoveRecordsBatch,
    SearchRecords,
    UpdateRecords
} from "../../../modules/app/SystemFunctions.js";
import {NewNotification, NotificationType} from "../../../classes/components/NotificationPopup.js";
import AlertPopup, {AlertTypes} from "../../../classes/components/AlertPopup.js";
import FilterContainer from "../../../classes/components/FilterContainer.js";
import {GetVatValues} from "../../../modules/app/Administrator.js";
import {SidePicker} from "../../../classes/components/SidePicker.js";
const TARGET = "requisition";

function UpdateTable(TABLE_HTML) {
    const TABLE_BODY = document.querySelector(".main-table-body");

    addHtml(TABLE_BODY, TABLE_HTML);
    ManageTable();
}

function UpdateData() {
    return UpdateRecords(TARGET).then((HTML) => UpdateTable(HTML));
}

function DeleteRequests(ids) {
    const popup = new AlertPopup({
        primary: "Delete Requisition?",
        secondary: `${ids.length} selected`,
        message: "Deleting these requisition, cant be undone!"
    }, {
        alert_type: AlertTypes.YES_NO,
    });

    popup.AddListeners({
        onYes: () => {
            RemoveRecordsBatch(TARGET, {data: JSON.stringify(ids)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Deleted Data' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                UpdateData();
            })
        }
    })

    popup.Create().then(() => { popup.Show() })
}

function ViewRequest(id) {
    const popup = new Popup("requisition/view_requisition", {id}, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const picker = pop.ELEMENT.querySelector('.table-requisition-picker');
        const expenses = pop.ELEMENT.querySelector('.expenses-content');
        const less = pop.ELEMENT.querySelector('.less-content');

        let ExpensesRequisition = [];
        let LessRequisition = [];

        const TABLE_PICKER = new SidePicker(picker);

        ListenToForm(form, function (data) {
            EditRecord(TARGET, {data: JSON.stringify({id, data, requisition: {expenses: ExpensesRequisition, less: LessRequisition}})}).then((res) => {
                popup.Remove();

                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Updated' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                UpdateData()
            })
        })

        TABLE_PICKER.listens();

        ManageRequisitionTable(expenses, ExpensesRequisition, (up) => {
            ExpensesRequisition = up;
        });

        ManageRequisitionTable(less, LessRequisition, (up) => {
            LessRequisition = up;
        });


        ManageComboBoxes()
    }))
}

function ManageRequisitionTable(element, requisition, update) {
    const TABLE = element.querySelector(".main-table-container.table-component");

    if (!TABLE) return;

    const TABLE_LISTENER = new TableListener(TABLE);

    let ALLREQUISITION = requisition;

    const _Add = () => {
        const popup = new Popup("requisition/add_new_expense_less", null, {
            backgroundDismiss: false,
        });

        popup.Create().then((p) => {
            popup.Show();

            const form = p.ELEMENT.querySelector("form.form-control");
            const vat_non_vat = form.querySelector(".vat_non_vat");
            const type = form.querySelector(".type");
            const quantity = form.querySelector('input[name=quantity]');
            const unit_price = form.querySelector('input[name=unit_price]');
            const amount = form.querySelector('input[name=amount]');

            ListenToForm(form, function (data) {
                popup.Remove();

                TABLE_LISTENER.insertItem(requisition.length + 1, [requisition.length + 1,data.type, data.particulars, data.basic_unit, data.quantity, data.unit_price, data.amount ]);

                ALLREQUISITION.push({...data, status: 'created'});

                update(ALLREQUISITION);
            })
            
            ListenToCombo(vat_non_vat, function (value) {
                GetVatValues(value).then((res) => JSON.parse(res)).then((values) => {
                    SetNewComboItems(type, values);
                });
            });

            [quantity, unit_price].forEach((i) => {
                i.addEventListener("input", function () {
                    const q = quantity.value;
                    const p = unit_price.value;
                    const amo = q * p;

                    amount.value = amo;
                })
            })

            ManageComboBoxes();
        })
    }

    const _Del = (id) => {
        TABLE_LISTENER.removeItem(id);

        ALLREQUISITION = ALLREQUISITION.map((b) => {
            if (b.id === id) {
                if (b.status === 'created') {
                    return false;
                } else {
                    return  {...b, status: 'deleted'}
                }
            }
            return b;
        }).filter(b => b);

        update(ALLREQUISITION);
    }

    const _Edit = (id) => {

        const popup = new Popup("requisition/view_requisition_info", {id}, {
            backgroundDismiss: false,
        });

        popup.Create().then(async (p) => {
            popup.Show();

            const form = p.ELEMENT.querySelector("form.form-control");
           // let employee = p.ELEMENT.querySelector(".select-employee");
           // let employeeInput = p.ELEMENT.querySelector("input[name=employee]");
           // let selectedEmployee = await GetEmployee(employee.getAttribute("data-current"));

            ListenToForm(form, function (data) {
                popup.Remove();

                TABLE_LISTENER.updateItem(id, [id, data.type, data.particulars, data.basic_unit, data.quantity, data.unit_price, data.amount]);
                //
                // data['employee_id'] = selectedEmployee.employee_id;
                //
                // delete data['employee'];

                 ALLREQUISITION = ALLREQUISITION.map((b) => {
                    if (b.id === id) {
                        return {...data, id,  status: b.status === 'current' ? 'edited' : 'created'};
                   }

                   return b;
                 });

                update(ALLREQUISITION);

                // beneficiaries.push(data);
            })

            ManageComboBoxes();
        })
    }

    const PlaceCurrents = () => {
        for (const el of TABLE_LISTENER.elements.items) {
            const id = el.getAttribute("data-id");

            ALLREQUISITION.push({id, status: 'current'});
        }

        update(ALLREQUISITION);
    }

    TABLE_LISTENER.addListeners({
        none: {
            remove: ["delete-request","print-request", "view-request", "edit-request"],
            view: ["add-request"],
        },
        select: {
            view: ["delete-request", "view-request", "edit-request", "print-request"],
        },
        selects: {
            view: ["delete-request", "print-request"],
            remove: ["view-request", "edit-request"]
        },
    });

    TABLE_LISTENER.init();

    TABLE_LISTENER.listen(() => {
        TABLE_LISTENER.addButtonListener([
            {
                name: "add-request",
                action: _Add,
                single: true
            },
            {
                name: "delete-request",
                action: _Del,
                single: true
            },
            {
                name: "edit-request",
                action: _Edit,
                single: true
            },
        ]);
    });

    PlaceCurrents();
}
function AddRequest() {
    const popup = new Popup("requisition/add_new_requisition", null, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const picker = pop.ELEMENT.querySelector('.table-requisition-picker');
        const expenses = pop.ELEMENT.querySelector('.expenses-content');
        const less = pop.ELEMENT.querySelector('.less-content');

        let ExpensesRequisition = [];
        let LessRequisition = [];

        const TABLE_PICKER = new SidePicker(picker);

        ListenToForm(form, function (data) {
            AddRecord(TARGET, {data: JSON.stringify({data, requisition: {expenses: ExpensesRequisition, less: LessRequisition}})}).then((res) => {
                popup.Remove();

                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Added' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                UpdateData()
            })
        })

        TABLE_PICKER.listens();

        ManageRequisitionTable(expenses, ExpensesRequisition, (up) => {
            ExpensesRequisition = up;
        });

        ManageRequisitionTable(less, LessRequisition, (up) => {
            LessRequisition = up;
        });

        ManageComboBoxes()
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

    TABLE_LISTENER.listen(() => {
        TABLE_LISTENER.addButtonListener([
            {
                name: "add-request",
                action: AddRequest,
                single: true
            },
            {
                name: "view-request",
                action: ViewRequest,
                single: true
            },
            {
                name: "delete-request",
                action: DeleteRequests,
                single: false
            },
        ]);
    });

    ManageButtons(TABLE_LISTENER);
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
function ManageButtons(table) {
    const filter = document.querySelector(".filter-button");

    const FLTER = new FilterContainer(table,{}, { table: "requisition", id: "requisition_id", control: "REQUISITION_CONTROL"});

    FLTER.Create().then(() => {
        FLTER.Hide();

        FLTER.Load();
    });

    FLTER.AddListeners({onFilter: function (data) {
            UpdateTable(data);
        }});

    filter.addEventListener("click", function () {
        FLTER.Show();
    })

}
function Init() {
    ManageSearchEngine();
    ManageTable();
}

document.addEventListener("DOMContentLoaded", Init);