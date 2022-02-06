import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View, } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome';

import { Label, Input, BoxInput, ImageLogo, TextSelected, BoxItemSelected, Button } from './styles';

const TextField = ({
    isLoading,
    label,
    placeholder,
    fontSizeLabel,
    colorLabel,
    inputColor,
    fontSizeInput,
    onChangeTextInput,
    value,
    image
}) => {
    const [text, setText] = useState<string>(value)

    const handleText = (t: string) => {
        setText(t)
        onChangeTextInput(t)
    }
    useEffect(() => {
        setText(value)
    }, [value])

    return (
        <View>
            <Label
                color={colorLabel}
                fontSize={fontSizeLabel}
            >
                {label}
            </Label>
            <BoxInput>
                {image ?
                    <BoxItemSelected>
                        <ImageLogo source={image} />
                        <TextSelected >{text}</TextSelected>
                    </BoxItemSelected>
                    :
                    <Input
                        value={text}
                        fontSize={fontSizeInput}
                        color={inputColor}
                        placeholder={placeholder}
                        placeholderTextColor={inputColor ? inputColor : "#888888"}
                        onChangeText={handleText}
                    />
                }
                {isLoading ?
                    <ActivityIndicator style={{ flex: 1 }} />
                    :
                    <Button onPress={() => handleText("")}>
                        <Icon name="times-circle" size={18} color="#999" />
                    </Button>
                }
            </BoxInput>
        </View>
    )
}


export default TextField