import React, { useState, useEffect } from "react"
import { View, Text, SafeAreaView, ImageBackground } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { connect, useSelector } from "react-redux"
import AutoComplete from "../../components/organisms/Filters/AutoComplete"

import { getLeagues } from "../../infra/api/leagues/leagues-services"
import { setLeaguesAction } from "../../infra/redux/actions/leagues"
import { BoxFilter, ContainerImageBG, Content } from "./styles"
const imgbackground = require("../../../assets/images/backgrounds/bg-inital-02.png")

const Home = () => {

    useEffect(() => {


    }, [])

    const { leagues } = useSelector((state: any) => {
        return {
            leagues: state.leagues.leagues
        }
    })

    console.log("leagues leagues", leagues)

    return (
        <SafeAreaView>
            <ContainerImageBG
                source={imgbackground}
                resizeMode="cover"
                blurRadius={1.5}
            >
                <Content>

                    <View>
                        <Text style={{ fontSize: 55, color: "#fff" }}>Bem vindo(a)</Text>
                    </View>
                    <BoxFilter>
                        <View>
                            <AutoComplete
                                data={leagues}
                                colorLabel={"#0e0e0e"}
                                inputColor={""}
                                // fontSizeInput={}
                                label="Localize a liga que você deseja acompanhar"
                                placeholder="Digite o nome da Liga"
                            />
                        </View>
                    </BoxFilter>
                </Content>
            </ContainerImageBG>
        </SafeAreaView>
    )

}


export default Home
