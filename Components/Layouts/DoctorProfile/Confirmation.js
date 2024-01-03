import React, { useState, useEffect } from 'react';
import axios from "axios";
import AntdIcons from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import urls from "../../../urls.json";
// import { useStripe } from '@stripe/stripe-react-native';
import { usePlatformPay, PlatformPay, PlatformPayButton, isPlatformPaySupported } from '@stripe/stripe-react-native';

const Confirmation = ({setSteps, payType, profile, selectHour, selectedDate, total, service, setLoad}) => {

    const setNextStep = async() => {
        // setLoad(true)
        // const values = await AsyncStorage.getItem("email")
        // await axios.get(`https://curly-familiar-scorpion.glitch.me/auth/clientOtpSend`,{
        //     headers:{email:values}
        // })
        // .then(async(x)=>{
        //     setSteps(8)
        //     setLoad(false)
        // })
        setSteps(9)
    };

  return (
    <View style={{padding:20}}>
        <View style={[styles.banner, styles.shadow]}>
            <View style={{padding:10, width:'25%'}}>
                <AntdIcons name="user" color={"grey"} size={60} />
            </View>
            <View style={{paddingLeft:15, paddingTop:5, width:'75%'}}>
                <Text style={styles.heading}>{`Dr. ${profile?.firstName} ${profile?.lastName}`}</Text>
                <Text style={{width:'90%', lineHeight:14}}>{profile.Specializations.map((x, i)=>{
                    return(
                        <Text key={i} style={[styles.para]}>{x.name}, </Text>
                    )
                })}
                </Text>
                <Text style={[styles.para, {marginTop:3}]}>{`${profile?.address1}${profile?.address2?', '+profile?.address2:''}, ${profile?.city}, ${profile?.state}`}</Text>
            </View>
        </View>
        <View style={[styles.shadow, { marginTop:20, backgroundColor:'white', padding:20, borderRadius:15 }]}>
            <Text style={[styles.para, { color:'#D86321', fontSize:20 }]}>Appointment</Text>
            <View style={styles.hr}></View>
            <View style={styles.row}>
                <Text style={styles.detail}>Date & Time</Text>
                <Text style={[styles.detail, {fontFamily:"ProximaBold"}]}>{selectedDate} / {selectHour}</Text>
            </View>
            <View style={[styles.row, { marginTop:10, marginBottom:10 }]}>
                <Text style={styles.detail}>Location</Text>
                <Text style={[styles.detail, {fontFamily:"ProximaBold"}]}>United Stated of America</Text>
            </View>
        </View>
        <View style={[styles.shadow, { marginTop:20, backgroundColor:'white', padding:20, borderRadius:15 }]}>
            <Text style={[styles.para, { color:'#D86321', fontSize:20 }]}>Services Selected</Text>
            <View style={styles.hr}></View>
            {service.filter((x)=>{ return x.check=="0"}).map((x)=>{
                return(
                <View style={styles.row} key={x.id}>
                    <Text style={styles.detail}>{x.name}</Text>
                    <Text style={[styles.detail, {fontFamily:"ProximaBold"}]}>$ {x.price}</Text>
                </View>
                )
            })}
            <View style={[styles.row, { marginTop:20 }]} >
                    <Text style={styles.detail}>Total</Text>
                    <Text style={[styles.detail, {fontFamily:"ProximaBold"}]}>$ {total}</Text>
                </View>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
            <View style={[styles.row, styles.shadow, {backgroundColor:'white', padding:20, borderRadius:15}]} 
                onPress={()=>setSteps(6)}
            >
                <View style={{width:"80%", paddingLeft:"3%", justifyContent:'center'}}>
                    <Text style={{fontFamily:"ProximaBold"}}>{payType==1?"Paypal":payType==2?"Google Pay":"Apple Pay"}</Text>
                </View>
                <View style={{width:"20%", justifyContent:'center'}}>
                    <TouchableOpacity
                        onPress={()=>setSteps(6)}
                    >
                        <Text style={styles.orange}>Change</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>

        <TouchableOpacity style={[styles.buttonBase, {marginTop:20}]} 
            onPress={setNextStep}
        >
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>
                Pay Now
            </Text>
        </TouchableOpacity>
    </View>
  )
}
export default Confirmation

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    banner:{
        borderColor:'#f3f6f4',
        borderWidth:1,
        padding:20,
        borderRadius:15,
        backgroundColor:'white',
        flexDirection:'row'
    },
    shadow:{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 14,
        },
        shadowOpacity:  0.24,
        shadowRadius: 15.38,
        elevation: 19
    },
    heading:{
        fontSize:18,
        fontFamily:'ProximaBold'
    },
    para:{
        fontFamily:"Proxim",
        color:'grey'
    },
    paraGrey:{
        color:'grey',
        fontFamily:"Proxim",
        fontSize:16
    },
    paraBlack:{
        fontFamily:"Proxim",
        fontSize:16
    },
    hr:{
        backgroundColor:'silver',
        height:1,
        marginTop:10,
        marginBottom:10,
    },
    detail:{
        fontFamily:"Proxim",
        fontSize:15
    },
    orange:{
        color:'#D86321'
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
});