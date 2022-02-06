import React, { useState, useEffect, useLayoutEffect, } from "react"
import { Image, SafeAreaView, Text, View } from "react-native"
import { ActivityIndicator } from "react-native-paper"
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions"
import { getPlayersByTeamId } from "../../infra/api/players/pelayers-services"
import { getTeamsDetails, getTeamsStatistics } from "../../infra/api/teams/teams-services"
import { TeamSerialized } from "../../interface/Team"
import { BlackLine, BlockInfoTeam, BoxHeader, Card, Container, Content, ContentPlayer, Divider, EffectDivisor, Header, ImagePlayer, LogoTeam, RowPlayer, TeamImage, TextHeader, TextInfoPlayer, TextInfoTeam, TextStrong } from "./styles"

const TeamDetails = ({
    route: {
        params: {
            dataTeam: dataTeam,
            season,
            leagueId
        }
    },
    navigation
}) => {


    const [team, setTeam] = useState<TeamSerialized>(null)
    const [teamStatisitics, setTeamStatistics] = useState<any>(null)
    const [players, setPlayers] = useState<any>([])


    const [isLoading, setIsLoading] = useState<Boolean>(false)

    useLayoutEffect(() => {
        loadTeamDetails(dataTeam?.id)
        navigation.setOptions({
            title: dataTeam.name,
        });
    }, [navigation, dataTeam]);

    const loadTeamDetails = async (teamId) => {

        setIsLoading(true)
        try {
            const request = await getTeamsDetails({ id: teamId })
            const requestSt = await getTeamsStatistics({ team: teamId, league: leagueId, season: season })
            const requestPlayer = await getPlayersByTeamId({ team: teamId, season: season })

            const { response } = request.data
            const responseSt = requestSt.data.response
            const responsePlayer = requestPlayer.data.response

            setTeam(response[0])
            setTeamStatistics(responseSt[0])
            setPlayers(responsePlayer)
            setIsLoading(false)

        } catch (e) {
            setIsLoading(false)
            console.error("Error Team", e)
        }
    }

    useEffect(() => {

    }), []

    return (
        <SafeAreaView>
            {isLoading ?
                <View style={{alignSelf:'center', justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator color={"rgba(87, 87, 87, 0.8)"} size={"large"} animating={true} style={{ marginBottom: 20 }} />
                    <Text>Loading Data...</Text>
                </View>
                :
                <Container>
                    <Header
                        source={{ uri: team?.team?.logo }}
                        blurRadius={2}
                    >
                        <BoxHeader>
                            <LogoTeam source={{ uri: team?.team?.logo }} />
                            <TextHeader>
                                {team?.team?.name}
                            </TextHeader>
                        </BoxHeader>
                    </Header>
                    <EffectDivisor>
                        <BlackLine />
                    </EffectDivisor>
                    <Content>
                        <Card>
                            <BlockInfoTeam>
                                <TextInfoTeam><TextStrong>About Team</TextStrong></TextInfoTeam>
                            </BlockInfoTeam>
                            <TeamImage
                                source={{ uri: team?.venue?.image }}
                                resizeMode={"cover"}
                            />
                            <BlockInfoTeam>
                                <TextInfoTeam><TextStrong>Name:</TextStrong> {team?.team?.name}</TextInfoTeam>
                                <TextInfoTeam><TextStrong>Code:</TextStrong> {team?.team?.code}</TextInfoTeam>
                            </BlockInfoTeam>
                            <BlockInfoTeam>
                                <TextInfoTeam><TextStrong>Country:</TextStrong> {team?.team?.country}</TextInfoTeam>
                                <TextInfoTeam><TextStrong>Foundend at:</TextStrong> {team?.team?.founded}</TextInfoTeam>
                            </BlockInfoTeam>
                            <Divider />

                            <BlockInfoTeam>
                                <TextInfoTeam style={{ maxWidth: '55%' }}><TextStrong>Address:</TextStrong> {team?.venue?.address}</TextInfoTeam>
                                <TextInfoTeam style={{ maxWidth: '38%' }}><TextStrong>City:</TextStrong> {team?.venue?.city}</TextInfoTeam>
                            </BlockInfoTeam>

                            <BlockInfoTeam>
                                <TextInfoTeam style={{ maxWidth: '65%' }}><TextStrong>Statium:</TextStrong> {team?.venue?.name}</TextInfoTeam>
                                <TextInfoTeam><TextStrong>Surface:</TextStrong> {team?.venue?.surface}</TextInfoTeam>
                            </BlockInfoTeam>
                            <BlockInfoTeam>
                                <TextInfoTeam><TextStrong>Capacity:</TextStrong> {team?.venue?.capacity}</TextInfoTeam>
                            </BlockInfoTeam>



                        </Card>

                        <Card>
                            <BlockInfoTeam>
                                <TextInfoTeam><TextStrong>Players</TextStrong></TextInfoTeam>
                            </BlockInfoTeam>
                            <ContentPlayer style={{}}>
                                {players.map((item, index) => {

                                    return (
                                        <RowPlayer key={index}>
                                            <ImagePlayer source={{ uri: item?.player?.photo }} style={{}} resizeMode={"cover"} />
                                            <TextInfoPlayer style={{ flex: 2, marginHorizontal: 10 }}>{item.player.name}</TextInfoPlayer>
                                            <TextInfoPlayer>{item.player.age}yo</TextInfoPlayer>
                                            <TextInfoPlayer>{item.player.nationality}</TextInfoPlayer>
                                            <TextInfoPlayer style={{ textAlign: 'right' }}>{item.player.weight}</TextInfoPlayer>
                                        </RowPlayer>
                                    )
                                })}
                            </ContentPlayer>
                        </Card>
                    </Content>
                </Container>

            }
        </SafeAreaView>
    )

}

export default TeamDetails