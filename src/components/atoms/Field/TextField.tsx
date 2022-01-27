import React, { useEffect, useState } from 'react';
import { View } from "react-native"
import { Label, Input } from './styles';

const TextField = ({
    label,
    placeholder,
    fontSizeLabel,
    colorLabel,
    inputColor,
    fontSizeInput,
    onChangeTextInput
}) => {

    return (
        <View>
            <Label 
                color={colorLabel} 
                fontSize={fontSizeLabel}
            >
                {label}
            </Label>
            <Input
                fontSize={fontSizeInput}
                color={inputColor}
                placeholder={placeholder}
                placeholderTextColor={inputColor ? inputColor : "#888888"}
                onChangeText={onChangeTextInput}
            />
        </View>
    )
}

export default TextField