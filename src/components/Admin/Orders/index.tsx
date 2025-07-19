import React, { useEffect, useState, useRef, useCallback } from 'react';
import { collection, getDocs, orderBy, query, limit, startAfter } from 'firebase/firestore';
import { firestore } from '../..//../firebase.config';

import { fetchFoodItemById } from '../../../Firebase/index';
import OrderCard from './OrderCard';
import OrderModal from './OrderModal';
import { getOrderColors, fetchFoodMap, fetchOrders } from './orderUtils';

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const lastDocRef = useRef<any>(null);
  const [modalOrder, setModalOrder] = useState<any | null>(null);
  const [foodMap, setFoodMap] = useState<Record<string, string>>({});
  const [missingFoodNames, setMissingFoodNames] = useState<Record<string, string>>({});


  // Fetch food items only once
  useEffect(() => {
    const fetchFoods = async () => {
      const foodMapObj = await fetchFoodMap(firestore);
      setFoodMap(foodMapObj);
    };
    fetchFoods();
  }, []);

  // Initial fetch of first 25 orders
  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      const { ordersData, lastDoc, hasMore } = await fetchOrders(firestore);
      setOrders(ordersData);
      lastDocRef.current = lastDoc;
      setHasMore(hasMore);
      setLoading(false);
      // Fetch missing food names for first batch
      const missingFids = new Set<string>();
      ordersData.forEach(order => {
        order.cartItems?.forEach((item: any) => {
          const fid = String(item.fid);
          if (!foodMap[fid] && !missingFoodNames[fid]) {
            missingFids.add(fid);
          }
        });
      });
      if (missingFids.size > 0) {
        missingFids.forEach(fid => {
          fetchFoodItemById(fid).then(food => {
            setMissingFoodNames(prev => ({ ...prev, [fid]: food?.title || food?.name || `Food #${fid}` }));
          });
        });
      }
    };
    fetchInitial();
    // eslint-disable-next-line
  }, [foodMap]);

  // Infinite scroll: fetch next 25 when scrolled to bottom
  const observer = useRef<IntersectionObserver | null>(null);
  const lastOrderRef = useCallback((node: HTMLDivElement | null) => {
    if (loading || fetchingMore || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, fetchingMore, hasMore]);

  const fetchMore = async () => {
    if (!lastDocRef.current || fetchingMore || !hasMore) return;
    setFetchingMore(true);
    const { ordersData: newOrders, lastDoc, hasMore: more } = await fetchOrders(firestore, lastDocRef.current);
    setOrders(prev => [...prev, ...newOrders]);
    lastDocRef.current = lastDoc;
    setHasMore(more);
    setFetchingMore(false);
    // Fetch missing food names for new batch
    const missingFids = new Set<string>();
    newOrders.forEach(order => {
      order.cartItems?.forEach((item: any) => {
        const fid = String(item.fid);
        if (!foodMap[fid] && !missingFoodNames[fid]) {
          missingFids.add(fid);
        }
      });
    });
    if (missingFids.size > 0) {
      missingFids.forEach(fid => {
        fetchFoodItemById(fid).then(food => {
          setMissingFoodNames(prev => ({ ...prev, [fid]: food?.title || food?.name || `Food #${fid}` }));
        });
      });
    }
  };

  // Main render
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, idx) => {
          const colors = getOrderColors(order.status);
          const isLast = idx === orders.length - 1;
          return (
            <div key={order.id} ref={isLast && hasMore ? lastOrderRef : undefined} className="h-[340px] flex flex-col">
              <OrderCard
                order={order}
                foodMap={foodMap}
                missingFoodNames={missingFoodNames}
                modalSectionTitle={colors.modalSectionTitle}
                modalUserText={colors.modalUserText}
                statusColor={colors.statusColor}
                cardGradient={colors.cardGradient}
                avatarBg={colors.avatarBg}
                itemTagBg={colors.itemTagBg}
                totalText={colors.totalText}
                onClick={() => setModalOrder(order)}
                className="h-full"
              />
            </div>
          );
        })}
        {modalOrder && (() => {
          const colors = getOrderColors(modalOrder.status);
          return (
            <OrderModal
              order={modalOrder}
              foodMap={foodMap}
              missingFoodNames={missingFoodNames}
              modalSectionTitle={colors.modalSectionTitle}
              modalUserText={colors.modalUserText}
              modalStatusColor={colors.modalStatusColor}
              modalAvatarBg={colors.modalAvatarBg}
              modalItemTagBg={colors.modalItemTagBg}
              modalTotalText={colors.modalTotalText}
              modalBorderColor={colors.modalBorderColor}
              onClose={() => setModalOrder(null)}
            />
          );
        })()}
        {fetchingMore && (
          <div className="col-span-full flex justify-center py-6">
            <span className="loader animate-spin w-8 h-8 border-4 border-cyan-300 border-t-transparent rounded-full"></span>
          </div>
        )}
      </div>
    </div>
  );
}
export default Orders;
