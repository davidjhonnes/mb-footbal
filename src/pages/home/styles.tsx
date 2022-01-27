import React from 'react'
import styled from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight } from 'react-native-responsive-dimensions';


export const ContainerImageBG = styled.ImageBackground`
    height:${responsiveHeight(100)};
    justifyContent: center;
    
`

export const Content = styled.View`
    backgroundColor: rgba(10, 1, 36, 0.73);
    height:100%;
    justify-content: center;
    align-content: center;
    align-items: center;
`
export const BoxFilter = styled.View`
    backgroundColor: rgb(255, 255, 255);
    border-radius:8px;
    padding:12px;

`