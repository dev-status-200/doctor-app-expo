import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import AntdIcons from '@expo/vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const SearchBar = ({setSearch, navigation}) => {

    const [username, setUsername] = useState("");
    const [userImage, setUserImage] = useState("");
    const [locationSet, setLocationSet] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            getValue();
            getImage();
          return () => { }
        }, [])
    );

    async function getValue(){
        const values = JSON.parse(await AsyncStorage.getItem("login"));
        if(values){
            setUsername(values.user);
        }
        const location = JSON.parse(await AsyncStorage.getItem("location"));
        if(location){
            setLocationSet(true)
        }
    }

    const getImage = async() => {
        const image = await AsyncStorage.getItem("userImage");
        image!=null?setUserImage(image):null;
    }
    
  return (
    <View style={styles.barContainer}>
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity style={{width:'18%'}}
                onPress={()=>navigation.navigate("ChangeImage")}
            >
                {userImage==""&& <EvilIcons name={"user"} color={'white'} size={60} style={{position:'relative', bottom:3}} />}
                {userImage!=""&& <Image source={{ uri: userImage }} style={{height:50, width:50, borderRadius:100, marginLeft:5}} />}
            </TouchableOpacity>
            <View style={{width:"64%"}}>
            <TouchableOpacity 
                onPress={()=>navigation.navigate("Profile")}
            >
                <Text style={{color:'white', fontSize:20, fontWeight:'600', fontFamily:'Proxim'}}>Welcome {username}{" "}
                    <Entypo name={"edit"} color={'orange'} size={12}  />
                </Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate("Map")}>
                <Text style={{color:'white', marginTop:5, fontFamily:'Proxim'}}>
                    <Entypo name="location-pin" />{" "}
                    <Text style={{fontFamily:'Proxim'}}>{!locationSet?'Set Your Location':'Location has been set'}</Text>{"  "}
                    <Entypo name={"edit"} color={'orange'} size={10}  />
                </Text>
            </TouchableOpacity>
            </View>
            <View style={{width:"18%", flexDirection:'row'}}>
                <EvilIcons name={"bell"} color={'white'} size={30} />
                <EvilIcons name={"heart"} color={'white'} size={30} />
            </View>
        </View>
        <View style={{padding:"3%", marginTop:15, justifyContent:'space-between', flexDirection:'row', height:68}}>
            
            <View style={{width:'73%'}}>
            <TouchableOpacity style={styles.left} onPress={()=>setSearch(true)}>
                <EvilIcons name={"search"} color={'orange'} size={25} />
                <Text style={{fontFamily:'Proxim', fontSize:17}}>
                {"  "}Search
                </Text>
            </TouchableOpacity>
            </View>

            <View style={{width:'26%'}}>
                <TouchableOpacity style={styles.right} onPress={()=>setSearch(true)}>
                    <Text>All    <AntdIcons name={"down"} color={'grey'} size={15} /></Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}
export default React.memo(SearchBar)

const styles = StyleSheet.create({
    barContainer:{
        margin:1,
        backgroundColor:'#36454F',
        borderRadius:15,
        paddingLeft:10,
        paddingRight:10,
        paddingTop:20,
        paddingBottom:20,
    },
    searchBar:{
        backgroundColor:'white',
        borderRadius:25,
        paddingLeft:50
    },
    right:{
        backgroundColor:'white',
        padding:14,
        height:'100%',
        borderTopRightRadius:50,
        borderBottomRightRadius:50
    },
    left:{
        padding:13,
        paddingLeft:20, 
        backgroundColor:'white',
        flexDirection:'row',
        height:'100%', 
        borderTopLeftRadius:50, 
        borderBottomLeftRadius:50
    }
})