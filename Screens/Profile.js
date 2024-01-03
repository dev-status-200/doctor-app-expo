import { View } from 'react-native'
import React from 'react';
import ProfileScreen from '../Components/Layouts/Profile/index';

const Profile = ({navigation}) => {
  return (
    <View style={{flex:1}}>
      <ProfileScreen navigation={navigation} />
    </View>
  )
}

export default Profile