import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Location from 'expo-location';

export default function App({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
      getLocationPermission();
    }, []);

    const getLocationPermission = async() => {
      console.log('here')
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
        latitudeDelta:0.922,
        longitudeDelta:0.0421,
      });
    }

    const handleSubmit = async() => {
      await AsyncStorage.setItem("location", JSON.stringify(location));
      navigation.navigate("Dashboard")
    }

  return (
    <View style={styles.container}>
      {location &&
      <MapView
        style={styles.map}
        region={location}
      >
        <Marker coordinate={location} title="Marker" />
      </MapView>
      }
      {!location &&
      <View style={{flex:1, justifyContent:'center'}}>
        <ActivityIndicator color={'orange'} size={'large'} />
        <Text style={{textAlign:'center'}}>Fetching Google Services</Text>
      </View>
      }
      <TouchableOpacity style={styles.buttonBase} onPress={handleSubmit}>
        <Text style={{color:'white', fontFamily:'Proxim'}}>Set My Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  map:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height
  },
  buttonBase: {
    width: "90%",
    margin:"5%",
    height: 40,
    backgroundColor: '#D86321',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:10,
  },
})