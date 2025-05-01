import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useOrderStore} from '../../../store/orders/useOrdersStore';
import OrderSummaryCard from '../../../components/Dashboard/pending/OrderSummaryCard';

interface OrderCardListProps {
  vendorId: string;
  status: string;
}

const OrderCardList: React.FC<OrderCardListProps> = ({vendorId, status}) => {
  const {getVendorOrdersByStatus} = useOrderStore();
  console.log('Vendor ID:', vendorId);
  console.log('Status:', status);
  const pendingOrders = getVendorOrdersByStatus(Number(vendorId), status);
  console.log('Pending Orders:', pendingOrders);
  return (
    <View style={styles.container}>
      {pendingOrders.map(order => (
        <OrderSummaryCard key={`${status}_${order.orderId}`} {...order} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderCardList;
