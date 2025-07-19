import React from 'react';

interface OrderCardProps {
  order: any;
  foodMap: Record<string, string>;
  missingFoodNames: Record<string, string>;
  modalSectionTitle: string;
  modalUserText: string;
  statusColor: string;
  cardGradient: string;
  avatarBg: string;
  itemTagBg: string;
  totalText: string;
  onClick: () => void;
  className?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  foodMap,
  missingFoodNames,
  modalSectionTitle,
  modalUserText,
  statusColor,
  cardGradient,
  avatarBg,
  itemTagBg,
  totalText,
  onClick,
  className = '',
}) => (
  <div
    className={`relative group bg-gradient-to-br ${cardGradient} rounded-xl shadow-lg p-6 flex flex-col gap-2 hover:shadow-2xl transition-all duration-200 ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center gap-2">
      <span className={`inline-block w-2 h-2 rounded-full ${statusColor} animate-pulse`}></span>
      <span className={`font-bold text-lg tracking-wide ${modalSectionTitle}`}>Order <span className={modalUserText}>#{order.id}</span></span>
    </div>
    <div className="text-gray-800 font-semibold text-base mt-1 flex items-center gap-2">
      <span className={`inline-block w-6 h-6 rounded-full ${avatarBg} text-white flex items-center justify-center font-bold text-sm shadow`}>
        {order.user?.displayName?.[0] || order.user?.email?.[0] || 'U'}
      </span>
      <span className="truncate max-w-[120px]" title={order.user?.displayName || order.user?.email || order.userId}>
        {order.user?.displayName || order.user?.email || order.userId}
      </span>
    </div>
    <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block mb-2 ${statusColor}`}>Status: {order.status}</div>
    <div className={`${totalText} font-bold mt-1`}>Total: <span className="text-green-600">${order.totalAmount ?? '-'}</span></div>
    <div className="mt-3">
      <div className="font-semibold text-gray-700 mb-1">Items:</div>
      <ul className="list-disc pl-5">
        {order.cartItems?.map((item: any, idx: number) => {
          const fid = String(item.fid);
          const foodName = foodMap[fid] || missingFoodNames[fid] || `Food #${fid}`;
          return (
            <li key={idx} className={`${modalUserText} font-medium`}>
              <span className={`inline-block px-2 py-1 rounded mr-2 font-semibold text-xs ${itemTagBg}`} title={foodName}>{foodName}</span>
              <span className="text-gray-500">x</span> <span className={`${modalUserText} font-bold`}>{item.qty || item.quantity || 1}</span>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

export default OrderCard;
