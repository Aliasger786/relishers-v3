import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const mockAddresses = [
  { id: 1, label: 'Home', address: '123 Main St, City, Country' },
  { id: 2, label: 'Work', address: '456 Office Rd, City, Country' },
];

const CheckoutPage = () => {
  const [{ cartItems, cartTotal }] = useStateValue();
  const [selected, setSelected] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newAddress, setNewAddress] = useState('');
  const navigate = useNavigate();

  const handleSelect = (id: number) => setSelected(id);
  const handleAdd = () => {
    // Add address logic here
    setShowNew(false);
    setNewAddress('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-primary px-4 py-8">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart Details</h2>
        <div className="flex flex-col gap-2">
          {cartItems && cartItems.length > 0 }
        </div>
        <div className="w-full flex items-center justify-between mb-4">
          <p className="text-gray-900 text-base md:text-lg uppercase font-bold">Total</p>
          <p className="text-gray-900 text-base md:text-lg font-bold"><span className="text-sm text-red-600">$</span> {cartTotal}</p>
        </div>
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
        <button className="mt-4 px-4 py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 transition" onClick={() => navigate(-1)}>
          Back to Cart
        </button>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;

