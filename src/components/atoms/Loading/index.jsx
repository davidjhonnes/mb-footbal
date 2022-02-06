import React, { useEffect, useState } from 'react'

import { View, Text } from "react-native"
import { ActivityIndicator } from "react-native-paper"


const LoadingData = () => {

    return (

        <View style={{ alignSelf: 'center', justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator color={"rgba(87, 87, 87, 0.8)"} size={"large"} animating={true} style={{ marginBottom: 20 }} />
            <Text>Loading Data...</Text>
        </View>
    )
}

export default LoadingData