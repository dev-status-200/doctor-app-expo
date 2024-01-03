import React from 'react';
import { View } from 'react-native';
import DoctorProfileComp from '../Components/Layouts/DoctorProfile';

const DoctorProfile = (props) => {

    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <DoctorProfileComp props={props} />
      </View>
    )
}

export default React.memo(DoctorProfile)