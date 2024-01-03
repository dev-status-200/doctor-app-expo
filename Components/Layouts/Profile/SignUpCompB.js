import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, SectionList } from 'react-native';
import AntdIcons from 'react-native-vector-icons/AntDesign';
import { useForm, useWatch } from "react-hook-form";
//import RNInput from "../../Shared/Form/TextInput";
import RNNumber from "../../Shared/Form/NumberInput";
import Radio from "../../Shared/Form/Radio";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LogBox } from 'react-native';
// LogBox.ignoreAllLogs();

const Header = (props) => {
    return(
    <View>
        <View style={{flexDirection:'row', padding:15, justifyContent:'space-between'}}>
            <View style={{width:"25%", paddingTop:5}}>
                <TouchableOpacity onPress={()=> {props.setForm("A")}}>
                    <AntdIcons name="leftcircle" color={"#D86321"} size={20} />
                </TouchableOpacity>
            </View>
            <View style={{width:"50%", padding:2}}>
                <Text style={{textAlign:'center', fontSize:22, color:'black', fontWeight:'500', fontFamily:'Proxim'}}>Profile</Text>
            </View>
            <View style={{width:"25%"}}></View>
        </View>
        <View style={{backgroundColor:'silver', height:1, marginLeft:15, marginRight:15}}></View>
    </View>
    )
}

const SignUpCompB = ({setForm, onSubmit}) => {

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            married: 0,
            tobacco: 0,
            children:0,
            childNo: 0,
            smoke:   0,
            alcohol: 0
        }
    });
    const values = useWatch({ control })

    const Data = useMemo(()=>([
        {id: 0, label: "Yes" },
        {id: 1, label: "No" },
    ]), []);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
          const value = await AsyncStorage.getItem('formB');
          if (value !== null) {
            reset(JSON.parse(value));
          }
        } catch (e) {
        }
    };
    
  return (
    <View style={styles.container}>
    <Header name={"Add your Details"} setForm={setForm} />
    <SectionList sections={[{data: ['Pizza']}]}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
        <View style={{paddingLeft:22, paddingRight:22, paddingTop:10, paddingBottom:20}}>
            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                <View style={styles.xl}>
                    <Radio  control={control} 
                        name="married" required={true} radios={Data} 
                        values={values} 
                        label={"Are you Married ?"} 
                    />
                </View>
            </View>
            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                <View style={styles.xl}>
                    <Radio  control={control} 
                        name="children" required={true} radios={Data} 
                        values={values} 
                        label={"Do you have Children ?"} 
                    />
                </View>
            </View>
            <View style={[styles.row, styles.mt2]}>
                <View style={styles.md}>
                    <RNNumber control={control} name="childNo" placeholder={""} label={"How many Children ?"} required={true} />
                </View>
            </View>
            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                <View style={styles.xl}>
                    <Radio  control={control} 
                        name="smoke" required={true} radios={Data} 
                        values={values} 
                        label={"Do you smoke ?"} 
                    />
                </View>
            </View>
            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                <View style={styles.xl}>
                    <Radio  control={control} 
                        name="tobacco" required={true} radios={Data} 
                        values={values} 
                        label={"Do you use tobacco products ?"} 
                    />
                </View>
            </View>
            <View style={[styles.row, styles.mt2, { position:'relative', zIndex:2 }]}>
                <View style={styles.xl}>
                    <Radio  control={control} 
                        name="alcohol" required={true} radios={Data} 
                        values={values} 
                        label={"Do you use consume alcohol ?"} 
                    />
                </View>
            </View>
            <View style={{marginTop:60}}>
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
    row:{flexDirection:'row', width:"100%", justifyContent:'space-between'},
    sm:{width:'30%'},
    md:{width:'49%'},
    xl:{width:'100%'},
    mt2:{marginTop:20},
    mb2:{marginBottom:20}
});

export default React.memo(SignUpCompB);