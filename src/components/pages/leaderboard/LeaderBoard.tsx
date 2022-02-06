import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import R from "ramda";
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveFontSize, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { getStandingsByLeagueSeason } from '../../../infra/api/standings/standings-services';
import { StandingResponse } from '../../..//interface/Standing';
import { Content, Header, LogoLeague, ViewAbsolute } from './style';
const imgBackground = require("../../../../assets/images/backgrounds/bg-inital-screen.png")
const LeaderBoard = ({
    route: {
        params
    },
    navigation
}) => {
    const { league: { league }, listRoutes, listScenes } = params
    const layout = useWindowDimensions();
    const [loading, setLoading] = useState<boolean>(false)
    const [index, setIndex] = useState(0);
    const [standings, setStandings] = useState<StandingResponse[]>([])


    const [routes, setRoutes] = useState(listRoutes);
    let renderScene = SceneMap(listScenes);

    const changeTab = (index) => {
        setLoading(true)
        if (index)
            setIndex(index)

        let tmp = routes
        loadStadings(tmp[index].key).then((r) => {
            setIndex(index)
            let obj = tmp[index]
            let list = tmp
            obj.stadingsResponse = r
            obj.season = tmp[index].key,
                obj.leagueId = league.id
            list[index] = obj
            setRoutes(list)
            loadStadings(tmp[index].key)
            setLoading(false)

        }).catch((e) => {
            console.error(e)
            setLoading(false)
        })

    }

    const loadStadings = async (currentSeason) => {
        try {
            if (currentSeason) {
                const std = await getStandingsByLeagueSeason({ league: league.id, season: currentSeason })
                const dateSet: StandingResponse[] = std?.data?.response ? std?.data?.response : []

                setStandings(dateSet)
                return std?.data?.response
            }
        } catch (e) {
            console.error("error", e)
            throw e
        }
    }

    useEffect(() => {
        changeTab(0)
    }, [league])



    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{
                backgroundColor: 'black',
                height: 6
            }}
            style={{ 
                backgroundColor: 'yellow' 
            }}
            renderLabel={({ route, focused, color }) => (
                <Text style={{ color: "#000000", margin: 8, fontWeight: '700' }}>
                    {route.title}
                </Text>
            )}
            scrollEnabled
           

        />
    );
    return (
        <>
            <Header >
                <ImageBackground
                    style={styles.imageBlur}
                    key={'blurryImage'}
                    source={imgBackground}
                    resizeMode={"cover"}
                    blurRadius={0}
                >
                    <Content >
                        <ViewAbsolute>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.goBack()
                                }
                                disabled={loading}
                            >
                                <Icon
                                    name="arrow-circle-left"
                                    size={responsiveScreenFontSize(4)}
                                    color={loading ? "rgba(0,0,0,0.3)" : "yellow"}
                                />
                            </TouchableOpacity>
                        </ViewAbsolute>
                        <LogoLeague>
                            <Image
                                source={{ uri: league.logo }}
                                style={styles.logo}
                                resizeMode={"contain"}
                            />
                        </LogoLeague>
                        <Text style={styles.title}>{league.name} </Text>
                    </Content>
                </ImageBackground>

            </Header>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                initialLayout={{ width: layout.width }}
                onIndexChange={(i) => {
                    if (index !== i) {
                        changeTab(i)
                    }

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
    },

    title: {
        fontSize: responsiveFontSize(3),
        alignSelf: "center",
        color: "#ffffff"
    }
});

export default LeaderBoard