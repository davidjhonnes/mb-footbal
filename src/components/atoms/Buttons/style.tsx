import React from 'react';
import styled, { css } from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors, FontSize, SizeButtons, TypeButons } from '../../../theme/theme';
import { TypeButton, TypeTextButton } from './interface';




const checkColorIsDisabled = (disabled, color, defaultColor, inverter?) => {
   return `${disabled ? (inverter ? Colors.White : Colors.BlackHighlight ) : !disabled && color ? Colors[color] : defaultColor}; `
}

export const ButtonSelectItem = styled.TouchableOpacity`
    padding: 5px;
    margin-bottom: 10px;
    flex-direction: row; 
    align-items: center;
    max-width: ${responsiveWidth(60)}
`


export const ImageLogo = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 60px;
    margin-right: 10px; 
    border-Width: 1px;
`


export const Button = styled.TouchableOpacity<TypeButton>`
${({ size, color, type, disabled }) => css`
    background-color: ${checkColorIsDisabled(disabled, color, Colors.BlackHighlight)};
    ${size ? SizeButtons[size] : SizeButtons.Medium}
    ${type ? TypeButons[type] : TypeButons.Rounded }
    padding: 10px;
    justify-content: center;
    align-items: center;
`}
`

export const TextButon = styled.Text<TypeTextButton>`
${({ size, color, disabled }) => css`
    font-size: ${size ? FontSize[size] : FontSize.FontMedium};
    color: ${checkColorIsDisabled(disabled, color, Colors.White, true)};

`}`