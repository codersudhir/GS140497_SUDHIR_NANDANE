import React, { useState, useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { format } from 'date-fns';

interface PlanningCellData {
  salesUnits: number;
  salesDollars: number;
  gmDollars: number;
  gmPercentage: number;
}

const PlanningPage: React.FC = () => {
  const [rowData, setRowData] = useState([
    {
      store: 'Nashville Melody Music Store',
      sku: 'Rugged Utility Jacket',
      'week01_salesUnits': 200.00,
      'week01_salesDollars': 8998.00,
      'week01_gmDollars': 8512.00,
      'week01_gmPercentage': 94.60,
      'week02_salesUnits': 0.00,
      'week02_salesDollars': 0.00,
      'week02_gmDollars': 8512.00,
      'week02_gmPercentage': 94.60,
    },
    // Add more sample data here
  ]);

  const getGmPercentageClass = (value: number) => {
    if (value >= 40) return 'bg-green-500 text-white';
    if (value >= 10) return 'bg-yellow-400';
    if (value > 5) return 'bg-orange-400';
    return 'bg-red-500 text-white';
  };

  const columnDefs = useMemo(() => [
    { field: 'store', headerName: 'Store', pinned: 'left', width: 200 },
    { field: 'sku', headerName: 'SKU', pinned: 'left', width: 200 },
    {
      headerName: 'Week 01',
      children: [
        {
          field: 'week01_salesUnits',
          headerName: 'Sales Units',
          editable: true,
          type: 'numericColumn',
          width: 120,
        },
        {
          field: 'week01_salesDollars',
          headerName: 'Sales Dollars',
          valueFormatter: (params: any) => 
            params.value ? `$ ${params.value.toFixed(2)}` : '$ 0.00',
          width: 120,
        },
        {
          field: 'week01_gmDollars',
          headerName: 'GM Dollars',
          valueFormatter: (params: any) => 
            params.value ? `$ ${params.value.toFixed(2)}` : '$ 0.00',
          width: 120,
        },
        {
          field: 'week01_gmPercentage',
          headerName: 'GM Percent',
          cellStyle: (params: any) => ({
            backgroundColor: params.value >= 40 ? '#22c55e' :
                           params.value >= 10 ? '#facc15' :
                           params.value > 5 ? '#fb923c' : '#ef4444',
            color: params.value >= 40 || params.value <= 5 ? 'white' : 'black'
          }),
          valueFormatter: (params: any) => 
            params.value ? `${params.value.toFixed(2)}%` : '0.00%',
          width: 120,
        },
      ],
    },
    {
      headerName: 'Week 02',
      children: [
        {
          field: 'week02_salesUnits',
          headerName: 'Sales Units',
          editable: true,
          type: 'numericColumn',
          width: 120,
        },
        {
          field: 'week02_salesDollars',
          headerName: 'Sales Dollars',
          valueFormatter: (params: any) => 
            params.value ? `$ ${params.value.toFixed(2)}` : '$ 0.00',
          width: 120,
        },
        {
          field: 'week02_gmDollars',
          headerName: 'GM Dollars',
          valueFormatter: (params: any) => 
            params.value ? `$ ${params.value.toFixed(2)}` : '$ 0.00',
          width: 120,
        },
        {
          field: 'week02_gmPercentage',
          headerName: 'GM Percent',
          cellStyle: (params: any) => ({
            backgroundColor: params.value >= 40 ? '#22c55e' :
                           params.value >= 10 ? '#facc15' :
                           params.value > 5 ? '#fb923c' : '#ef4444',
            color: params.value >= 40 || params.value <= 5 ? 'white' : 'black'
          }),
          valueFormatter: (params: any) => 
            params.value ? `${params.value.toFixed(2)}%` : '0.00%',
          width: 120,
        },
      ],
    },
  ], []);

  const defaultColDef = useMemo(() => ({
    sortable: true,
    resizable: true,
    filter: true,
  }), []);

  return (
    <div className="h-[calc(100vh-10rem)] w-full p-4">
      <h1 className="text-2xl font-bold mb-6">Planning</h1>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          animateRows={true}
          enableCellChangeFlash={true}
          suppressMenuHide={true}
          suppressMovableColumns={false}
          enableRangeSelection={true}
          enableFillHandle={true}
          statusBar={{
            statusPanels: [
              { statusPanel: 'agTotalRowCountComponent', align: 'left' },
              { statusPanel: 'agFilteredRowCountComponent' },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default PlanningPage;