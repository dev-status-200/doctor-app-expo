import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import MaterialTabs from 'react-native-material-tabs';
import Header from './Header';
import { LogBox } from 'react-native';
import axios from 'axios';
import url from "../../../urls.json";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import moment from 'moment';
import BottomSheet from '@gorhom/bottom-sheet';

LogBox.ignoreAllLogs();

const Appointments = () => {

  const [selectedTab, setSelectedTab] = useState(0);
  const [load, setLoad] = useState(true);
  const [records, setRecors] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(-1);

  useEffect(()=>{
    getAppointments();
  }, []);

  const getAppointments = async() => {
    let values = await AsyncStorage.getItem("login");
    await axios.get(`${url.local_url}/appointments/getAppointmentById`,{
      headers:{
        id:JSON.parse(values).loginId
      }
    }).then((x)=>{
      setRecors(x.data.result);
      setLoad(false)
    })
  }

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%'], []);
  const handleClosePress = () => bottomSheetRef.current.close();
  const handleOpen = () => bottomSheetRef.current.expand();
  const handleSheetChanges = useCallback((index) => {
    setSheetIndex(index)
  }, []);

  return (
    <>
    {sheetIndex!=-1 && <View style={{backgroundColor:'silver', width:"100%", height:"100%"}}></View>}
    {sheetIndex==-1 &&<>
      <Header />
      <View style={{paddingLeft:20, paddingRight:20, paddingTop:10}}>
        <MaterialTabs
          items={['Upcoming', 'Completed', 'Cancelled']}
          selectedIndex={selectedTab}
          uppercase={false}
          onChange={setSelectedTab}
          barColor="white"
          textStyle={{color:'grey', fontFamily:'Proxim'}}
          indicatorColor="#CC5500"
          activeTextStyle={{color:"#CC5500"}}
          inactiveTextColor="grey"
        />
        {load && <View style={{justifyContent:'center', marginTop:'50%'}}><ActivityIndicator color={"#CC5500"} size={"large"} /></View>}
        {!load &&
        <>
        {selectedTab==0 &&
        <View style={{justifyContent:'center'}}>
        {records.map((x, i)=>{
          return(
          <View key={i} style={styles.barContainer}>
            <View style={styles.bar}>
            <View style={{width:"20%", justifyContent:'center', paddingBottom:"1%"}}>
                <Text><EvilIcons name={"user"} color={'grey'} size={70} /></Text>
            </View>
            <View style={{width:"80%", padding:"4%"}}>
              <Text style={{fontFamily:"ProximaBold", fontSize:16}}>Dr. {x.Doctor.firstName}{" "}{x.Doctor.lastName}</Text>
              <Text style={{fontFamily:"Proxim"}}>{x.Doctor.Specializations[0].name}</Text>
              <View style={styles.status}>
                <Text style={{fontFamily:"Proxim", fontSize:12, color:"#D86321"}}>Upcoming</Text>
              </View>
              <Text style={styles.timing}>
                {moment(x.selectedDate).format("dddd, MMM DD")} | {x.selectHour}
              </Text>
            </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'center'}}>
              <TouchableOpacity style={styles.leftBtn} onPress={handleOpen}>
                <Text style={{color:'#FF5263', fontFamily:"Proxim", textAlign:"center"}}>Cancel Appointment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rightBtn} onPress={handleOpen}>
                <Text style={{color:'#993b0f', fontFamily:"Proxim", textAlign:"center"}}>Reschdule</Text>
              </TouchableOpacity>
            </View>
          </View>
        )})}
        </View>
        }
        {selectedTab!=0 &&
          <View style={{justifyContent:'center'}}>
            <Text style={{fontFamily:"Proxim", color:"grey", textAlign:'center', marginTop:"50%", fontSize:20}}>
              Empty
            </Text>
          </View>
        }
        </>
        }
      </View>
    </>}
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
    >
      <View style={{padding:20, flex:1}}>
        <Text style={{color:'red', fontFamily:"Proxim", textAlign:'center', fontSize:20}}>Cancel Appointment</Text>
        <View style={styles.hr}></View>
        <Text style={{color:'grey', textAlign:'center', fontSize:18}}>
          We are very sad that you have canceled your appointment.
          we will always improve our services to satisfy you in the next appointment.
        </Text>
        <Text style={{color:'grey', textAlign:'center', fontSize:18, marginTop:10}}>
          We are very sad that you have canceled your appointment. 
        </Text>
      </View>
    </BottomSheet>
    </>
  );
};
export default React.memo(Appointments)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  barContainer:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop:20,
    borderRadius:12,
    backgroundColor:'white',
  },
  bar:{
    padding:2,
    flexDirection:'row'
  },
  status:{
    backgroundColor:'white',
    padding:1,
    marginTop:5,
    borderRadius:5,
    borderColor:'#D86321',
    borderWidth:1,
    width:"40%",
    alignItems:'center'
  },
  leftBtn:{
    backgroundColor:'red',
    width:"50%",
    backgroundColor:"#f9c4be",
    borderBottomLeftRadius:12,
    padding:4
  },
  rightBtn:{
    backgroundColor:'red',
    width:"50%",
    backgroundColor:"#f8cab5",
    borderBottomRightRadius:12,
    padding:4
  },
  timing:{
    color:'grey',
    fontFamily:"Proxim",
    marginTop:5
  },
  hr:{
    backgroundColor:'silver',
    height:1,
    marginTop:10,
    marginBottom:10,
},
});