import { StyleSheet, View, Text } from 'react-native';
import { Controller } from "react-hook-form";
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState } from 'react';

const RNSelect = ({label, control, name, placeholder, list, required}) => {

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(list);

    return(
    <View style={{width:"100%"}}>
        {label && <Text style={styles.label}>{label}</Text> }
        <Controller
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
                open={open}
                setOpen={setOpen}
                items={items}
                placeholder={placeholder}
                dropDownDirection="BOTTOM"
                style={{
                    backgroundColor:"white",
                    borderColor:"#E6E6E6",
                    borderRadius:10,
                    marginTop:5,
                    padding:0,
                    minHeight:40,
                }}
                dropDownContainerStyle={{
                    borderColor:'#E6E6E6'
                }}
                listMode="FLATLIST"                     
                value={value} 
                setValue={onChange}
                onChangeValue={onChange}
            />
        )}
        name={name}
    />  
    </View>
    )
}

export default React.memo(RNSelect)

const styles = StyleSheet.create({
    label:{
        color:'black',
        fontSize:17,
        fontFamily:'Proxim'
    },
});