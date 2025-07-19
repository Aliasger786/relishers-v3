// Utility functions for Orders admin view
import { collection, getDocs, orderBy, query, limit, startAfter, Firestore } from 'firebase/firestore';

export function getOrderColors(status: string) {
  let statusColor = 'bg-gray-100 text-gray-700';
  let cardGradient = 'from-gray-50 to-white';
  let avatarBg = 'bg-gradient-to-br from-gray-400 to-gray-600';
  let itemTagBg = 'bg-gray-100 text-gray-700';
  let totalText = 'text-cyan-900';
  let modalSectionTitle = 'text-gray-700';
  let modalUserText = 'text-cyan-900';
  let modalStatusColor = 'bg-gray-100 text-gray-700';
  let modalAvatarBg = 'bg-gradient-to-br from-gray-400 to-gray-600';
  let modalItemTagBg = 'bg-gray-100 text-gray-700';
  let modalTotalText = 'text-cyan-900';
  let modalBorderColor = 'border-gray-200';

  if (status === 'placed') {
    statusColor = 'bg-cyan-100 text-cyan-700';
    cardGradient = 'from-cyan-50 to-teal-50';
    avatarBg = 'bg-gradient-to-br from-cyan-400 to-teal-600';
    itemTagBg = 'bg-teal-100 text-teal-700';
    totalText = 'text-teal-900';
    modalSectionTitle = 'text-teal-800';
    modalUserText = 'text-teal-900';
    modalStatusColor = 'bg-cyan-100 text-cyan-700';
    modalAvatarBg = 'bg-gradient-to-br from-cyan-400 to-teal-600';
    modalItemTagBg = 'bg-teal-100 text-teal-700';
    modalTotalText = 'text-teal-900';
    modalBorderColor = 'border-cyan-200';
  }
  if (status === 'processing') {
    statusColor = 'bg-emerald-100 text-emerald-700';
    cardGradient = 'from-emerald-50 to-cyan-50';
    avatarBg = 'bg-gradient-to-br from-emerald-400 to-cyan-500';
    itemTagBg = 'bg-cyan-100 text-cyan-700';
    totalText = 'text-emerald-900';
    modalSectionTitle = 'text-emerald-800';
    modalUserText = 'text-emerald-900';
    modalStatusColor = 'bg-emerald-100 text-emerald-700';
    modalAvatarBg = 'bg-gradient-to-br from-emerald-400 to-cyan-500';
    modalItemTagBg = 'bg-cyan-100 text-cyan-700';
    modalTotalText = 'text-emerald-900';
    modalBorderColor = 'border-emerald-200';
  }
  if (status === 'completed') {
    statusColor = 'bg-lime-100 text-lime-700';
    cardGradient = 'from-lime-50 to-emerald-50';
    avatarBg = 'bg-gradient-to-br from-lime-400 to-emerald-500';
    itemTagBg = 'bg-emerald-100 text-emerald-700';
    totalText = 'text-lime-900';
    modalSectionTitle = 'text-lime-800';
    modalUserText = 'text-lime-900';
    modalStatusColor = 'bg-lime-100 text-lime-700';
    modalAvatarBg = 'bg-gradient-to-br from-lime-400 to-emerald-500';
    modalItemTagBg = 'bg-emerald-100 text-emerald-700';
    modalTotalText = 'text-lime-900';
    modalBorderColor = 'border-lime-200';
  }
  if (status === 'cancelled') {
    statusColor = 'bg-red-100 text-red-700';
    cardGradient = 'from-red-50 to-rose-50';
    avatarBg = 'bg-gradient-to-br from-red-400 to-rose-500';
    itemTagBg = 'bg-rose-100 text-rose-700';
    totalText = 'text-rose-900';
    modalSectionTitle = 'text-rose-800';
    modalUserText = 'text-rose-900';
    modalStatusColor = 'bg-red-100 text-red-700';
    modalAvatarBg = 'bg-gradient-to-br from-red-400 to-rose-500';
    modalItemTagBg = 'bg-rose-100 text-rose-700';
    modalTotalText = 'text-rose-900';
    modalBorderColor = 'border-rose-200';
  }
  return {
    statusColor,
    cardGradient,
    avatarBg,
    itemTagBg,
    totalText,
    modalSectionTitle,
    modalUserText,
    modalStatusColor,
    modalAvatarBg,
    modalItemTagBg,
    modalTotalText,
    modalBorderColor,
  };
}

export async function fetchFoodMap(firestore: Firestore) {
  const foodSnap = await getDocs(collection(firestore, 'Food'));
  const foodMapObj: Record<string, string> = {};
  foodSnap.docs.forEach(doc => {
    const data = doc.data();
    foodMapObj[String(data.id)] = data.title || data.name || `Food #${data.id}`;
  });
  return foodMapObj;
}

export async function fetchOrders(firestore: Firestore, lastDoc: any = null, pageSize = 25) {
  const q = lastDoc
    ? query(collection(firestore, 'Orders'), orderBy('id', 'desc'), startAfter(lastDoc), limit(pageSize))
    : query(collection(firestore, 'Orders'), orderBy('id', 'desc'), limit(pageSize));
  const snapshot = await getDocs(q);
  const ordersData = snapshot.docs.map(doc => doc.data());
  return { ordersData, lastDoc: snapshot.docs[snapshot.docs.length - 1], hasMore: snapshot.docs.length === pageSize };
}
