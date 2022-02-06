import React from 'react'
import styled from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';


export const ContainerImageBG = styled.ImageBackground`
    height:${responsiveHeight(100)};
    justifyContent: center;    
`
export const Box = styled.View`
    margin-bottom: 20px;
    padding:18px;
    width: ${responsiveWidth(100)}px;
    background-color: rgba(42, 42, 39, 0.92);    
    border-bottom: 5px solid red;
    border-bottom-width:8px; 
    border-bottom-style:solid;
    border-bottom-color:rgba(230, 219, 14,1 );
`

export const TitleText = styled.Text`
    font-size: ${responsiveFontSize(3.4)}px;
    color: #ffffff;
    text-align: center;
    font-family: 'sans-serif-thin'
  
`

export const DescriptionText = styled.Text`
    font-size: ${responsiveFontSize(1.8)}px;
    color: #ffffff;
    text-align: center;
    font-family: 'normal'
`

export const Content = styled.View`
    height:100%;
    align-items: center;
`
export const BoxFilter = styled.View`
    backgroundColor: rgba(255, 255, 255, 0.7);
    border-radius:8px;
    padding:18px;
    width: ${responsiveWidth(90)}px;
    border: 1px solid rgba(0,0,0,0.1)

`

export const Divider = styled.View`
    height:15px;
`