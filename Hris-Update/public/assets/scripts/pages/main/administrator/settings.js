
import MenuBarListener from "../../../classes/components/MenuBarListener.js";
import {TableListener} from "../../../classes/components/TableListener.js";
import Popup from "../../../classes/components/Popup.js";
import {
    GetComboValue,
    ListenToForm,
    ListenToYearAndPeriodAsOptions,
    ManageComboBoxes
} from "../../../modules/component/Tool.js";
import {AddRecord, EditRecord, RemoveRecordsBatch} from "../../../modules/app/SystemFunctions.js";
import AlertPopup, {AlertTypes} from "../../../classes/components/AlertPopup.js";
import {NewNotification, NotificationType} from "../../../classes/components/NotificationPopup.js";

function ManageSystemTypes() {
    const systemTypesTables = document.querySelectorAll(".system_type_table .main-table-container.table-component");

    for (const table of systemTypesTables) {
        const category = table.parentNode.parentNode.getAttribute("data-category");
        const addR = () => {
            const popup = new Popup("others/add_new_system_type", null, {
                backgroundDismiss: false,
            });

            popup.Create().then(((pop) => {
                popup.Show();

                const form = pop.ELEMENT.querySelector("form.form-control");
                const affects_in = pop.ELEMENT.querySelector(".affects_in");
                const affects_value = pop.ELEMENT.querySelector(".affects_value");

                ListenToForm(form, function (data) {
                    data.category = category;
                    data.affects_in = GetComboValue(affects_in).value;
                    data.affects_value = GetComboValue(affects_value).value;

                    AddRecord("system_types", {data: JSON.stringify(data)}).then((res) => {
                        popup.Remove();
                    })
                })

                ManageComboBoxes()
            }))
        }

        const viewR = (id) => {
            const popup = new Popup("others/view_system_type", {id}, {
                backgroundDismiss: false,
            });

            popup.Create().then(((pop) => {
                popup.Show();

                const form = pop.ELEMENT.querySelector("form.form-control");
                const affects_in = pop.ELEMENT.querySelector(".affects_in");
                const affects_value = pop.ELEMENT.querySelector(".affects_value");

                ListenToForm(form, function (data) {
                    data.category = category;
                    data.affects_in = GetComboValue(affects_in).value;
                    data.affects_value = GetComboValue(affects_value).value;

                    EditRecord("system_types", {id, data: JSON.stringify(data)}).then((res) => {
                        popup.Remove();
                    })
                })

                ManageComboBoxes()
            }))
        }

        const deleteR = (id) => {}

        const TABLE_LISTENER = new TableListener(table);

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

        TABLE_LISTENER.singularSelection = true;

        TABLE_LISTENER.listen(() => {
            TABLE_LISTENER.addButtonListener([
                {
                    name: "add-request",
                    action: addR,
                    single: true
                },
                {
                    name: "view-request",
                    action: viewR,
                    single: true
                },
                {
                    name: "delete-request",
                    action: deleteR,
                    single: false
                },
            ]);
        });
    }
}

function ManageServiceDeductionTable() {
    const systemTypesTables = document.querySelectorAll(".service_deduction_table .main-table-container.table-component");


    for (const table of systemTypesTables) {
        const category = table.parentNode.parentNode.getAttribute("data-category");

        const addR = () => {
            const popup = new Popup("others/add_new_service_deduction", null, {
                backgroundDismiss: false,
            });

            popup.Create().then(((pop) => {
                popup.Show();

                const form = pop.ELEMENT.querySelector("form.form-control");

                ListenToForm(form, function (data) {
                    data.category = category;

                    AddRecord("service_deduction", {data: JSON.stringify(data)}).then((res) => {
                        popup.Remove();
                    })
                })

                ManageComboBoxes()
            }))
        }

        const deleteR = (ids) => {
            const ppp = new AlertPopup({
                primary: "Remove deployment?",
                secondary: `${ids.length} selected`,
                message: "You will remove this employee to selected client."
            }, {
                alert_type: AlertTypes.YES_NO,
            });

            ppp.AddListeners({
                onYes: () => {
                    RemoveRecordsBatch("service_deduction", {data: JSON.stringify(ids)}).then((res) => {
                        NewNotification({
                            title: res.code === 200 ? 'Success' : 'Failed',
                            message: res.code === 200 ? 'Successfully Deleted Data' : 'Task Failed to perform!'
                        }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                        location.reload();
                    })
                }
            })

            ppp.Create().then(() => { ppp.Show() })

        }

        const TABLE_LISTENER = new TableListener(table);

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
                    action: addR,
                    single: true
                },
                {
                    name: "delete-request",
                    action: deleteR,
                    single: false
                },
            ]);
        });
    }
}

function ManageYPM() {
    const form = document.querySelector("form.year-and-month");
    let options = null;

    const check = ListenToForm(form, function (data) {
        EditRecord("profile", {data: JSON.stringify(options)}).then((res) => {
            NewNotification({
                title: res.code === 200 ? 'Success' : 'Failed',
                message: res.code === 200 ? 'Successfully Updated' : 'Task Failed to perform!'
            }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)
        })
    })

    ListenToYearAndPeriodAsOptions(form, function (op) {
        options = op;

        check(true);
    })
    


    ManageComboBoxes()
}

function ManageDatabases() {
    const form = document.querySelector("form.backup-database");

    ListenToForm(form, function (data) {
        AddRecord("database_backups", {data: JSON.stringify(data)}).then((res) => {
            location.reload();
        })
    })
}

function ManageTables() {
    ManageSystemTypes();
    ManageServiceDeductionTable();
    ManageYPM();
}

function Init() {
    const menubar = document.querySelector(".menu-bar-settings");
    const MENUBARLISTENER = new MenuBarListener(menubar);

    MENUBARLISTENER.makeActive(0);

    ManageTables();

}


document.addEventListener("DOMContentLoaded", Init);
ManageDatabases();
