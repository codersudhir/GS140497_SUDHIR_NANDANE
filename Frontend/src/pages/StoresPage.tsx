import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColDef } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { Grip, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function StoresPage() {

  const columnDefs: ColDef[] = [
    { 
      headerName: "", 
      field: "delete", 
      width: 0,
      
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center justify-center mt-2 text-base">
            <Grip className="h-6 w-6 text-gray-400 cursor-move" />
          </div>
        );
      },
      headerClass: 'header-separator', 
      cellClass: 'text-center text-base' 
    },
    { 
      headerName: "", 
      field: "delete", 
      width: 50, 
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center justify-center gap-2 mt-2 cursor-pointer text-base" >
            <Trash2 className="h-6 w-6 text-black" onClick={() => deleteRow(params)} />
          </div>
        );
      },
      headerClass: 'header-separator', 
      cellClass: 'text-center text-base' 
    },
    { 
      headerName: "Sr No", 
      field: "srNo", 
      width: 100,
      rowDrag: true,
      headerClass: 'header-separator', 
      cellClass: 'text-center text-base',
      valueGetter: (params: any) => {
        return params.node.rowIndex + 1;
      }
    },
    { headerName: "Store", field: "store", width: 200, editable: true, headerClass: 'header-separator', cellClass: ' text-base' },
    { headerName: "City", field: "city", width: 160, headerClass: 'header-separator', cellClass: ' text-base' },
    { headerName: "State", field: "state", width: 120, headerClass: 'header-separator', cellClass: ' text-base' },
  ];

  const initialStoreRowData = [
    { srNo: 1, store: "San Francisco Bay Trends", city: "San Francisco", state: "CA", delete: 1 },
    { srNo: 2, store: "Phoenix Sunwear", city: "Phoenix", state: "AZ", delete: 2 },
    { srNo: 3, store: "Dallas Ranch Supply", city: "Dallas", state: "TX", delete: 3 },
    { srNo: 4, store: "Atlanta Outfitters", city: "Atlanta", state: "GA", delete: 4 },
    { srNo: 5, store: "Nashville Melody Music Store", city: "Nashville", state: "TN", delete: 5 },
    { srNo: 6, store: "New York Empire Eats", city: "New York", state: "NY", delete: 6 },
    { srNo: 7, store: "Denver Peaks Outdoor", city: "Denver", state: "CO", delete: 7 },
    { srNo: 8, store: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA", delete: 8 },
    { srNo: 9, store: "Boston Harbor Books", city: "Boston", state: "MA", delete: 9 },
    { srNo: 10, store: "Austin Vibe Co.", city: "Austin", state: "TX", delete: 10 },
    { srNo: 11, store: "Los Angeles Luxe", city: "Los Angeles", state: "CA", delete: 11 },
    { srNo: 12, store: "Houston Harvest Market", city: "Houston", state: "TX", delete: 12 },
    { srNo: 13, store: "Portland Evergreen Goods", city: "Portland", state: "OR", delete: 13 },
    { srNo: 14, store: "Chicago Charm Boutique", city: "Chicago", state: "IL", delete: 14 },
    { srNo: 15, store: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV", delete: 15 },
    { srNo: 16, store: "Seattle Skyline Goods", city: "Seattle", state: "WA", delete: 16 },
    { srNo: 17, store: "Miami Breeze Apparel", city: "Miami", state: "FL", delete: 17 },
    { srNo: 18, store: "San Diego Wave Surf Shop", city: "San Diego", state: "CA", delete: 18 },
    { srNo: 19, store: "Charlotte Queen's Closet", city: "Charlotte", state: "NC", delete: 19 },
    { srNo: 20, store: "Detroit Motor Gear", city: "Detroit", state: "MI", delete: 20 },
  ];

  type AgGridApi = {
    grid?: GridApi;
    column?: any;
  };

  const [storeRowData, setStoreRowData] = useState(initialStoreRowData);
  const [showCreateStoreModal, setShowCreateStoreModal] = useState(false);
  const [newStoreName, setNewStoreName] = useState('');
  const [newStoreCity, setNewStoreCity] = useState('');
  const [newStoreState, setNewStoreState] = useState('');
  const apiRef = React.useRef<AgGridApi>({ grid: undefined, column: undefined });

  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  const onRowDragEnd = (event: any) => {
    const { overIndex, node } = event;
    const draggedData = node.data;
    const startIndex = node.data.delete;
    
    const newData = [...storeRowData];
    newData[startIndex] = { ...storeRowData[overIndex] };
    
    setStoreRowData(newData);
  };

  const deleteRow = (params: any) => {
    setStoreRowData(prevData => prevData.filter(row => row.delete !== params.data.delete));
  };

  const handleCreateStore = (e: React.FormEvent) => {
    e.preventDefault();
    const newStore = {
      srNo: storeRowData.length + 1,
      store: newStoreName,
      city: newStoreCity,
      state: newStoreState,
      delete: storeRowData.length + 1
    };
    setStoreRowData([...storeRowData, newStore]);
    setNewStoreName('');
    setNewStoreCity('');
    setNewStoreState('');
    setShowCreateStoreModal(false);
  };

  useEffect(() => {
    setStoreRowData(storeRowData);
  }, [storeRowData])
  
  return (
    <div className="w-full h-full">
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
          .ag-row-drag {
            cursor: move;
          }
        `}
      </style>
      <div className="ag-theme-balham w-full h-[80vh] px-2">
        <AgGridReact
          rowSelection="multiple"
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={storeRowData}
          modules={[ClientSideRowModelModule]}
          rowDragManaged={true}
          animateRows={true}
          rowHeight={50}
          headerHeight={50}
          onRowDragEnd={onRowDragEnd}
          suppressMoveWhenRowDragging={false}
        />
      </div>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded-md my-2" 
        onClick={() => setShowCreateStoreModal(true)}
      >
        New store
      </button>
      {showCreateStoreModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
            <h2 className="text-xl font-bold mb-4">Create New Store</h2>
            <form onSubmit={handleCreateStore}>
              <div className="mb-4">
                <label className="block text-gray-700">Store Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={newStoreName} 
                  onChange={(e) => setNewStoreName(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store City</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={newStoreCity} 
                  onChange={(e) => setNewStoreCity(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Store State</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={newStoreState} 
                  onChange={(e) => setNewStoreState(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" 
                  onClick={() => setShowCreateStoreModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoresPage;