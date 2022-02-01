import React from 'react'
import styled, { css } from 'styled-components/native';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveWidth } from 'react-native-responsive-dimensions';

export const DropdownFilter = styled.ScrollView`
    max-height: 150px;
    max-width: ${responsiveWidth(100)};
    background-color: #ffffff;
    margin-top: 10px;

`
