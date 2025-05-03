import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type OrderCardProps = {
  vendorName: string;
  vendorLogoUrl: string;
  status:
    | 'pending'
    | 'cancelled'
    | 'readytoship'
    | 'completed'
    | 'cancelled'
    | 'accepted';
  children?: React.ReactNode;
  vendorPhone: string;
};

const CollapsableVendor: React.FC<OrderCardProps> = ({
  vendorName,
  vendorLogoUrl,
  status,
  vendorPhone,
  children,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(prev => !prev);
  };
  const handleCallCustomer = () => {
    const phoneNumber = `tel:${vendorPhone}`;
    Linking.openURL(phoneNumber);
  };
  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.header} onPress={handleToggleExpand}>
        <View style={styles.vendorInfo}>
          <Image
            source={{uri: vendorLogoUrl}}
            style={styles.vendorLogo}
            resizeMode="contain"
          />

          <Text style={styles.vendorName}>{vendorName}</Text>

          <View
            style={[
              styles.statusDot,
              {backgroundColor: getStatusColor(status)},
            ]}
          />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={handleCallCustomer}>
            <Icon
              name="phone"
              size={16}
              color="#fff"
              style={{marginRight: 4}}
            />
            <Text style={styles.callButtonText}>Call </Text>
          </TouchableOpacity>

          <Icon
            name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
            size={24}
            color="#333"
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Content passed as children */}
      {expanded && <View style={styles.details}>{children}</View>}
    </View>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'red';
    case 'accepted':
      return 'orange';
    case 'readytoship':
      return 'orange';
    case 'cancelled':
      return 'red';
    case 'completed':
      return 'green';
    default:
      return 'gray';
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vendorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vendorLogo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  vendorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
    marginRight: 6,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  callButton: {
    backgroundColor: '#0057A0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginRight: 10,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    marginTop: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
  },
});

export default CollapsableVendor;
