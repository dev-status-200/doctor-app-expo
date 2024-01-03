import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const HIPAA = ({setSteps}) => {

    const setNextStep = () => setSteps(6);

  return (
    <View style={{padding:20}}>
        <Text style={{fontFamily:"Proxim"}}>
        Please complete all sections of this HIPAA release form. If any sections are left blank, this form will be invalid and it will not be possible for your health information to be shared as requested.
        </Text>
        <TouchableOpacity style={[styles.buttonBase, {marginTop:20}]} onPress={setNextStep}>
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>Next</Text>
        </TouchableOpacity>
    </View>
  )
}

export default React.memo(HIPAA)

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
})