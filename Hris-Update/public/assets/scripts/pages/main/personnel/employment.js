import {
    addAttr,
    addHtml, append, CreateElement, GetComboValue,
    HideShowComponent,
    ListenToForm, ListenToThisCombo, ListenToYearAndPeriodAsOptions,
    MakeID,
    ManageComboBoxes, SetNewComboItems
} from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import {TableListener} from "../../../classes/components/TableListener.js";
import {
    AddRecord, EditRecord, FilterRecords, GetPeriodOfAYear,
    RemoveRecords, RemoveRecordsBatch,
    SearchRecords,
    UpdateRecords
} from "../../../modules/app/SystemFunctions.js";
import {AddNewBankAccount, SelectEmployee} from "../../../modules/app/Administrator.js";
import {NewNotification, NotificationType} from "../../../classes/components/NotificationPopup.js";
import AlertPopup, {AlertTypes} from "../../../classes/components/AlertPopup.js";
import FilterContainer from "../../../classes/components/FilterContainer.js";
const TARGET = "employment";


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

function DeleteRequests(ids) {
    const popup = new AlertPopup({
        primary: "Delete Employment?",
        secondary: `${ids.length} selected`,
        message: "Deleting these employee, cant be undone!"
    }, {
        alert_type: AlertTypes.YES_NO,
    });

    popup.AddListeners({
onYes: () => {
    console.log(ids)

            RemoveRecordsBatch(TARGET, {data: JSON.stringify(ids)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully deleted' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR);

                UpdateData();
            })
        }
    })

    popup.Create().then(() => { popup.Show() })
}

function ViewRequest(id) {
    const popup = new Popup("employment/view_employement", {id: id}, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const selectemployee = pop.ELEMENT.querySelector(".select-employee");
        const employeeInput = pop.ELEMENT.querySelector("input[name=employee]");
        const active = form.querySelector(".active");
        let selectedEmployee;

        ListenToForm(form, function (data) {
            data['active'] = GetComboValue(active).value;
            if (selectedEmployee) {
                data['employee_id'] = selectedEmployee.employee_id;
            }

            delete data['employee'];

            EditRecord(TARGET, {id, data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully updated' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)


                popup.Remove();

                UpdateData();
            })
        }, []);

        selectemployee.addEventListener("click", function () {
            SelectEmployee().then((employee) => {
                selectedEmployee = employee;
                employeeInput.value = employee.name;
            });
        })

        ManageComboBoxes()
    }))
}

function AddRequest(id) {
    const popup = new Popup("employment/add_new_employment", {id: id}, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const selectemployee = pop.ELEMENT.querySelector(".select-employee");
        const employeeInput = pop.ELEMENT.querySelector("input[name=employee]");
        let selectedEmployee;

        ListenToForm(form, function (data) {

            data['employee_id'] = selectedEmployee.employee_id;
            delete data['employee'];

            AddRecord(TARGET, {data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully added' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData();
            })
        }, []);

        selectemployee.addEventListener("click", function () {
            SelectEmployee().then((employee) => {
                selectedEmployee = employee;
                employeeInput.value = employee.name;
            });
        })


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

    ManageButtons(TABLE_LISTENER)
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

    const FLTER = new FilterContainer(table,{}, { table: "employments", id: "employement_id", control: "EMPLOYMENT_CONTROL"});

    FLTER.Create().then(() => {
        FLTER.Hide();

        FLTER.Load()
    });

    FLTER.AddListeners({onFilter: function (data) {
            UpdateTable(data);
        }});

    filter.addEventListener("click", function () {
        FLTER.Show();
    })

}
function Listens() {
    const yearPeriod = document.querySelector(".year-period");

    ListenToYearAndPeriodAsOptions(yearPeriod, function (options) {
        FilterRecords(TARGET, {data: JSON.stringify(options)}).then(r => {
            UpdateTable(r)
        })
    })
}

function Init() {
    ManageSearchEngine();
    ManageTable();
    Listens();
}

document.addEventListener("DOMContentLoaded", Init);