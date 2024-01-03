import React, { useState, useRef, memo, useEffect } from 'react';
import { Text, View, Image, StyleSheet, useColorScheme, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppIntroSlider from 'react-native-app-intro-slider';
import AntdIcons from '@expo/vector-icons/AntDesign';
 
const slides = [
  {
    key: 1,
    title: 'Get Connect out Online Consultation',
    text: 'Improve the quality of the services for Patient Happiness.',
    image: require('../../assets/slides/slide1.png')
  },
  {
    key: 2,
    title: 'Consult only with a doctor you trust',
    text: 'Improve the quality of the services for Patient Happiness.',
    image: require('../../assets/slides/slide2.png')
  },
  {
    key: 3,
    title: 'Find a lot specialist doctors in one place',
    text: 'Improve the quality of the services for Patient Happiness.',
    image: require('../../assets/slides/slide3.png')
  }
];

const windowHeight = Dimensions.get('window').height;

function AppIntro({setHide}) {

  let sliderRef = useRef();
  const [slide, setSlide] = useState(0);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = { backgroundColor: isDarkMode ? Colors.darker : Colors.lighter };

  const renderItem = ({ item }) => {
    return (
    <View style={styles.slide}>
      <View style={{width:'100%', padding:15}}>
        <TouchableOpacity onPress={()=>{sliderRef.goToSlide(0); setSlide(0)}}>
          <CircleButton />
        </TouchableOpacity>
      </View>
      <Image source={item.image} style={styles.logo} />
      <View style={{marginTop:'5%', padding:20}}>
        <Text style={styles.slideHeading}>{item.title}</Text>
        <Text style={styles.slideText}>{item.text}</Text>
      </View>
    </View>
    );
  }

  const onDone = () => {
    setHide(true);
  }

  const DoneButton = () => {
    return (
      <View style={styles.buttonBase}>
        <Text style={styles.btnText}>Get Started</Text>
      </View>
    );
  };

  const NextButton = () => {
    return (
      <View style={styles.buttonBase}>
        <Text style={styles.btnText}>Next</Text>
      </View>
    );
  };

  const SkipButton = () => {
    return (
      <Text style={styles.skipButtonText}>Skip</Text>
    );
  };

  const CircleButton = () => {
    return(
      <View>
        {slide!="0"&&<AntdIcons name="leftcircle" color={"#D86321"} size={30} />}
        {slide=="0"&&<View style={{marginTop:30}}></View>}
      </View>
    )
  }
  
  useEffect(()=>{
    console.log(windowHeight)
  }, [])

  return (
  <>
    <AppIntroSlider
      onSlideChange={(e)=>{setSlide(e);}}
      ref={component => {sliderRef = component}}
      renderItem={renderItem} 
      data={slides} 
      onDone={onDone}
      renderDoneButton={DoneButton}
      renderNextButton={NextButton}
      showSkipButton
      onSkip={()=>{setSlide(2); sliderRef.goToSlide(2);}}
      renderSkipButton={SkipButton}
      dotStyle={styles.dotStyle}
      activeDotStyle={styles.activeDotStyle}
    />
    <View style={{padding:20, backgroundColor:'white'}}></View>
  </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "95%",
    height: 356,
  },
  buttonBase: {
    width: 120,
    height: "150%",
    backgroundColor: '#D86321',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  btnText:{
    color:'white',
    fontWeight:'600',
    fontFamily:'Proxim'
  },
  slide:{
    flex:1,
    backgroundColor:'#FFFFFF',
    alignContent:'center',
    alignItems:'center',
  },
  dotStyle:{
    backgroundColor:'silver',
    width:'3%',
    height:5,
    position:'relative',
    bottom:windowHeight>=740?"90%":"78%"
  },
  activeDotStyle:{
    backgroundColor:'grey',
    width:'11%',
    height:5,
    position:'relative',
    bottom:windowHeight>=740?"90%":"78%"
  },
  slideHeading:{
    fontSize:24,
    color:'black',
    fontFamily:'Proxim'
  },
  slideText:{
    marginTop:10,
    fontSize:16,
    color:'grey',
    fontFamily:'Proxim'
  },
  circleBtn:{
    backgroundColor:"#D86321",
    width:30,
    height:30,
    marginLeft:20,
    marginTop:10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skipButtonText:{
    color:"grey",
    fontSize:20,
    marginLeft:10,
    paddingTop:5,
    fontWeight:"600",
    borderBottomWidth:1,
    borderBottomColor:'silver',
    paddingBottom:0,
    fontFamily:'ProximaBold'
  }
});

export default AppIntro