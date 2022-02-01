import React from 'react'
import styled, { css } from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight } from 'react-native-responsive-dimensions';

type LabelProps = {
    fontSize?: number,
    color?: string,
    textAlign?: string,
    value?:string
}

export const Input = styled.TextInput<LabelProps>`
${({ fontSize, color }) => css`
        font-size:${fontSize ? fontSize : responsiveFontSize(1.8)};
        color: ${color ? color : "#333333"}
       
        flex:5;

`}`
export const BoxItemSelected = styled.View`
    flex-direction: row;
    min-height:50px;
    justify-content: flex-start;
    flex:5
    align-content:center;
    align-items:center;
`
export const TextSelected = styled.Text<LabelProps>`
${({ fontSize, color }) => css`
        font-size:${fontSize ? fontSize : responsiveFontSize(1.8)};
        color: ${color ? color : "#333333"}
       
`}`

export const Label = styled.Text<LabelProps>`
${({ fontSize, color }) => css`
    font-size:${fontSize ? fontSize : responsiveFontSize(1.8)};
    color: ${color ? color : "#333333"}
    font-weight: 700;
    

`}`

export const BoxInput = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    background-color: #e1e1e1;
    padding:0px 10px 0px 10px;
    border-radius:8px;
    marginTop:8px;
`

export const ImageLogo = styled.Image`
    width: 30px;
    height: 30px;
    border-radius: 60px;
    margin-right: 10px; 
    border-Width: 1px;
    align-self: center;
`