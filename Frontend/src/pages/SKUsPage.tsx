import React, { useState } from 'react';
import { SKU } from '../types';

const SKUsPage: React.FC = () => {
  const [skus, setSkus] = useState<SKU[]>([]);
  const [editingSku, setEditingSku] = useState<SKU | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage SKUs</h1>
      
      <div className="mb-6">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={() => {
            setEditingSku({
              id: crypto.randomUUID(),
              name: '',
              price: 0,
              cost: 0,
            });
          }}
        >
          Add SKU
        </button>
      </div>

      <div className="space-y-2">
        {skus.map((sku) => (
          <div
            key={sku.id}
            className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="font-medium">{sku.name}</span>
              <div className="text-sm text-gray-500">
                Price: ${sku.price.toFixed(2)} | Cost: ${sku.cost.toFixed(2)}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditingSku(sku)}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setSkus(skus.filter((s) => s.id !== sku.id));
                }}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingSku && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editingSku.id ? 'Edit SKU' : 'Add SKU'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU Name
                </label>
                <input
                  type="text"
                  value={editingSku.name}
                  onChange={(e) =>
                    setEditingSku({ ...editingSku, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="SKU Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={editingSku.price}
                  onChange={(e) =>
                    setEditingSku({
                      ...editingSku,
                      price: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Price"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost
                </label>
                <input
                  type="number"
                  value={editingSku.cost}
                  onChange={(e) =>
                    setEditingSku({
                      ...editingSku,
                      cost: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full p-2 border rounded-md"
                  placeholder="Cost"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setEditingSku(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingSku.id && skus.some((s) => s.id === editingSku.id)) {
                    setSkus(
                      skus.map((s) =>
                        s.id === editingSku.id ? editingSku : s
                      )
                    );
                  } else {
                    setSkus([...skus, editingSku]);
                  }
                  setEditingSku(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SKUsPage;