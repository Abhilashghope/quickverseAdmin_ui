import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useOrderStore} from '../../store/orders/useOrdersStore';
import DashboardTile from './dashboardTile/DashboardTile';
import VendorWiseOrders from '../../screens/Dashboard/screens/VendorWiseOrders';
import {useNavigation} from '@react-navigation/native';
import {OrderStackParamList} from '../../navigation/DashboardNavigation';
import {StackNavigationProp} from '@react-navigation/stack';

type OrderListScreenNavigationProp = StackNavigationProp<
  OrderStackParamList,
  'OrderList'
>;

const OrderListScreen = () => {
  const navigation = useNavigation<OrderListScreenNavigationProp>();
  const {
    orders,
    loading,
    error,
    fetchOrders,
    getPendingOrderCount,
    getAcceptedOrderCount,
    getReadyToShipOrderCount,
  } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const onRefresh = () => {
    fetchOrders();
  };

  if (loading) {
    return (
      <View style={[styles.centered, {flex: 1}]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, {flex: 1}]}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchOrders}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }
  if (orders.length === 0 && !loading) {
    return (
      <View style={[styles.centered, {flex: 1}]}>
        <Text>No orders found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchOrders}>
          <Text style={styles.retryButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <DashboardTile
            size="m"
            label="Pending Orders"
            value={getPendingOrderCount()}
            color="#f8d7da"
            onPress={() =>
              navigation.navigate('VendorOrders', {tab: 'Pending'})
            }
          />
          <DashboardTile
            size="m"
            label="Accepted Orders"
            value={getAcceptedOrderCount()}
            color="#d4edda"
            onPress={() =>
              navigation.navigate('VendorOrders', {tab: 'Accepted'})
            }
          />
          <DashboardTile
            size="l"
            label="Ready To Ship"
            value={getReadyToShipOrderCount()}
            color="#ffeeba"
            onPress={() =>
              navigation.navigate('VendorOrders', {tab: 'ReadyToShip'})
            }
          />
        </View>
      </ScrollView>
      {/* <VendorWiseOrders tab={'Accepted'} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4169E1',
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F6285F',
  },
});

export default OrderListScreen;
