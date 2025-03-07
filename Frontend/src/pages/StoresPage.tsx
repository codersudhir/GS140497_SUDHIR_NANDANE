import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColDef } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { Grip, Trash2 } from "lucide-react";

const columnDefs: ColDef[] = [
  { 
    headerName: "Delete", 
    field: "delete", 
    width: 0, 
    cellRenderer: (params: any) => {
      return (
        <div className=" mt-2">
           <Grip className="h-6 w-6 text-black font-bold my-auto" />
          <span >{params.value}</span>
         
        </div>
      );
    },
    headerClass: 'header-separator', 
    cellClass: 'text-center' 
  },
  { 
    headerName: "", 
    field: "delete", 
    width: 50, 
    cellRenderer: (params: any) => {
      return (
        <div className="flex items-center justify-center gap-2  mt-2">
           <Trash2 className="h-6 w-6 text-black font-bold my-auto" />
         
        </div>
      );
    },
    headerClass: 'header-separator', 
    cellClass: 'text-center' 
  },
  { 
    headerName: "Sr No", 
    field: "srNo", 
    width: 150, 
    cellRenderer: (params: any) => {
      return (
        <div className="flex items-center justify-center gap-2  mt-2">
           <Grip className="h-6 w-6 text-black font-bold my-auto" />
          <span >{params.value}</span>
         
        </div>
      );
    },
    headerClass: 'header-separator', 
    cellClass: 'text-center' 
  },
  { headerName: "Store", field: "store", width: 200, editable: true, headerClass: 'header-separator', cellClass: 'text-center' },
  { headerName: "City", field: "city", width: 150, headerClass: 'header-separator ', cellClass: 'text-center' },
  { headerName: "State", field: "state", width: 120, headerClass: 'header-separator', cellClass: 'text-center' },
];

const storeRowData = [
  { srNo: 1, store: "San Francisco Bay Trends", city: "San Francisco", state: "CA", delete: true },
  { srNo: 2, store: "Phoenix Sunwear", city: "Phoenix", state: "AZ", delete: true },
  { srNo: 3, store: "Dallas Ranch Supply", city: "Dallas", state: "TX", delete: true },
  { srNo: 4, store: "Atlanta Outfitters", city: "Atlanta", state: "GA", delete: true },
  { srNo: 5, store: "Nashville Melody Music Store", city: "Nashville", state: "TN", delete: true },
  { srNo: 6, store: "New York Empire Eats", city: "New York", state: "NY", delete: true },
  { srNo: 7, store: "Denver Peaks Outdoor", city: "Denver", state: "CO", delete: true },
  { srNo: 8, store: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA", delete: true },
  { srNo: 9, store: "Boston Harbor Books", city: "Boston", state: "MA", delete: true },
  { srNo: 10, store: "Austin Vibe Co.", city: "Austin", state: "TX", delete: true },
  { srNo: 11, store: "Los Angeles Luxe", city: "Los Angeles", state: "CA", delete: true },
  { srNo: 12, store: "Houston Harvest Market", city: "Houston", state: "TX", delete: true },
  { srNo: 13, store: "Portland Evergreen Goods", city: "Portland", state: "OR", delete: true },
  { srNo: 14, store: "Chicago Charm Boutique", city: "Chicago", state: "IL", delete: true },
  { srNo: 15, store: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV", delete: true },
  { srNo: 16, store: "Seattle Skyline Goods", city: "Seattle", state: "WA", delete: true },
  { srNo: 17, store: "Miami Breeze Apparel", city: "Miami", state: "FL", delete: true },
  { srNo: 18, store: "San Diego Wave Surf Shop", city: "San Diego", state: "CA", delete: true },
  { srNo: 19, store: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC", delete: true },
  { srNo: 20, store: "Detroit Motor Gear", city: "Detroit", state: "MI", delete: true },
];

type AgGridApi = {
  grid?: GridApi;
  column?: any; // Changed from ColumnApi to any to fix the error
};

function StoresPage() {
  const apiRef = React.useRef<AgGridApi>({ grid: undefined, column: undefined });

  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi; // This will now work with 'any' type
  };

  return (
    <div className=" w-full h-full">
      <style>
        {`
          .header-separator {
            border-right: 1px solid #babfc7;
          }
          .ag-header-cell[col-id="store"] {
            border-right: 2px solid #babfc7;
          }
          .ag-cell[col-id="store"] {
            border-right: 2px solid #babfc7;
          }
        `}
      </style>
      <h2>Stores</h2>
      <div className="ag-theme-balham w-full h-full">
        <AgGridReact
          rowSelection="multiple"
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={storeRowData}
          modules={[ClientSideRowModelModule]}
          rowHeight={50}
          headerHeight={50}
          icons={{
            drag: 'fa-solid fa-grip-lines',
            dragVertical: 'fa-solid fa-grip-lines-vertical',
            dragHorizontal: 'fa-solid fa-grip-lines',
          }}
        />
      </div>
    </div>
  );
}

export default StoresPage;
