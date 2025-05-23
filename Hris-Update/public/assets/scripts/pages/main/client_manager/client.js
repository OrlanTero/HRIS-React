import {
    addAttr,
    addHtml, append, CreateElement, GetComboValue,
    HideShowComponent,
    ListenToForm,
    MakeID, ManageAccordions,
    ManageComboBoxes
} from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import {TableListener} from "../../../classes/components/TableListener.js";
import {
    AddRecord, EditRecord,
    RemoveRecords, RemoveRecordsBatch,
    SearchRecords,
    UpdateRecords
} from "../../../modules/app/SystemFunctions.js";
import {NewNotification, NotificationType} from "../../../classes/components/NotificationPopup.js";
import AlertPopup, {AlertTypes} from "../../../classes/components/AlertPopup.js";
import FilterContainer from "../../../classes/components/FilterContainer.js";
import {SelectHoliday} from "../../../modules/app/Administrator.js";
const TARGET = "clients";

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
        primary: "Remove Clients?",
        secondary: `${ids.length} selected`,
        message: "You will remove this client"
    }, {
        alert_type: AlertTypes.YES_NO,
    });

    popup.AddListeners({
        onYes: () => {
            RemoveRecordsBatch(TARGET, {data: JSON.stringify(ids)}).then((res) => {
                console.log(res)
                UpdateData();
            })
        }
    })

    popup.Create().then(() => { popup.Show() })
}

function ViewClientHolidays(id) {
    const popup = new Popup("client_manager/view_client_holidays", {id: id}, {
        backgroundDismiss: false,
    });

    function ManageTable() {
        const TABLE = popup.ELEMENT.querySelector(".main-table-container.table-component");

        if (!TABLE) return;

        const TABLE_LISTENER = new TableListener(TABLE);

        TABLE_LISTENER.singularSelection = true;

        TABLE_LISTENER.addListeners({
            none: {
                remove: ["delete-request"],
                view: ["add-request"],
            },
            select: {
                view: ["delete-request"],
            },
            selects: {
                view: ["delete-request"],
            },
        })

        TABLE_LISTENER.init();

        TABLE_LISTENER.listen(() => {
            TABLE_LISTENER.addButtonListener([
                {
                    name: "add-request",
                    action: () => {
                        SelectHoliday(id).then((res = []) => {
                            Promise.all( res.map(r => r.holiday_id).map(holiday => AddRecord("client_holidays", {data: JSON.stringify({
                                    client_id: id,
                                    holiday_id: holiday
                                })}))).then((res)=> {
                                popup.Remove();
                            });
                        })
                    },
                    single: true
                },
                {
                    name: "delete-request",
                    action: (ids) => {
                        const __P = new AlertPopup({
                            primary: "Remove Holidays?",
                            secondary: `${ids.length} selected`,
                            message: "You will remove this holiday to this client"
                        }, {
                            alert_type: AlertTypes.YES_NO,
                        });

                        __P.AddListeners({
                            onYes: () => {
                                RemoveRecordsBatch("client_holidays", {data: JSON.stringify(ids)}).then((res) => {
                                    popup.Remove();
                                })
                            }
                        })

                        __P.Create().then(() => { __P.Show() })
                    },
                    single: false
                },
            ]);
        });
    }

    function Search(toSearch, filter) {
        SearchRecords("client_holidays", toSearch, filter).then((HTML) => UpdateTable(HTML));
    }

    function UpdateTable(TABLE_HTML) {
        const TABLE_BODY = popup.ELEMENT.querySelector(".main-table-body");

        addHtml(TABLE_BODY, TABLE_HTML);

        ManageTable();
    }

    popup.Create().then((pop) => {
        popup.Show();

        ManageTable();

        const searchEngine = popup.ELEMENT.querySelector(".search-engine input[name=search-records]");

        searchEngine.addEventListener("input", () => {
            Search(searchEngine.value, id)
        })
    });
}

function ViewRequest(id) {
    const popup = new Popup("client_manager/view_client", {id: id}, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const region = form.querySelector(".region");

        const holidaysBtn = pop.ELEMENT.querySelector(".holidays-btn");

        ListenToForm(form, function (data) {
            data['region'] = GetComboValue(region).text;

            EditRecord(TARGET, {id, data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Updated Clients' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData();
            })
        }, ['region', 'mobile', 'telephone', 'email', 'person', 'w_pagibig', 'address', 'vat', 'swfee_1', 'swfee_2', 'swfee_3', 'agency_1', 'agency_2', 'agency_3', 'regular', 'overtime', 'month', 'regular_1', 'overtime_1', 'month_1', 'regular_2', 'overtime_2', 'nightdiff', 'sea', 'cola', 'leave_1', 'uniform', 'allowance', 'head_guard_allowance', 'ctpa', 'legal_holiday', 'special_holiday', 'restday', 'legal_holiday_ot', 'special_holiday_ot'])

        holidaysBtn.addEventListener("click", function () {
            ViewClientHolidays(id);
        })
        
        ManageComboBoxes();
        ManageAccordions();
    }))
}

function AddRequest(id) {
    const popup = new Popup("client_manager/add_new_client", {id: id}, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");

        ListenToForm(form, function (data) {
            AddRecord(TARGET, {data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Added Clients' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData()
            })
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

    const FLTER = new FilterContainer(table,{}, { table: "clients", id: "client_id", control: "CLIENT_CONTROL"});

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
function Init() {
    ManageSearchEngine();
    ManageTable();
}

document.addEventListener("DOMContentLoaded", Init);