import {
    addHtml,
    ListenToForm,
    ManageComboBoxes
} from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import { TableListener } from "../../../classes/components/TableListener.js";
import {
    AddRecord,
    EditRecord,
    RemoveRecordsBatch,
    SearchRecords,
    UpdateRecords
} from "../../../modules/app/SystemFunctions.js";
import { NewNotification, NotificationType } from "../../../classes/components/NotificationPopup.js";
import AlertPopup, { AlertTypes } from "../../../classes/components/AlertPopup.js";
import FilterContainer from "../../../classes/components/FilterContainer.js";

const TARGET = "banks";

function updateTable(tableHtml) {
    const tableBody = document.querySelector(".main-table-body");
    addHtml(tableBody, tableHtml);
    manageTable();
}

function updateData() {
    return UpdateRecords(TARGET).then((html) => updateTable(html));
}

function deleteRequests(ids) {
    const popup = new AlertPopup({
        primary: "Delete Banks?",
        secondary: `${ids.length} selected`,
        message: "Deleting these banks cannot be undone!"
    }, {
        alert_type: AlertTypes.YES_NO,
    });

    popup.AddListeners({
        onYes: () => {
            RemoveRecordsBatch(TARGET, { data: JSON.stringify(ids) }).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Deleted Data' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR);

                updateData();
            });
        }
    });

    popup.Create().then(() => popup.Show());
}

function viewRequest(id) {
    const popup = new Popup("banks/view_bank", { id: id }, {
        backgroundDismiss: false,
    });

    popup.Create().then((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");

        ListenToForm(form, function (data) {
            EditRecord(TARGET, { id, data: JSON.stringify(data) }).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Updated Banks' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR);

                popup.Remove();
                updateData();
            });
        });

        ManageComboBoxes();
    });
}

function addRequest() {
    const popup = new Popup("banks/add_new_bank", null, {
        backgroundDismiss: false,
    });

    popup.Create().then((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");

        ListenToForm(form, function (data) {
            AddRecord(TARGET, { data: JSON.stringify(data) }).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Added Banks' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR);

                popup.Remove();
                updateData();
            });
        });

        ManageComboBoxes();
    });
}

function manageTable() {
    const table = document.querySelector(".main-table-container.table-component");

    if (!table) return;

    const tableListener = new TableListener(table);

    tableListener.addListeners({
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

    tableListener.init();

    tableListener.listen(() => {
        tableListener.addButtonListener([
            {
                name: "add-request",
                action: addRequest,
                single: true
            },
            {
                name: "view-request",
                action: viewRequest,
                single: true
            },
            {
                name: "delete-request",
                action: deleteRequests,
                single: false
            },
        ]);
    });

    manageButtons(tableListener);
}

function search(toSearch, filter) {
    SearchRecords(TARGET, toSearch, filter).then((html) => updateTable(html));
}

function manageSearchEngine() {
    const searchEngine = document.querySelector(".search-engine input[name=search-records]");
    searchEngine.addEventListener("input", () => search(searchEngine.value));
}

function manageButtons(table) {
    const filterButton = document.querySelector(".filter-button");
    const filter = new FilterContainer(table, {}, { table: "banks", id: "bank_id", control: "BANK_CONTROL" });

    filter.Create().then(() => {
        filter.Hide();
        filter.Load();
    });

    filter.AddListeners({
        onFilter: function (data) {
            updateTable(data);
        }
    });

    filterButton.addEventListener("click", () => filter.Show());
}

function init() {
    manageSearchEngine();
    manageTable();
}

document.addEventListener("DOMContentLoaded", init);