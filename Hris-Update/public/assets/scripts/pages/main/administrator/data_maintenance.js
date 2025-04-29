import { ManageComboBoxes } from "../../../modules/component/Tool.js";
import Popup from "../../../classes/components/Popup.js";
import { TableListener } from "../../../classes/components/TableListener.js";
import MenuBarListener from "../../../classes/components/MenuBarListener.js";
import {
  DeleteArchive,
  RestoreArchive,
} from "../../../modules/app/Administrator.js";
import AlertPopup, {
  AlertTypes,
  AlertStatusType,
} from "../../../classes/components/AlertPopup.js";
import {
  NewNotification,
  NotificationType,
} from "../../../classes/components/NotificationPopup.js";

function ViewRequest(id) {
  const popup = new Popup(
    "disbursement/view_disbursement",
    { id: id },
    {
      backgroundDismiss: false,
    }
  );

  popup.Create().then((pop) => {
    popup.Show();
    ManageComboBoxes();
  });
}

function ManageTable() {
  const tables = document.querySelectorAll(
    ".main-table-container.table-component"
  );

  tables.forEach((TABLE) => {
    if (!TABLE) return;

    const TABLE_LISTENER = new TableListener(TABLE);

    TABLE_LISTENER.pagination.max = 20;
    // TABLE_LISTENER.disableSelections();

    TABLE_LISTENER.addListeners({
      none: {
        remove: ["view-request"],
        view: ["delete-request", "restore-request"],
      },
      select: {
        view: ["view-request"],
      },
      selects: {
        view: [],
        remove: ["view-request"],
      },
    });

    TABLE_LISTENER.init();

    TABLE_LISTENER.listen(() => {
      TABLE_LISTENER.addButtonListener([
        {
          name: "view-request",
          action: ViewRequest,
          single: true,
        },
        {
          name: "delete-request",
          action: DeleteRequest,
          single: false,
        },
        {
          name: "restore-request",
          action: RestoreRequest,
          single: false,
        },
      ]);
    });
  });
}

function DeleteRequest(ids) {
  const alertPopup = new AlertPopup(
    {
      primary: "Confirm Permanent Deletion",
      secondary: `Are you sure you want to permanently delete ${ids.length} selected archive(s)? This action cannot be undone.`,
    },
    {
      status_type: AlertStatusType.ERROR,
      alert_type: AlertTypes.YES_NO,
    }
  );

  alertPopup.AddListeners({
    onYes: () => {
      DeleteArchive(ids).then((res) => {
        if (res.success) {
          NewNotification(
            {
              title: "Success",
              message: res.message || "Records deleted successfully",
            },
            5000,
            NotificationType.SUCCESS
          );
          // Reload the page to refresh the table
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          NewNotification(
            {
              title: "Error",
              message: res.message || "Failed to delete records",
            },
            5000,
            NotificationType.ERROR
          );
        }
      });
    },
  });

  alertPopup.Create();
}

function RestoreRequest(ids) {
  const alertPopup = new AlertPopup(
    {
      primary: "Confirm Restoration",
      secondary: `Are you sure you want to restore ${ids.length} selected archive(s)?`,
    },
    {
      status_type: AlertStatusType.INFO,
      alert_type: AlertTypes.YES_NO,
    }
  );

  alertPopup.AddListeners({
    onYes: () => {
      RestoreArchive(ids).then((res) => {
        if (res.success) {
          NewNotification(
            {
              title: "Success",
              message: res.message || "Records restored successfully",
            },
            5000,
            NotificationType.SUCCESS
          );
          // Reload the page to refresh the table
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          NewNotification(
            {
              title: "Error",
              message: res.message || "Failed to restore records",
            },
            5000,
            NotificationType.ERROR
          );
        }
      });
    },
  });

  alertPopup.Create();
}

function InitTabs() {
  const menubar = document.querySelector(".menu-bar-maintenance");
  const MENUBARLISTENER = new MenuBarListener(menubar);
  MENUBARLISTENER.makeActive(0); // Start with first tab active
}

function Init() {
  InitTabs();
  ManageTable();
}

document.addEventListener("DOMContentLoaded", Init);
