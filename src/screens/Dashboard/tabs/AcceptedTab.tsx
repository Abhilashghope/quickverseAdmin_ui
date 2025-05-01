import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {useOrderStore} from '../../../store/orders/useOrdersStore';
import {Vendor} from '../../../store/vendors/useVendorStore';
import CollapsableVendor from '../../../components/Dashboard/pending/CollapsableVendor';
import OrderCardList from '../screens/OrderCardList';

interface AcceptedTabProps {
  vendors: Vendor[];
}
const AcceptedTab: React.FC<AcceptedTabProps> = ({vendors}) => {
  const {getVendorOrdersByStatus} = useOrderStore();
  const [vendorsWithAcceptedOrders, setVendorsWithAcceptedOrders] = useState<
    Vendor[]
  >([]);
  console.log('AcceptedTab vendors:', vendors);
  useEffect(() => {
    const fetchAcceptedVendors = () => {
      const acceptedVendors: Vendor[] = vendors.filter(vendor => {
        // ⚡ vendor.vendorId is string, shopId is number — need to convert
        const acceptedOrders = getVendorOrdersByStatus(
          Number(vendor.vendorId),
          'ACCEPTED',
        );
        return acceptedOrders?.length > 0;
      });
      console.log('Accepted vendors:', acceptedVendors);
      setVendorsWithAcceptedOrders(acceptedVendors);
    };

    if (vendors?.length > 0) {
      fetchAcceptedVendors();
    }
  }, [getVendorOrdersByStatus, vendors]);
  return (
    <ScrollView style={{marginHorizontal: 16}}>
      {vendorsWithAcceptedOrders?.length === 0 ? (
        <Text>No vendors with accepted orders</Text>
      ) : (
        vendorsWithAcceptedOrders.map(vendor => (
          <CollapsableVendor
            key={`accepted_${vendor.vendorId}`}
            vendorName={vendor.vendorName}
            vendorLogoUrl="https://example.com/logo.png"
            status="accepted"
            onCallPress={() => console.log('Calling vendor...')}>
            <OrderCardList
              key={`accepted_orders_${vendor.vendorId}`}
              vendorId={vendor.vendorId}
              status="ACCEPTED"
            />
          </CollapsableVendor>
        ))
      )}
    </ScrollView>
  );
};

export default AcceptedTab;
