import Popup from "./Popup.js";
import {
  append,
  CreateElement,
  prepend,
} from "../../modules/component/Tool.js";
// import JsPDF from "../../libraries/jsPDF-master/dist/";

export default class PDFManager {
  constructor(callback) {
    this.callback = callback;
  }

  runCallback() {
    if (this.callback != null) {
      this.callback();
    }
  }

  /**
   * Preview and generate PDF for any report type
   * @param {number} type - Report type from REPORT_TYPES enum
   * @param {object|string} data - Report data
   * @param {function} callback - Optional callback after report generation
   */
  preview(type, data, callback) {
    const manager = this;

    window.jsPDF = window.jspdf.jsPDF;

    const popup = new Popup(
      "reports/view_pdf_report",
      { type, data },
      {
        backgroundDismiss: false,
      }
    );

    popup.Create().then((pop) => {
      popup.Show();

      const form = pop.ELEMENT.querySelector("form.form-control");
      const content = pop.ELEMENT.querySelector(".print-preview-container");
      const header = pop.ELEMENT.querySelector(".print-preview-header");
      const pagesContainer = content.querySelector(".pay-slip-pages");

      // Handle both payslip pages and other report types
      let pages = [];

      if (pagesContainer) {
        // For payslip reports with multiple pages
        pages = content.querySelectorAll(".pay-slip-pages .pay-slip-page");
        this.optimizePayslipPages(pagesContainer, pages);
      } else {
        // For other report types, we'll treat the content as one page
        // but we may need to split it into multiple PDF pages
        pages = [content];
      }

      const downloadReport = async function (e) {
        manager.runCallback();

        e.preventDefault();
        var doc = new jsPDF("p", "mm");
        const docWidth = doc.internal.pageSize.getWidth();
        const docHeight = doc.internal.pageSize.getHeight();

        // Get report title for filename
        const titleElement = header.querySelector(".title");
        const reportTitle = titleElement ? titleElement.textContent : "report";
        const safeFilename =
          reportTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".pdf";

        // First render the header - it will be used on every page
        const headerCanvas = await html2canvas(header, {
          useCORS: true,
          allowTaint: true,
          scale: 2, // Higher quality
        });

        const headerImgData = headerCanvas.toDataURL("image/png");
        const headerImgProps = doc.getImageProperties(headerImgData);
        const headerPdfWidth = docWidth;
        const headerPdfHeight =
          (headerImgProps.height * headerPdfWidth) / headerImgProps.width;

        // For payslip-style reports that already have page breaks
        if (pagesContainer) {
          const createPages = Promise.all(
            [...pages].map(async (page, i) => {
              // Add a new page for each page after the first
              if (i !== 0) {
                doc.addPage("p", "mm");
              }

              // Add header to each page
              doc.addImage(
                headerImgData,
                "PNG",
                0,
                0,
                headerPdfWidth,
                headerPdfHeight
              );

              // Render the page content
              return html2canvas(page, {
                useCORS: true,
                allowTaint: true,
                scale: 2, // Higher quality
              }).then((canvas) => {
                const imgData = canvas.toDataURL("image/png");
                const imgProps = doc.getImageProperties(imgData);
                const pdfWidth = docWidth;
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                // Add the content below the header
                doc.addImage(
                  imgData,
                  "PNG",
                  0,
                  headerPdfHeight + 5, // Add spacing after header
                  pdfWidth,
                  pdfHeight
                );

                return true;
              });
            })
          );

          createPages.then(() => doc.save(safeFilename));
        } else {
          // For table-based reports that might need automatic page breaks
          // First render the content
          const contentCanvas = await html2canvas(content, {
            useCORS: true,
            allowTaint: true,
            scale: 2,
            // Remove the header from the rendered content
            onclone: function (clonedDoc) {
              const clonedHeader = clonedDoc.querySelector(
                ".print-preview-header"
              );
              if (clonedHeader) {
                clonedHeader.style.display = "none";
              }
            },
          });

          const contentImgData = contentCanvas.toDataURL("image/png");
          const contentImgProps = doc.getImageProperties(contentImgData);
          const contentPdfWidth = docWidth;
          const contentPdfHeight =
            (contentImgProps.height * contentPdfWidth) / contentImgProps.width;

          // Calculate how many pages we'll need
          const availableHeight = docHeight - headerPdfHeight - 10; // 10mm for margins
          const totalPages = Math.ceil(contentPdfHeight / availableHeight);

          // Create each page
          for (let i = 0; i < totalPages; i++) {
            if (i > 0) {
              doc.addPage();
            }

            // Add header to each page
            doc.addImage(
              headerImgData,
              "PNG",
              0,
              0,
              headerPdfWidth,
              headerPdfHeight
            );

            // Calculate which portion of the content to show on this page
            const sourceY =
              i * availableHeight * (contentImgProps.width / contentPdfWidth);
            const sourceHeight = Math.min(
              availableHeight * (contentImgProps.width / contentPdfWidth),
              contentCanvas.height - sourceY
            );

            // Only add content if there's something to show
            if (sourceHeight > 0) {
              doc.addImage(
                contentImgData,
                "PNG",
                0, // x on the PDF
                headerPdfHeight + 5, // y on the PDF
                contentPdfWidth, // width on the PDF
                (sourceHeight * contentPdfWidth) / contentImgProps.width, // height on the PDF
                null, // alias
                "FAST", // compression
                0, // rotation
                sourceY, // y on the source image
                contentImgProps.width, // width on the source image
                sourceHeight // height on the source image
              );
            }
          }

          doc.save(safeFilename);
        }
      };

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (callback) {
          callback().then(() => {
            downloadReport(e);
          });
        } else {
          downloadReport(e);
        }
      });
    });
  }

  /**
   * Optimize payslip pages to ensure proper page breaks
   */
  optimizePayslipPages(pagesContainer, pages) {
    const sampleDoc = new jsPDF("p", "mm");
    const docHeight = sampleDoc.internal.pageSize.getHeight();

    const initPages = (ppp, ind) => {
      if (ppp[ind]) {
        const ph =
          (parseFloat(ppp[ind].getBoundingClientRect().height) * 25.4) / 96 -
          20;

        if (ph >= docHeight) {
          const nextPage =
            ppp[ind + 1] ??
            (() => {
              const el = CreateElement({
                el: "DIV",
                className: "pay-slip-page",
              });

              append(pagesContainer, el);

              ppp = pagesContainer.querySelectorAll(".pay-slip-page");

              return el;
            })();

          if (nextPage) {
            const fragment = document.createDocumentFragment();
            const all = ppp[ind].querySelectorAll(".pay-slip-container");
            const last = all[all.length - 1];

            append(fragment, last);

            prepend(nextPage, fragment);

            initPages(ppp, ind + 1);
          }
        }
      }
    };

    initPages(pages, 0);
  }

  /**
   * Generic report viewer that supports all report types
   * @param {number} type - Report type from REPORT_TYPES enum
   * @param {object} data - Report data
   * @param {object} options - Additional options for the report
   */
  previewGenericReport(type, data, options = {}) {
    this.preview(
      type,
      typeof data === "string"
        ? data
        : JSON.stringify({
            data: data,
            options: options,
          }),
      options.callback
    );
  }
}
