import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList } from 'react-native';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { useForm } from "react-hook-form";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNCheckBox from "../../Shared/Form/CheckBox";

const Header = (props) => {
    return(
    <View>
        <View style={{flexDirection:'row', padding:15, justifyContent:'space-between'}}>
            <View style={{width:"15%", paddingTop:5}}>
                <TouchableOpacity onPress={()=> {props.setForm("C")}}>
                    <AntdIcons name="leftcircle" color={"#D86321"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{width:"70%", padding:2}}>
                <Text style={{textAlign:'center', fontSize:22, color:'black', fontWeight:'500'}}>{props.name}</Text>
            </View>
            <View style={{width:"15%"}}></View>
        </View>
        <View style={{backgroundColor:'silver', height:1, marginLeft:15, marginRight:15}}></View>
    </View>
    )
}

const SignUpCompD = ({setForm, onSubmit}) => {

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            
        }
    });
    const [list, setList] = useState([
        {data: ['Pizza']}
    ]);

    useEffect(() => {
        getData()
    }, [])
    
    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('formD');
          if (value !== null) {
            reset(JSON.parse(value))
          }
        } catch (e) {
        }
    };

  return (
    <View style={styles.container}>
    <Header name={"Just A Little More"} setForm={setForm} />
    <SectionList
        sections={list}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
        <View style={{paddingLeft:22, paddingRight:22, paddingTop:10, paddingBottom:20}}>
            <Text style={{color:'black', fontSize:15, marginBottom:10, fontFamily:'Proxim'}}>Please Check All the boxes which applied to your or in your Family</Text>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="heart"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Heart diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="intellectual"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Intellectual disabilities*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="immunoDeficiency"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Immunodeficiency diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="kidney"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Kidney diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="lung"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Lung diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="mental"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Mental illness*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="sleep"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Sleep disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="muscular"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Muscular diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="neurological"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Neurological diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="ocular"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Ocular diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="skin"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Skin diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="strokes"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Strokes*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="autoImmune"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Autoimmune diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="bone"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Bone and joint diseases & disorders*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="cancer"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Cancers*</Text>
            </View>
            <View style={{flexDirection:'row', paddingRight:32, marginTop:5, marginBottom:5, marginTop:15}}>
                <RNCheckBox control={control} name="gastroIntestinal"  />
                <Text style={{color:'grey', marginTop:3, marginLeft:10, fontFamily:'Proxim'}}>Gastrointestinal diseases & disorders*</Text>
            </View>
            <View style={{marginTop:5}}>
            <TouchableOpacity style={styles.buttonBase} onPress={handleSubmit(onSubmit)}>
                <Text style={{color:'white', fontFamily:'Proxim'}}>Next</Text>
            </TouchableOpacity>
            </View>
        </View>
        )}
    />
    </View>
)};

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor:"white"
    },
    label:{
        color:'black',
        fontSize:17,
        fontFamily:'Proxim'
    },
    input:{
        borderColor:'silver', borderWidth:1, borderRadius:12, padding:13, paddingLeft:17, marginTop:5,
        fontFamily:'Proxim'
    },
    buttonBase: {
        marginTop:20,
        width: "100%",
        height: 40,
        backgroundColor: '#D86321',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    linkBtn:{color:'#D86321', marginTop:20, fontSize:15, fontWeight:'500', borderBottomWidth:1, borderBottomColor:'#D86321', width:90},
    row:{flexDirection:'row', width:"100%", justifyContent:'space-between'},
    sm:{width:'30%'},
    md:{width:'49%'},
    xl:{width:'100%'},
    mt2:{marginTop:20},
    mb2:{marginBottom:20}
});

export default React.memo(SignUpCompD);