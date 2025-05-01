import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';

import {Vendor} from '../../../store/vendors/useVendorStore';
import {useOrderStore} from '../../../store/orders/useOrdersStore';
import CollapsableVendor from '../../../components/Dashboard/pending/CollapsableVendor';
import OrderCardList from '../screens/OrderCardList';

interface PendingTabProps {
  vendors: Vendor[];
}

const PendingTab: React.FC<PendingTabProps> = ({vendors}) => {
  const {getVendorOrdersByStatus} = useOrderStore();
  const [vendorsWithPendingOrders, setVendorsWithPendingOrders] = useState<
    Vendor[]
  >([]);
  console.log('PendingTab vendors:', vendors);
  useEffect(() => {
    const fetchPendingVendors = () => {
      const pendingVendors: Vendor[] = vendors.filter(vendor => {
        // ⚡ vendor.vendorId is string, shopId is number — need to convert
        const pendingOrders = getVendorOrdersByStatus(
          Number(vendor.vendorId),
          'PENDING',
        );
        return pendingOrders?.length > 0;
      });

      setVendorsWithPendingOrders(pendingVendors);
    };

    if (vendors?.length > 0) {
      fetchPendingVendors();
    }
  }, [vendors, getVendorOrdersByStatus]);

  return (
    <ScrollView style={{marginHorizontal: 16}}>
      {vendorsWithPendingOrders?.length === 0 ? (
        <Text>No vendors with pending orders</Text>
      ) : (
        vendorsWithPendingOrders.map(vendor => (
          <CollapsableVendor
            key={`pending_${vendor.vendorId}`}
            vendorName={vendor.vendorName}
            vendorLogoUrl="https://example.com/logo.png"
            status="pending"
            onCallPress={() => console.log('Calling vendor...')}>
            <OrderCardList
              key={`pending_orders_${vendor.vendorId}`}
              vendorId={vendor.vendorId}
              status="PENDING"
            />
          </CollapsableVendor>
        ))
      )}
    </ScrollView>
  );
};

export default PendingTab;
