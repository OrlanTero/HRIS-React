import {
    addHtml, GetComboValue, HideShowComponent,
    ListenToForm, ListenToThisCombo,
    ManageComboBoxes
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
import {SelectBank, SelectRequisition} from "../../../modules/app/Administrator.js";
const TARGET = "disbursement";

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
        primary: "Remove Disbursement?",
        secondary: `${ids.length} selected`,
        message: "You will remove this disbursement"
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
    const popup = new Popup("disbursement/view_disbursement", {id: id}, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const posted = form.querySelector(".posted");
        const cancelled = form.querySelector(".cancelled");
        ListenToForm(form, function (data) {

            data['posted'] = GetComboValue(posted).value;
            data['cancelled'] = GetComboValue(cancelled).value;
            EditRecord(TARGET, {id, data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Updated ' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData()
            })
        })

        ManageComboBoxes()
    }))
}

function AddRequest() {
    const popup = new Popup("disbursement/add_new_disbursement", null, {
        backgroundDismiss: false,
    });

    popup.Create().then(((pop) => {
        popup.Show();

        const form = pop.ELEMENT.querySelector("form.form-control");
        const selectrequisition = pop.ELEMENT.querySelector(".select-request");
        const selectBank = pop.ELEMENT.querySelector(".select-bank-request");
        const inputRemarks = pop.ELEMENT.querySelector("input[name=request]");
        const amountInput = pop.ELEMENT.querySelector("input[name=amount]");
        const voucherInput = pop.ELEMENT.querySelector("input[name=voucher]");
        const payments = pop.ELEMENT.querySelector(".payments");
        const forCheque = pop.ELEMENT.querySelector('.fields-for-cheque');
        const forBank = pop.ELEMENT.querySelector('.fields-for-bank');
        const bankInput = pop.ELEMENT.querySelector('input[name=bank_id]');

        let selectedRequsition;
        let selectedBank;

        ListenToForm(form, function (data) {
            data['requisition_id'] = selectedRequsition.requisition_id;
            data['bank_id'] = selectedBank.bank_id;
            data['voucher'] = voucherInput.value;

            AddRecord(TARGET, {data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Added Disbursement' : res.message
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData()
            });
        },['request', "cheque_number", "cheque_date", "bank_id"])

        selectrequisition.addEventListener("click", function () {
            SelectRequisition().then((requisition) => {
                selectedRequsition = requisition;
                inputRemarks.value = requisition.req_id;
                amountInput.value = requisition.balance;
            });
       })

        selectBank.addEventListener("click", function () {
            SelectBank().then((bank) => {
                selectedBank = bank;
                bankInput.value = bank.name + " (" + bank.branch + ")";
            })
        })

        ListenToThisCombo(payments, function (a, b) {
            HideShowComponent(forCheque, b === "CHEQUE", false);
            HideShowComponent(forBank, b === "CHEQUE" || b === "BANK TRANSFER", false);
        })

        ManageComboBoxes()
    }))
}

function PrintRequest(ids) {
    window.jsPDF = window.jspdf.jsPDF;

    const popup = new Popup("disbursement/print_report", {ids}, {
        backgroundDismiss: false,
    });

    popup.Create().then(() => {
        popup.Show();

        const form = popup.ELEMENT.querySelector("form.form-control");
        const content = popup.ELEMENT.querySelector(".print-preview-containers");
        const pages = popup.ELEMENT.querySelectorAll(".print-preview-containers .print-preview-container");
        const prepWidth = parseInt(content.getBoundingClientRect().width);

        const downloadBaby = async function (e) {
            e.preventDefault();

            const doc = new jsPDF('p','mm');

            const createPages = Promise.all([...pages].map(async (page, i) => {
                return html2canvas(page, {
                    useCORS: true,
                    allowTaint: true,
                    width: prepWidth,
                }).then((canvas) => {
                    const imgData = canvas.toDataURL(
                        'image/png');
                    const imgProps= doc.getImageProperties(imgData);
                    const pdfWidth = doc.internal.pageSize.getWidth();
                    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                    if (i !== 0) {
                        doc.addPage('p','mm');
                    }

                    doc.addImage(imgData, 'PNG', 5 , 5, pdfWidth - 10, pdfHeight);

                    return pdfHeight;
                })
            }))

            createPages.then(() => doc.save('disbursement-'+ Date.now() +'.pdf'));
        };


        form.addEventListener('submit', downloadBaby)

    });
}

function ManageTable() {
    const TABLE = document.querySelector(".main-table-container.table-component");

    if (!TABLE) return;

    const TABLE_LISTENER = new TableListener(TABLE);

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
            {
                name: "print-request",
                action: PrintRequest,
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

    const FLTER = new FilterContainer(table,{}, { table: "disbursement", id: "disbursement_id", control: "DISBURSEMENT_CONTROL"});

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