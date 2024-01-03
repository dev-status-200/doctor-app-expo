import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, StatusBar, ScrollView } from 'react-native';
import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import axios from "axios";
import urls from "../../../urls.json"
import DoctorsProfile from './DoctorsProfile';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntdIcons from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import BottomSheet from '@gorhom/bottom-sheet';

const SearchScreen = ({setSearch, type, setType, doctorList, searchDoctor, load}) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [searchTerms, setSearchTerms] = useState([]);
    const [status, setStatus] = useState("Online");
    const [rating, setRating] = useState("all");
    const [from, setFrom] = useState("10");
    const [to, setTo] = useState("1000");

    const [doctorSearchTerm, setDoctorSearchTerm] = useState("");

    // const [load, setLoad] = useState(true);
    const [sheetIndex, setSheetIndex] = useState(-1);

    useEffect(() => {
      getValue();
    }, [])

    async function getValue(){
        axios.get(`${urls.local_url}/doctor/getSpecialications`)
        .then((x)=>{
            setSearchTerms(x.data.result)
        })
    }

    const Header = (props) => {
    return(
        <>
        <View style={{flexDirection:'row', padding:15, justifyContent:'space-between'}}>
            <View style={{width:"7%"}}>
                <TouchableOpacity onPress={()=>{setSearch(false); setType("")}}>
                    <AntdIcons name="leftcircle" color={"#D86321"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{width:"86%"}}>
                <Text style={{textAlign:'center', fontSize:20, color:'black', fontFamily:'ProximaBold'}}>
                    {props.type==""?"Search":props.type}
                </Text>
            </View>
            <View style={{width:"7%"}}>
                <TouchableOpacity style={{textAlign:'center'}} onPress={handleOpen}>
                    <Ionicons name="options" color={"#D86321"} size={20} />
                </TouchableOpacity>
            </View>
        </View>
        <View style={{backgroundColor:'silver', height:1, marginLeft:15, marginRight:15}}></View>
        </>
        )
    }

    const bottomSheetRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['99%'], []);
    const handleClosePress = () => {
        console.log(from + " ----> "+ to)
        bottomSheetRef.current.close();
    }
    const handleOpen = () => bottomSheetRef.current.expand();
    // callbacks
    const handleSheetChanges = useCallback((index) => {
      setSheetIndex(index)
    }, []);

  return (
    <>
    <StatusBar backgroundColor={sheetIndex!=0?"white":'grey'}  barStyle="dark-content" />
    <View style={styles.barContainer}>
        {sheetIndex!=0 &&
        <View style={{ paddingLeft:10, paddingRight:10 }}>
            <Header type={type} />
            {type=="" && 
            <>
                <View style={{padding:'1%', marginTop:5}}>
                    <Text style={{color:'grey'}}>Select Any Speciality from below</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', height:50}}>
                    <View style={{padding:"1%", width:'75%'}}>
                        <TextInput style={styles.searchBar} placeholder='Type Speciality' 
                            value={searchTerm} onChangeText={(e)=>setSearchTerm(e)} 
                        />
                        <EvilIcons name={"search"} color={'orange'} style={{position:'absolute', bottom:"30%", left:"5%"}} size={35} />
                    </View>
                    <View style={{padding:"1%", width:'25%'}}>
                        <TouchableOpacity style={styles.selectBar}>
                            <AntdIcons name={"down"} color={'orange'} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{padding:10, marginTop:3}}>
                <Text style={styles.heading}>Popular Specialities</Text>
                {searchTerms.filter((x)=>{
                    if(searchTerm==""){
                        return x;
                    }else {
                        return x.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
                    }
                }).map((x, i)=>{
                    return(
                        <TouchableOpacity key={i} style={{marginBottom:10}}
                            onPress={()=>{
                                searchDoctor(x.name, from, to);
                            }}
                        >
                            <Text style={styles.specialties}>{x.name}</Text>
                        </TouchableOpacity>
                    )
                })}
                </View>
            </>
            }
            {type!="" &&
            <>
            {load && <ActivityIndicator style={{marginTop:"80%"}} size={"large"} color={"#D86321"} /> }
            {!load &&
            <>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:10, marginBottom:20, height:50}}>
                <View style={{padding:"1%", width:'75%'}}>
                    <TextInput style={styles.searchBar} placeholder='Search By Name' 
                        value={doctorSearchTerm} onChangeText={(e)=>setDoctorSearchTerm(e)} 
                    />
                    <EvilIcons name={"search"} color={'orange'} style={{position:'absolute', bottom:"30%", left:"5%"}} size={35} />
                </View>
                <View style={{padding:"1%", width:'25%'}}>
                    <TouchableOpacity style={styles.selectBar}>
                        <AntdIcons name={"down"} color={'orange'} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <DoctorsProfile doctors={doctorList} search={true} term={doctorSearchTerm} to={to} from={from} />
            {(doctorList.length==0 && load==false) && <Text style={{margin:10, fontSize:18}}>No results Found...</Text>}
            </>
            }
            </>
            }
        </View>
        }
        {sheetIndex==0 && <View style={{backgroundColor:'grey', padding:'100%'}} />}
        <BottomSheet
            ref={bottomSheetRef}
            index={-1}
            snapPoints={snapPoints}
            enablePanDownToClose={true}
            onChange={handleSheetChanges}
        >
            <View style={styles.contentContainer}>
            <Text style={styles.sheetHeading}>Location</Text>
            <View style={{ height:50, marginTop:10}}>
                <TextInput style={[styles.searchBar, {borderRadius:25, paddingLeft:20}]} placeholder='Location' />
                <EvilIcons name={"location"} color={'orange'} style={{position:'absolute', bottom:"23%", left:"87%"}} size={30} />
            </View>
            <Text style={styles.sheetHeading}>Speciality</Text>
                <Text>
                    {searchTerms.map((x, i)=>{
                        return(
                        <TouchableOpacity key={i} onPress={()=>setSearchTerm(x.name)}>
                            <Text style={searchTerm==x.name?styles.filterNamesSelected:styles.filterNames}> {x.name} </Text>
                        </TouchableOpacity>
                    )
                    })}
                </Text>
            <Text style={styles.sheetHeading}>Status</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=>setStatus("Offline")}>
                <Text style={status=="Offline"?styles.filterNamesSelected:styles.filterNames}>   Offline   </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setStatus("Online")}>
                <Text style={status=="Online"?styles.filterNamesSelected:styles.filterNames}>   Online   </Text>
            </TouchableOpacity>
            </View>
            
            <Text style={styles.sheetHeading}>Rating</Text>
            <Text>
            <TouchableOpacity onPress={()=>setRating("all")}>
                <Text style={rating=="all"?styles.filterNamesSelected:styles.filterNames}>
                {"  "}<Entypo name="star" color={rating=="all"?"white":"black"} size={20} />     All{"  "}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating("1")}>
                <Text style={rating=="1"?styles.filterNamesSelected:styles.filterNames}>
                {"  "}<Entypo name="star" color={rating=="1"?"white":"black"} size={20} />     1{"  "}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating("2")}>
                <Text style={rating=="2"?styles.filterNamesSelected:styles.filterNames}>
                {"  "}<Entypo name="star" color={rating=="2"?"white":"black"} size={20} />     2{"  "}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating("3")}>
                <Text style={rating=="3"?styles.filterNamesSelected:styles.filterNames}>
                {"  "}<Entypo name="star" color={rating=="3"?"white":"black"} size={20} />     3{"  "}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating("4")}>
                <Text style={rating=="4"?styles.filterNamesSelected:styles.filterNames}>
                {"  "}<Entypo name="star" color={rating=="4"?"white":"black"} size={20} />     4{"  "}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setRating("5")}>
                <Text style={rating=="5"?styles.filterNamesSelected:styles.filterNames}>
                {"  "}<Entypo name="star" color={rating=="5"?"white":"black"} size={20} />     5{"  "}
                </Text>
            </TouchableOpacity>
            </Text>

            <Text style={styles.sheetHeading}>Price Range</Text>
            <View style={{flexDirection:'row', marginTop:6}}>
                <Text style={{paddingTop:5, paddingRight:5}}>$</Text>
                <TextInput style={styles.priceaBar} value={from} onChangeText={(e)=>setFrom(e)} keyboardType="numeric" />
                <Text style={{padding:5, paddingLeft:18, paddingRight:18}}>To</Text>
                <Text style={{paddingTop:5, paddingRight:5}}>$</Text>
                <TextInput style={styles.priceaBar} value={to} onChangeText={(e)=>setTo(e)} keyboardType="numeric" />
            </View>
            
            <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%', marginTop:'8%'}}>
                <TouchableOpacity style={{width:'49%'}}
                    onPress={()=>{
                        setStatus("Online");
                        setRating("all");
                        setFrom("10");
                        setTo("1000");
                        setSearchTerm("")
                    }}
                >
                    <Text style={{
                        borderWidth:1,
                        borderColor:'black',
                        textAlign:'center',
                        padding:10,
                        borderRadius:25,
                        fontFamily:'ProximaBold'
                    }}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleClosePress} style={{width:'49%'}}>
                    <Text style={{
                        borderWidth:1,
                        borderColor:'#de7921',
                        textAlign:'center',
                        backgroundColor:'#de7921',
                        padding:10,
                        borderRadius:25,
                        color:'white',
                        fontFamily:'ProximaBold'
                    }}>Apply</Text>
                </TouchableOpacity>
            </View>
            </View>
        </BottomSheet>
    </View>
    </>
  )
}
export default React.memo(SearchScreen)

