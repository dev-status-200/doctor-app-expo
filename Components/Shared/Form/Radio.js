import { Controller } from "react-hook-form";
import React from 'react';
import { View, Text, StyleSheet } from "react-native"
import RadioGroup from 'react-native-radio-buttons-group';

const RNCheckBox = ({control, name, radios, values, label}) => {
    
    return(
        <View>
            {label && <Text style={styles.label}>{label}</Text> }
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <RadioGroup 
                        radioButtons={radios}
                        layout='row'
                        onPress={onChange}
                        selectedId={value}
                    />
                )}
                name={name}
            />
        </View>
    )
}

export default React.memo(RNCheckBox);

const styles = StyleSheet.create({
    label:{
        color:'black',
        fontSize:17,
        marginBottom:10,
        fontFamily:'Proxim'
    },
});