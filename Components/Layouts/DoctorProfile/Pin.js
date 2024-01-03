import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState, useEffect } from 'react';
import urls from "../../../urls.json";
import axios from 'axios';
import ModalView from '../../Shared/ModalView';
import { delay } from '../../../functions/delay';
import { useNavigation } from '@react-navigation/native';

const PIN = ({setSteps}) => {

  const navigation = useNavigation();
  const in1 = useRef();
  const in2 = useRef();
  const in3 = useRef();
  const in4 = useRef();
  const in5 = useRef();
  const in6 = useRef();
  const [ minutes, setMinutes ] = useState(0);
  const [ seconds, setSeconds ] = useState(45);
  const [ resend, setResend ] = useState(false);
  const [load, setLoad] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

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

  const handleSumit = async() => {
    setLoad(true);
    
    let code = await ''+
    in1.current.value +
    in2.current.value +
    in3.current.value +
    in4.current.value +
    in5.current.value +
    in6.current.value;
    const email = await AsyncStorage.getItem('email');
    await axios.get(`${urls.local_url}/auth/clientLogin`,{
      headers:{
        'email':email, 'password':code
      }
    }).then(async(x)=>{
      if(x.data.status=="success"){
        setModalVisible(true);
        //await getValues()
        //await AsyncStorage.setItem("login", JSON.stringify(x.data));
        await delay(2000);
        await setModalVisible(false);
        setSteps(9)
        //navigation.navigate("Dashboard")
      }else{
        Alert.alert('Error', 'Wrong Code', [
            {text: 'OK', onPress: () => null},
        ])
      }
      setLoad(false)
    })
  }

  const makeCode = (a, current, value) => {
    (a!=null && value!="")?a.current.focus():null;
    current.current.value = value;
  }

  return (
  <View style={styles.container}>
    {modalVisible &&
    <View style={styles.modalBack}>
      <ModalView
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        status={'success'}
        message={'Payment Complete!'}
      />
    </View>
    }
    <Text style={{fontSize:30, color:'black', marginTop:'5%', fontFamily:'Proxim'}}>Enter Your Pin</Text>
    <Text style={{fontSize:15, color:'grey', fontFamily:'Proxim'}}>Enter your pin to continue</Text>
    
    <View style={{paddingTop:"25%"}}>
    <Text style={{color:'black', fontSize:15, fontFamily:'Proxim'}}>Code<Text style={{color:'red'}}> *</Text></Text>
    <View style={{justifyContent:'space-between', flexDirection:'row', marginTop:10}}>
      <TextInput keyboardType="numeric" secureTextEntry={true} style={styles.box} ref={in1} onChangeText={(e)=>makeCode(in2,in1, e)} autoFocus={true} />
      <TextInput keyboardType="numeric" secureTextEntry={true} style={styles.box} ref={in2} onChangeText={(e)=>makeCode(in3,in2, e)} />
      <TextInput keyboardType="numeric" secureTextEntry={true} style={styles.box} ref={in3} onChangeText={(e)=>makeCode(in4,in3, e)} />
      <TextInput keyboardType="numeric" secureTextEntry={true} style={styles.box} ref={in4} onChangeText={(e)=>makeCode(in5,in4, e)} />
      <TextInput keyboardType="numeric" secureTextEntry={true} style={styles.box} ref={in5} onChangeText={(e)=>makeCode(in6,in5, e)} />
      <TextInput keyboardType="numeric" secureTextEntry={true} style={styles.box} ref={in6} onChangeText={(e)=>makeCode(null,in6, e)} />
    </View>
    {/* <View style={{alignItems:'flex-end', marginTop:10}}><Text></Text></View> */}
    </View>

    <View style={{alignItems:'center', marginTop:"20%"}}>
      <Text style={{color:'#D86321', fontSize:20, fontFamily:'Proxim'}}>{minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</Text>
    </View>

    <View>
      <TouchableOpacity style={styles.buttonBase} onPress={handleSumit} disabled={load?true:false}>
        <Text style={{color:'white', fontFamily:'Proxim'}}>{!load?"Continue":<ActivityIndicator color={"white"} />}</Text>
      </TouchableOpacity>
    </View>

    {/* {resend && <View style={{alignItems:'center'}}>
      <TouchableOpacity onPress={()=>{navigation.navigate("Home")}} disabled={load?true:false}>
        <Text style={styles.linkBtn}>Back and Check Details</Text>
      </TouchableOpacity>
    </View>} */}
    
  </View>
  )
}

export default React.memo(PIN)

const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1,
    backgroundColor:'white'
  },
  box:{
    borderWidth:1,
    borderColor:'#499ACF',
    color:'black',
    fontSize:20,
    width:'14%',
    height:'170%',
    borderRadius:5,
    textAlign:'center',
    fontFamily:'Proxim'
  },
  buttonBase: {
    marginTop:20,
    width: "100%",
    height: 40,
    backgroundColor: '#D86321',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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