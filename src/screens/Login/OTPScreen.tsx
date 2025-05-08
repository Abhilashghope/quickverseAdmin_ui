import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {LoginStackParamList} from '../../navigation/LoginNavigation';
import {useAuth} from '../../contexts/Login/AuthProvider';

const {height} = Dimensions.get('window');

const CELL_COUNT = 4;
type LoginScreenRouteProp = RouteProp<LoginStackParamList, 'OTPScreen'>;
const OTPScreen: React.FC = () => {
  const route = useRoute<LoginScreenRouteProp>();
  const {phoneNumber, verificationId} = route.params;
  const navigation = useNavigation();
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const auth = useAuth();
  const verifyOTP = async () => {
    if (value.length !== CELL_COUNT) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP');
      return;
    }

    console.log('Login button pressed');
    setLoading(true);
    try {
      await auth.verifyOtp(phoneNumber, value, verificationId);
      console.log('success');
    } catch (err) {
      console.log('Error:', err);
      Alert.alert('Error', 'Login failed');
    } finally {
      console.log('finally');
      setLoading(false);
    }
    Alert.alert('Success', 'OTP verified successfully');
  };

  const handleChangeNumber = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Top 50% background image */}

      <ImageBackground
        source={require('../../assets/images/bg_1.png')}
        style={styles.topBackground}
        resizeMode="cover"
      />

      <View style={styles.logoContainer}>
        <Image
          style={styles.topLogo}
          source={require('../../assets/images/logo_qv.png')}
        />
      </View>

      {/* Floating login card */}
      <View style={styles.card}>
        <Text style={styles.title}>Enter Your OTP</Text>
        <Text style={styles.subtitle}>{`OTP sent to ${phoneNumber}`}</Text>

        {/* OTP Input */}
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              onLayout={getCellOnLayoutHandler(index)}
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        <TouchableOpacity>
          <Text style={styles.subTitle_2}>
            Didn’t receive the OTP? <Text style={styles.link}>Resend Code</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{marginTop: 'auto', marginBottom: 15}}
          onPress={handleChangeNumber}>
          <Text style={styles.changeNumber}>Change Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.otpButton}
          onPress={verifyOTP}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.otpText}>Verify and Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
  },
  topBackground: {
    height: height * 0.6,
    width: '100%',
    position: 'absolute',
    top: -80,
  },
  logoContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 70,
  },
  topLogo: {width: 90, objectFit: 'contain'},

  card: {
    width: '90%',
    height: '68%',
    marginTop: 100,
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 24,

    borderWidth: 1,
    borderColor: 'yellow',

    // shadow
    shadowColor: '#FAE588',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 22,
    color: '#F3F4F6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 5,
    marginBottom: 16,
  },

  skipContainer: {
    position: 'absolute',
    top: 8,
    right: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#4B5563',
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 16,

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 3,
  },

  // button
  otpButton: {
    backgroundColor: '#FFE885',
    borderRadius: 8,
    paddingVertical: 14,
    // marginTop: "auto",
  },
  otpText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },

  subTitle_2: {
    color: 'grey',
    textAlign: 'center',
    marginTop: 12,
  },
  link: {
    color: '#FAE588',
    // fontWeight: "600",
  },

  changeNumber: {
    fontSize: 16,
    color: '#FAE588',
    textAlign: 'center',
    marginTop: 'auto',
  },

  // otp
  codeFieldRoot: {
    marginTop: '12%',
    marginBottom: '5%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 22,
    color: 'white',
  },
  focusCell: {
    borderColor: '#005EB8',
  },
});
