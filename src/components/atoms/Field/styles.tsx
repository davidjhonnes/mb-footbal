import React from 'react'
import styled, { css } from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight } from 'react-native-responsive-dimensions';

type LabelProps = {
    fontSize?: number,
    color?: string,
    textAlign?: string,
}

export const Input = styled.TextInput<LabelProps>`
${({ fontSize, color }) => css`
        font-size:${fontSize ? fontSize : responsiveFontSize(1.8)};
        color: ${color ? color : "#333333"}
        padding:10px 10px 10px 10px;
        background-color: #e1e1e1;
        border-radius:8px;
        marginTop:8px

`}`

export const Label = styled.Text<LabelProps>`
${({ fontSize, color }) => css`
    font-size:${fontSize ? fontSize : responsiveFontSize(1.8)};
    color: ${color ? color : "#333333"}
    

`}`