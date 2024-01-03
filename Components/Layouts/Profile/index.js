import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react';
import SignUpCompA from './SignUpCompA';
import SignUpCompB from './SignUpCompB';
import SignUpCompC from './SignUpCompC';
import SignUpCompD from './SignUpCompD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import urls from "../../../urls.json";
import moment from "moment";
import ModalView from '../../Shared/ModalView';
import { delay } from '../../../functions/delay';

const Profile = ({navigation}) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [form, setForm] = useState("");

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async() => {
    let id = ""
    const value = await AsyncStorage.getItem("login");
    if(value){
      id = JSON.parse(value).loginId
      await axios.get(`${urls.local_url}/clients/getClient`,{
        headers:{'id':id}
      }).then(async(x)=>{
        let spouceData = {};
        let childData = [];
        await storeData({
          ...x.data.result,
          day:moment(x.data.result.dob).format("DD"),
          month:moment(x.data.result.dob).format("MM"),
          year:moment(x.data.result.dob).format("YYYY"),
        }, "formA");
        await storeData({
          married: parseInt(x.data.result.married),
          tobacco: parseInt(x.data.result.tobacco),
          children:parseInt(x.data.result.children),
          childNo: parseInt(x.data.result.childNo),
          smoke:   parseInt(x.data.result.smoke),
          alcohol: parseInt(x.data.result.alcohol)
        }, "formB");
        if(x.data.result.Relatives.length==0){ // x.data.result.Relatives

        } else {
          spouceData = x.data.result.Relatives[0];
          if(x.data.result.Relatives.length>1){
            let tempData = x.data.result.Relatives.filter((y)=>{
              return y.typeOfRelation!="spouse"
            })
            childData = tempData;
            childData.forEach((y)=>{
              y.day=moment(y.dob).format("DD");
              y.month=moment(y.dob).format("MM");
              y.year=moment(y.dob).format("YYYY");
            })
          }
        }
        await storeData({
          ...spouceData,
          day:moment(spouceData.dob).format("DD"),
          month:moment(spouceData.dob).format("MM"),
          year:moment(spouceData.dob).format("YYYY"),
          children:childData
        }, "formC");
        await storeData({
          ...x.data.result.clientDisease
        }, "formD");
      })
      setForm("A");
    }
  }
  
  const onSubmitA = async(data) => {
    await storeData(data, "formA");
    setForm("B");
  }

  const onSubmitB = async(data) => {
    await storeData(data, "formB");
    setForm("C");
  }

  const onSubmitC = async(data) => {
    await storeData(data, "formC");
    setForm("D");
  }

  const onSubmitD = async(data) => {
    await storeData(data, "formD");
    setForm("");
    const valueA = await AsyncStorage.getItem('formA');
    const valueB = await AsyncStorage.getItem('formB');
    const valueC = await AsyncStorage.getItem('formC');
    const valueD = await AsyncStorage.getItem('formD');

    handleSignUp(
      valueA,
      valueB,
      valueC,
      valueD
    );
    // await axios.post(`${urls.local_url}/clients/editClient`,clientData)
  }

  const handleSignUp = async(a,b,c,d) => {

    const clientData = await {...JSON.parse(a)};
    await AsyncStorage.setItem("email", clientData.email);
    axios.post(`${urls.local_url}/clients/editClient`,{
      client:{...JSON.parse(a), ...JSON.parse(b)},
      disease:{...JSON.parse(d)},
      relatives:{...JSON.parse(c)}
    }).then(async(x)=>{
      setModalVisible(true);
      const values = JSON.parse(await AsyncStorage.getItem("login"));
      await storeData({...values, user:clientData.lastName}, "login");
      await delay(3000);
      navigation.navigate("Dashboard");
    })
  };

  const storeData = async (value, key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      
    }
  };

  return (
    <View style={{flex:1}}>
      {form=="A" && <SignUpCompA navigation={navigation} onSubmit={onSubmitA} userData={userData} />}
      {form=="B" && <SignUpCompB onSubmit={onSubmitB} setForm={setForm} userData={userData} />}
      {form=="C" && <SignUpCompC onSubmit={onSubmitC} setForm={setForm} userData={userData} />}
      {form=="D" && <SignUpCompD onSubmit={onSubmitD} setForm={setForm} userData={userData} />}
      {form=="" && 
        <View style={{flex:1, justifyContent:'center', backgroundColor:'white' }}>
          <ActivityIndicator color='#D86321' size={'large'} />
          <Text style={{textAlign:'center', marginTop:10}}>Please Wait..</Text>
        </View>
      }
      {modalVisible && 
      <View style={styles.modalBack}>
        <ModalView 
          modalVisible={modalVisible} 
          setModalVisible={setModalVisible} 
          status={'success'} 
          message={'Profile Updated!'} 
        /> 
      </View>
      }
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  modalBack:{
    position:'absolute', height:"150%", width:"150%",
    backgroundColor:'#373737', opacity:0.7, zIndex:1
  }
})