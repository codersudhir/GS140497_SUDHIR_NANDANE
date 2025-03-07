import React, { useState, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

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
      price: 45.00,
      cost: 20.00,
      'week01_salesUnits': 200,
      'week02_salesUnits': 150,
    },
    {
      store: 'San Francisco Bay Trends',
      sku: 'Cotton Polo Shirt',
      price: 50.00,
      cost: 46.50,
      'week01_salesUnits': 10,
      'week02_salesUnits': 100,
    },
    {
      store: 'Phoenix Sunwear',
      sku: 'Silk Blouse',
      price: 45.00,
      cost: 15.00,
      'week01_salesUnits': 120,
      'week02_salesUnits': 80,
    },
    {
      store: 'Dallas Ranch Supply',
      sku: 'Denim Jacket',
      price: 10.00,
      cost: 7,
      'week01_salesUnits': 100,
      'week02_salesUnits': 60,
    },
    {
      store: 'Atlanta Outfitters',
      sku: 'Wool Sweater',
      price: 60.00,
      cost: 25.00,
      'week01_salesUnits': 110,
      'week02_salesUnits': 70,
    },
    {
      store: 'Nashville Melody Music Store',
      sku: 'Leather Jacket',
      price: 199.00,
      cost: 30.00,
      'week01_salesUnits': 4792,
      'week02_salesUnits': 50,
    },
    {
      store: 'New York Empire Eats',
      sku: 'Linen Shirt',
      price: 10.00,
      cost: 6.00,
      'week01_salesUnits': 100,
      'week02_salesUnits': 920,
    },
    {
      store: 'Denver Peaks Outdoor',
      sku: 'Cashmere Scarf',
      price: 120.00,
      cost: 50.00,
      'week01_salesUnits': 70,
      'week02_salesUnits': 40,
    },
    {
      store: 'Philadelphia Liberty Market',
      sku: 'Cotton T-Shirt',
      price: 20.00,
      cost: 8.00,
      'week01_salesUnits': 140,
      'week02_salesUnits': 100,
    },
    {
      store: 'Boston Harbor Books',
      sku: 'Fleece Hoodie',
      price: 55000.00,
      cost: 2002.00,
      'week01_salesUnits': 100,
      'week02_salesUnits': 700000,
    },
    {
      store: 'Austin Vibe Co.',
      sku: 'Silk Tie',
      price: 10.00,
      cost: 10.00,
      'week01_salesUnits': 100,
      'week02_salesUnits': 60000000,
    },
    {
      store: 'Los Angeles Luxe',
      sku: 'Wool Coat',
      price: 200.00,
      cost: 80.00,
      'week01_salesUnits': 60,
      'week02_salesUnits': 40,
    },
    {
      store: 'Houston Harvest Market',
      sku: 'Denim Jeans',
      price: 50.00,
      cost: 20.00,
      'week01_salesUnits': 110,
      'week02_salesUnits': 80,
    },
    {
      store: 'Portland Evergreen Goods',
      sku: 'Leather Boots',
      price: 180.00,
      cost: 90.00,
      'week01_salesUnits': 70,
      'week02_salesUnits': 50,
    },
    {
      store: 'Chicago Charm Boutique',
      sku: 'Silk Scarf',
      price: 20.00,
      cost: 15.00,
      'week01_salesUnits': 10000,
      'week02_salesUnits': 700000000,
    },
    {
      store: 'Las Vegas Neon Treasures',
      sku: 'Cotton Socks',
      price: 100000.00,
      cost: 5.00,
      'week01_salesUnits': 150,
      'week02_salesUnits': 100,
    },
    {
      store: 'Seattle Skyline Goods',
      sku: 'Wool Hat',
      price: 25.00,
      cost: 10000.00,
      'week01_salesUnits': 120,
      'week02_salesUnits': 1000,
    },
    {
      store: 'Miami Breeze Apparel',
      sku: 'Linen Pants',
      price: 45.00,
      cost: 18.00,
      'week01_salesUnits': 90,
      'week02_salesUnits': 60,
    },
    {
      store: 'San Diego Wave Surf Shop',
      sku: 'Cashmere Sweater',
      price: 10.00,
      cost: 6.00,
      'week01_salesUnits': 1110,
      'week02_salesUnits': 50,
    },
    {
      store: 'Charlotte Queen\'s Closet',
      sku: 'Silk Pajamas',
      price: 70.00,
      cost: 30.00,
      'week01_salesUnits': 100,
      'week02_salesUnits': 70,
    },
    {
      store: 'Detroit Motor Gear',
      sku: 'Cotton Shorts',
      price: 25.00,
      cost: 10.00,
      'week01_salesUnits': 110,
      'week02_salesUnits': 80,
    },
  ]);

  const calculateSalesDollars = (units: number, price: number) => units * price;
  const calculateGmDollars = (salesDollars: number, units: number, cost: number) => salesDollars - (units * cost);
  const calculateGmPercentage = (gmDollars: number, salesDollars: number) => (salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0);

  const getGmPercentageClass = (value: number) => {
    if (value >= 40) return 'bg-green-500 text-white';
    if (value >= 10) return 'bg-yellow-400';
    if (value > 5) return 'bg-orange-400';
    return 'bg-red-500 text-white';
  };

  const columnDefs = useMemo(() => [
    { field: '', headerName: '', width: 0 },
    { field: 'store', headerName: 'Store', width: 200 },
    { 
      field: 'sku', 
      headerName: 'SKU', 
      width: 200,
      cellStyle: { borderRight: '1px solid #babfc7' } 
    },
    {
      headerName: 'Week 1',
      children: [
        {
          field: 'week01_salesUnits',
          headerName: 'Sales Units',
          editable: true,
          type: 'numericColumn',
          width: 140,
          onCellValueChanged: (params: any) => {
            const updatedSalesDollars = calculateSalesDollars(params.data.week01_salesUnits, params.data.price);
            const updatedGmDollars = calculateGmDollars(updatedSalesDollars, params.data.week01_salesUnits, params.data.cost);
            const updatedGmPercentage = calculateGmPercentage(updatedGmDollars, updatedSalesDollars);
            
            params.api.applyTransaction({
              update: [{
                ...params.data,
                week01_salesDollars: updatedSalesDollars,
                week01_gmDollars: updatedGmDollars,
                week01_gmPercentage: updatedGmPercentage
              }]
            });
          }
        },
        {
          headerName: 'Sales Dollars',
          valueGetter: (params: any) => calculateSalesDollars(params.data.week01_salesUnits, params.data.price),
          valueFormatter: (params: any) => `$ ${params.value.toFixed(2)}`,
          width: 140,
        },
        {
          headerName: 'GM Dollars',
          valueGetter: (params: any) => calculateGmDollars(
            calculateSalesDollars(params.data.week01_salesUnits, params.data.price),
            params.data.week01_salesUnits,
            params.data.cost
          ),
          valueFormatter: (params: any) => `$ ${params.value.toFixed(2)}`,
          width: 140,
        },
        {
          headerName: 'GM Percent',
          valueGetter: (params: any) => calculateGmPercentage(
            calculateGmDollars(
              calculateSalesDollars(params.data.week01_salesUnits, params.data.price),
              params.data.week01_salesUnits,
              params.data.cost
            ),
            calculateSalesDollars(params.data.week01_salesUnits, params.data.price)
          ),
          cellStyle: (params: any) => ({
            backgroundColor: params.value >= 40 ? '#22c55e' :
                            params.value >= 10 ? '#facc15' :
                            params.value > 5 ? '#fb923c' : '#ef4444',
            color: params.value >= 40 || params.value <= 5 ? 'white' : 'black'
          }),
          valueFormatter: (params: any) => `${params.value.toFixed(2)}%`,
          width: 140,
        },
      ],
    },
    {
      headerName: 'Week 2',
      children: [
        {
          field: 'week02_salesUnits',
          headerName: 'Sales Units',
          editable: true,
          type: 'numericColumn',
          width: 140,
        },
        {
          headerName: 'Sales Dollars',
          valueGetter: (params: any) => calculateSalesDollars(params.data.week02_salesUnits, params.data.price),
          valueFormatter: (params: any) => `$ ${params.value.toFixed(2)}`,
          width: 140,
        },
        {
          headerName: 'GM Dollars',
          valueGetter: (params: any) => calculateGmDollars(
            calculateSalesDollars(params.data.week02_salesUnits, params.data.price),
            params.data.week02_salesUnits,
            params.data.cost
          ),
          valueFormatter: (params: any) => `$ ${params.value.toFixed(2)}`,
          width: 140,
        },
        {
          headerName: 'GM Percent',
          valueGetter: (params: any) => calculateGmPercentage(
            calculateGmDollars(
              calculateSalesDollars(params.data.week02_salesUnits, params.data.price),
              params.data.week02_salesUnits,
              params.data.cost
            ),
            calculateSalesDollars(params.data.week02_salesUnits, params.data.price)
          ),
          cellStyle: (params: any) => ({
            backgroundColor: params.value >= 40 ? '#22c55e' :
                            params.value >= 10 ? '#facc15' :
                            params.value > 5 ? '#fb923c' : '#ef4444',
            color: params.value >= 40 || params.value <= 5 ? 'white' : 'black'
          }),
          valueFormatter: (params: any) => `${params.value.toFixed(2)}%`,
          width: 140,
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
    <div className="h-[90vh] w-full px-2">
      <div className="ag-theme-alpine w-full h-full overflow-auto">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs as any}
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