import React from 'react'
import styled from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';


export const Header = styled.View`
    height: 150px;
    width: 100%;
`

export const Content = styled.View`
    background-color: rgba(42, 42, 39, 0.88); 
    height:100%;
`

export const ViewAbsolute = styled.View`
    margin: 10px;
    position: absolute
`

export const LogoLeague = styled.View`
    margin: 10px;
    align-self: center;
    justify-content: center;
    alignItems: center;
    width: 90px;
    height: 90px;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.82)
`