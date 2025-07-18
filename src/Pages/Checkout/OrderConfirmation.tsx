import React from 'react';

interface OrderConfirmationProps {
  orderId: number | null;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <h2 className="text-2xl font-bold text-green-700 mb-4">Order Placed Successfully!</h2>
    <p className="text-lg text-gray-700 mb-2">Thank you for your order.</p>
    {orderId && (
      <p className="text-md text-gray-500">Order ID: <span className="font-mono">{orderId}</span></p>
    )}
    <p className="mt-4 text-gray-600">You will receive a confirmation email shortly.</p>
  </div>
);

export default OrderConfirmation;
