import React from 'react'
import { View, Text, TouchableOpacity } from "react-native";
import AntdIcons from '@expo/vector-icons/AntDesign';

const Header = (props) => {

    return(
    <>
        <View style={{flexDirection:'row', padding:15, justifyContent:'space-between'}}>
            <View style={{width:"7%"}}>
                <TouchableOpacity 
                    onPress={props.onBack}
                >
                    <AntdIcons name="leftcircle" color={"#D86321"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{width:"86%"}}>
                <Text style={{textAlign:'center', fontSize:20, color:'black', fontFamily:'ProximaBold'}}>
                    {props.name}
                </Text>
            </View>
            <View style={{width:"7%"}}>
                {props.right &&<TouchableOpacity style={{textAlign:'center'}} 
                    //onPress={handleOpen}
                >
                    <AntdIcons name="hearto" color={"grey"} size={20} />
                </TouchableOpacity>}
            </View>
        </View>
        <View style={{backgroundColor:'silver', height:1, marginLeft:15, marginRight:15}}></View>
    </>
    )
}

export default React.memo(Header)