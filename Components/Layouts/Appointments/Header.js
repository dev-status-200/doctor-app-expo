import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {

    const navigation = useNavigation();

    return(
    <>
    <View style={{flexDirection:'row', padding:15, justifyContent:'space-between'}}>
        <View style={{width:"25%", paddingTop:5}}>
            <TouchableOpacity onPress={()=> navigation.navigate("Dashboard")}>
            <AntdIcons name="leftcircle" color={"#D86321"} size={20} />
            </TouchableOpacity>
        </View>
        <View style={{width:"50%", padding:2}}>
            <Text style={{textAlign:'center', fontSize:22, color:'black', fontWeight:'500', fontFamily:'Proxim'}}>
                Appointments
            </Text>
        </View>
        <View style={{width:"25%"}}></View>
    </View>
    <View style={{backgroundColor:'silver', height:1, marginLeft:15, marginRight:15}}></View>
    </>
    )
}

export default React.memo(Header)