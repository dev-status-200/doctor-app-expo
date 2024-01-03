import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import { RadioButton } from 'react-native-radio-buttons-group';
import CheckBox from '@mesameerahmed/react-native-check-box';
import FontAwesome from "@expo/vector-icons/FontAwesome5";

const AppointmentType = ({setAppointmentType, appointmentType, other, setOther, setSteps}) => {

    const setNextStep = () => {
        if(appointmentType==0){
            Alert.alert('Error', "Select atleast one type!",[{text:'OK',onPress:()=>null}]);
        } else {
            other?setSteps(3):setSteps(4)
        }
    }

  return (
    <View style={{padding:20}}>
        <Text style={{fontFamily:"Proxim"}}>Select</Text>
        <View style={{marginTop:10, marginBottom:10}}>
            <TouchableOpacity style={[styles.row, styles.shadow]}
                onPress={()=>{appointmentType==1?setAppointmentType(0):setAppointmentType(1)}}
            >
                    <View style={{width:"14%"}}>
                        <View style={styles.greyRoundBg}><Entypo name="location-pin" color={"#2d3f4c"} size={20} /></View>
                    </View>
                    <View style={{width:"76%", paddingLeft:"3%", justifyContent:'center'}}>
                        <Text style={{fontFamily:"ProximaBold"}}>Visit Doctor</Text>
                        <Text style={{fontFamily:"Proxim", color:"grey"}}>Visit doctoe on his sight</Text>
                    </View>
                    <View style={{width:"14%", justifyContent:'center'}}>
                        <RadioButton 
                            radioButtons={[{id:1}]}
                            onPress={(x)=>console.log(x)}
                            layout='row'
                            size={18}
                            selected={appointmentType==1?true:false}
                        />
                    </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.row, styles.shadow, {marginTop:20}]}
                onPress={()=>{appointmentType==2?setAppointmentType(0):setAppointmentType(2)}}
            >
                <View style={{width:"14%"}}>
                    <View style={styles.greyRoundBg}><FontAwesome name="video" color={"#2d3f4c"} size={20} /></View>
                </View>
                <View style={{width:"76%", paddingLeft:"3%", justifyContent:'center'}}>
                    <Text style={{fontFamily:"ProximaBold"}}>Online Appointment</Text>
                    <Text style={{fontFamily:"Proxim", color:"grey"}}>Vide call with doctor</Text>
                </View>
                <View style={{width:"14%", justifyContent:'center'}}>
                    <RadioButton 
                        radioButtons={[{id:1}]}
                        onPress={(x)=>console.log(x)}
                        layout='row'
                        size={18}
                        selected={appointmentType==2?true:false}
                    />
                </View>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row', alignItems:'center', paddingTop:20}}>
            <CheckBox
                onClick={()=>setOther(!other)}
                isChecked={other}
                checkBoxColor={'#D86321'}
            />
            <TouchableOpacity onPress={()=>setOther(!other)}>
                <Text style={{fontSize:18, fontFamily:"Proxim"}}>    Book for someone else</Text>
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.buttonBase, {marginTop:20}]} onPress={setNextStep}>
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default React.memo(AppointmentType)

const styles = StyleSheet.create({
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
    greyRoundBg:{
        backgroundColor:'#DFDFDF',
        padding:10,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:100
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
})