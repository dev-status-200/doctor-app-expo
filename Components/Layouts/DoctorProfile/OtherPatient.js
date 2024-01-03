import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const OtherPatient = ({setOtherDetails, otherDetails, setSteps}) => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      {label: 'Male', value: 'Male'},
      {label: 'Female', value: 'Female'}
    ]);

    const setPatientData = (variable, value) => {
        let temp = {...otherDetails};
        temp[variable] = value
        setOtherDetails(temp)
    }

    useEffect(() => {
        if(value!=null){
            let temp = {...otherDetails};
            temp.gender = value
            setOtherDetails(temp)
        }
    }, [value])

    const setNextStep = () => {
        if(otherDetails.name && otherDetails.age && otherDetails.gender && otherDetails.problem){
            setSteps(4)
        } else {
            Alert.alert('Error', "Please complete all fields",[{text:'OK',onPress:()=>null}]);
        }
    }
    
  return (
    <View style={{padding:20, flex:1, paddingTop:40}}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput 
            style={styles.input} 
            placeholder='Enter Full Name' 
            value={otherDetails.name} 
            onChangeText={(x)=>setPatientData("name", x)} 
        />
        <Text style={styles.label}>Select Gender</Text>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            dropDownDirection="BOTTOM"
            style={{
                backgroundColor:"white",
                borderColor:"#E6E6E6",
                borderRadius:10,
                marginTop:5,
                padding:0,
                minHeight:40,
                marginBottom:20
            }}
            dropDownContainerStyle={{
                borderColor:'#E6E6E6'
            }}
            listMode="FLATLIST"  
        />
        <Text style={styles.label}>Enter Age</Text>
        <TextInput 
            style={styles.input} 
            placeholder='Enter Age' 
            value={otherDetails.age} 
            onChangeText={(x)=>setPatientData("age", x)} 
            keyboardType="numeric"
        />
        <Text style={styles.label}>Write Your Problem</Text>
        <TextInput
            multiline
            numberOfLines={4}
            style={[
                styles.input,
                {
                    paddingTop:10,
                    textAlignVertical: 'top',
                    height: 200
                }
            ]} 
            placeholder='Enter Age' 
            value={otherDetails.problem} 
            onChangeText={(x)=>setPatientData("problem", x)} 
        />
        <TouchableOpacity style={[styles.buttonBase, {marginTop:20}]} onPress={setNextStep}>
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default React.memo(OtherPatient)

const styles = StyleSheet.create({
    label:{
        fontFamily:"Proxim",
        fontSize:18,
    },
    label:{
        color:'black',
        fontSize:17,
        fontFamily:'Proxim'
    },
    input:{
        borderColor:'#E6E6E6',
        borderWidth:1,
        borderRadius:10,
        paddingLeft:17,
        marginTop:5,
        marginBottom:20,
        height:40,
        color:'black',
        fontFamily:'Proxim'
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