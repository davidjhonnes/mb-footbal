import React from 'react'
import styled from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import { Colors } from '../../../theme/theme';


export const Container = styled.View`
    height: 100%
`

export const Header = styled.ImageBackground`
    width: ${responsiveScreenWidth(100)};
    height: ${responsiveScreenHeight(20)};
    
`

export const BoxHeader = styled.View`
    flex: 1;
    background-color: rgba(0,0,0,0.4);
    justifyContent: center;
    align-content: center;
    align-items: center;
   
`
export const LogoTeam = styled.Image`
    width: 100px;
    height: 100px;
    padding: 20px;

`

export const TextHeader = styled.Text`
    font-size: ${responsiveFontSize(3)};
    color: #ffffff;
    font-weight: 700;

`

export const EffectDivisor = styled.View`
    background-color: yellow;
    height:20px;
`

export const BlackLine = styled.View`
    background-color: #000000;
    height:10px;
`

export const Divider = styled.View`
    background-color: #000000;
    height: 1px;
    margin-top: 10px;
    margin-bottom: 10px;

`

export const TeamImage = styled.Image`
    width: ${responsiveWidth(85)};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    height: 150px; 
    marginBottom: 15px;
  `

export const Content = styled.ScrollView`
    padding: 10px;
    background-color: #d9dadb;
`

export const Card = styled.View`
    background-color: #ffffff;
    padding: 20px;
    border-radius: 20px;
    margin-bottom: 20px;
`

export const BlockInfoTeam = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom:5px;

`

export const ContentPlayer = styled.View`
    flex-direction: column;
    justify-content: flex-start;
`

export const RowPlayer = styled.View`
    padding-vertical: 12px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    border-bottomColor: #c1c1c1;
    border-bottom-width: 1px;
`

export const TextInfoTeam = styled.Text`
    font-size: ${responsiveFontSize(1.8)};
    color: ${Colors.Black};
    font-weight: 400;
`

export const TextStrong = styled.Text`
    font-weight: 700
`

export const ImagePlayer = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 60px;
    border-width: 2px;
    border-color: #c1c1c1
`

export const TextInfoPlayer = styled.Text`
    flex: 1;
    font-size: ${responsiveFontSize(1.5)}
`