import React from 'react';

interface OrderModalProps {
  order: any;
  foodMap: Record<string, string>;
  missingFoodNames: Record<string, string>;
  modalSectionTitle: string;
  modalUserText: string;
  modalStatusColor: string;
  modalAvatarBg: string;
  modalItemTagBg: string;
  modalTotalText: string;
  modalBorderColor: string;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  order,
  foodMap,
  missingFoodNames,
  modalSectionTitle,
  modalUserText,
  modalStatusColor,
  modalAvatarBg,
  modalItemTagBg,
  modalTotalText,
  modalBorderColor,
  onClose,
}) => (
  <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40`}>
    <div className={`bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in border-4 ${modalBorderColor}`}>
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className="mb-4">
        <div className={`font-bold text-xl mb-1 ${modalSectionTitle}`}>Order <span className={modalUserText}>#{order.id}</span></div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block w-7 h-7 rounded-full ${modalAvatarBg} text-white flex items-center justify-center font-bold text-lg shadow`}>
            {order.user?.displayName?.[0] || order.user?.email?.[0] || 'U'}
          </span>
          <span className={`font-semibold ${modalUserText}`} title={order.user?.displayName || order.user?.email || order.userId}>
            {order.user?.displayName || order.user?.email || order.userId}
          </span>
        </div>
        <div className={`text-xs font-bold px-2 py-1 rounded-full inline-block ${modalStatusColor}`}>Status: {order.status}</div>
        <div className={`font-bold text-lg ${modalTotalText}`}>Total: <span className="text-green-600">${order.totalAmount ?? '-'}</span></div>
      </div>
      <div>
        <div className={`font-semibold mb-1 ${modalSectionTitle}`}>Items:</div>
        <ul className="list-disc pl-5">
          {order.cartItems?.map((item: any, idx: number) => {
            const fid = String(item.fid);
            const foodName = foodMap[fid] || missingFoodNames[fid] || `Food #${fid}`;
            return (
              <li key={idx} className={`${modalUserText} font-medium`}>
                <span className={`inline-block px-2 py-1 rounded mr-2 font-semibold text-xs ${modalItemTagBg}`} title={foodName}>{foodName}</span>
                <span className="text-gray-500">x</span> <span className={`${modalUserText} font-bold`}>{item.qty || item.quantity || 1}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mb-3">
        <span className={`font-bold ${modalSectionTitle}`}>Address:</span>
        <div className={`${modalUserText} text-sm mt-1 bg-gray-50 rounded p-2 border ${modalBorderColor}`} title={order.address ? `${order.address?.street}${order.address?.apt ? ' ' + order.address.apt : ''}, ${order.address?.city}, ${order.address?.state} - ${order.address?.zipcode}` : ''}>
          <div>
            {order.address?.street}{order.address?.apt ? ' ' + order.address.apt : ''}
          </div>
          <div>
            {order.address?.city}, {order.address?.state}, {order.address?.zipcode}
          </div>
        </div>
      </div>
      <div className="mb-3">
        <span className={`font-bold ${modalSectionTitle}`}>Card:</span>
        <div className={`${modalUserText} text-sm mt-1 bg-gray-50 rounded p-2 border ${modalBorderColor}`} title={order.card ? `**** **** **** ${order.card?.cardNumber?.slice(-4)} | ${order.card?.name} | Exp: ${order.card?.expiry} | CVV: ${order.card?.cvv}` : ''}>
          <div>{order.card ? `**** **** **** ${order.card.cardNumber?.slice(-4)}` : '-'}</div>
          <div>{order.card?.name || '-'}</div>
          <div className="mt-1">Exp: {order.card?.expiry || '-'}, CVV: {order.card?.cvv || '-'}</div>
        </div>
      </div>
      <div>
        <span className={`font-bold ${modalSectionTitle}`}>User Details:</span>
        <div className={`${modalUserText} text-sm mt-1 bg-gray-50 rounded p-2 border ${modalBorderColor}`}>
          <div title={order.user?.displayName || '-'}>Name: <span className={`font-semibold ${modalUserText}`}>{order.user?.displayName || '-'}</span></div>
          <div title={order.user?.email || '-'}>Email: <span className={`font-semibold ${modalUserText}`}>{order.user?.email || '-'}</span></div>
          <div>User ID: <span className={modalUserText}>{order.userId}</span></div>
        </div>
      </div>
    </div>
  </div>
);

export default OrderModal;
