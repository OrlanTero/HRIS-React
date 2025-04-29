import {
  addClass,
  append,
  ChunkArray,
  CreateCheckBox,
  CreateElement,
  GetComboValue,
  HideShowComponent,
  ListenToCombo,
  ListenToThisCombo,
  RemoveAllListenerOf,
  removeClass,
  ResetActiveComponent,
  SetActiveComponent,
  ToggleComponentClass,
} from "../../modules/component/Tool.js";
import { FloatingContainer, POSITIONS } from "./FloatingContainer.js";

export class TableListener {
  constructor(parent) {
    this.parent = parent;
    this.elements = this.initElements(parent);
    this.listeners = {};
    this.conditions = [];
    this.buttons = [];
    this.selected = [];
    this.toggleIndex = [];
    this.singularSelection = false;
    this.enableSelection = true;
    this.selectAsObject = false;
    this.toggleColumn = true;
    this.pagination = {
      max: 10,
      current: 1,
      items: [],
      searchContent: [],
      searchItems: [],
      footer: null,
    };
    this.isLoading = false;
    this.loadingOverlay = null;

    // Create loading overlay and show it immediately
    this.createLoadingOverlay();
    this.showLoading();

    // Delay the initialization slightly to ensure the loading overlay is visible
    setTimeout(() => {
      this.activatePagination();
      this.activateSorting();
    }, 50);
  }

  // Create a loading overlay element
  createLoadingOverlay() {
    this.loadingOverlay = document.createElement("div");
    this.loadingOverlay.className = "table-loading-overlay";
    this.loadingOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      transition: opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
    `;

    // Create spinner element
    const spinner = document.createElement("div");
    spinner.className = "loading-spinner";
    spinner.style.cssText = `
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-radius: 50%;
      border-top: 4px solid #3498db;
      animation: table-spin 1s linear infinite;
    `;

    // Create loading text
    const loadingText = document.createElement("div");
    loadingText.className = "loading-text";
    loadingText.textContent = "Loading...";
    loadingText.style.cssText = `
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    `;

    // Add animation style if it doesn't already exist
    if (!document.getElementById("table-spinner-style")) {
      const style = document.createElement("style");
      style.id = "table-spinner-style";
      style.textContent = `
        @keyframes table-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }

    // Append elements to overlay
    this.loadingOverlay.appendChild(spinner);
    this.loadingOverlay.appendChild(loadingText);

