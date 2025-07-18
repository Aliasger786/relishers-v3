import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AddressFormModalProps {
  onClose: () => void;
  onSave: (address: { street: string; apt: string; city: string; state: string; zipcode: string }) => void;
  initialValues?: { street: string; apt: string; city: string; state: string; zipcode: string };
  title?: string;
}

const AddressFormModal: React.FC<AddressFormModalProps> = ({ onClose, onSave, initialValues, title }) => {
  const [street, setStreet] = useState(initialValues?.street || '');
  const [apt, setApt] = useState(initialValues?.apt || '');
  const [city, setCity] = useState(initialValues?.city || '');
  const [stateVal, setStateVal] = useState(initialValues?.state || '');
  const [zipcode, setZipcode] = useState(initialValues?.zipcode || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!street.trim()) newErrors.street = 'Street address is required.';
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!stateVal.trim()) newErrors.state = 'State is required.';
    if (!zipcode.trim()) newErrors.zipcode = 'Zip code is required.';
    else if (!/^\d{5}(-\d{4})?$/.test(zipcode.trim())) newErrors.zipcode = 'Enter a valid zip code.';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ street, apt, city, state: stateVal, zipcode });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[340px] min-h-[220px] flex flex-col gap-4 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title || 'Add New Address'}</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className={`border rounded px-2 py-1 ${errors.street ? 'border-red-500' : ''}`}
            placeholder="Street address"
            value={street}
            onChange={e => { setStreet(e.target.value); setErrors({ ...errors, street: '' }); }}
          />
          {errors.street && <span className="text-xs text-red-500">{errors.street}</span>}
          <input
            type="text"
            className="border rounded px-2 py-1"
            placeholder="Apt, Suite, etc."
            value={apt}
            onChange={e => setApt(e.target.value)}
          />
          <input
            type="text"
            className={`border rounded px-2 py-1 ${errors.city ? 'border-red-500' : ''}`}
            placeholder="City"
            value={city}
            onChange={e => { setCity(e.target.value); setErrors({ ...errors, city: '' }); }}
          />
          {errors.city && <span className="text-xs text-red-500">{errors.city}</span>}
          <input
            type="text"
            className={`border rounded px-2 py-1 ${errors.state ? 'border-red-500' : ''}`}
            placeholder="State"
            value={stateVal}
            onChange={e => { setStateVal(e.target.value); setErrors({ ...errors, state: '' }); }}
          />
          {errors.state && <span className="text-xs text-red-500">{errors.state}</span>}
          <input
            type="text"
            className={`border rounded px-2 py-1 ${errors.zipcode ? 'border-red-500' : ''}`}
            placeholder="Zip Code"
            value={zipcode}
            onChange={e => { setZipcode(e.target.value); setErrors({ ...errors, zipcode: '' }); }}
          />
          {errors.zipcode && <span className="text-xs text-red-500">{errors.zipcode}</span>}
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition"
          onClick={handleSave}
        >
          Save Address
        </button>
      </div>
    </motion.div>
  );
};

export default AddressFormModal;

