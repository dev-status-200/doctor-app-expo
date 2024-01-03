import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { RadioButton } from 'react-native-radio-buttons-group';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { isPlatformPaySupported } from '@stripe/stripe-react-native';

const Payment = ({payType, setPayType, setSteps}) => {

    const setNextStep = () => setSteps(7);
    const [googlePay, setGooglePay] = useState(false)

    useEffect(()=>{
        checkPlatformPay();
    }, []);

    const checkPlatformPay = async() => {
        if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
            Alert.alert('Google Pay is not supported.');
        } else {
            setGooglePay(true)
        }
    }

  return (
    <View style={{padding:20}}>
        <Text style={{fontFamily:"Proxim"}}>
            Select Payment Method you want to use.
        </Text>
        <View style={{marginTop:10, marginBottom:10}}>
            <TouchableOpacity style={[styles.row, styles.shadow]} onPress={()=>setPayType(1)}>
                    <View style={{width:"14%"}}>
                        <View style={[{justifyContent:'center', alignItems:'center', alignContent:'center'}]}>
                            <Entypo name="paypal" color={"#2d3f4c"} size={25} />
                        </View>
                    </View>
                    <View style={{width:"76%", paddingLeft:"3%", justifyContent:'center'}}>
                        <Text style={{fontFamily:"ProximaBold"}}>Paypal</Text>
                    </View>
                    <View style={{width:"14%", justifyContent:'center'}}>
                        <RadioButton 
                            radioButtons={[{id:1}]}
                            onPress={(x)=>console.log(x)}
                            layout='row'
                            size={18}
                            color={styles.orange.color}
                            selected={payType==1?true:false}
                        />
                    </View>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
            <TouchableOpacity style={[styles.row, styles.shadow]}
                onPress={()=>googlePay?setPayType(2):null}
            >
                <View style={{width:"14%"}}>
                    <View style={[{justifyContent:'center', alignItems:'center', alignContent:'center'}]}>
                    <AntDesign name="google" color={googlePay?"#2d3f4c":'silver'} size={25} />
                    </View>
                </View>
                <View style={{width:"76%", paddingLeft:"3%", justifyContent:'center'}}>
                    <Text style={{fontFamily:"ProximaBold", color:googlePay?'black':'silver'}}>Google Pay</Text>
                </View>
                <View style={{width:"14%", justifyContent:'center'}}>
                    <RadioButton 
                        radioButtons={[{id:1}]}
                        onPress={(x)=>console.log(x)}
                        layout='row'
                        size={18}
                        color={styles.orange.color}
                        selected={payType==2?true:false}
                    />
                </View>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:10, marginBottom:10}}>
            <TouchableOpacity style={[styles.row, styles.shadow]} 
                //onPress={()=>setPayType(3)}
            >
                <View style={{width:"14%"}}>
                    <View style={[{justifyContent:'center', alignItems:'center', alignContent:'center'}]}>
                    <AntDesign name="apple1" color={"silver"} size={25} />
                    </View>
                </View>
                <View style={{width:"76%", paddingLeft:"3%", justifyContent:'center'}}>
                    <Text style={{fontFamily:"ProximaBold", color:'silver'}}>Apple Pay</Text>
                </View>
                <View style={{width:"14%", justifyContent:'center'}}>
                    <RadioButton 
                        radioButtons={[{id:1}]}
                        onPress={(x)=>console.log(x)}
                        layout='row'
                        size={18}
                        color={styles.orange.color}
                        selected={payType==3?true:false}
                    />
                </View>
            </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.buttonBase, {marginTop:20}]} onPress={setNextStep}>
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Payment

const styles = StyleSheet.create({
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
    shadow:{
        backgroundColor:'white',
        padding:20,
        borderRadius:15,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 14,
        },
        shadowOpacity:  0.24,
        shadowRadius: 15.38,
        elevation: 19
    },
    row:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    rowDisabled:{
        flexDirection:'row',
        justifyContent:"space-between",
        backgroundColor:'silver'
    },
    orange:{
        color:'#D86321'
    },
})