    // Add overlay to parent element (ensure parent has position: relative or equivalent)
    if (this.parent && !this.parent.querySelector(".table-loading-overlay")) {
      // Force relative positioning if parent is static
      if (window.getComputedStyle(this.parent).position === "static") {
        this.parent.style.position = "relative";
      }
      this.parent.appendChild(this.loadingOverlay);
    }
  }

  // Show loading state
  showLoading() {
    if (this.loadingOverlay) {
      this.isLoading = true;
      // Make sure it's visible immediately
      this.loadingOverlay.style.display = "flex";
      this.loadingOverlay.style.opacity = "1";
      this.loadingOverlay.style.pointerEvents = "auto";
    }
  }

  // Hide loading state
  hideLoading() {
    if (this.isLoading && this.loadingOverlay) {
      this.isLoading = false;
      this.loadingOverlay.style.opacity = "0";
      this.loadingOverlay.style.pointerEvents = "none";

      // Add event listener to handle transition end
      const transitionEndHandler = () => {
        if (this.loadingOverlay.style.opacity === "0") {
          this.loadingOverlay.style.display = "none";
        }
        this.loadingOverlay.removeEventListener(
          "transitionend",
          transitionEndHandler
        );
      };

      this.loadingOverlay.addEventListener(
        "transitionend",
        transitionEndHandler
      );
    }
  }

  setToggleIndex(indexes) {
    this.toggleIndex = indexes;
  }

  initElements(parent) {
    return {
      header: parent.querySelector(".grid-table-header"),
      body: parent.querySelector(".grid-table-body"),
      checkbox: parent.querySelector(
        ".grid-table-header .custom-checkbox-parent input"
      ),
      items: [...parent.querySelectorAll(".grid-table-body .body-item")],
      backup: [...parent.querySelectorAll(".grid-table-body .body-item")],
    };
  }

  addListeners(listeners = {}) {
    this.listeners = listeners;
  }

  addButtons(buttons = []) {
    this.buttons = buttons;
  }

  buttonExist(name) {
    for (const button of this.buttons) {
      if (button.name === name) {
        return button;
      }
    }

    return false;
  }

  search(toSearch) {
    this.showLoading();

    const searchContent = [];

    for (const tr of this.pagination.items) {
      const tds = tr.querySelectorAll("td");

      const searchForMatch = [...tds].filter((td) =>
        new RegExp("\\b" + toSearch + "\\b").test(td.innerText)
      );

      if (searchForMatch.length) {
        searchContent.push(tr);
      }
    }

    this.pagination.searchContent = searchContent;
    this.pagination.current = 1;
    this.reactivatePagination();

    setTimeout(() => this.hideLoading(), 300); // Add a slight delay for visual feedback
  }
  init() {
    for (const obj of Object.values(this.listeners)) {
      for (const value of Object.values(obj)) {
        if (Array.isArray(value)) {
          for (const val of value) {
            if (!Array.isArray(val)) {
              if (!this.buttonExist(val)) {
                const button = this.parent.querySelector(
                  `.table-button[data-name=${val}]`
                );

                if (button) {
                  this.buttons.push({
                    name: val,
                    element: RemoveAllListenerOf(button),
                  });
                }
              }
            } else {
              if (!this.buttonExist(val[0])) {
                const button = this.parent.querySelector(
                  `.table-button[data-name=${val[0]}]`
                );

                this.conditions.push(val);
                this.buttons.push({
                  name: val[0],
                  element: RemoveAllListenerOf(button),
                });
              }
            }
          }
        }
      }
    }
  }

  resetAllListenerItems() {
    for (const item of this.elements.items) {
      RemoveAllListenerOf(item);
    }
  }

  insertItem(id, values) {
    const tableBody = this.elements.body;
    const element = CreateElement({
      el: "TR",
      className: "body-item",
      attr: {
        "data-id": id,
      },
      childs: [
        CreateElement({
          el: "TD",
          child: CreateCheckBox(),
        }),
        ...values.map((text) =>
          CreateElement({
            el: "TD",
            text: text,
          })
        ),
      ],
    });

    append(tableBody, element);

    this.addListenerToItem(element);

    this.elements = this.initElements(this.parent);
  }

  listen(callback) {
    this.showLoading();

    const checkbox = this.elements.checkbox;

    // this.resetAllListenerItems();

    if (this.selected.length === 0) {
      this.executeListener("none");
    }

    for (const item of this.elements.items) {
      this.addListenerToItem(item);
    }

    if (checkbox) {
      checkbox.addEventListener("click", () => {
        if (checkbox.checked) {
          this.selectAll();
        } else {
          this.unselectAll();
        }
      });
    }

    callback && callback();

    // Hide loading after a short delay
    setTimeout(() => this.hideLoading(), 200);
  }

  addListenerToItem(item) {
    item.addEventListener("click", (evt) => {
      const id = item.getAttribute("data-id");
      this.selectItem(id, evt.shiftKey, evt.ctrlKey);
    });
  }

  selectAll() {
    for (const item of this.elements.items) {
      const id = item.getAttribute("data-id");

      if (!this.selected.includes(id)) {
        this.selectItem(id);
      }
    }
  }

  unselectAll() {
    for (const item of this.elements.items) {
      const id = item.getAttribute("data-id");

      if (this.selected.includes(id)) {
        this.selectItem(id);
      }
    }
  }

  executeListener(name, ...values) {
    if (this.listeners[name]) {
      const listener = this.listeners[name];

      if (listener.view && listener.view.length) {
        for (const btn of listener.view) {
          if (Array.isArray(btn)) {
            if (this.compareValue(this.selected, btn[1][0], btn[1][1])) {
              this.viewButton(btn[0]);
            } else {
              this.removeButton(btn[0]);
            }
          } else {
            this.viewButton(btn);
          }
        }
      }

      if (listener.remove && listener.remove.length) {
        for (const btn of listener.remove) {
          this.removeButton(btn);
        }
      }
    }
  }

  resetButtons() {
    for (const btn of this.buttons) {
      this.removeButton(btn.name);
    }
  }

  viewButton(name) {
    for (const button of this.buttons) {
      if (button.name === name) {
        HideShowComponent(button.element, true);
      }
    }
  }

  removeButton(name) {
    for (const button of this.buttons) {
      if (button.name === name) {
        HideShowComponent(button.element, false);
      }
    }
  }

  selectItem(id, PRESS_SHIFT, PRESS_CTRL) {
    if (this.enableSelection) {
      for (const item of this.elements.items) {
        if (item.getAttribute("data-id") == -1) {
          return;
        }
        if (item.getAttribute("data-id") === id) {
          const selected = this.selected.includes(id);
          const checkbox = item.querySelector("input");

          ToggleComponentClass(item, "selected", !selected);

          checkbox.checked = !selected;

          if (PRESS_SHIFT) {
            if (this.selected.length) {
              console.log(this.selected, item);
            }
          } else if (PRESS_CTRL) {
          } else {
            if (selected) {
              this.selected = this.selected.filter((i) => i !== id);
            } else {
              this.selected.push(id);
            }
          }

          this.update();
        } else if (this.singularSelection) {
          const checkbox = item.querySelector("input");

          ToggleComponentClass(item, "selected", false);

          if (checkbox) {
            checkbox.checked = false;
          }

          this.selected = this.selected.filter(
            (i) => i !== item.getAttribute("data-id")
          );

          this.update();
        }
      }
    }
  }

  update() {
    if (this.selected.length === 0) {
      this.executeListener("none");
    } else if (this.selected.length === 1) {
      this.executeListener("select", this.selected[0]);
    } else {
      this.executeListener("selects", this.selected);
    }

    this.elements.checkbox.checked =
      this.selected.length === this.elements.items.length;
  }

  updateContent() {
    this.showLoading();
    this.elements = this.initElements(this.parent);
    this.listen();
    setTimeout(() => this.hideLoading(), 200);
  }

  getAsObject(id) {
    if (Array.isArray(id)) {
      const all = [];

      for (const ii of id) {
        const obj = this.getAsObject(ii);

        all.push(obj);
      }

      return all;
    }

    const header = this.getHeaderTextLists();
    const body = this.getBodyTextLists(id);

    return header
      .map((head, index) => {
        return {
          text: head,
          value: body[index],
        };
      })
      .filter((ob) => ob.text.length !== 0 && ob.value.length !== 0);
  }

  addButtonListener(listeners) {
    for (const listener of listeners) {
      const button = this.buttonExist(listener.name);

      if (button) {
        button.element.addEventListener("click", () => {
          if (listener.action) {
            if (listener.selectAsObject) {
              console.log(this.selected);
              listener.action(
                listener.single
                  ? this.getAsObject(this.selected[0])
                  : this.getAsObject(this.selected)
              );
            } else {
              listener.action(
                listener.single ? this.selected[0] : this.selected
              );
            }
          }

          if (listener.toggle) {
            ToggleComponentClass(
              button.element,
              "active",
              !button.element.classList.contains("active")
            );
          }
        });
      }
    }
  }

  compareValue(selected, colTarget, colCompare) {
    for (const sel of selected) {
      const rowID = this.getRowIDOfValue(sel);
      const targetValue = this.getValue(rowID, colTarget);
      const texts = colCompare.split("|");

      if (texts.includes(targetValue)) {
        return true;
      }
    }

    return false;
  }

  getValue(row, column) {
    const rows = this.elements.items;

    if (rows.length) {
      if (rows[row]) {
        const columns = rows[row].querySelectorAll("td");
        return columns[column].textContent;
      }
    }

    return null;
  }

  getRowIDOfValue(sel) {
    let index = 0;
    for (const item of this.elements.items) {
      if (item.getAttribute("data-id") === sel) {
        return index;
      }
      index++;
    }

    return -1;
  }

  removeItem(id) {
    for (const item of this.elements.items) {
      if (item.getAttribute("data-id") === id) {
        item.remove();
      }
    }
  }

  updateItem(id, values) {
    for (const item of this.elements.items) {
      if (item.getAttribute("data-id") === id) {
        const tds = item.querySelectorAll("td");

        for (let i = 1; i < tds.length; i++) {
          tds[i].innerText = values[i - 1];
        }
      }
    }
  }

  disableSelections() {
    this.enableSelection = false;
  }

  createFooter() {
    const obj = this;
    let maxButton = this.pagination.items.flat(1).length / this.pagination.max;

    maxButton =
      maxButton % 1 == 0 ? parseInt(maxButton) : parseInt(maxButton) + 1;

    const getPaginationChilds = () => {
      const buttons = [...new Array(maxButton)];

      return buttons.map((b, i) => {
        return CreateElement({
          el: "DIV",
          className: ["item", "hide-component"],
          child: CreateElement({
            el: "SPAN",
            text: i + 1,
          }),
          listener: {
            click: () => {
              obj.viewPage(i + 1);
            },
          },
        });
      });
    };

    return CreateElement({
      el: "div",
      className: "main-table-footer",
      childs: [
        CreateElement({
          el: "DIV",
          className: "footer-left",
          child: CreateElement({
            el: "DIV",
            className: ["text", "changing-text"],
            child: CreateElement({
              el: "SPAN",
              text: "0 / 0",
            }),
          }),
        }),
        CreateElement({
          el: "DIV",
          className: "footer-right",
          child: CreateElement({
            el: "DIV",
            className: "pagination-buttons",
            child: [
              CreateElement({
                el: "DIV",
                className: ["pagination-button", "icon-button"],
                child: CreateElement({
                  el: "DIV",
                  child: CreateElement({
                    el: "SPAN",
                    text: "FIRST",
                  }),
                }),
                listener: {
                  click: () => {
                    this.viewPage(1);
                  },
                },
              }),
              CreateElement({
                el: "DIV",
                className: ["pagination-button", "prev-button", "icon-button"],
                childs: [
                  CreateElement({
                    el: "DIV",
                    className: "icon",
                    html: `<svg width="256px" height="256px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M160,212a3.98805,3.98805,0,0,1-2.82861-1.17163l-80-80a4,4,0,0,1,0-5.65674l80-80a4.00009,4.00009,0,0,1,5.65722,5.65674L85.65674,128l77.17187,77.17163A4,4,0,0,1,160,212Z"/>
                                                </svg>`,
                  }),
                ],
                listener: {
                  click: () => {
                    this.viewPage(this.pagination.current - 1);
                  },
                },
              }),
              CreateElement({
                el: "SPAN",
                className: "items",
                childs: getPaginationChilds(),
              }),
              CreateElement({
                el: "DIV",
                className: ["pagination-button", "next-button", "icon-button"],
                childs: [
                  CreateElement({
                    el: "DIV",
                    className: "icon",
                    html: `<svg width="256px" height="256px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M96,212a4,4,0,0,1-2.82861-6.82837L170.34326,128,93.17139,50.82837a4.00009,4.00009,0,0,1,5.65722-5.65674l80,80a4,4,0,0,1,0,5.65674l-80,80A3.98805,3.98805,0,0,1,96,212Z"/>
                                                </svg>`,
                  }),
                ],
                listener: {
                  click: () => {
                    this.viewPage(this.pagination.current + 1);
                  },
                },
              }),
              CreateElement({
                el: "DIV",
                className: ["pagination-button", "icon-button"],
                child: CreateElement({
                  el: "DIV",
                  child: CreateElement({
                    el: "SPAN",
                    text: "LAST",
                  }),
                }),
                listener: {
                  click: () => {
                    // console.log(maxButton)
                    this.viewPage(maxButton);
                  },
                },
              }),
            ],
          }),
        }),
      ],
    });
  }

  activatePagination() {
    this.showLoading();

    // Wrap in setTimeout to allow UI to update before processing
    setTimeout(() => {
      this.pagination.items = ChunkArray(
        this.elements.items,
        this.pagination.max
      );

      const oldFooter = this.parent.querySelector(".main-table-footer");

      if (oldFooter) {
        oldFooter.remove();
      }

      this.pagination.footer = this.createFooter();

      this.parent.appendChild(this.pagination.footer);

      this.pagination.changingText = this.pagination.footer.querySelector(
        ".changing-text span"
      );

      this.viewPage(this.pagination.current);

      this.hideLoading();
    }, 100);
  }

  viewPage(number) {
    if (this.pagination.items.length) {
      if (number > this.pagination.items.length || number == 0) return;

      if (number <= this.pagination.items.length || number > 0) {
        const items = this.pagination.items[number - 1];

        for (let i = 0; i < this.pagination.items.length; i++) {
          if (i !== number - 1) {
            for (let j = 0; j < this.pagination.items[i].length; j++) {
              HideShowComponent(this.pagination.items[i][j], false, false);
            }
          }
        }

        for (const item of items) {
          removeClass(item, "hide-component");
        }

        this.pagination.current = number;
        this.pagination.viewed = this.pagination.items
          .slice(0, number)
          .map((a) => a.length)
          .reduce((a, b) => a + b);
        this.pagination.outof = this.elements.items.length;

        this.pagination.changingText.innerText = `${this.pagination.viewed} / ${this.pagination.outof}`;
        this.changePaginationActive();
      }
    }
  }

  changePaginationActive() {
    const footer = this.pagination.footer;
    const items = footer.querySelectorAll(".pagination-buttons .items .item");

    ResetActiveComponent(items);

    SetActiveComponent(
      [...items].filter(
        (i) => parseInt(i.innerText.trim()) === this.pagination.current
      )[0],
      true
    );

    items.forEach((item) => {
      const index = parseInt(item.innerText.trim());

      let isNearEnd = items.length - this.pagination.current <= 10;
      let min = isNearEnd ? items.length - 10 : this.pagination.current - 5;
      let max = this.pagination.current + 5;

      HideShowComponent(item, index >= min && index <= max);
    });
  }

  reactivatePagination() {
    this.showLoading();

    // Wrap in setTimeout to allow UI to update before processing
    setTimeout(() => {
      this.pagination.searchItems = ChunkArray(
        this.pagination.searchContent,
        this.pagination.max
      );

      this.viewPage(this.pagination.current);

      this.hideLoading();
    }, 100);
  }

  activateSorting() {
    const obj = this;
    const header = this.parent.querySelector(".main-table-header");
    const right = header.querySelector(".right");
    const headerList = this.getHeaderTextLists();
    const before = right.querySelector(".sort-button");

    const float = new FloatingContainer(
      {
        name: "global/sortTable",
        data: { data: JSON.stringify(headerList) },
      },
      {
        margin: { left: -250, top: -50 },
        place: true,
        excepts: [],
        disableClickOutside: false,
        flex: false,
      }
    );

    const element = CreateElement({
      el: "DIV",
      className: ["icon-button", "sort-button"],
      childs: [
        CreateElement({
          el: "DIV",
          className: "icon",
          html: `
                        <svg width="256px" height="256px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                          <path d="M114.82812,173.17187a3.99854,3.99854,0,0,1,0,5.65625l-31.998,31.99854a4.0363,4.0363,0,0,1-.61133.5c-.09912.06592-.20605.11133-.30957.168a4.12418,4.12418,0,0,1-.37939.19971,4.00212,4.00212,0,0,1-.40284.125c-.11474.03369-.22509.07812-.34375.10156a3.91693,3.91693,0,0,1-1.5664,0c-.11866-.02344-.22852-.06787-.34326-.10156a3.811,3.811,0,0,1-.40333-.12549,3.983,3.983,0,0,1-.37841-.19873c-.10352-.05664-.21094-.10254-.31055-.16846a4.0363,4.0363,0,0,1-.61133-.5L45.17187,178.82812a3.99957,3.99957,0,0,1,5.65625-5.65625L76,198.34326V48a4,4,0,0,1,8,0V198.34326l25.17187-25.17139A3.99854,3.99854,0,0,1,114.82812,173.17187Zm96-96-31.998-31.998a4.01482,4.01482,0,0,0-.61133-.50049c-.09961-.06641-.207-.11182-.311-.16846a3.80146,3.80146,0,0,0-.37744-.19873,4.0525,4.0525,0,0,0-.40332-.12549c-.11523-.03369-.22509-.07812-.34424-.10156a3.99819,3.99819,0,0,0-.75781-.07666c-.00879,0-.0166-.00244-.0249-.00244s-.01611.00244-.0249.00244a3.99819,3.99819,0,0,0-.75781.07666c-.11866.02344-.229.06738-.34327.10156a3.908,3.908,0,0,0-.40429.12549,3.83906,3.83906,0,0,0-.37647.19824c-.104.05665-.2124.10254-.312.169a4.01482,4.01482,0,0,0-.61133.50049l-31.998,31.998a3.99957,3.99957,0,0,0,5.65625,5.65625L172,57.65674V208a4,4,0,0,0,8,0V57.65674l25.17187,25.17138a3.99957,3.99957,0,0,0,5.65625-5.65625Z"/>
                        </svg>`,
        }),
        CreateElement({
          el: "DIV",
          className: "text",
          child: CreateElement({
            el: "SPAN",
            text: "Sort",
          }),
        }),
      ],
      listener: {
        click: () => {
          let active = null;
          float.showAt(
            right,
            {
              onLoad: (parent) => {
                const combo = parent.querySelector(".sort_type");
                const items = parent.querySelectorAll(".just-a-list li.item");

                ListenToThisCombo(combo, (data) => {
                  obj.sortTable(
                    headerList.indexOf(active) + 1,
                    GetComboValue(combo).value
                  );
                });

                for (const item of items) {
                  item.addEventListener("click", function () {
                    const __text = item.innerText;
                    ResetActiveComponent(items);

                    float.hide();

                    active = __text;

                    obj.sortTable(
                      headerList.indexOf(__text) + 1,
                      GetComboValue(combo).value
                    );

                    item.classList.add("active");
                  });
                }
              },
            },
            POSITIONS.botRight
          );
        },
      },
    });

    if (before) {
      before.remove();
    }

    if (right) {
      append(right, element);
    }
  }

  sortTable(index, dir = "asc") {
    this.showLoading();

    // Wrap in setTimeout to allow UI to update before processing
    setTimeout(() => {
      const table = this.parent.querySelector("table");
      const tbody = table.querySelector("tbody");
      const rows = Array.from(tbody.querySelectorAll("tr"));

      const compareFunction = (a, b) => {
        const cellA = a.cells[index];
        const cellB = b.cells[index];

        if (!cellA || !cellB) return 0;

        const valueA = this.getCellValue(cellA);
        const valueB = this.getCellValue(cellB);

        if (valueA === valueB) return 0;

        if (dir === "asc") {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      };

      rows.sort(compareFunction);

      // Use DocumentFragment for better performance
      const fragment = document.createDocumentFragment();
      rows.forEach((row) => fragment.appendChild(row));

      tbody.innerHTML = "";
      tbody.appendChild(fragment);

      this.elements.items = rows;
      this.activatePagination();

      this.hideLoading();
    }, 100);
  }

  getCellValue(cell) {
    const content = cell.textContent.trim();

    // Try parsing as date
    const date = new Date(content);
    if (!isNaN(date.getTime())) return date;

    // Try parsing as number
    const num = parseFloat(content);
    if (!isNaN(num)) return num;

    // Handle '-' as 0
    if (content === "-") return 0;

    // Default to lowercase string
    return content.toLowerCase();
  }

  sortying() {}
  getHeaderTextLists() {
    if (!this.elements.header) return [];
    return [...this.elements.header.querySelectorAll("th")]
      .map((th) => th.innerText)
      .filter((a) => a && a.length)
      .map((b) => b.trim())
      .map((c) => (c == "NO" ? "ID" : c));
  }

  getBodyEntryTextLists() {
    if (!this.elements.header) return [];
    return [...this.elements.header.querySelectorAll("th")]
      .map((th) => th.getAttribute("data-t"))
      .filter((a) => a && a.length)
      .map((b) => b.trim())
      .map((c) => (c == "no" ? "id" : c));
  }

  getRow(id) {
    return this.elements.items.filter((item) => {
      return item.getAttribute("data-id") == id;
    })[0];
  }

  getBodyTextLists(id) {
    const item = this.getRow(id);
    const arr = [...item.querySelectorAll("td")].map((td) =>
      td.innerText.trim()
    );

    arr.shift();

    return arr;
  }

  toggleColumns() {
    this.toggleColumn = !this.toggleColumn;

    const isToggle =
      this.parent.querySelector("table").getAttribute("data-is-toggle") ==
      "true";

    if (isToggle) {
      this.elements.header.querySelectorAll("th").forEach((e, i) => {
        if (e.getAttribute("data-toggle") == "true") {
          e.setAttribute(
            "data-toggle-value",
            this.toggleColumn ? "true" : "false"
          );
        }
      });

      for (const tr of this.elements.items) {
        const tds = tr.querySelectorAll("td");

        tds.forEach((e) => {
          if (e.getAttribute("data-toggle") == "true") {
            e.setAttribute(
              "data-toggle-value",
              this.toggleColumn ? "true" : "false"
            );
          }
        });
      }
    }
  }
}
