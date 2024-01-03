import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Dashboard from '../Components/Layouts/Dashboard/index';

const DashboardScreen = ({navigation}) => {
  return (
    <View style={{backgroundColor:'white', flex:1}}>
      <Dashboard navigation={navigation} />
    </View>
  )
}

export default DashboardScreen

const styles = StyleSheet.create({})