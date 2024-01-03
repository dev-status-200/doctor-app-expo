import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState, useEffect } from 'react';
import urls from "../../../urls.json";
import axios from 'axios';
import ModalView from '../../Shared/ModalView';
import { delay } from '../../../functions/delay';

const Pin = ({setForm, SignUpComplete}) => {

  const in1 = useRef();
  const in2 = useRef();
  const in3 = useRef();
  const in4 = useRef();
  const in5 = useRef();
  const in6 = useRef();
  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] = useState(45);
  const [ resend, setResend ] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);

  const[email, setEmail] = useState("")

  useEffect(()=>{
    let myInterval = setInterval(() => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(myInterval);
        setResend(true);
      } else {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    } 
    }, 1000)
    return ()=> {
      clearInterval(myInterval);
    };
  });
    
  useEffect(() => {
    getData();
  }, [])
  
  const getData = async () => {
    try {
      const valueA = await AsyncStorage.getItem('formA');
      const valueB = await AsyncStorage.getItem('formB');
      const valueC = await AsyncStorage.getItem('formC');
      const valueD = await AsyncStorage.getItem('formD');

      handleSignUp(
        valueA,
        valueB,
        valueC,
        valueD
      )
    } catch (e) {
      // error reading value
    }
  };

  const handleSignUp = async(a,b,c,d) => {
    let clientData = await {...JSON.parse(a)};
    setEmail(clientData.email);
    await AsyncStorage.setItem("email", clientData.email);
    axios.post(`${urls.local_url}/clients/create`,{
      client:{...JSON.parse(a), ...JSON.parse(b)},
      disease:{...JSON.parse(d)},
      relatives:{...JSON.parse(c)}
    }).then(async(x)=>{
      console.log(x.data)
      if(x.data.status=="email already exists!"){
        createTwoButtonAlert();
      } else {
        SignUpComplete(clientData.email);
        //await AsyncStorage.setItem("login", JSON.stringify(x.data));
      }
    })
  };


  const makeCode = (a, current, value) => {
    (a!=null && value!="")?a.current.focus():null;
    current.current.value = value;
  }

  const createTwoButtonAlert = () =>
    Alert.alert('Error', 'Email Already Exists', [
      {text: 'OK', onPress: () => setForm("A")},
    ]
  );

  return (
  <View style={styles.container}>
      <ActivityIndicator color={'#D86321'} size={'large'} />
      <Text style={{fontFamily:'Proxim'}}>Loading</Text>
  </View>
  )
}

export default React.memo(Pin)

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    flex:1
  },
  box:{
    borderWidth:1,
    borderColor:'#499ACF',
    width:'14%',
    borderRadius:5,
    textAlign:'center',
    color:'black',
    fontSize:20,
    fontFamily:'Proxim'
  },
  linkBtn:{
    color:'grey', 
    marginTop:20, 
    fontSize:15, 
    fontWeight:'500', 
    borderBottomWidth:1, 
    borderBottomColor:'grey',
    fontFamily:'Proxim'
  },
  modalBack:{
    position:'absolute', height:"150%", width:"150%",
    backgroundColor:'#373737', opacity:0.7, zIndex:1
  }
})