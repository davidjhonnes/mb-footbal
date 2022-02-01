import React from 'react'
import { Image, Text } from 'react-native'
import { ButtonImageType, ButtonThemeType } from './interface'
import { Button, ButtonSelectItem, ImageLogo, TextButon } from './style'



export const ButtonItemWithImage = ({
    item,
    onPress,
    text,
    imageUri
}: ButtonImageType) => {


    return (
        <ButtonSelectItem onPress={() => onPress(item)}>
            {imageUri &&
                <ImageLogo source={{ uri: imageUri }} />
            }
            <Text>{text}</Text>
        </ButtonSelectItem>
    )
}

export const ButtonTheme = ({
    color,
    textColor,
    text,
    size,
    fontSize,
    type,
    onPress,
    disabled
}: ButtonThemeType) => {

    return (
        <Button
            disabled={disabled}
            size={size}
            color={color}
            type={type}
            onPress={() => onPress()}
        >
            <TextButon disabled={disabled} size={fontSize} color={textColor}>{text}</TextButon>
        </Button>

    )


}