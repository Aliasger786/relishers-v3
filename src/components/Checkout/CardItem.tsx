import React from 'react';

interface CardDetails {
  cardNumber: string;
  name: string;
  expiry: string;
  cvv: string;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
}

interface CardItemProps {
  item: CardDetails;
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  return (
    <div
      className={`flex flex-col gap-2 p-3 rounded-lg border ${item.selected ? 'border-green-500 bg-green-100' : 'border-gray-200 bg-gray-50'}`}
      onClick={item.onSelect}
      style={{ cursor: item.onSelect ? 'pointer' : 'default' }}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-gray-700">Card: **** **** **** {item.cardNumber.slice(-4)}</span>
        {item.onEdit && (
          <button
            className="ml-2 px-2 py-1 text-xs rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500 transition"
            onClick={e => { e.stopPropagation(); item.onEdit && item.onEdit(); }}
          >
            Edit
          </button>
        )}
      </div>
      <span className="text-gray-500">Name: {item.name}</span>
    </div>
  );
};

export default CardItem;

// EOD
