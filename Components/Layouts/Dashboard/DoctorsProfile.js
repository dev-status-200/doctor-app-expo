import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const DoctorsProfile = ({doctors, search, term, to, from}) => {

  const navigation = useNavigation();

  return (
  <>
  {doctors.filter((x)=>{
    if(!search){
      return x
    } else if(search && term==""){
      return x
    } else if(search && `Dr. ${x.firstName} ${x.lastName}`.toLocaleLowerCase().includes(term.toLocaleLowerCase())) {
      return x
    }
  }).filter((x)=>{
    let pass = false
    x?.Pricings?.forEach(y => {
      if(parseFloat(y.price)>= parseFloat(from) && parseFloat(y.price)<= parseFloat(to)){
        pass = true
      }
    });
    if(pass){
      return x
    }
  }).map((x, i) => {
  return(
  <View style={styles.container} key={x.id}>
    <View style={styles.row}>
    <View style={{width:'20%'}}>
      {/* {(x?.image.length>5 || x?.image!=null) &&  <Image key={i} source={{uri: x.image}} style={{width: 60, height: 60, borderRadius:100}} />} */}
      <EvilIcons name={"user"} color={'grey'} size={60} style={{position:'relative', bottom:3}} />
    </View>
    <View  style={{width:'65%', paddingTop:2}}>
      <Text style={{color:'black', fontSize:15, fontWeight:"600", fontFamily:'Proxim'}}>Dr. {x.firstName} {x.lastName}</Text>
      <View style={{flexDirection:'row'}}>
        {x.Specializations?.map((y, i) => {
          return(
          <Text key={y.id} style={{color:'silver', fontFamily:'Proxim'}}>{i!=0?', ':''}{y.name}</Text>
        )})}
      </View>
      <Text style={{fontSize:12, marginTop:10, fontFamily:'Proxim'}}>
        <FontAwesome color="gold" name={"star"} />
         Reviews | <Entypo color={"#CC5500"} name={"location-pin"} /> 0.5 KM Away
      </Text>
    </View>
    <View style={{width:'15%', alignItems:'flex-end', padding:7}}>
      <AntDesign name={"hearto"} color={'grey'} size={17} />
    </View>
    </View>
    <TouchableOpacity style={styles.profileBtn}
      onPress={() => navigation.navigate('DoctorProfile', {...x})}
      //onPress={() => console.log(x)}
    >
      <Text style={styles.btnText}>View Profile</Text>
    </TouchableOpacity>
  </View>
  )})}
  </>
  )
}
export default React.memo(DoctorsProfile)

const styles = StyleSheet.create({
  container:{
    borderRadius:15,
    borderTopColor:'#E7E7E7',
    borderTopWidth:1,
    backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:15
  },
  row:{
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  profileBtn:{
    backgroundColor:'#f9e8dc',
    borderBottomRightRadius:15,
    borderBottomLeftRadius:15,
    justifyContent:'center',
    alignItems:'center',
    padding:"2%"
  },
  btnText:{
    color:'#CC5500',
    fontSize:12,
    fontWeight:"600",
    fontFamily:'Proxim'
  }
})