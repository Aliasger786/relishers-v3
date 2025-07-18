import React, { useState } from 'react';
import { motion } from 'framer-motion';

const mockAddresses = [
  { id: 1, label: 'Home', address: '123 Main St, City, Country' },
  { id: 2, label: 'Work', address: '456 Office Rd, City, Country' },
];

const AddressModal = ({ onClose }: { onClose: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [newAddress, setNewAddress] = useState('');
  const [showNew, setShowNew] = useState(false);

  const handleSelect = (id: number) => setSelected(id);
  const handleAdd = () => {
    // Add address logic here
    setShowNew(false);
    setNewAddress('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[340px] min-h-[220px] flex flex-col gap-4 relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold" onClick={onClose} aria-label="Close">×</button>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Select Address</h2>
        <div className="flex flex-col gap-2">
          {mockAddresses.map(addr => (
            <label key={addr.id} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={selected === addr.id} onChange={() => handleSelect(addr.id)} />
              <span className="font-semibold text-gray-700">{addr.label}:</span>
              <span className="text-gray-500">{addr.address}</span>
            </label>
          ))}
        </div>
        <button className="mt-2 px-4 py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={() => setShowNew(true)}>
          Add New Address
        </button>
        {showNew && (
          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              className="border rounded px-2 py-1"
              placeholder="Enter new address"
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
            />
            <button className="px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition" onClick={handleAdd}>
              Save Address
            </button>
          </div>
        )}
        <button className="mt-4 px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition" onClick={onClose}>
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default AddressModal;

