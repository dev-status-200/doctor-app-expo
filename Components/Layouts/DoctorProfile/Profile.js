import React from 'react';
import AntdIcons from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { RadioButton } from 'react-native-radio-buttons-group';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { Image } from 'expo-image';

const Profile = ({bookAppointment, profile, service, setService, total}) => {

  const parseImages = (img) => {
    let formats=[".png",".jpg", ".jpeg", ".svg"];
    let image = img.replace(new RegExp(formats.join("|")),"");
    return img? image : ''
  }

  return (
    <ScrollView>
    <View style={{padding:20}}>
        <View style={[styles.banner, styles.shadow]}>
            <View style={{padding:10, width:'30%'}}>
                {(profile.image && profile.image!='') &&
                    <Image
                        style={{
                            width: 78,
                            height: 78,
                            resizeMode: 'contain',
                            borderRadius:100,
                        }}
                        source={{
                            uri:profile.image
                        }}
                    />
                }
                
            </View>
            <View style={{paddingLeft:15, paddingTop:5, width:'70%'}}>
                <Text style={styles.heading}>{`Dr. ${profile?.firstName} ${profile?.lastName}`}</Text>
                <Text style={{width:'90%', lineHeight:14}}>{profile.Specializations.map((x, i)=>{
                    return(
                        <Text key={i} style={[styles.para]}>{x.name}, </Text>
                    )
                })}
                </Text>
                <Text style={[styles.para, {marginTop:3, maxWidth:250}]}>
                    {`${profile?.address1}${profile?.address2?', '+profile?.address2:''}, ${profile?.city}, ${profile?.state}`}
                </Text>
            </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
            <View>
            <View style={styles.iconContainers}>
                <Octicons name="people" color={"#2d3f4c"} size={20} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={[styles.iconHeading, {marginTop:10}]}>5,000+</Text>
                <Text style={[styles.para, {marginTop:3}]}>Patients</Text>
            </View>
            </View>

            <View>
            <View style={styles.iconContainers}>
                <Entypo name="line-graph" color={"#2d3f4c"} size={20} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={[styles.iconHeading, {marginTop:10}]}>10 +</Text>
                <Text style={[styles.para, {marginTop:3}]}>Years</Text>
            </View>
            </View>

            <View>
            <View style={styles.iconContainers}>
                <Ionicons name="star" color={"#2d3f4c"} size={20} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={[styles.iconHeading, {marginTop:10}]}>5,000+</Text>
                <Text style={[styles.para, {marginTop:3}]}>Patients</Text>
            </View>
            </View>

            <View>
            <View style={styles.iconContainers}>
                <MaterialCommunityIcons name="comment-processing" color={"#2d3f4c"} size={20} />
            </View>
            <View style={{justifyContent:'center', alignItems:'center'}}>
                <Text style={[styles.iconHeading, {marginTop:10}]}>5,000+</Text>
                <Text style={[styles.para, {marginTop:3}]}>Patients</Text>
            </View>
            </View>
        </View>
        <View style={styles.hr}></View>
        <View>
            <Text style={styles.heading}>About</Text>
            <Text style={[styles.para, {marginTop:10}]}>{profile.bio}</Text>
        </View>
        <View style={[styles.hr, {marginTop:20}]}></View>
        <View style={{marginBottom:10, marginTop:10}}>
            <Text style={[styles.heading, { marginBottom:10 }]}>Select Service</Text>
            {service.map((x, i)=>{
                return(
                    <View key={x.id} style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity style={{flexDirection:'row'}}
                            onPress={() => {
                                let tempPricings = [...service];
                                tempPricings.forEach((y, j) => {
                                    if(j==i){
                                        y.check=y.check==1?0:1;
                                    }
                                });
                                setService(tempPricings);
                            }}
                        >
                        <RadioButton 
                            radioButtons={[{id:0}]}
                            onPress={(x)=>console.log(x)}
                            layout='row'
                            selected={x.check==0?true:false}
                            color={styles.orange.color}
                        />
                            <Text style={{padding:"2%", color:'grey', fontFamily:'Proxim'}}>{x.name}</Text>
                        </TouchableOpacity>
                        <Text style={{padding:"2%", fontFamily:'Proxim'}}>$ {x.price}</Text>
                    </View>
                )
            })}
        </View>
        <View style={styles.hr}></View>
        <View style={{ marginTop:10, flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={[styles.heading, styles.orange, { marginBottom:10 }]}>Total</Text>
            <Text style={[styles.heading, styles.orange, { marginBottom:10 }]}>$ {total}</Text>
        </View>

        <View style={{marginBottom:10, marginTop:10}}>
            <Text style={[styles.heading, { marginBottom:10 }]}>Clinic Information</Text>
            <View style={[styles.hr]}></View>
            <View style={[styles.row, {marginBottom:10}]}>
                <Text style={styles.paraBlack}>Clinic Name</Text>
                <Text style={styles.paraGrey}>{profile?.Clinics[0]?.name}</Text>
            </View>
            <View style={[styles.row, {marginBottom:10}]}>
                <Text style={styles.paraBlack}>Clinic Address</Text>
                <Text style={styles.paraGrey}>{profile.Clinics[0]?.address}</Text>
            </View>
            <View style={[styles.row, {marginBottom:10}]}>
                <Text style={styles.paraBlack}>Clinic Email</Text>
                <Text style={styles.paraGrey}>{profile.Clinics[0]?.email}</Text>
            </View>
            {profile?.Clinics[0]?.images!=null && 
            <View style={{flexDirection:'row'}}>
                {profile?.Clinics[0]?.images.map((x)=>{
                    return(
                        <Image key={x} source={{uri:parseImages(x)}} style={{width: 80, height: 120, marginRight:14, borderRadius:15}} />
                    )
                })}
            </View>
            }
            {profile?.Clinics[0]?.images==null && 
                <Text style={styles.emptyText}>No Images to show</Text>
            }
        </View>
        <View style={{marginBottom:10, marginTop:10}}>
            <Text style={[styles.heading, { marginBottom:10 }]}>Education</Text>
            <View style={[styles.hr]}></View>

            <View style={[styles.row, {marginBottom:10}]}>
                <Text style={styles.paraBlack}>Clinic Name</Text>
                <Text style={styles.paraGrey}>{profile?.Clinics[0]?.name}</Text>
            </View>
        </View>
        <TouchableOpacity style={[styles.buttonBase, {marginTop:5}]} onPress={bookAppointment}>
            <Text style={{color:'white', fontFamily:"ProximaBold"}}>Book An Appointment</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
    )
}
export default React.memo(Profile)

const styles = StyleSheet.create({
    profileImage:{
        width: 70,
        height: 70,
        borderRadius:100
    },
    emptyText:{
        color:'grey',
        backgroundColor:'#F1F1F1',
        padding:8,
        margin:5,
        paddingLeft:10,
        textAlign:'center',
        borderRadius:12
    },
    row:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    banner:{
        borderColor:'#f3f6f4',
        borderWidth:1,
        padding:20,
        borderRadius:15,
        backgroundColor:'white',
        flexDirection:'row'
    },
    shadow:{
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 14,
        },
        shadowOpacity:  0.24,
        shadowRadius: 15.38,
        elevation: 19
    },
    heading:{
        fontSize:18,
        fontFamily:'ProximaBold'
    },
    para:{
        fontFamily:"Proxim",
        color:'grey'
    },
    paraGrey:{
        color:'grey',
        fontFamily:"Proxim",
        fontSize:16
    },
    paraBlack:{
        fontFamily:"Proxim",
        fontSize:16
    },
    iconContainers:{
        backgroundColor:'#dfdfdf',
        padding:16,
        borderRadius:55,
        justifyContent:'center',
        alignItems:'center',
        width:'100%'
    },
    iconHeading:{
        color:'#2d3f4c',
        fontFamily:'ProximaBold'

    },
    hr:{
        backgroundColor:'silver',
        height:1,
        marginTop:10,
        marginBottom:10,
    },
    orange:{
        color:'#D86321'
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
})