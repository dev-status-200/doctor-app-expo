import { Controller } from "react-hook-form";
import CheckBox from '@mesameerahmed/react-native-check-box'
import React from 'react';

const RNCheckBox = ({control, name, required}) => {
    
    return(
    <Controller
        control={control}
        rules={{ required: required }}
        render={({ field: { onChange, onBlur, value } }) => (
            <CheckBox
                onBlur={onBlur}
                isChecked={value}
                onClick={onChange}
                checkBoxColor={'#D86321'}
            />
        )}
        name={name}
    />
    )
}

export default React.memo(RNCheckBox)