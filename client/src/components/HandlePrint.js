export const HandlePrint = () => {
  const printContent = document.getElementById("leads-table");
  const printWindow = window.open("", "", "width=900,height=700");

  printWindow.document.write(`
    <html>
      <head>
        <title>Leads Report</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 8px;
            border: 1px solid #ccc;
            text-align: left;
            font-size: 14px;
          }
          th {
            background: #8A4B00;
            color: white;
          }
        </style>
      </head>
      <body>
        ${printContent.outerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};
