import React from 'react';

interface AddressItemProps {
  address: {
    street: string;
    apt: string;
    city: string;
    state: string;
    zipcode: string;
  };
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
}

const AddressItem: React.FC<AddressItemProps> = ({ address, selected, onSelect, onEdit }) => (
  <div
    className={`flex flex-col gap-1 p-3 rounded-lg border ${selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'} cursor-pointer transition`}
    onClick={onSelect}
  >
    <div className="flex items-center gap-2 justify-between">
      <div className="flex items-center gap-2">
        <input type="radio" checked={selected} onChange={onSelect} />
        <span className="font-bold text-gray-700">{address.street}{address.apt ? `, ${address.apt}` : ''}</span>
      </div>
      <button
        className="ml-2 px-2 py-1 text-xs rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500 transition"
        onClick={e => { e.stopPropagation(); onEdit && onEdit(); }}
      >
        Edit
      </button>
    </div>
    <span className="text-gray-500">{address.city}, {address.state}, {address.zipcode}</span>
  </div>
);

export default AddressItem;

// EOD

