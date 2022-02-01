import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import { getStandingsByLeagueSeason } from '../../../infra/api/standings/standings-services';
import { FontSize } from '../../../theme/theme';


const RatingSeason = ({
    jumpTo,
    position,
    route: {
        key,
        title,
        dataStading,
        leagueId
    }
}) => {
    const [standings, setStandings] = useState<any>([])
    const [tableHead] = useState(['Rank', 'Team', 'Points', 'Goals diff', "Played", "Wins", "Draw", "Losses"])


    const widthArr = [50, 180, 50, 80, 60, 50, 50, 60]
    const loadStadings = async () => {
        try {

            const stadings = await getStandingsByLeagueSeason({ league: leagueId, season: dataStading?.currentSeason })
            console.log("stadings", stadings.data.response)
            setStandings(stadings?.data?.response)
        } catch (e) {
            console.error("error", e)
        }
    }

    useEffect(() => {
        loadStadings()
    }, [leagueId, dataStading])

    console.log("props Rating", dataStading)

    const viewLogoTeam = (uri, nameTeam) => {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: "center",
                alignContent: 'center',
                margin: 6
            }}>
                <Image source={{ uri }} style={{ width: 15, height: 15 }} resizeMode={"contain"} />
                <Text style={styles.text}>{nameTeam}</Text>
            </View>
        )
    }

    const renderItem = (itemList) => {
        const styleOb = { ...styles.text, ...styles.row }
        console.log("itemList", itemList)
        return (
            <View>
                <View style={{paddingTop:10,borderBottomColor:"#000000", borderBottomWidth:4}}>
                    <Text style={{paddingLeft:10, fontSize: responsiveFontSize(1.8), fontWeight: '700', color: "#000000", borderBottomColor:"yellow", borderBottomWidth:4 }}>{itemList?.item[0]?.group}</Text>
                </View>
                <ScrollView horizontal={true} style={{ paddingVertical: 10 }}>

                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={tableHead} style={styles.head} textStyle={[styles.text, styles.textHead]} widthArr={widthArr} />
                        {itemList.item?.map(item => {
                            const obj = [
                                item.rank.toString(),
                                viewLogoTeam(item?.team?.logo, item?.team?.name),
                                item.points.toString(),
                                item.goalsDiff.toString(),
                                item.all?.played.toString(),
                                item.all?.win,
                                item.all?.draw,
                                item.all?.lose

                            ]
                            console.log("arrayob", obj)
                            return <Rows data={[obj]} textStyle={styleOb} widthArr={widthArr} />
                        })}

                    </Table>

                </ScrollView>
            </View>)



    }
    return (
        <View style={styles.container}>
            {standings.length ? 
            <FlatList
                horizontal={false}
                data={standings[0]?.league?.standings}
                renderItem={renderItem}
            />
            
        : <Text>Data not founded</Text>}

        </View>
    )
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    head: { height: 40, width: "auto", backgroundColor: '#f1f8ff' },
    row: {},
    textHead: { fontWeight: 'bold' },
    text: { margin: 6, fontSize: 12, textAlign: 'center' }
});

export default RatingSeason
