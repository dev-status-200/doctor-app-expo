import * as React from 'react';
import { Dimensions, Text, View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const Slider = ({appointments}) => {

  const width = Dimensions.get('window').width;
  const navigation = useNavigation();

  return (
    <>
    {appointments.length==0 && <Image source={require('../../../assets/images/slider.png')} style={{height:170, width:'100%'}} />}
    {appointments.length>0 && 
    <>
      <View style={{ flex: 1 }}>
      <Carousel
        loop={false}
        width={width-(width/100)*7}
        height={width / 3}
        autoPlay={false}
        data={appointments}
        scrollAnimationDuration={1000}
        //onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({index}) => (
        <View style={styles.slider}>
          <View style={{flexDirection:'row', marginBottom:12}}>
            <View style={{width:'20%'}}>
              <EvilIcons name={"user"} color={'white'} size={60} />
            </View>
            <View style={{width:'80%', paddingTop:"2%"}}>
              <Text style={{color:'white', fontFamily:"ProximaBold", fontSize:18}}>
                {appointments[index].Doctor.firstName}{" "}
                {appointments[index].Doctor.lastName}
              </Text>
              <Text style={{color:'white', fontFamily:"Proxim"}}>{appointments[index].Doctor.Specializations[0].name}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.buttonBase}
            onPress={() => navigation.navigate('AllAppointments', {...appointments[index]} )}
          >
            <Text style={styles.btnText}>
              <AntDesign name={"calendar"} color={'white'} />  {moment(appointments[index].selectedDate).format("dddd, MMM DD")}
                {"        "}
              <AntDesign name={"clockcircleo"} color={'white'} />  {appointments[index].selectHour}
            </Text>
          </TouchableOpacity>
        </View>
        )}
      />
      </View>
    </>
    }
    </>
  )
}

export default React.memo(Slider)

const styles = StyleSheet.create({
  slider:{
    borderWidth: 1,
    borderColor:'white',
    justifyContent: 'center',
    backgroundColor:'#36454F',
    borderRadius:15,
    padding:15
  },
  buttonBase: {
    width: "100%",
    height: 40,
    backgroundColor: '#D86321',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnText:{
    color:'white',
    fontFamily:'Proxim'
  },
})