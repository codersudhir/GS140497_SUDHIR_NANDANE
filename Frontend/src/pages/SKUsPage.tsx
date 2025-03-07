import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { GridReadyEvent, GridApi, ColDef } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import { Grip, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function SKUsPage() {
  const deleteRow = (params: any, setSkuRowData: React.Dispatch<React.SetStateAction<any[]>>) => {
    console.log(params);
    setSkuRowData(prevData => prevData.filter((row, index) => index !== params.value - 1));
  };

  const columnDefs: ColDef[] = [
    { 
      headerName: "", 
      field: "delete", 
      width: 0,
      
      cellRenderer: (params: any) => {
        return (
          <div className="flex items-center justify-center mt-2">
            <Grip className="h-6 w-6 text-gray-400 cursor-move" />
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
          <div className="flex items-center justify-center gap-2 mt-2 cursor-pointer" >
            <Trash2 className="h-6 w-6 text-black" onClick={() => deleteRow(params, setSkuRowData)} />
          </div>
        );
      },
      headerClass: 'header-separator', 
      cellClass: 'text-center' 
    },
    { headerName: "Sku", field: "sku", width: 200, editable: true, headerClass: 'header-separator', cellClass: 'text-center' },
    { headerName: "Price", field: "price", width: 160, headerClass: 'header-separator', cellClass: 'text-center' },
    { headerName: "Cost", field: "cost", width: 120, headerClass: 'header-separator', cellClass: 'text-center' },
  ];

  const initialSkuRowData = [
    { srNo: 1, sku: "Cotton Polo Shirt", price: "$139.99", cost: "$5.00", delete: 1 },
    { srNo: 2, sku: "Silk Blouse", price: "$45.00", cost: "$15.00", delete: 2 },
    { srNo: 3, sku: "Denim Jacket", price: "$75.00", cost: "$30.00", delete: 3 },
    { srNo: 4, sku: "Wool Sweater", price: "$60.00", cost: "$25.00", delete: 4 },
    { srNo: 5, sku: "Leather Jacket", price: "$150.00", cost: "$70.00", delete: 5 },
    { srNo: 6, sku: "Linen Shirt", price: "$35.00", cost: "$12.00", delete: 6 },
    { srNo: 7, sku: "Cashmere Scarf", price: "$120.00", cost: "$50.00", delete: 7 },
    { srNo: 8, sku: "Cotton T-Shirt", price: "$20.00", cost: "$8.00", delete: 8 },
    { srNo: 9, sku: "Fleece Hoodie", price: "$55.00", cost: "$22.00", delete: 9 },
    { srNo: 10, sku: "Silk Tie", price: "$30.00", cost: "$10.00", delete: 10 },
    { srNo: 11, sku: "Wool Coat", price: "$200.00", cost: "$80.00", delete: 11 },
    { srNo: 12, sku: "Denim Jeans", price: "$50.00", cost: "$20.00", delete: 12 },
    { srNo: 13, sku: "Leather Boots", price: "$180.00", cost: "$90.00", delete: 13 },
    { srNo: 14, sku: "Silk Scarf", price: "$40.00", cost: "$15.00", delete: 14 },
    { srNo: 15, sku: "Cotton Socks", price: "$10.00", cost: "$3.00", delete: 15 },
    { srNo: 16, sku: "Wool Hat", price: "$25.00", cost: "$10.00", delete: 16 },
    { srNo: 17, sku: "Linen Pants", price: "$45.00", cost: "$18.00", delete: 17 },
    { srNo: 18, sku: "Cashmere Sweater", price: "$130.00", cost: "$60.00", delete: 18 },
    { srNo: 19, sku: "Silk Pajamas", price: "$70.00", cost: "$30.00", delete: 19 },
    { srNo: 20, sku: "Cotton Shorts", price: "$25.00", cost: "$10.00", delete: 20 },
    { srNo: 21, sku: "Wool Gloves", price: "$15.00", cost: "$5.00", delete: 21 },
    { srNo: 22, sku: "Denim Skirt", price: "$40.00", cost: "$15.00", delete: 22 },
    { srNo: 23, sku: "Leather Belt", price: "$35.00", cost: "$12.00", delete: 23 },
    { srNo: 24, sku: "Silk Robe", price: "$90.00", cost: "$40.00", delete: 24 },
    { srNo: 25, sku: "Cotton Cap", price: "$15.00", cost: "$5.00", delete: 25 },
    { srNo: 26, sku: "Wool Socks", price: "$12.00", cost: "$4.00", delete: 26 },
    { srNo: 27, sku: "Linen Blazer", price: "$85.00", cost: "$35.00", delete: 27 },
    { srNo: 28, sku: "Cashmere Cardigan", price: "$140.00", cost: "$65.00", delete: 28 },
    { srNo: 29, sku: "Silk Kimono", price: "$110.00", cost: "$50.00", delete: 29 },
    { srNo: 30, sku: "Cotton Dress", price: "$60.00", cost: "$25.00", delete: 30 },
  ];

  type AgGridApi = {
    grid?: GridApi;
    column?: any;
  };

  const [skuRowData, setSkuRowData] = useState(initialSkuRowData);
  const [showCreateSkuModal, setShowCreateSkuModal] = useState(false);
  const [newSku, setNewSku] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCost, setNewCost] = useState('');
  const apiRef = React.useRef<AgGridApi>({ grid: undefined, column: undefined });

  const onGridReady = (params: GridReadyEvent) => {
    apiRef.current.grid = params.api;
    apiRef.current.column = params.columnApi;
  };

  const onRowDragEnd = (event: any) => {
    const { overIndex, node } = event;
    const draggedData = node.data;
    const newData = [...skuRowData];
    
    // Swap the dragged item with the item at the new position
    const temp = newData[overIndex];
    newData[overIndex] = draggedData;
    newData[node.rowIndex] = temp;
    console.log(newData);
    setSkuRowData(newData);
  };

  const handleCreateSku = (e: React.FormEvent) => {
    e.preventDefault();
    const newSkuData = {
      srNo: skuRowData.length + 1,
      sku: newSku,
      price: newPrice,
      cost: newCost,
      delete: skuRowData.length + 1
    };
    setSkuRowData([...skuRowData, newSkuData]);
    setNewSku('');
    setNewPrice('');
    setNewCost('');
    setShowCreateSkuModal(false);
  };
  
  return (
    <div className="w-full h-full">
      <style>
        {`
          .header-separator {
            border-right: 1px solid #babfc7;
          }
          .ag-header-cell[col-id="sku"] {
            border-right: 2px solid #babfc7;
          }
          .ag-cell[col-id="sku"] {
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
          rowData={skuRowData}
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
        onClick={() => setShowCreateSkuModal(true)}
      >
        New SKU
      </button>
      {showCreateSkuModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
            <h2 className="text-xl font-bold mb-4">Create New SKU</h2>
            <form onSubmit={handleCreateSku}>
              <div className="mb-4">
                <label className="block text-gray-700">SKU</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={newSku} 
                  onChange={(e) => setNewSku(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={newPrice} 
                  onChange={(e) => setNewPrice(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Cost</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md" 
                  value={newCost} 
                  onChange={(e) => setNewCost(e.target.value)} 
                  required 
                />
              </div>
              <div className="flex justify-end">
                <button 
                  type="button" 
                  className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" 
                  onClick={() => setShowCreateSkuModal(false)}
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

export default SKUsPage;