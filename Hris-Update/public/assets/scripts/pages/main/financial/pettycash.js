import {
  addAttr,
  addHtml,
  append,
  CreateElement,
  GetComboValue,
  HideShowComponent,
  ListenToForm,
  MakeID,
  ManageComboBoxes,
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
const TARGET = "pettycash";
function UpdateTable(TABLE_HTML) {
  const TABLE_BODY = document.querySelector(".main-table-body");

  addHtml(TABLE_BODY, TABLE_HTML);
  ManageTable();
}

function UpdateData() {
  return UpdateRecords(TARGET).then((HTML) => UpdateTable(HTML));
}

function DeleteRequests(ids) {
  const popup = new AlertPopup(
    {
      primary: "Remove Petty Cash?",
      secondary: `${ids.length} selected`,
      message: "You will remove this petty cash",
    },
    {
      alert_type: AlertTypes.YES_NO,
    }
  );

  popup.AddListeners({
    onYes: () => {
      RemoveRecordsBatch(TARGET, { data: JSON.stringify(ids) }).then((res) => {
        NewNotification(
          {
            title: res.code === 200 ? "Success" : "Failed",
            message:
              res.code === 200
                ? "Successfully Deleted Data"
                : "Task Failed to perform!",
          },
          3000,
          res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR
        );

        UpdateData();
      });
    },
  });

  popup.Create().then(() => {
    popup.Show();
  });
}

function ViewRequest(id) {
  const popup = new Popup(
    "pettycash/view_pettycash",
    { id: id },
    {
      backgroundDismiss: false,
    }
  );

  popup.Create().then((pop) => {
    popup.Show();

    const form = pop.ELEMENT.querySelector("form.form-control");
    const posted = form.querySelector(".posted");
    ListenToForm(form, function (data) {
      data["posted"] = GetComboValue(posted).value;
      EditRecord(TARGET, { id, data: JSON.stringify(data) }).then((res) => {
        NewNotification(
          {
            title: res.code === 200 ? "Success" : "Failed",
            message:
              res.code === 200
                ? "Successfully Updated Cash"
                : "Task Failed to perform!",
          },
          3000,
          res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR
        );

        popup.Remove();

        UpdateData();
      });
    });

    ManageComboBoxes();
  });
}

function AddRequest() {
  const popup = new Popup("pettycash/add_new_pettycash", null, {
    backgroundDismiss: false,
  });

  popup.Create().then((pop) => {
    popup.Show();

    const form = pop.ELEMENT.querySelector("form.form-control");

    ListenToForm(form, function (data) {
      AddRecord(TARGET, { data: JSON.stringify(data) }).then((res) => {
        NewNotification(
          {
            title: res.code === 200 ? "Success" : "Failed",
            message:
              res.code === 200
                ? "Successfully Added Cash"
                : "Task Failed to perform!",
          },
          3000,
          res.code === 200 ? NotificationType.SUCCESS : NotificationType.ERROR
        );

        popup.Remove();

        UpdateData();
      });
    });

    ManageComboBoxes();
  });
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
      remove: ["view-request"],
    },
  });

  TABLE_LISTENER.init();

  TABLE_LISTENER.listen(() => {
    TABLE_LISTENER.addButtonListener([
      {
        name: "add-request",
        action: AddRequest,
        single: true,
      },
      {
        name: "view-request",
        action: ViewRequest,
        single: true,
      },
      {
        name: "delete-request",
        action: DeleteRequests,
        single: false,
      },
    ]);
  });

  ManageButtons(TABLE_LISTENER);
}

function Search(toSearch, filter) {
  SearchRecords(TARGET, toSearch, filter).then((HTML) => UpdateTable(HTML));
}

function ManageSearchEngine() {
  const searchEngine = document.querySelector(
    ".search-engine input[name=search-records]"
  );

  searchEngine.addEventListener("input", () => {
    Search(searchEngine.value);
  });
}
function ManageButtons(table) {
  const filter = document.querySelector(".filter-button");

  const FLTER = new FilterContainer(
    table,
    {},
    { table: "pettycash", id: "pettycash_id", control: "PETTYCASH_CONTROL" }
  );

  FLTER.Create().then(() => {
    FLTER.Hide();

    FLTER.Load();
  });

  FLTER.AddListeners({
    onFilter: function (data) {
      UpdateTable(data);
    },
  });

  filter.addEventListener("click", function () {
    FLTER.Show();
  });
}
function Init() {
  ManageSearchEngine();
  ManageTable();
}

document.addEventListener("DOMContentLoaded", Init);
