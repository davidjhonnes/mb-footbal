import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import R from "ramda";
import { BlurView } from "@react-native-community/blur";
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenFontSize } from 'react-native-responsive-dimensions';





const LeaderBoard = ({
    route: {
        params
    },
    navigation
}) => {
    const { league: { league }, selectedSeasons, listRoutes, listScenes } = params
    const layout = useWindowDimensions();
    const [seasons, setSeasons] = useState([])
    const [index, setIndex] = useState(0);


    const [routes, setRoutes] = React.useState(listRoutes);
    let renderScene = SceneMap(listScenes);

    const changeTab = (index) => {
         // changeTab(routes[index].key)
         if(index)
         setIndex(index)
         console.log("season .year", index)

         const tmp = R.clone(routes)
         const obj = tmp[index]
         const list = tmp
         obj.dataStading = { currentSeason: tmp[index].key }
         list[index] =obj

         setRoutes(list)
    }
    useEffect(() => {
        changeTab(0)
    }, [league, selectedSeasons])


    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black', height: 6 }}
            style={{ backgroundColor: 'yellow' }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: "#000000", margin: 8, fontWeight: '700' }}>
                    {route.title}
                </Text>
            )}
            scrollEnabled
            onTabPress={({ route, preventDefault }) => {
                // changeTab(route.key)
                // if (route.key === 'home') {
                //     preventDefault();

                //     // Do something else
                // }
            }}

        />
    );
    console.log("params", params)
    return (
        <>
            <View style={{ height: 150, width: '100%' }}>
                <ImageBackground
                    style={styles.imageBlur}
                    key={'blurryImage'}
                    source={require("../../../assets/images/backgrounds/bg-inital-screen.png")}
                    resizeMode={"cover"}
                    blurRadius={0}

                >
                    <View style={{ backgroundColor: "rgba(42, 42, 39, 0.88)", height: "100%" }}>
                        <View style={{ margin: 10, position: "absolute" }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="times-circle" size={responsiveScreenFontSize(4)} color="yellow" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ margin: 10, alignSelf: "center", justifyContent: "center", alignItems: "center", width: 90, height: 90, borderRadius: 8, backgroundColor: "rgba(255, 255, 255, 0.82)" }}>
                            <Image source={{ uri: league.logo }} style={styles.logo} resizeMode={"contain"} />
                        </View>
                        <Text style={{ fontSize: responsiveFontSize(3), alignSelf: "center", color: "#ffffff" }}>{league.name} </Text>
                    </View>
                </ImageBackground>

            </View>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                initialLayout={{ width: layout.width }}
                onIndexChange={(i) => {
                    if(index === i) return
                   setIndex(i)
                   changeTab(i)
                }}
                swipeEnabled={false}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    imageBlur: {
        // opacity:0.8
        height: 150,
        width: '100%'
    },
    logo: {
        width: 80,
        height: 80
    },
    blur: {
        backgroundColor: 'rgba(42, 42, 39, 0.62)'
    }
});

export default LeaderBoard