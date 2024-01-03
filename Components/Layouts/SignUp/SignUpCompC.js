import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SectionList } from 'react-native';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { useForm, useFieldArray, useWatch  } from "react-hook-form";
import RNInput from "../../Shared/Form/TextInput";
import RNSelect from "../../Shared/Form/Select";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = (props) => {
    return(
    <View>
        <View style={{flexDirection:'row', padding:15, justifyContent:'space-between'}}>
            <View style={{width:"15%", paddingTop:5}}>
                <TouchableOpacity onPress={()=> {props.setForm("B")}}>
                    <AntdIcons name="leftcircle" color={"#D86321"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{width:"70%", padding:2}}>
                <Text style={{textAlign:'center', fontSize:22, color:'black', fontWeight:'500', fontFamily:'Proxim'}}>{props.name}</Text>
            </View>
            <View style={{width:"15%"}}></View>
        </View>
        <View style={{backgroundColor:'silver', height:1, marginLeft:15, marginRight:15}}></View>
    </View>
    )
}

const SignUpCompD = ({setForm, onSubmit}) => {

    const [list, setList] = useState([
        {data: ['Pizza']}
    ]);

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            
        }
    });

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "children"
    });
    const values = useWatch({ control });

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('formC');
          if (value !== null) {
            reset(JSON.parse(value))
          }
        } catch (e) {
        }
    };

  return (
    <View style={styles.container}>
    <Header name={"Add Your Family Details"} setForm={setForm} />
    <SectionList
        sections={list}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
        <View style={{paddingLeft:22, paddingRight:22, paddingTop:10, paddingBottom:20}}>
            <Text style={{color:'black', fontSize:20, marginBottom:10, fontFamily:'Proxim'}}>Spouse Information</Text>
            <View style={styles.row}>
                <View style={styles.md}>
                    <RNInput control={control} name="firstName" placeholder={"First Name"} label={"Name"} />
                </View>
                <View style={styles.md}>
                    <RNInput control={control} name="lastName" placeholder={"Last Name"} label={" "} />
                </View>
            </View>

            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                <View style={styles.sm}>
                    <RNSelect control={control} name="day" placeholder={"Day"} label={"Date of Birth"}
                        list={[
                            {label:'01', value:'01'},
                            {label:'02', value:'02'},
                            {label:'03', value:'03'},
                        ]}
                    />
                </View>
                <View style={styles.sm}>
                    <RNSelect control={control} name="month" placeholder={"Month"} label={" "}
                        list={[
                            {label:'01', value:'01'},
                            {label:'02', value:'02'},
                            {label:'03', value:'03'},
                        ]}
                    />
                </View>
                <View style={styles.sm}>
                    <RNSelect control={control} name="year" placeholder={"Year"} label={" "}
                        list={[
                            {label:'2005', value:'2005'},
                            {label:'2004', value:'2004'},
                            {label:'2003', value:'2003'},
                            {label:'2002', value:'2002'},
                            {label:'2001', value:'2001'},
                        ]}
                    />
                </View>
            </View>

            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:1 }]}>
                <View style={styles.xl}>
                    <RNSelect control={control} name="disease" placeholder={"Select Here"} label={"Disease"}
                        list={[
                            {label:'Fever', value:'Fever'},
                            {label:'Cough', value:'Cough'},
                            {label:'Diabetes', value:'Diabetes'},
                        ]}
                    />
                </View>
            </View>
            <Text style={{color:'black', fontSize:20, marginTop:15, fontFamily:'Proxim'}}>Child Information</Text>
            <View style={{backgroundColor:'silver', height:1, marginLeft:5, marginRight:5, marginTop:10, marginBottom:0}}></View>
            
            {fields.map((field, index) => (
                <View key={field.id}>
                    <View style={{alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={()=>remove(index)}>
                        <Text style={styles.linkBtn}>Remove</Text>
                    </TouchableOpacity>
                    </View>
                <View style={styles.row}>
                    <View style={styles.md}>
                        <RNInput control={control} name={`children.${index}.firstName`} placeholder={"First Name"} label={"Name"} />
                    </View>
                    <View style={styles.md}>
                        <RNInput control={control} name={`children.${index}.lastName`} placeholder={"Last Name"} label={" "} />
                    </View>
                </View>
                <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                    <View style={styles.sm}>
                    <RNSelect control={control} name={`children.${index}.day`} placeholder={"Day"} label={"Date of Birth"} 
                        list={[
                            {label:'01', value:'01'},
                            {label:'02', value:'02'},
                            {label:'03', value:'03'},
                        ]}
                    />
                    </View>
                    <View style={styles.sm}>
                    <RNSelect control={control} name={`children.${index}.month`} placeholder={"Month"} label={" "} 
                        list={[
                            {label:'01', value:'01'},
                            {label:'02', value:'02'},
                            {label:'03', value:'03'},
                        ]}
                    />
                    </View>
                    <View style={styles.sm}>
                    <RNSelect control={control} name={`children.${index}.year`} placeholder={"Year"} label={" "}
                        list={[
                            {label:'2005', value:'2005'},
                            {label:'2004', value:'2004'},
                            {label:'2003', value:'2003'},
                            {label:'2002', value:'2002'},
                            {label:'2001', value:'2001'},
                        ]}
                    />
                    </View>
                </View>
                <View style={[styles.row, styles.mt2, { position:'relative', zIndex:1 }]}>
                    <View style={styles.xl}>
                    <RNSelect control={control} name={`children.${index}.disease`} placeholder={"Select Here"} label={"Disease"}
                        list={[
                            {label:'Fever', value:'Fever'},
                            {label:'Cough', value:'Cough'},
                            {label:'Diabetes', value:'Diabetes'},
                        ]}
                    />
                    </View>
                </View><View style={{backgroundColor:'silver', height:1, marginLeft:5, marginRight:5, marginTop:20, marginBottom:0}}></View>
                </View>
            ))}
            <TouchableOpacity onPress={()=>append({name:''})}>
                <Text style={styles.linkBtn}>+ Add Another</Text>
            </TouchableOpacity>

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
        borderColor:'silver', 
        borderWidth:1, 
        borderRadius:12, 
        padding:13, 
        paddingLeft:17, 
        marginTop:5,
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
    linkBtn:{
        color:'#D86321', 
        marginTop:20, 
        fontSize:15, 
        fontWeight:'500',
        fontFamily:'Proxim'
    },
    row:{
        flexDirection:'row',
        width:"100%", 
        justifyContent:'space-between'
    },
    sm:{width:'30%'},
    md:{width:'49%'},
    xl:{width:'100%'},
    mt2:{marginTop:20},
    mb2:{marginBottom:20}
});

export default React.memo(SignUpCompD);