import { View, Text } from 'react-native'
import React from 'react';
import OTP from '../components/Screens.js/OTP';

const OtpScreen = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <OTP navigation={navigation} />
    </View>
  )
}

export default OtpScreen