import { StyleSheet, View, Text, TextInput } from 'react-native';
import { useController, Controller } from "react-hook-form";
import React from 'react';

const RNNumberInput = ({label, control, name, placeholder, required}) => {

    const { field } = useController({ control,  defaultValue:'',  name });
    
    return(
    <View style={{width:"100%"}}>
        {label && <Text style={styles.label}>{label}</Text> }
        <Controller
            control={control}
            rules={{
            required: required,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onBlur={onBlur}
                keyboardType="numeric"
                onChangeText={onChange}
                value={value.toString()}
                placeholderTextColor={'grey'}
            />
            )}
            name={name}
        />
    </View>
    )
}

export default React.memo(RNNumberInput)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    label:{
        color:'black',
        fontSize:17,
        fontFamily:'Proxim'
    },
    input:{
        borderColor:'#E6E6E6', borderWidth:1, borderRadius:10, paddingLeft:17, marginTop:5, height:40, color:'black'
    },
});