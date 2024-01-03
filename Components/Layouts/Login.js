import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import { CountryFlag } from 'react-native-flag-creator';
// import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect } from 'react';
import codes from "../../jsonData/codes.json";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from "axios";
import urls from "../../urls.json";
const bgColor = '#EEEEEE';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginComponent = ({navigation}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("pk");
    const [items, setItems] = useState(codes);
    const [number, setNumber] = useState('');
    const [load, setLoad] = useState(false);

    const handleSubmit = async() => {
        setLoad(true);
        await axios.get(`https://curly-familiar-scorpion.glitch.me/auth/clientOtpSend`,{
            headers:{email:number}
        })
        .then(async(x)=>{
            if(x.data.status=="error"){
                Alert.alert('Error', <Text style={{fontFamily:'Proxim'}}>No such kind of email exists!</Text>, [
                        {text: 'OK', onPress: () => null},
                    ]
                );
            } else if(x.data.status=="success") {
                await AsyncStorage.setItem("email", number);
                navigation.navigate("OtpScreen");
            }
            setLoad(false)
        })
    }

  return (
    <View>
        <Text style={styles.blackTxt}>Log In</Text>
        <Text style={styles.gretTxt}>Enter your Email to Login</Text>
        <View style={styles.divider}></View>
        <Text style={[styles.blackTxt, {fontSize:14}]}>Email</Text>
        <View style={{flexDirection:'row', width:'100%', marginTop:5}}>
            {/* <View style={styles.greyContainer}>
                <View style={{width:"19%", paddingTop:"3%"}}>
                    <CountryFlag countryCode={value} style={styles.countryFlag} />
                </View>
                <View style={{width:"31%"}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    theme='LIGHT'
                    setValue={setValue}
                    setItems={setItems}
                    searchable={true}
                    onChangeValue={(value) => {
                        console.log(value);
                    }}
                    style={{
                        backgroundColor:bgColor,
                        borderColor:bgColor,
                        width:80
                    }}
                    textStyle={{
                        borderColor:bgColor
                    }}
                    labelStyle={{
                        borderColor:bgColor
                    }}
                />
                </View>
                <View style={styles.vertical}></View>
                <View style={{width:'50%', paddingLeft:5, paddingTop:1}}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumber}
                    value={number}
                    placeholder="3334409234"
                    keyboardType="numeric"
                    placeholderTextColor={"silver"}
                />
                </View>
            </View> */}
            <View style={styles.greyContainer}>
                <View style={{width:'100%', paddingLeft:5, paddingTop:1}}>
                <TextInput 
                    autoFocus={true} 
                    style={[styles.input, {padding:10}]}
                    onChangeText={setNumber}
                    value={number}
                    placeholder="Enter Your Email"
                    placeholderTextColor={"silver"}
                />
                </View>
            </View>
            <View style={{width:"2%"}}></View>
            <View style={styles.thumbContainer}>
                <MaterialCommunityIcons name="fingerprint" color={"#D86321"} size={32} />
            </View>
        </View>
        <View style={{marginTop:20, justifyContent:"center", alignItems:'center'}}>
            <TouchableOpacity style={styles.buttonBase} onPress={handleSubmit} disabled={load?true:false}>
                <Text style={styles.btnText}>{!load?"Continue":<ActivityIndicator color={"white"} />}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={load?true:false}
                style={{borderBottomWidth:1, borderBottomColor:'grey', marginTop:20, paddingBottom:1}}
                onPress={()=>navigation.navigate("Signup")}
            >
                <Text style={{color:"black", fontSize:16, fontFamily:'Proxim'}}>Sign Up</Text>
            </TouchableOpacity>

        </View>
    </View>
  )
}

export default React.memo(LoginComponent)

const styles = StyleSheet.create({
    blackTxt:{
        color:'#36454F',
        fontSize:25,
        fontWeight:'400',
        fontFamily:'Proxim'
    },
    gretTxt:{
        color:'#76848D',
        fontSize:15,
        fontWeight:'400',
        marginTop:5,
        fontFamily:'Proxim'
    },
    divider:{
        backgroundColor:'silver',
        height:1,
        width:'100%',
        marginTop:10,
        marginBottom:10,
    },
    greyContainer:{
        flexDirection:'row', backgroundColor:bgColor, width:'83%', borderRadius:5
    },
    vertical:{
        backgroundColor:'silver', width:1, marginTop:11,marginBottom:11
    },
    countryFlag: {
        height: 23,
        width: 35,
        borderRadius: 2,
        marginTop:"10%",
        marginLeft:10,
    },
    input: {
        color:'#36454F',
        fontFamily:'Proxim'
    },
    thumbContainer:{
        borderColor:'orange', borderWidth:1, width:'15%', borderRadius:5, padding:"2%"
    },
    buttonBase: {
        width: "100%",
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
        btnText:{
        color:'white',
        fontFamily:'Proxim'
    },
})