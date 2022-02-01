import React, { useState, useEffect } from "react"
import { View, SafeAreaView, KeyboardAvoidingView, Image, Text, StyleSheet } from "react-native"
import { responsiveFontSize, responsiveWidth, useResponsiveScreenWidth } from "react-native-responsive-dimensions"
import { CommonActions, useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { ButtonTheme } from "../../components/atoms/Buttons"
import PickerMultiple from "../../components/atoms/Picker"

import AutoComplete from "../../components/organisms/Filters/AutoComplete"
import { LeagueSerialized } from "../../interface/League"
import { Season } from "../../interface/Season"
import { Colors, FontSize, SizeButtons } from "../../theme/theme"
import { BoxFilter, Box, ContainerImageBG, Content, DescriptionText, Divider, TitleText } from "./styles"
import { ROUTERS } from "../../config/routes"
import RatingSeason from "../../components/organisms/RatingSeason/RatingSeason"
const imgbackground = require("../../../assets/images/backgrounds/bg-01.png")
const imgLogo = require("../../../assets/images/logo-bigsize.png")

const Home = () => {
    const navigation = useNavigation()
    const [dataFiltering, setDataFiltering] = useState<LeagueSerialized>(null)
    const [textSeasonSelected, setTextSeasonSelected] = useState<string>("")
    const [seassonListSelected, setListSeassonSelected] = useState<Season[]>([])

    const { leagues } = useSelector((state: any) => {
        return {
            leagues: state.leagues.leagues
        }
    })

    useEffect(() => {
        setDataFiltering(null)

    }, [])

    const handlerSelectSeason = (valueText: string, listSeasons: Season[]) => {
        setTextSeasonSelected(valueText)
        setListSeassonSelected(listSeasons)
    }

    const handleDataFiltering = (league: LeagueSerialized) => {
        setTextSeasonSelected(null)
        setListSeassonSelected([])
        setDataFiltering(league)
    }

    const handleNavToLeaderBoard = () => {
        const listRoutes = []
        const listScenes = {}
        const orederRoutes = seassonListSelected.sort((a, b) => a.year - b.year)
        orederRoutes.map((item, index)=>{
            const r = {
                key: item.year.toString(), 
                title: item.year.toString(),
                leagueId: dataFiltering.league.id
            }
            listRoutes.push(r)
            listScenes[item.year.toString()] =  RatingSeason
        })
       

        navigation.navigate(
            ROUTERS.LeaderBoard.toString() as never,
            {
                league: dataFiltering,
                selectedSeasons: seassonListSelected,
                listRoutes:listRoutes,
                listScenes:listScenes

            } as never
        )
        // navigate.dispatch(
        //     CommonActions.reset({
        //         index:0,
        //         routes:[{
        //             name:ROUTERS.LeaderBoard,
        //             params:{
        //                 league: dataFiltering,
        //                 selectedSeasons: seassonListSelected

        //             }
        //         }],

        //     })
        //   )
    }

    return (
        <KeyboardAvoidingView style={{ flexDirection: 'column', justifyContent: 'center', }} behavior="height" enabled  >
            <SafeAreaView>
                <ContainerImageBG
                    source={imgbackground}
                    resizeMode="contain"
                    blurRadius={0}
                >
                    <Content>
                        <Box>
                            <View style={{ alignSelf: "center", borderRadius: 100, backgroundColor: "rgba(255,255,255, 0.7)", width: 80, height: 80, justifyContent: "center", alignItems: "center", alignContent: "center" }}>
                                <Text style={{ color: "#888888", fontSize: responsiveFontSize(3.1) }}>IFoot</Text>
                            </View>
                            <TitleText style={{ fontFamily: 'Roboto' }}>Welcome</TitleText>
                            <TitleText>to IFootball App!</TitleText>
                            <Divider />
                            <DescriptionText>Stay on top of everything that happens in the biggest football leagues in the world</DescriptionText>
                        </Box>
                        <BoxFilter>
                            <View style={{ marginBottom: 10 }}>
                                <AutoComplete
                                    data={leagues}
                                    colorLabel={"#0e0e0e"}
                                    inputColor={""}
                                    listenerFilter={(dt): void => handleDataFiltering(dt)}
                                    // fontSizeInput={}
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
                                disabled={dataFiltering?.seasons.length && seassonListSelected.length ? false : true}
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



export default Home
