import {
  addHtml,
  GetComboValue,
  ListenToCombo,
  ListenToForm,
  ManageComboBoxes,
  SetNewComboItems,
} from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import { TableListener } from "../../../classes/components/TableListener.js";
import {
  AddRecord,
  EditRecord,
  RemoveRecords,
  RemoveRecordsBatch,
  SearchRecords,
  UpdateRecords,
} from "../../../modules/app/SystemFunctions.js";
import {
  NewNotification,
  NotificationType,
} from "../../../classes/components/NotificationPopup.js";
import AlertPopup, {
  AlertTypes,
} from "../../../classes/components/AlertPopup.js";
import FilterContainer from "../../../classes/components/FilterContainer.js";
import {
  GetAvailablePeriodAttendance,
  GetPayrollTableOf,
  SelectClient,
  SelectEmployee,
} from "../../../modules/app/Administrator.js";

const TARGET = "payroll";

let TABLE_LISTENER;

function UpdateTable(TABLE_HTML) {
  const TABLE_BODY = document.querySelector(".main-table-body");

  addHtml(TABLE_BODY, TABLE_HTML);
  ManageTable();
}

function UpdateData() {
  return UpdateRecords(TARGET).then((HTML) => UpdateTable(HTML));
}

function AddRequest() {
  const popup = new Popup("payroll/view_new_payroll", null, {
    backgroundDismiss: false,
  });

  popup.Create().then((pop) => {
    popup.Show();

    const form = pop.ELEMENT.querySelector("form.form-control");
    const selecClient = pop.ELEMENT.querySelector(".select-client");
    const period = pop.ELEMENT.querySelector(".period");
    const employeeInput = pop.ELEMENT.querySelector("input[name=client]");
    let selectedClient;
    console.log(period);

    const check = ListenToForm(form, function () {
      const attendance_group = GetComboValue(period).value;

      GetPayrollTableOf(attendance_group).then((table) => {
        UpdateTable(table);
        popup.Remove();
      });

      /*  AddRecord(TARGET, {data: JSON.stringify(data)}).then((res) => {
                NewNotification({
                    title: res.code === 200 ? 'Success' : 'Failed',
                    message: res.code === 200 ? 'Successfully Added Banks' : 'Task Failed to perform!'
                }, 3000, res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR)

                popup.Remove();

                UpdateData()
            })*/
    });

    selecClient.addEventListener("click", function () {
      SelectClient()
        .then((client) => {
          selectedClient = client;
          employeeInput.value = client.name;
          check(true);
          return client;
        })
        .then((c) => GetAvailablePeriodAttendance(c.client_id))
        .then((periods) => {
          SetNewComboItems(
            period,
            periods.map((p) => {
              return {
                text: p.period + " - " + p.year,
                value: p.attendance_group_id,
              };
            })
          );

          ListenToCombo(period, () => check(true));

          check(true);
        });
    });

    ManageComboBoxes();
  });
}

function ViewDetailRequest(data) {
  console.log(data);
  const popup = new Popup(
    "payroll/view_payroll_detail",
    { data: JSON.stringify(data) },
    {
      backgroundDismiss: false,
    }
  );

  popup.Create().then((pop) => {
    popup.Show();
  });
}

function ManageTable() {
  const TABLE = document.querySelector(".main-table-container.table-component");

  if (!TABLE) return;

  TABLE_LISTENER = new TableListener(TABLE);

  TABLE_LISTENER.addListeners({
    none: {
      remove: ["delete-request", "view-detail-request"],
      view: ["add-request", "view-request"],
    },
    select: {
      view: ["delete-request", "view-request", "view-detail-request"],
    },
    selects: {
      view: ["view-request", "view-detail-request"],
      remove: [],
    },
  });

  TABLE_LISTENER.init();

  // TABLE_LISTENER.setToggleIndex([27,28, 29,30, 31]);

  TABLE_LISTENER.singularSelection = true;
  TABLE_LISTENER.selectAsObject = true;

  TABLE_LISTENER.listen(() => {
    TABLE_LISTENER.addButtonListener([
      {
        name: "add-request",
        action: AddRequest,
        single: true,
      },
      {
        name: "view-detail-request",
        action: ViewDetailRequest,
        single: true,
        selectAsObject: true,
      },
      {
        name: "view-request",
        toggleText: "Min View",
        action: () => {
          TABLE_LISTENER.toggleColumns();
        },
        single: true,
        toggle: true,
      },
    ]);
  });
}

function Search(toSearch, filter) {
  SearchRecords(TARGET, toSearch, filter).then((HTML) => UpdateTable(HTML));
}

function ManageSearchEngine() {
  const searchEngine = document.querySelector(
    ".search-engine input[name=search-records]"
  );

  searchEngine.addEventListener("input", () => {
    TABLE_LISTENER.search(searchEngine.value);
  });
}

function Init() {
  ManageTable();
  ManageSearchEngine();
}

document.addEventListener("DOMContentLoaded", Init);
