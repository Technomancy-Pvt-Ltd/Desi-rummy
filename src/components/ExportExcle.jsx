import React from 'react';
import * as XLSX from 'xlsx';

const ExcelExportButton = ({ data }) => {

   
  const exportToExcel = () => {
    const columnsToDisplay = ['user_name','amount', 'id', 'payment_status', 'transaction_id','createdAt' ];

    const dataArray = data?.map((item) => {
      const selectedColumnsData = {};
      columnsToDisplay?.forEach((column) => {
        selectedColumnsData[column] = item[column];
      });
      return selectedColumnsData;
    });

    const ws = XLSX.utils.json_to_sheet(dataArray);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'All Transaction');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const fileName = 'exported_data.xlsx';
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return <button className='btn bg-btn text-light ' onClick={exportToExcel}>Export to Excel</button>;
};

export default ExcelExportButton;