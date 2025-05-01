import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from 'react-native';
import CollapsableVendor from '../../../components/Dashboard/pending/CollapsableVendor';
import {useOrderStore} from '../../../store/orders/useOrdersStore';
import {Vendor} from '../../../store/vendors/useVendorStore';
import OrderCardList from '../screens/OrderCardList';

interface ReadyToShipTabProps {
  vendors: Vendor[];
}
const ReadyToShipTab: React.FC<ReadyToShipTabProps> = ({vendors}) => {
  const {getVendorOrdersByStatus} = useOrderStore();
  const [vendorsWithreadyToShipOrders, setVendorsWithReadyToShipOrders] =
    useState<Vendor[]>([]);
  console.log('ReadyToShipTab vendors:', vendors);
  useEffect(() => {
    const fetchReadyToShipVendors = () => {
      const readyToShipVendors: Vendor[] = vendors.filter(vendor => {
        // ⚡ vendor.vendorId is string, shopId is number — need to convert
        const readyToShipOrders = getVendorOrdersByStatus(
          Number(vendor.vendorId),
          'READY_TO_SHIP',
        );
        return readyToShipOrders?.length > 0;
      });

      setVendorsWithReadyToShipOrders(readyToShipVendors);
    };

    if (vendors?.length > 0) {
      fetchReadyToShipVendors();
    }
  }, [vendors, getVendorOrdersByStatus]);
  return (
    <ScrollView style={{marginHorizontal: 16}}>
      {vendorsWithreadyToShipOrders?.length === 0 ? (
        <Text>No vendors with ready to ship orders</Text>
      ) : (
        vendorsWithreadyToShipOrders.map(vendor => (
          <CollapsableVendor
            key={`readytoship_${vendor.vendorId}`}
            vendorName={vendor.vendorName}
            vendorLogoUrl="https://example.com/logo.png"
            status="ready to ship"
            onCallPress={() => console.log('Calling vendor...')}>
            <OrderCardList
              key={`readyToShip_orders_${vendor.vendorId}`}
              vendorId={vendor.vendorId}
              status="READY_TO_SHIP"
            />
          </CollapsableVendor>
        ))
      )}
    </ScrollView>
  );
};

export default ReadyToShipTab;
