import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import urls from "../../../urls.json";
import Header from './Header';
import axios from 'axios';
import Profile from './Profile';
import { useNavigation } from '@react-navigation/native';
import AppointmentType from './AppointmentType';
import OtherPatient from './OtherPatient';
import Calendar from './Calendar';
import HIPAA from './HIPAA';
import Payment from './Payment';
import Confirmation from './Confirmation';
import Pin from './Pin';
import Checkout from './Checkout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DoctorProfile = (props) => {

    const navigation = useNavigation();
    const [load, setLoad] = useState(true);
    const [profile, setProfile] = useState(null);
    const [service, setService] = useState([]);
    const [total, setTotal] = useState(0);
    const [steps, setSteps] = useState(1);
    const [other, setOther] = useState(false)
    const [appointmentType, setAppointmentType] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectHour, setSelectHour] = useState('');
    const [payType, setPayType] = useState(1);
    const [otherDetails, setOtherDetails] = useState({
        name:"",
        gender:"",
        age:"",
        problem:""
    })

    useEffect(()=> {
        let id = props?.props?.route?.params.id;
        axios.get(`${urls.local_url}/doctor/getDoctorProfile`,{
            headers:{ id:id }
        }).then((x)=> {
            //console.log(x.data.result.Specializations);
            setProfile(x.data.result);
            setLoad(false)
            let tempPricings = [];
            x.data.result.Pricings.forEach(element => {
                tempPricings.push({...element, check:1});
            });
            setService(tempPricings);
        })
    }, [])

    useEffect(()=>{
        let tempPrice = 0.00
        service.forEach((x)=>{
            if(x.check==0){
                tempPrice = tempPrice + parseFloat(x.price)
            }
        })
        setTotal(tempPrice)
    }, [service])

    const book=()=>total==0?Alert.alert('Error', "Select atleast one service!",[{text:'OK',onPress:()=>null}]):setSteps(2);

    const navigationFunction = () => {
        if(steps==1){
            navigation.navigate("Dashboard");
        } else if(steps==2){
            setSteps(1);
        } else if(steps==3){
            setSteps(2);
        } else if(steps==4 && other==true){
            setSteps(3);
        } else if(steps==4 && other==false){
            setSteps(2);
        } else if(steps==5){
            setSteps(4);
        } else if(steps==6){
            setSteps(5);
        } else if(steps==7){
            setSteps(6);
        } else {
            setSteps(7);
        }
    }

    const getValues = async() => {
        let values = await AsyncStorage.getItem("login");
        await axios.post(`${urls.local_url}/appointments/create`,{
            services:service.filter((x)=>{ return x.check==0 }),
            ClientId:JSON.parse(values).loginId,
            appointmentType,
            id:profile.id,
            selectedDate,
            otherDetails,
            selectHour,
            payType,
            total,
            other,
        });
        navigation.navigate("Dashboard");
    }

    // useEffect(()=>{
    //     if(steps==7)
    //     getValues()
    // }, [steps])

    return (
    <>
        {steps!=8 && 
        <Header 
            name={
                steps==1?`Dr. ${props?.props?.route?.params.firstName} ${props?.props?.route?.params.lastName}`:
                steps==2?'Appointment Type':
                steps==3?'Patient Details':
                steps==4?'Select Date':
                steps==5?'HIPAA Compliant Form':
                steps==6?'Payment Type':
                steps==7?'Checkout':
                steps==9?`Payment`:""
            } 
            onBack={navigationFunction}
            right={steps==1?true:false}
        />
        }
        {!load &&
        <>
            {steps==1 && 
            <Profile 
                bookAppointment={book} 
                profile={profile} 
                service={service} 
                setService={setService} 
                total={total}
            />}
            {steps==2 && 
            <AppointmentType 
                appointmentType={appointmentType}
                setAppointmentType={setAppointmentType}
                other={other}
                setSteps={setSteps}
                setOther={setOther}
            />}
            {steps==3 && 
            <OtherPatient
                otherDetails={otherDetails}
                setOtherDetails={setOtherDetails}
                setSteps={setSteps}
            />}
            {steps==4 && 
            <Calendar 
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                otherDetails={otherDetails}
                selectHour={selectHour}
                setSteps={setSteps}
                setSelectHour={setSelectHour}
            />}
            {steps==5 && 
            <HIPAA 
                setSteps={setSteps}
            />}
            {steps==6 && 
            <Payment 
                setSteps={setSteps}
                setPayType={setPayType}
                payType={payType}
            />}
            {steps==7 && 
            <Confirmation 
                setSteps={setSteps}
                payType={payType}
                profile={profile}
                selectedDate={selectedDate}
                selectHour={selectHour}
                total={total}
                service={service}
                setLoad={setLoad}
            />}
            {steps==8 && 
            <Pin 
                //getValues={getValues} 
                setSteps={setSteps}
                setLoad={setLoad}
            />}
            {steps==9 && 
            <Checkout 
                getValues={getValues} 
                payType={payType}
                setSteps={setSteps}
                total={total}
            />}
        </>
        }
        {load &&
        <View style={{flex:1, justifyContent:'center'}}>
            <ActivityIndicator color={"orange"} size={"large"} />
        </View>
        }
    </>
    )
}

export default React.memo(DoctorProfile)