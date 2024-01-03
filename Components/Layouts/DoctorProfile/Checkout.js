import React, { useState, useEffect } from 'react';
import axios from "axios";
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';
import urls from "../../../urls.json";
import { useStripe } from '@stripe/stripe-react-native';
import { usePlatformPay, PlatformPay, isPlatformPaySupported } from '@stripe/stripe-react-native';

const Confirmation = ({setSteps, getValues, payType, total}) => {

    const { confirmPlatformPayPayment } = usePlatformPay();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    useEffect(() => {
        intializePay();
    }, []);

    const intializePay = async() => {
        if(payType=='2'){
            if (!(await isPlatformPaySupported({ googlePay: {testEnv: true} }))) {
                Alert.alert('Google Pay is not supported. Please Try Again');
                setSteps(7);
            } else {
                googlePay();
            }
        }
        if(payType=='1'){
            cardPay();
        }
    }

    const googlePay = async () => {
        await axios.post(`${urls.local_url}/payments/intent`, {
            amount:total
        }).then(async(x)=>{
            const { error } = await confirmPlatformPayPayment(
                x.data.paymentIntent,
                {
                  googlePay: {
                    testEnv: true,
                    merchantName: 'Doctor App',
                    merchantCountryCode: 'US',
                    currencyCode: 'USD',
                    billingAddressConfig: {
                        format: PlatformPay.BillingAddressFormat.Full,
                        isPhoneNumberRequired: true,
                        isRequired: true,
                        },
                    },
                }
            );
          
            if (error) {
            Alert.alert(error.code, error.message);
            setSteps(7)
            return;
            }
            Alert.alert('Success', 'Appointment Booked!');
            getValues()

        })
    };

    const cardPay = async () => {
        await axios.post(`${urls.local_url}/payments/intent`,{
            amount:total
        }).then(async(response) => {
            const { error: paymentSheetError } = await initPaymentSheet({
                merchantDisplayName: 'Example, Inc.',
                paymentIntentClientSecret: response.data.paymentIntent,
                defaultBillingDetails: {
                  name: 'Jane Doe',
                },
            });
            if (paymentSheetError) {
                Alert.alert('Something went wrong', paymentSheetError.message);
                setSteps(7)
                return;
            } else {
                // setLoading(false);
                const { error } = await presentPaymentSheet();
                if (error) {
                    Alert.alert(`${error.code}`, error.message);
                    setSteps(7)
                } else {
                    Alert.alert('Success', 'Appointment Booked!');
                    getValues()
                }
            }
        })
    };

  return (
    <View style={{padding:20, flex:1, justifyContent:'center', alignContent:'center', alignItems:'center', alignContent:'center'}}>
        <ActivityIndicator size={'large'} color={"orange"} />
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