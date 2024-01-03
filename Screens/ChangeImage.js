import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { delay } from '../functions/delay';
import ModalView from '../Components/Shared/ModalView';

export default function ImagePickerExample({navigation}) {

  const [image, setImage] = useState(null);
  const [load, setLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if(!result.canceled){
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async() => {
    setLoad(true)
    await AsyncStorage.setItem("userImage", `${image}`)
    await delay(3000);
    setModalVisible(true)
    await delay(1000);
    navigation.navigate("Dashboard")
  }

  return (
    <View style={styles.container}>
      {!modalVisible &&<>
      {image && <Image source={{ uri: image }} style={styles.imageStyle} />}
      {!image && <Entypo name="images" color={"rgba(218, 112, 37, 0.77)"} size={132} />}
      <View style={{padding:20, width:'100%'}}>
      <TouchableOpacity style={styles.buttonBase} onPress={pickImage}>
        <Text style={styles.btnText}>{image==null?"Choose Image":"Choose Again"}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonBase, {backgroundColor:image==null?"silver":'#D86321'}]} 
        disabled={image==null?true:false}
        onPress={uploadImage}
      >
        <Text style={styles.btnText}>{!load?"Upload":<Text><ActivityIndicator color={"white"} /></Text>}</Text>
      </TouchableOpacity>
      </View>
      </>}
      {modalVisible && 
        <ModalView 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible} 
          status={'success'} 
          message={'Image Updated!'} 
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white'
  },
  imageStyle: {
    width: 200,
    height: 200,
    borderRadius:100,
    borderColor:'orange',
    borderWidth:1
  },
  buttonBase: {
    width: "100%",
    marginBottom:15,
    height: 40,
    backgroundColor: '#D86321',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
    btnText: {
    color:'white',
    fontFamily:'Proxim'
  },
});