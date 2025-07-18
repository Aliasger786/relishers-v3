import React from 'react';

interface CardItemProps {
  item: {
    id?: string | number;
    name: string;
    image?: string;
    price: number;
    quantity: number;
    [key: string]: any;
  };
}

const CardItem: React.FC<CardItemProps> = ({ item }) => {
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
      {item.image && (
        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
      )}
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{item.name}</div>
        <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
      </div>
      <div className="font-bold text-blue-600 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
};

export default CardItem;

// EOD
