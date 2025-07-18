import React, { useState } from 'react';
import { useStateValue } from '../../context/StateProvider';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CartItem from '../../components/Cart/Item';
import CartTotal from '../../components/Cart/CartTotal';
import AddressFormModal from '../../components/Address/AddressFormModal';
import AddressItem from '../../components/Address/AddressItem';
import CardList from '../../components/Checkout/CardList';
import { firebaseAddAddress, firebaseFetchAddresses, firebaseAddOrder } from '../../Firebase/index';
import OrderConfirmation from './OrderConfirmation';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const [{ cartItems, user, cartTotal }] = useStateValue();
  const [selected, setSelected] = useState<number | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [addressList, setAddressList] = useState<Array<{
    id: number;
    uid: string;
    street: string;
    apt: string;
    city: string;
    state: string;
    zipcode: string;
  }>>([]);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [editAddress, setEditAddress] = useState<null | typeof addressList[0]>(null);
  const [cardList, setCardList] = useState<Array<{
    id: number;
    uid: string;
    cardNumber: string;
    name: string;
    expiry: string;
    cvv: string;
  }>>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchAddresses = async () => {
      if (!user?.uid) return;
      const addresses = await firebaseFetchAddresses(user.uid);
      setAddressList(addresses);
    };
    fetchAddresses();
  }, [user]);

  const handleSelect = (id: number) => setSelected(id);
  const handleAddAddress = async (address: { street: string; apt: string; city: string; state: string; zipcode: string }) => {
    if (!user?.uid) return;
    const newAddress = {
      id: Date.now(),
      uid: user.uid,
      street: address.street,
      apt: address.apt,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode
    };
    try {
      setAddressList([...addressList, newAddress]);
      await firebaseAddAddress(newAddress);
      toast.success('Address added successfully!');
    } catch (err) {
      toast.error('Failed to add address.');
    }
  };
  const handlePlaceOrder = async () => {
    if (cartItems.length === 0 || selectedCard === null || selected === null) return;
    const selectedCardDetails = cardList.find(card => card.id === selectedCard);
    const selectedAddressDetails = addressList.find(addr => addr.id === selected);
    let totalAmount: number | null = null;
    try {
      const parsed = parseFloat(cartTotal);
      totalAmount = isNaN(parsed) ? null : parsed;
    } catch {
      totalAmount = null;
    }
    const orderData = {
      cartItems,
      card: selectedCardDetails,
      address: selectedAddressDetails,
      user: user,
      status: 'placed',
      userId: user.uid,
      totalAmount
    };
    try {
      // Save order and get order id
      const id = Date.now();
      await firebaseAddOrder({ ...orderData, id });
      setOrderId(id);
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error('Failed to place order.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-primary px-4 py-8">
      {orderId ? (
        <OrderConfirmation orderId={orderId} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 0 }} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart Details</h2>
          <div className="flex flex-col gap-2">
            {cartItems.length > 0 ? (
              cartItems.map((item: any, index: number) => (
                <CartItem key={index} item={item} />
              ))
            ) : (
              <div className="text-center text-gray-500 font-semibold py-8">No cart items</div>
            )}
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">Select Address</h2>
          <div className="flex flex-col gap-2">
            {addressList.map(addr => (
              <AddressItem
                key={addr.id}
                address={addr}
                selected={selected === addr.id}
                onSelect={() => handleSelect(addr.id)}
                onEdit={() => setEditAddress(addr)}
              />
            ))}
          </div>
          <button className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={() => setShowNew(true)}>
            Add New Address
          </button>
          {showNew && (
            <AddressFormModal onClose={() => setShowNew(false)} onSave={handleAddAddress} title="Add New Address" />
          )}
          {editAddress && (
            <AddressFormModal
              onClose={() => setEditAddress(null)}
              onSave={async (address) => {
                const updated = { ...editAddress, ...address };
                try {
                  setAddressList(addressList.map(a => a.id === updated.id ? updated : a));
                  await firebaseAddAddress(updated);
                  toast.success('Address updated successfully!');
                } catch (err) {
                  toast.error('Failed to update address.');
                }
                setEditAddress(null);
              }}
              initialValues={editAddress}
              title="Update Address"
            />
          )}
          <h2 className="text-lg font-bold text-gray-800 mb-2">Payment Method</h2>
          <CardList user={user} selectedCard={selectedCard} setSelectedCard={setSelectedCard} cardList={cardList} setCardList={setCardList} />
          {cartItems.length > 0 && (
            <CartTotal
              checkoutState={true}
              placeOrderMode={true}
              disabled={selectedCard === null || selected === null}
              onPlaceOrder={handlePlaceOrder}
            />
          )}
          <Link to="/cart" className="mt-4 text-black font-bold underline hover:text-gray-700 transition text-center block">
            Back to Cart
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CheckoutPage;
