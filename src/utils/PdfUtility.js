export function downloadPdf(res) {
  const fileName = res.header.get("content-disposition").split('"')[1];
  const type = res.headers["content-type"];
  const blob = new Blob([res.data], {
    type: "application/pdf", //put type:"application/pdf"
    encoding: "UTF-8",
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  link.remove();
}

export function openPdfInNewTab(res) {
  const type = res.headers["content-type"];
  const blob = new Blob([res.data], {
    type: "application/pdf", //put type:"application/pdf"
    encoding: "UTF-8",
  });
  const url = window.URL.createObjectURL(blob);
  const pdfWindow = window.open();
  pdfWindow.location.href = url;
}

export function openPdfInNewWindow(res) {
  let w = window.screen.availWidth;
  let h = window.screen.availHeight;

  const type = res.headers["content-type"];
  const blob = new Blob([res.data], {
    type: "application/pdf", //put type:"application/pdf"
    encoding: "UTF-8",
  });
  const url = window.URL.createObjectURL(blob);
  window.open(
    url,
    "",
    `width=${(2 * w) / 3},height=${h * 0.9},left=${w / 3 - 100}`
  );
}
