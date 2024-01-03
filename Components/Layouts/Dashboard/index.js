import { StyleSheet, Text, View, StatusBar, BackHandler, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import DoctorsProfile from './DoctorsProfile';
import SearchBar from './SearchBar';
import Slider from './Slider';
import Menu from './Menu';
import SearchScreen from './SearchScreen';
import axios from 'axios';
import urls from "../../../urls.json";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({navigation}) => {

  const [search, setSearch] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [load, setLoad] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [type, setType] = useState("");
  const [doctorList, setDoctorList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      initialFunction();
      const onBackPress = () => {
        setSearch(false)
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  const initialFunction = async() => {
    let values = await AsyncStorage.getItem("login");
    if(values){
      let loginId = await JSON.parse(values).loginId
      await axios.get(`${urls.local_url}/appointments/getAppointmentById`,{
        headers:{
          id:loginId
        }
      }).then((y)=>{
        setAppointments(y.data.result)
        axios.get(`${urls.local_url}/doctor/getTopDoctors`)
        .then((x)=>{
          setDoctors(x.data.result);
          setLoad(false)
        });
      })
    }
  }

  const searchDoctor = (name, priceFrom, priceTo) => {
    setType(name);
    setLoad(true);
    axios.get(`${urls.local_url}/doctor/searchDoctors`, {
      headers:{
        'type':`${name}`,
        'from':`${priceFrom}`,
        'to':`${priceTo}`
      }
    }).then((x) => {
      console.log(x.data.result)
      setDoctorList(x.data.result);
      setLoad(false);
    })
  }

  return (
  <>
  {!search && 
  <>
  <ScrollView style={{backgroundColor:'white'}}>
    <StatusBar barStyle={'dark-content'} backgroundColor={"white"} />
    <SearchBar setSearch={setSearch} navigation={navigation} />
    <View style={{padding:15}}>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={[styles.dashText, { marginBottom:15 }]}>Appointment Today</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('AllAppointments')}
        >
          <Text style={{ marginBottom:15, fontFamily:'Proxim' }}>See All</Text>
        </TouchableOpacity>
      </View>
        {!load && <Slider appointments={appointments} />}
        {load && 
          <View style={{padding:10, justifyContent:'center'}}>
            <ActivityIndicator color={"orange"} />
          </View>
        }
      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:17}}>
        <Text style={[styles.dashText, { marginBottom:15 }]}>Doctor Speciality</Text>
        <TouchableOpacity>
          <Text style={{ marginBottom:15, fontFamily:'Proxim' }}>See All</Text>
        </TouchableOpacity>
      </View>
      <Menu setType={setType} setSearch={setSearch} searchDoctor={searchDoctor} />
      <Text style={[styles.dashText, { marginTop:20, marginBottom:20 }]}>Top Doctors Today</Text>
      {!load && <DoctorsProfile doctors={doctors} search={false} term={""} to={'1000'} from={'10'}  />}
      {load && 
        <View style={{padding:10, justifyContent:'center', alignContent:'center', alignItems:'center'}}>
          <ActivityIndicator color={"orange"} />
        </View>
      }
    </View>
  </ScrollView>
  </>
  }
  {search && 
    <SearchScreen 
      type={type} 
      load={load}
      setLoad={setLoad}
      setType={setType} 
      setSearch={setSearch} 
      doctorList={doctorList} 
      searchDoctor={searchDoctor} 
    /> 
  }
  </>
  )
}
export default React.memo(Dashboard)

const styles = StyleSheet.create({
  dashText:{
    color:'grey',
    fontSize:15,
    fontFamily:'ProximaBold'
  }
});