const styles = StyleSheet.create({
    barContainer:{
        flex:1,
        borderRadius:15,
        paddingBottom:20,
        backgroundColor:'white'
    },
    searchBar:{
        backgroundColor:'#f0f0f0',
        borderTopLeftRadius:25,
        borderBottomLeftRadius:25,
        paddingLeft:50,
        fontFamily:'Proxim',
        height:'100%'
    },
    selectBar:{
        backgroundColor:'#f0f0f0',
        borderTopRightRadius:25,
        borderBottomRightRadius:25,
        paddingTop:12,
        paddingLeft:20,
        paddingBottom:16
    },
    heading:{
        fontSize:20,
        color:'#36454F',
        marginBottom:10,
        fontFamily:'ProximaBold'
    },
    specialties:{
        color:'#36454F',
        fontSize:16,
        fontFamily:'Proxim'
    },
    contentContainer:{
        padding:20
    },
    sheetHeading:{
        marginBottom:0,
        marginTop:22,
        fontFamily:'ProximaBold',
        fontWeight:'600',
        fontSize:18
    },
    filterNames:{
        fontFamily:'ProximaBold',
        marginLeft:4,
        marginRight:4,
        marginTop:9,
        borderColor:'black',
        borderWidth:1,
        padding:6,
        borderRadius:25
    },
    filterNamesSelected:{
        fontFamily:'ProximaBold',
        marginLeft:4,
        marginRight:4,
        marginTop:9,
        borderColor:'#de7921',
        backgroundColor:'#de7921',
        color:'white',
        borderWidth:1,
        padding:6,
        borderRadius:25
    },
    priceaBar:{
        borderWidth:1,
        borderColor:'black',
        paddingLeft:30,
        paddingRight:30,
        borderRadius:15
    }
})