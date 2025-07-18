import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PaymentFormModalProps {
  onClose: () => void;
  onSave: (card: { cardNumber: string; name: string; expiry: string; cvv: string }) => void;
  initialValues?: { cardNumber: string; name: string; expiry: string; cvv: string };
  title?: string;
}

const PaymentFormModal: React.FC<PaymentFormModalProps> = ({ onClose, onSave, initialValues, title }) => {
  const [cardNumber, setCardNumber] = useState(initialValues?.cardNumber || '');
  const [name, setName] = useState(initialValues?.name || '');
  const [expiry, setExpiry] = useState(initialValues?.expiry || '');
  const [cvv, setCvv] = useState(initialValues?.cvv || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required.';
    else if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ''))) newErrors.cardNumber = 'Enter a valid 16-digit card number.';
    if (!name.trim()) newErrors.name = 'Name on card is required.';
    if (!expiry.trim()) newErrors.expiry = 'Expiry date is required.';
    else if (!/^\d{2}\/\d{2}$/.test(expiry)) newErrors.expiry = 'Enter expiry as MM/YY.';
    if (!cvv.trim()) newErrors.cvv = 'CVV is required.';
    else if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = 'Enter a valid CVV.';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSave({ cardNumber, name, expiry, cvv });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title || 'Add New Card'}</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
            <input
              type="text"
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cardNumber ? 'border-red-500' : ''}`}
              placeholder="Enter your card number"
              value={cardNumber}
              onChange={e => { setCardNumber(e.target.value.replace(/[^\d]/g, '')); setErrors({ ...errors, cardNumber: '' }); }}
              maxLength={16}
            />
            {errors.cardNumber && <span className="text-xs text-red-500 mt-1">{errors.cardNumber}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <input
              type="text"
              className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Enter the name on the card"
              value={name}
              onChange={e => { setName(e.target.value); setErrors({ ...errors, name: '' }); }}
            />
            {errors.name && <span className="text-xs text-red-500 mt-1">{errors.name}</span>}
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (MM/YY)</label>
              <input
                type="text"
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.expiry ? 'border-red-500' : ''}`}
                placeholder="MM/YY"
                value={expiry}
                onChange={e => { setExpiry(e.target.value); setErrors({ ...errors, expiry: '' }); }}
                maxLength={5}
              />
              {errors.expiry && <span className="text-xs text-red-500 mt-1">{errors.expiry}</span>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
              <input
                type="text"
                className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.cvv ? 'border-red-500' : ''}`}
                placeholder="CVV"
                value={cvv}
                onChange={e => { setCvv(e.target.value.replace(/[^\d]/g, '')); setErrors({ ...errors, cvv: '' }); }}
                maxLength={4}
              />
              {errors.cvv && <span className="text-xs text-red-500 mt-1">{errors.cvv}</span>}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Save Card
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentFormModal;

