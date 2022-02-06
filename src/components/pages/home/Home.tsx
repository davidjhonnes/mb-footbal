import React, { useState, useEffect } from "react"
import { View, SafeAreaView, KeyboardAvoidingView, Image, Text, StyleSheet } from "react-native"
import { responsiveFontSize } from "react-native-responsive-dimensions"
import { useNavigation } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { ButtonTheme } from "../../atoms/Buttons"
import PickerMultiple from "../../atoms/Picker"

import AutoComplete from "../../organisms/Filters/AutoComplete"
import { LeagueSerialized } from "../../../interface/League"
import { Season } from "../../../interface/Season"
import { BoxFilter, Box, ContainerImageBG, Content, DescriptionText, Divider, TitleText } from "./styles"
import { ROUTERS } from "../../../config/routes"
import RatingSeason from "../../../components/organisms/RatingSeason/RatingSeason"
import { setSelectedLeagueAction } from "../../../infra/redux/actions/leagues"
import { setSelectedSeasonAction } from "../../../infra/redux/actions/seasons"
const imgbackground = require("../../../../assets/images/backgrounds/bg-01.png")

const Home = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation()

    // Get state from redux using selector
    const { leagues, leagueSelected, seasonsSelected } = useSelector((state: any) => {
        return {
            leagues: state.leagues.leagues,
            leagueSelected: state.leagues.leagueSelected,
            seasonsSelected: state.seasons.seasonSelected
        }
    })

    const [dataFiltering, setDataFiltering] = useState<LeagueSerialized>(null)
    const [textSeasonSelected, setTextSeasonSelected] = useState<string>("")
    const [seassonListSelected, setListSeassonSelected] = useState<Season[]>([])
 

    useEffect(() => {
        if (leagueSelected) {
            setDataFiltering(leagueSelected)
        }
        if (seasonsSelected) {
            setTextSeasonSelected(seasonsSelected.valueText)
            setListSeassonSelected(seasonsSelected.listSeasons)
        }
    }, [leagueSelected, seasonsSelected])

    // selecting seasons from league 
    const handlerSelectSeason = (valueText: string, listSeasons: Season[]) => {
        setTextSeasonSelected(valueText)
        setListSeassonSelected(listSeasons)
        dispatch(setSelectedSeasonAction({ valueText, listSeasons }))
    }

    //set Data League and clean filter season
    const handleLeagueFilter = (league: LeagueSerialized) => {
        setTextSeasonSelected(null)
        setListSeassonSelected([])
        setDataFiltering(league)
        dispatch(setSelectedLeagueAction(league))
    }

    // nav to List seasons and view standings league
    const handleNavToLeaderBoard = () => {
        const listRoutes = []
        const listScenes = {}
        // ordering list season for year 
        const orederRoutes = seassonListSelected.sort((a, b) => a.year - b.year)
        orederRoutes.map((item, index) => {
            const r = {
                key: item.year.toString(),
                title: item.year.toString(),
                leagueId: dataFiltering.league.id
            }
            listRoutes.push(r)
            listScenes[item.year.toString()] = RatingSeason
        })

        navigation.navigate(
            ROUTERS.LeaderBoard.toString() as never,
            {
                league: dataFiltering,
                selectedSeasons: seassonListSelected,
                listRoutes: listRoutes,
                listScenes: listScenes

            } as never
        )
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoinding} behavior="height" enabled  >
            <SafeAreaView>
                <ContainerImageBG
                    source={imgbackground}
                    resizeMode="contain"
                    blurRadius={0}
                >
                    <Content>
                        <Box>
                            <View style={styles.boxTextApp}>
                                <Text style={styles.textApp}>IFoot</Text>
                            </View>
                            <TitleText style={styles.fontRoboto}>Welcome</TitleText>
                            <TitleText>to IFootball App!</TitleText>
                            <Divider />
                            <DescriptionText>Stay on top of everything that happens in the biggest football leagues in the world</DescriptionText>
                        </Box>
                        <BoxFilter>
                            <View style={{ marginBottom: 10 }}>
                                <AutoComplete
                                    value={leagueSelected as LeagueSerialized}
                                    data={leagues}
                                    colorLabel={"#0e0e0e"}
                                    inputColor={""}
                                    listenerFilter={(dt): void => handleLeagueFilter(dt)}
                                    label="Find your league to follow"
                                    placeholder="Enter the league name"
                                />
                            </View>
                            <Divider />
                            {dataFiltering?.seasons &&
                                <>
                                    <PickerMultiple
                                        list={dataFiltering?.seasons ? dataFiltering?.seasons : []}
                                        disabled={false}
                                        selectedItems={seassonListSelected}
                                        value={textSeasonSelected}
                                        onSelectItems={handlerSelectSeason}
                                        textLabel={"Select one or more seasons"}
                                        fieldLabel={"Seasons"}
                                        keyValue={"year"}
                                    />
                                    <Divider />

                                </>
                            }

                            <ButtonTheme
                                disabled={dataFiltering?.seasons?.length && seassonListSelected?.length ? false : true}
                                size={"Large"}
                                text={"Continue"}
                                color={"Green"}
                                fontSize={"FontLarge"}
                                onPress={() => handleNavToLeaderBoard()}
                            />

                        </BoxFilter>
                    </Content>
                </ContainerImageBG>
            </SafeAreaView>
        </KeyboardAvoidingView>

    )

}

const styles = StyleSheet.create({
    keyboardAvoinding: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    boxTextApp: {
        alignSelf: "center",
        borderRadius: 100,
        backgroundColor: "rgba(255,255,255, 0.7)",
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    textApp: {
        color: "#888888",
        fontSize: responsiveFontSize(3.1)
    },
    fontRoboto: {
        fontFamily: 'Roboto'
    }
})


export default Home;
