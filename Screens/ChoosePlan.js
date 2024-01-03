import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import ChoosePlan from '../Components/Layouts/ChoosePlan/index';

const ChoosePlanScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <ImageBackground source={require('../assets/images/blackDoctor.png')} resizeMode="cover" style={styles.image}>
      <ChoosePlan navigation={navigation} />
    </ImageBackground>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: 'flex-end',
    }
  });

export default ChoosePlanScreen