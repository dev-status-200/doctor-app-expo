import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';

const CalendarComp = ({selectedDate, setSelectedDate, setSelectHour, selectHour, setSteps}) => {

    const list = [
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "01:00 PM",
    ];

    const setNextStep = () => {
        if(selectedDate && setSelectHour){
            setSteps(5)
        } else {
            Alert.alert('Error', "Please Select Appropriate Date & Time",[{text:'OK',onPress:()=>null}]);
        }
    }
    
  return (
    <View style={{padding:20}}>
        <Text style={styles.label}>Select Date</Text>
        <View style={styles.shadow}>
            <Calendar 
                onDayPress={day => setSelectedDate(day.dateString)}
                theme={styles.calendar}
                markedDates={{
                    [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: '#D86321'}
                }}
                
            />
        </View>
        <Text style={styles.label}>Select Hour</Text>
        <View style={{padding:5}}></View>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            {list.slice(1, 4).map((x)=>{
                return(
                    <TouchableOpacity key={x} style={[styles.time, {backgroundColor:selectHour==x?'#D86321':'white'}]}
                        onPress={()=>setSelectHour(x)}    
                    >
                        <Text style={{fontFamily:"Proxim", color:selectHour==x?'white':'grey'}}> {x} </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
        <TouchableOpacity style={[styles.buttonBase, {marginTop:20}]} onPress={setNextStep}>
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default React.memo(CalendarComp)

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
        elevation: 19,
        marginBottom:15,
        marginTop:10,
    },
    label:{
        fontFamily:"Proxim",
        fontSize:18,
    },
    calendar:{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#D86321',
        selectedDayBackgroundColor: '#D86321',
        selectedDayTextColor: 'white',
        todayTextColor: '#D86321',
        dayTextColor: '#2d4150',
    },
    time:{
        borderColor:'grey',
        borderWidth:2,
        justifyContent:'center',
        padding:15,
        borderRadius:25
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