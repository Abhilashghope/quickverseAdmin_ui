// import React, {useEffect, useState} from 'react';
// import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import PendingTab from '../tabs/PendingTab';
// import AcceptedTab from '../tabs/AcceptedTab';
// import ReadyToShipTab from '../tabs/ReadyToShipTab';
// import {useVendorStore, Vendor} from '../../../store/vendors/useVendorStore';
// import {useCampusesStore} from '../../../store/campuses/useCampusesStore';
// import {OrderStackParamList} from '../../../navigation/DashboardNavigation';
// import {RouteProp, useRoute} from '@react-navigation/native';

// // interface VendorWiseOrdersProps {
// //   tab: 'Pending' | 'Accepted' | 'ReadyToShip';
// // }
// const TABS = ['Pending', 'Accepted', 'ReadyToShip'];
// type VendorWiseOrdersRouteProp = RouteProp<OrderStackParamList, 'VendorOrders'>;
// const VendorWiseOrders: React.FC = () => {
//   const route = useRoute<VendorWiseOrdersRouteProp>();
//   const {tab} = route.params;
//   const [activeTab, setActiveTab] = useState<
//     'Pending' | 'Accepted' | 'ReadyToShip'
//   >(tab);
//   const {vendors, loading, error, fetchVendors} = useVendorStore();
//   const [allVendors, setAllVEndors] = useState<Vendor[]>([]);
//   const selectedCampus = useCampusesStore(state => state.selectedCampus);
//   console.log('Selected campus:', selectedCampus);
//   useEffect(() => {
//     if (selectedCampus) {
//       fetchVendors(selectedCampus.campusId);
//     }
//   }, [fetchVendors, selectedCampus]);
//   useEffect(() => {
//     if (vendors.length > 0) {
//       setAllVEndors(vendors);
//     }
//   }, [vendors]);
//   if (loading) {
//     return <Text>Loading vendors...</Text>;
//   }
//   if (error) {
//     return <Text>Error: {error}</Text>;
//   }

//   if (vendors.length === 0) {
//     return <Text>No vendors available</Text>;
//   }
//   console.log('Active tab:', activeTab);
//   const renderTabContent = () => {
//     console.log('All vendors:', allVendors);
//     switch (activeTab) {
//       case 'Pending':
//         console.log('Pending vendors:', allVendors);
//         return <PendingTab vendors={allVendors} />;
//       case 'Accepted':
//         console.log('Accepted vendors:', allVendors);
//         return <AcceptedTab vendors={allVendors} />;
//       case 'ReadyToShip':
//         console.log('Ready to ship vendors:', allVendors);
//         return <ReadyToShipTab vendors={allVendors} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Tabs */}
//       <View style={styles.tabWrapper}>
//         <View style={styles.tabContainer}>
//           {TABS.map((activetab: 'Pending' | 'Accepted' | 'ReadyToShip') => (
//             <TouchableOpacity
//               key={activetab}
//               onPress={() => setActiveTab(activetab)}
//               style={styles.tabButton}>
//               <Text
//                 style={[
//                   styles.tabText,
//                   activeTab === activetab && styles.activeTabText,
//                 ]}>
//                 {activetab}
//               </Text>
//               {/* Active underline */}
//               {activeTab === activetab && (
//                 <View style={styles.activeUnderline} />
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>

//       {/* Tab Content */}
//       {renderTabContent()}
//     </SafeAreaView>
//   );
// };

// export default VendorWiseOrders;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   tabWrapper: {
//     borderBottomWidth: 1,
//     borderBottomColor: '#d1d1d1', // Light gray border
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#f5f5f5',
//   },
//   tabButton: {
//     alignItems: 'center',
//     paddingTop: 12,
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#5c5c5c', // Inactive color
//   },
//   activeTabText: {
//     color: '#f04d7d', // Active color (pinkish)
//   },
//   activeUnderline: {
//     marginTop: 10,
//     height: 5,
//     width: '90%',
//     backgroundColor: '#f04d7d',
//     borderRadius: 2,
//   },
// });
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import PendingTab from '../tabs/PendingTab';
import AcceptedTab from '../tabs/AcceptedTab';
import ReadyToShipTab from '../tabs/ReadyToShipTab';
import {useVendorStore, Vendor} from '../../../store/vendors/useVendorStore';
import {useCampusesStore} from '../../../store/campuses/useCampusesStore';
import {OrderStackParamList} from '../../../navigation/DashboardNavigation';
import {RouteProp, useRoute} from '@react-navigation/native';

type VendorWiseOrdersRouteProp = RouteProp<OrderStackParamList, 'VendorOrders'>;

const TABS = ['Pending', 'Accepted', 'ReadyToShip'] as const;
type TabType = (typeof TABS)[number];

const VendorWiseOrders: React.FC = () => {
  const route = useRoute<VendorWiseOrdersRouteProp>();
  const {tab} = route.params;
  const [activeTab, setActiveTab] = useState<TabType>(tab);
  const {vendors, loading, error, fetchVendors} = useVendorStore();
  const [allVendors, setAllVEndors] = useState<Vendor[]>([]);
  const selectedCampus = useCampusesStore(state => state.selectedCampus);

  useEffect(() => {
    if (selectedCampus) {
      fetchVendors(selectedCampus.campusId);
    }
  }, [fetchVendors, selectedCampus]);

  useEffect(() => {
    if (vendors.length > 0) {
      setAllVEndors(vendors);
    }
  }, [vendors]);

  if (loading) {
    return <Text>Loading vendors...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (vendors.length === 0) {
    return <Text>No vendors available</Text>;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Pending':
        return <PendingTab vendors={allVendors} />;
      case 'Accepted':
        return <AcceptedTab vendors={allVendors} />;
      case 'ReadyToShip':
        return <ReadyToShipTab vendors={allVendors} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabWrapper}>
        <View style={styles.tabContainer}>
          {TABS.map(tabItem => (
            <TouchableOpacity
              key={tabItem}
              onPress={() => setActiveTab(tabItem)}
              style={styles.tabButton}>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tabItem && styles.activeTabText,
                ]}>
                {tabItem}
              </Text>
              {/* Active underline */}
              {activeTab === tabItem && <View style={styles.activeUnderline} />}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  tabWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#d1d1d1', // Light gray border
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f5f5f5',
  },
  tabButton: {
    alignItems: 'center',
    paddingTop: 12,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5c5c5c', // Inactive color
  },
  activeTabText: {
    color: '#f04d7d', // Active color (pinkish)
  },
  activeUnderline: {
    marginTop: 10,
    height: 5,
    width: '90%',
    backgroundColor: '#f04d7d',
    borderRadius: 2,
  },
});

export default VendorWiseOrders;
