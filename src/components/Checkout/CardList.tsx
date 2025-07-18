import React, { useEffect, useState } from 'react';
import CardItem from './CardItem';
import PaymentFormModal from './PaymentFormModal';
import { firebaseAddCard, firebaseFetchCards } from '../../Firebase/index';
import { toast } from 'react-toastify';

interface Card {
  id: number;
  uid: string;
  cardNumber: string;
  name: string;
  expiry: string;
  cvv: string;
}

interface CardListProps {
  user: any;
  selectedCard: number | null;
  setSelectedCard: (id: number | null) => void;
  cardList: Card[];
  setCardList: React.Dispatch<React.SetStateAction<Card[]>>;
}

const CardList: React.FC<CardListProps> = ({ user, selectedCard, setSelectedCard, cardList, setCardList }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [editCard, setEditCard] = useState<Card | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      if (!user?.uid) return;
      const cards = await firebaseFetchCards(user.uid);
      setCardList(cards);
    };
    fetchCards();
  }, [user, setCardList]);

  const handleAddCard = async (card: { cardNumber: string; name: string; expiry: string; cvv: string }) => {
    if (!user?.uid) return;
    const newCard = {
      id: Date.now(),
      uid: user.uid,
      ...card
    };
    try {
      setCardList([...cardList, newCard]);
      await firebaseAddCard(newCard);
      toast.success('Card added successfully!');
    } catch (err) {
      toast.error('Failed to add card.');
    }
  };

  const handleEditCard = async (card: { cardNumber: string; name: string; expiry: string; cvv: string }) => {
    if (!editCard) return;
    const updated = { ...editCard, ...card };
    try {
      setCardList(cardList.map(c => c.id === updated.id ? updated : c));
      await firebaseAddCard(updated);
      toast.success('Card updated successfully!');
    } catch (err) {
      toast.error('Failed to update card.');
    }
    setEditCard(null);
  };

  return (
    <div className="flex flex-col gap-2">
      {cardList.map((card, idx) => (
        <CardItem
          key={card.id}
          item={{
            cardNumber: card.cardNumber,
            name: card.name,
            expiry: card.expiry,
            cvv: card.cvv,
            selected: selectedCard === card.id,
            onSelect: () => setSelectedCard(card.id),
            onEdit: () => setEditCard(card)
          }}
        />
      ))}
      <button className="mt-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold hover:bg-blue-700 transition" onClick={() => setShowPayment(true)}>
        Add Card Details
      </button>
      {showPayment && (
        <PaymentFormModal onClose={() => setShowPayment(false)} onSave={handleAddCard} title="Add New Card" />
      )}
      {editCard && (
        <PaymentFormModal
          onClose={() => setEditCard(null)}
          onSave={handleEditCard}
          initialValues={editCard}
          title="Update Card"
        />
      )}
    </div>
  );
};

export default CardList;

// EOD
